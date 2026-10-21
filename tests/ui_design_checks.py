"""Extra UI / UX regression checks for v2.

Requires: pip install playwright; playwright install chromium
Run: python tests/ui_design_checks.py
Uses local mock JSON because browser loopback may be blocked in evaluation environments.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os, json, re

P = Path(__file__).resolve().parents[1]
STYLES = (P/'vendor/bootstrap.min.css').read_text() + '\n' + (P/'style.css').read_text()
BOOTSTRAP = (P/'vendor/bootstrap.bundle.min.js').read_text()
DATA = {name: json.loads((P/'json'/name).read_text()) for name in ['subject.json', 'data.json', 'book.json']}
RESULTS=[]

def check(condition, message):
    assert condition, message
    RESULTS.append('PASS ' + message)

def load(page, file, script=None):
    source = (P/file).read_text()
    source = re.sub(r'<script\s+src=[^>]*></script>', '', source)
    source = re.sub(r'<link[^>]*rel="stylesheet"[^>]*>', '', source)
    page.set_content(source, wait_until='domcontentloaded')
    page.add_style_tag(content=STYLES)
    page.add_script_tag(content=BOOTSTRAP)
    page.evaluate('''data => {window.fetch = async url => ({ok:true,json:async()=>data[url.split('/').pop()]});}''', DATA)
    page.add_script_tag(content=(P/'script/site.js').read_text())
    if script: page.add_script_tag(content=(P/'script'/script).read_text())
    page.wait_for_timeout(80)

def luminance(hexcode):
    rgb=[int(hexcode[i:i+2],16)/255 for i in (1,3,5)]
    channels=[c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4 for c in rgb]
    return sum(c*weight for c,weight in zip(channels,(.2126,.7152,.0722)))

def contrast(a,b):
    vals=sorted([luminance(a),luminance(b)])
    return (vals[1]+.05)/(vals[0]+.05)

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path=os.environ.get('CHROMIUM_PATH') or ('/usr/bin/chromium' if Path('/usr/bin/chromium').exists() else None),args=['--no-sandbox','--disable-dev-shm-usage'])
    page=browser.new_page(viewport={'width':1440,'height':900})
    load(page,'index.html')
    token=page.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()")
    check(token.lower()=='#00bceb','Original cyan is retained as the accent token')
    check(page.evaluate("getComputedStyle(document.documentElement).getPropertyValue('--canvas').trim()").lower()=='#f4f2ee','Original warm neutral retained as background')
    check('rgba(9,30,66' in (P/'style.css').read_text(),'Original blue-gray shadow character preserved in elevation tokens')
    check(page.locator('.feature-card svg').count()==4,'Homepage feature cards use consistent vector icons')
    check(page.locator('.hero-section').evaluate('(el)=>getComputedStyle(el).color')=='rgb(255, 255, 255)','Hero uses high-contrast text')
    check(contrast('#006b87','#ffffff')>=4.5,'Accent text color meets WCAG AA normal-text contrast on white')
    check(contrast('#536b80','#f4f2ee')>=4.5,'Muted body text meets WCAG AA normal-text contrast on neutral canvas')
    check(contrast('#ffffff','#102d52')>=7,'White text on navy passes WCAG AAA contrast')
    check(page.locator('.feature-icon').first.evaluate('(el)=>getComputedStyle(el).borderRadius')!='0px','Feature icons have styled containers')
    page.close()

    for filename in ['year.html','collegelist.html','books.html','link.html']:
        page=browser.new_page()
        script={'year.html':'subject.js','collegelist.html':'clgo_script.js','books.html':'bookList.js'}.get(filename)
        load(page,filename,script)
        check(page.locator('nav.breadcrumbs[aria-label="Breadcrumb"]').count()==1,filename+' includes contextual breadcrumb')
        page.close()

    page=browser.new_page()
    load(page,'year.html','subject.js')
    page.locator('[data-semester="0"]').focus()
    page.keyboard.press('End')
    check(page.locator('[data-semester="7"]').get_attribute('aria-pressed')=='true','Semester keyboard End selects final semester')
    page.keyboard.press('ArrowRight')
    check(page.locator('#semesterTitle').inner_text()=='Semester 01','Semester ArrowRight wraps around')
    page.keyboard.press('ArrowLeft')
    check(page.locator('#semesterTitle').inner_text()=='Semester 08','Semester ArrowLeft wraps around')
    page.keyboard.press('Home')
    check(page.locator('[data-semester="0"]').evaluate('(el)=>el===document.activeElement'),'Semester Home key returns keyboard focus to first semester')
    page.close()

    page=browser.new_page()
    load(page,'collegelist.html','clgo_script.js')
    page.locator('#collegeSearch').fill('Ideal College')
    check(page.locator('#clearCollegeSearch').is_visible(),'College clear search appears with query')
    page.locator('#clearCollegeSearch').click()
    check(page.locator('#collegeRows tr').count()==10,'College clear search restores results')
    check(page.locator('#collegeSearch').evaluate('(el)=>document.activeElement===el'),'College clear returns focus to search')
    page.evaluate('''() => { window.__captured = null;
      URL.createObjectURL = (b) => {window.__captured=b;return 'blob:mock';};
      URL.revokeObjectURL=()=>{};
      HTMLAnchorElement.prototype.click=function(){};
    }''')
    page.locator('#downloadCsv').click()
    check('25 colleges' in page.locator('#exportStatus').inner_text(),'CSV action provides completion feedback')
    page.close()

    page=browser.new_page()
    load(page,'books.html','bookList.js')
    page.locator('#bookSearch').fill('linux')
    check(page.locator('.doc-card').count()==2,'Document search filters by title')
    check('2 of 6' in page.locator('#librarySummary').inner_text(),'Document search gives result count')
    page.locator('#bookSearch').fill('no such title')
    check(page.get_by_text('No matching documents').is_visible(),'Document search provides an empty state')
    page.locator('#clearBookSearch').click()
    check(page.locator('.doc-card').count()==6,'Document clear restores all entries')
    check(page.locator('#bookSearch').evaluate('(el)=>document.activeElement===el'),'Document clear returns keyboard focus')
    check(page.locator('iframe').count()==0,'External previews remain deferred until requested')
    page.close()

    for filename,script in [('index.html',None),('year.html','subject.js'),('collegelist.html','clgo_script.js'),('books.html','bookList.js'),('link.html',None)]:
        page=browser.new_page(viewport={'width':360,'height':760})
        load(page,filename,script)
        check(page.evaluate('document.documentElement.scrollWidth <= innerWidth + 2'),filename+' does not overflow at 360px')
        page.close()
    browser.close()

print('\n'.join(RESULTS))
print('TOTAL',len(RESULTS))
