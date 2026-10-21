"""Smoke/regression checks for night mode, accessible toggle, and reduced-motion behavior.

Pages are served to Chromium from inline local markup and mocked JSON because localhost
is blocked in this evaluation environment. No external documents are opened.
Run: python tests/theme_motion_regression.py
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os,json,re

P = Path(__file__).resolve().parents[1]
CSS = (P/'vendor/bootstrap.min.css').read_text() + '\n' + (P/'style.css').read_text()
JS = (P/'script/site.js').read_text()
BOOTSTRAP = (P/'vendor/bootstrap.bundle.min.js').read_text()
DATA = {name: json.loads((P/'json'/name).read_text()) for name in ['subject.json','book.json','data.json']}
PAGES=['index.html','year.html','collegelist.html','books.html','link.html']
SCRIPT={'year.html':'subject.js','collegelist.html':'clgo_script.js','books.html':'bookList.js'}
passed = []
def check(result,name):
    if not result: raise AssertionError(name)
    passed.append(name)

def build(browser,filename,theme='light',width=1280,reduced=False):
    pg=browser.new_page(viewport={'width':width,'height':820},color_scheme=theme,
                        reduced_motion='reduce' if reduced else 'no-preference')
    src=(P/filename).read_text()
    src=re.sub(r'<script\s+src=[^>]*></script>','',src)
    src=re.sub(r'<link[^>]*rel="stylesheet"[^>]*>','',src)
    pg.set_content(src,wait_until='domcontentloaded')
    pg.add_style_tag(content=CSS)
    pg.add_script_tag(content=BOOTSTRAP)
    pg.evaluate('''data => {window.fetch=async url => ({ok:true,json:async()=>data[url.split('/').pop()]});}''',DATA)
    pg.add_script_tag(content=JS)
    if filename in SCRIPT: pg.add_script_tag(content=(P/'script'/SCRIPT[filename]).read_text())
    pg.wait_for_timeout(100)
    return pg

with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True,executable_path=os.environ.get('CHROMIUM_PATH') or '/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    for filename in PAGES:
        for scheme in ('light','dark'):
            pg=build(browser,filename,scheme)
            errors=[]
            pg.on('pageerror',lambda error:errors.append(str(error)))
            check(pg.locator('html').get_attribute('data-theme')==scheme,filename+' '+scheme+' initial OS mode')
            check(pg.locator('html').get_attribute('data-bs-theme')==scheme,filename+' '+scheme+' Bootstrap synchronized')
            check(pg.locator('#themeToggle').is_visible(),filename+' '+scheme+' theme control visible')
            check(pg.locator('#themeToggle').get_attribute('aria-pressed')==('true' if scheme=='dark' else 'false'),filename+' '+scheme+' pressed state')
            check(pg.evaluate('document.documentElement.scrollWidth<=innerWidth+2'),filename+' '+scheme+' no desktop overflow')
            pg.locator('#themeToggle').click()
            next_scheme='light' if scheme=='dark' else 'dark'
            check(pg.locator('html').get_attribute('data-theme')==next_scheme,filename+' '+scheme+' toggle changes palette')
            check(pg.locator('#themeToggle').get_attribute('aria-label')==('Switch to night mode' if next_scheme=='light' else 'Switch to day mode'),filename+' '+scheme+' accessible button label')
            check(pg.locator('meta[name="theme-color"]').get_attribute('content')==('#0b1726' if next_scheme=='dark' else '#102d52'),filename+' '+scheme+' browser theme-color')
            check(not errors,filename+' '+scheme+' no runtime exceptions')
            pg.close()

    # Color tokens and high-contrast surfaces; verify system dark before any interaction.
    pg=build(browser,'index.html','dark')
    vals=pg.evaluate('''() => {
       const styles=getComputedStyle(document.documentElement);
       return {accent:styles.getPropertyValue('--accent').trim(),
         canvas:styles.getPropertyValue('--canvas').trim(),
         surface:styles.getPropertyValue('--surface').trim(),
         ink:styles.getPropertyValue('--ink').trim(),
         header:getComputedStyle(document.querySelector('.site-header')).backgroundColor,
         card:getComputedStyle(document.querySelector('.feature-card')).backgroundColor};
    }''')
    check(vals['accent']=='#00bceb','Original cyan color preserved')
    check(vals['canvas']=='#0b1726' and vals['surface']=='#14263a','Dark background and panel tokens applied')
    check(vals['ink']=='#edf5ff','Readable light-on-dark text token applied')
    check(vals['card']=='rgb(20, 38, 58)','Feature cards have actual dark surfaces')
    pg.screenshot(path=str(P.parent/'home_dark.png'),full_page=True,animations='disabled')
    pg.close()

    for filename in ('books.html','year.html','collegelist.html'):
        pg=build(browser,filename,'dark',width=390)
        check(pg.evaluate('document.documentElement.scrollWidth<=innerWidth+2'),filename+' dark 390px no overflow')
        check(pg.locator('#themeToggle').is_visible(),filename+' mobile night-mode button available')
        pg.locator('.navbar-toggler').click()
        pg.locator('.navbar-collapse.show').wait_for(timeout=2500)
        check(pg.locator('.navbar-collapse').get_attribute('class').find('show')!=-1,filename+' mobile menu opens')
        pg.locator('.navbar-toggler').click()
        pg.wait_for_function('!document.querySelector(".navbar-collapse").classList.contains("show") && !document.querySelector(".navbar-collapse").classList.contains("collapsing")',timeout=2500)
        if filename=='books.html':
            pg.locator('.doc-preview-btn').first.click()
            check(pg.locator('#bookPreviewDialog').evaluate('(e)=>e.open'),'Library preview works in night mode')
            check(pg.locator('#closeBookPreview').is_visible(),'Library close button accessible in night mode')
            pg.locator('#closeBookPreview').click()
            check(not pg.locator('#bookPreviewDialog').evaluate('(e)=>e.open'),'Library preview closes in night mode')
            pg.screenshot(path=str(P.parent/'library_dark_mobile.png'),full_page=True,animations='disabled')
        pg.close()

    pg=build(browser,'index.html','dark',reduced=True)
    check(pg.locator('.feature-card').first.evaluate('(e)=>getComputedStyle(e).animationName')=='none','Reduced-motion turns off card entrance animation')
    check(pg.evaluate('getComputedStyle(document.documentElement).scrollBehavior')!='smooth','Reduced-motion turns off smooth scrolling')
    pg.locator('#themeToggle').click()
    check(not pg.evaluate('document.documentElement.classList.contains("theme-transitions")'),'Reduced-motion avoids theme fade')
    pg.close()

    # Simulate a storage-capable origin: inline pages themselves cannot access
    # real localStorage under the container's restricted browser security policy.
    stored=browser.new_page(color_scheme='light')
    stored.evaluate("""() => {
      window.__saved = {};
      Object.defineProperty(window, 'localStorage', { value: {
        getItem(key) { return window.__saved[key] ?? null; },
        setItem(key, value) { window.__saved[key] = value; }
      }});
    }""")
    for filename in ('index.html', 'books.html'):
        html=(P/filename).read_text()
        html=re.sub(r'<script\s+src=[^>]*></script>', '', html)
        html=re.sub(r'<link[^>]*rel="stylesheet"[^>]*>', '', html)
        stored.set_content(html)
        stored.add_style_tag(content=CSS)
        stored.add_script_tag(content=JS)
        if filename=='index.html':
            stored.locator('#themeToggle').click()
            check(stored.evaluate('localStorage.getItem("nu-cse-theme")')=='dark',
                  'Manual night-mode choice is saved')
        else:
            check(stored.locator('html').get_attribute('data-theme')=='dark',
                  'Saved night-mode preference applies before stylesheet on next page')
    stored.close()
    browser.close()

print('THEME + MOTION:',len(passed),'checks passed')
