"""Library interaction regression tests. Requires playwright + a Chromium browser.

This environment blocks localhost for Chromium, so tests run page markup with locally
injected CSS/JS and a mocked JSON response. External Drive permissions are not tested.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json, os, re

P = Path(__file__).resolve().parents[1]
HTML = re.sub(r'<script\s+src=[^>]*></script>', '', (P/'books.html').read_text())
HTML = re.sub(r'<link[^>]*rel="stylesheet"[^>]*>', '', HTML)
CSS = (P/'vendor/bootstrap.min.css').read_text() + '\n' + (P/'style.css').read_text()
JS = (P/'script/bookList.js').read_text()
SOURCE = json.loads((P/'json/book.json').read_text())
RESULTS=[]

def check(condition, description):
    if not condition: raise AssertionError(description)
    RESULTS.append('PASS '+description)

def make_page(browser, data=SOURCE, viewport=None, fail=False):
    page=browser.new_page(viewport=viewport or {'width':1366,'height':900})
    page.set_content(HTML, wait_until='domcontentloaded')
    page.add_style_tag(content=CSS)
    page.add_script_tag(content=(P/'vendor/bootstrap.bundle.min.js').read_text())
    if fail:
        page.evaluate('''() => {window.fetch=()=>Promise.reject(Error("network down"));}''')
    else:
        page.evaluate('''data => {window.__libraryData=data;window.fetch=async()=>({ok:true,json:async()=>window.__libraryData});}''', data)
    page.add_script_tag(content=JS)
    if not fail: page.locator('.doc-card, .library-empty').first.wait_for()
    return page

with sync_playwright() as p:
    b=p.chromium.launch(headless=True,
        executable_path=os.environ.get('CHROMIUM_PATH') or ('/usr/bin/chromium' if Path('/usr/bin/chromium').exists() else None),
        args=['--no-sandbox','--disable-dev-shm-usage'])
    page=make_page(b)
    check(page.locator('.doc-card').count()==6, 'Six documents render from original JSON')
    check(page.locator('iframe').count()==0, 'Preview iframes are not initially loaded')
    check(page.locator('#bookSearch').is_enabled(), 'Controls enable after library loads')
    check('6 of 6' in page.locator('#librarySummary').inner_text(), 'Count is accurate')
    check(page.locator('.doc-type').evaluate_all('(a)=>a.map(x=>x.textContent)')==['Guide','Project example','Project example','Book','Book','Guide'], 'Categories reflect explicit JSON labels')
    check(page.locator('.doc-open-link').count()==6, 'Six direct open links remain')
    check(all('/view' in link for link in page.locator('.doc-open-link').evaluate_all('(a)=>a.map(x=>x.getAttribute("href"))')), 'Direct open links use Drive full document viewer')
    check(all(x.get('target')=='_blank' and 'noopener' in x.get('rel','') for x in page.locator('.doc-open-link').evaluate_all('(a)=>a.map(x=>({target:x.target,rel:x.rel}))')), 'External links open safely in new tabs')
    page.locator('#bookCategory').select_option('book')
    check(page.locator('.doc-card').count()==2, 'Book type filter shows two titles')
    check('Linux' in page.locator('#bookList').inner_text(), 'Book type filter returns Linux books')
    page.locator('#bookCategory').select_option('project')
    check(page.locator('.doc-card').count()==2, 'Project filter shows two examples')
    page.locator('#bookCategory').select_option('guide')
    check(page.locator('.doc-card').count()==2, 'Guide filter shows two items')
    page.locator('#bookSearch').fill('online')
    check(page.locator('.doc-card').count()==1, 'Search combines with category filter')
    page.locator('#bookSearch').fill('linux')
    check(page.get_by_text('No matching documents').is_visible(), 'Combined no-result state displays')
    check(page.locator('.library-empty button').is_visible(), 'Empty state includes reset action')
    page.locator('.library-empty button').click()
    check(page.locator('.doc-card').count()==6, 'Empty-state reset restores results')
    check(page.locator('#bookSearch').evaluate('(el)=>el===document.activeElement'), 'Reset returns focus to search')
    page.locator('#bookSort').select_option('title-asc')
    titles=page.locator('.doc-card h3').all_inner_texts()
    check(titles==sorted(titles,key=str.lower), 'Alphabetical ascending sort works')
    page.locator('#bookSort').select_option('title-desc')
    titles=page.locator('.doc-card h3').all_inner_texts()
    check(titles==sorted(titles,key=str.lower,reverse=True), 'Alphabetical descending sort works')
    check(page.locator('#resetBookFilters').is_visible(), 'Active sort displays reset-all action')
    page.locator('#resetBookFilters').click()
    check('Project Paper' in page.locator('.doc-card').first.inner_text(), 'Reset restores original JSON order')
    page.locator('#bookSearch').fill('LINUX')
    check(page.locator('.doc-card').count()==2, 'Search is case insensitive')
    check(page.locator('#clearBookSearch').is_visible(), 'Clear-search action becomes visible')
    page.locator('#clearBookSearch').click()
    check(page.locator('.doc-card').count()==6, 'Clear-search action works')
    errors=[]
    page.on('pageerror',lambda error:errors.append(str(error)))
    page.locator('.doc-preview-btn').first.click()
    check(page.locator('#bookPreviewDialog').evaluate('(d)=>d.open'), 'Preview opens native modal dialog')
    check(page.locator('iframe').count()==1, 'Opening preview mounts exactly one iframe')
    check(page.locator('iframe').get_attribute('src').endswith('/preview'), 'Embed link uses Google Drive preview endpoint')
    check(page.locator('#previewOpenLink').get_attribute('href').endswith('/view'), 'Modal fallback links to full document view')
    check(page.locator('#previewDialogTitle').inner_text()==SOURCE[0]['name'], 'Preview is labelled with document title')
    check(page.locator('iframe').get_attribute('title').startswith('Google Drive preview:'), 'Preview iframe has a descriptive title')
    frameWidth=page.locator('iframe').evaluate('(e)=>e.getBoundingClientRect().width')
    check(frameWidth>600, 'Desktop preview is legible wider than card width')
    page.locator('#closeBookPreview').click()
    page.wait_for_function('!document.querySelector("#previewFrameWrap iframe")')
    check(not page.locator('#bookPreviewDialog').evaluate('(d)=>d.open'), 'Close button dismisses preview')
    check(page.locator('.doc-preview-btn').first.evaluate('(e)=>document.activeElement===e'), 'Focus returns to the invoking preview button')
    page.locator('.doc-preview-btn').nth(1).click()
    page.keyboard.press('Escape')
    page.wait_for_function('!document.querySelector("#previewFrameWrap iframe")')
    check(not page.locator('#bookPreviewDialog').evaluate('(d)=>d.open'), 'Escape closes modal and unloads iframe')
    check(errors==[], 'No JavaScript runtime errors from library interactions')
    page.close()

    # Invalid links and missing categories should produce neither unsafe frames nor buttons.
    invalid=[{'name':'An unavailable item','link':'javascript:alert(1)'}, {'name':'An external HTTPS resource','link':'https://example.org/document.pdf'}]
    page=make_page(b, invalid)
    check(page.locator('.doc-unavailable').count()==1, 'Bad document URLs display non-clickable unavailability state')
    check(page.locator('.doc-open-link').count()==1, 'Valid external HTTPS links remain usable')
    check(page.locator('.doc-preview-btn').count()==0, 'Non-Google document URLs are never embedded')
    check(page.locator('.doc-type').evaluate_all('(a)=>a.map(x=>x.textContent)')==['Resource','Resource'], 'Missing categories fall back to Resource')
    page.close()

    page=make_page(b, [])
    check(page.get_by_text('No documents are available yet').is_visible(), 'Empty library shows meaningful message')
    check('0 of 0' in page.locator('#librarySummary').inner_text(), 'Empty library count is correct')
    page.close()

    page=make_page(b, fail=True)
    page.get_by_text('Unable to load the library.',exact=False).wait_for()
    check(page.locator('#retryLibrary').is_visible(), 'Fetch error provides a retry button')
    check(page.locator('#bookSearch').is_disabled(), 'Fetch error disables unusable filters')
    page.evaluate('''data => {window.fetch=async()=>({ok:true,json:async()=>data});}''', SOURCE)
    page.locator('#retryLibrary').click()
    page.locator('.doc-card').first.wait_for()
    check(page.locator('.doc-card').count()==6, 'Retry recovers from a temporary fetch failure')
    check(not page.locator('#retryLibrary').is_visible(), 'Retry button disappears after recovery')
    page.close()

    for width in (360, 390, 768, 1280):
        page=make_page(b, viewport={'width':width,'height':820})
        check(page.evaluate('document.documentElement.scrollWidth <= innerWidth + 2'), f'Library has no horizontal overflow at {width}px')
        page.locator('.doc-preview-btn').first.click()
        check(page.evaluate('document.documentElement.scrollWidth <= innerWidth + 2'), f'Preview has no page overflow at {width}px')
        check(page.locator('#closeBookPreview').is_visible(), f'Preview close control is visible at {width}px')
        if width in (390, 1280):
            page.locator('#closeBookPreview').click()
            page.wait_for_function('!document.querySelector("#previewFrameWrap iframe")')
        page.close()
    b.close()

print('\n'.join(RESULTS))
print('TOTAL',len(RESULTS))
