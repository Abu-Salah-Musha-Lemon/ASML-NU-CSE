from pathlib import Path
from playwright.sync_api import sync_playwright
import os
import json, re
P=Path(__file__).resolve().parents[1]
STYLE=(P/'vendor/bootstrap.min.css').read_text()+'\n'+(P/'style.css').read_text()
BOOTSTRAP=(P/'vendor/bootstrap.bundle.min.js').read_text()
RESULTS=[]

def check(ok,text):
 if not ok: raise AssertionError(text)
 RESULTS.append('PASS '+text)

def load(page,filename,withjs):
 source=(P/filename).read_text()
 source=re.sub(r'<script\s+src=[^>]*></script>','',source)
 source=re.sub(r'<link[^>]*rel="stylesheet"[^>]*>','',source)
 page.set_content(source,wait_until='domcontentloaded')
 page.add_style_tag(content=STYLE)
 page.add_script_tag(content=BOOTSTRAP)
 data={name:json.load(open(P/'json'/name)) for name in ['subject.json','data.json','book.json']}
 page.evaluate('''(data) => { window.fetch = async (url) => ({ok:true,json:async () => data[url.split('/').pop()]}); }''',data)
 page.add_script_tag(content=(P/'script/site.js').read_text())
 if withjs:page.add_script_tag(content=(P/'script'/withjs).read_text())
 page.wait_for_timeout(220)

with sync_playwright() as p:
 b=p.chromium.launch(headless=True, executable_path=os.environ.get('CHROMIUM_PATH') or ('/usr/bin/chromium' if Path('/usr/bin/chromium').exists() else None),args=['--no-sandbox','--disable-dev-shm-usage'])
 for viewport in [{'width':1366,'height':900},{'width':390,'height':844}]:
  page=b.new_page(viewport=viewport)
  label='mobile' if viewport['width']==390 else 'desktop'
  load(page,'index.html',None)
  check(page.locator('h1').count()==1,f'{label}: homepage one H1')
  check(page.locator('.feature-card').count()==4,f'{label}: feature links')
  if label=='mobile':
   menu=page.locator('.navbar-toggler'); menu.click();page.wait_for_timeout(400)
   check(page.locator('#primaryNav').evaluate('(e)=>e.classList.contains("show")'), 'mobile: hamburger toggles navigation')
   check(page.evaluate('document.documentElement.scrollWidth <= innerWidth + 2'),'mobile: homepage no unintended horizontal scroll')
  else:
   check(page.locator('.hero-panel-item').count()==3,'desktop: quick links')
  page.close()

 page=b.new_page(viewport={'width':1280,'height':900})
 load(page,'year.html','subject.js')
 check(page.locator('#theoryList .subject-item').count()==5,'year: first semester theory populated')
 check(page.locator('#labList .subject-item').count()==2,'year: first semester labs populated')
 check(page.locator('#semesterTitle').inner_text()=='Semester 01','year: initial semester title')
 page.locator('[data-semester="7"]').click()
 check(page.locator('#theoryList .subject-item').count()==3,'year: eighth semester theory switch')
 check(page.locator('#labList .subject-item').count()==2,'year: eighth semester lab switch')
 check(page.locator('[data-semester="7"]').get_attribute('aria-pressed')=='true','year: selected semester accessible')
 check(page.locator('.subject-item a[href="Null"]').count()==0,'year: no Null links')
 check(page.locator('.subject-item a[href="#"]').count()==0,'year: no placeholder links')
 page.close()

 page=b.new_page(viewport={'width':1280,'height':900})
 load(page,'collegelist.html','clgo_script.js')
 check(page.locator('#collegeRows tr').count()==10,'colleges: initial 10 rows')
 check('25 of 25 colleges' in page.locator('#resultSummary').inner_text(),'colleges: total count 25')
 page.locator('#nextPage').click()
 check(page.locator('#collegeRows tr').first.locator('td').first.inner_text()=='11','colleges: next page starts record 11')
 page.locator('#prevPage').click()
 check(page.locator('#collegeRows tr').first.locator('td').first.inner_text()=='1','colleges: previous page returns')
 page.locator('#collegeSort').select_option('seats-desc')
 vals=[int(v) for v in page.locator('#collegeRows tr td:nth-child(3)').all_inner_texts()]
 check(vals==sorted(vals,reverse=True),'colleges: seats descending sorting')
 page.locator('#collegeSearch').fill('Ideal College')
 check(page.locator('#collegeRows tr').count()==1,'colleges: search filters correctly')
 check('Ideal College' in page.locator('#collegeRows').inner_text(),'colleges: target shown')
 page.locator('#collegeSearch').fill('xxx never exists')
 check('No colleges match' in page.locator('#collegeRows').inner_text(),'colleges: empty state')
 page.locator('#collegeSearch').fill('')
 page.locator('#collegeSort').select_option('id')
 # trigger CSV and validate generated text from Blob
 page.evaluate('''() => {window.__exportCapture=null; URL.createObjectURL = (blob)=>{window.__exportCapture=blob;return 'blob:mock';};URL.revokeObjectURL=()=>{};HTMLAnchorElement.prototype.click=function() {}; }''')
 page.locator('#downloadCsv').click()
 csv=page.evaluate('async () => await window.__exportCapture.text()')
 check(csv.startswith('"ID","College","Seats"'), 'colleges: CSV has correct header')
 check(csv.count('\r\n')==25,'colleges: CSV includes all 25 rows')
 page.evaluate('''() => { window.__printRows=0; window.print=()=>{window.dispatchEvent(new Event('beforeprint'));window.__printRows=document.querySelectorAll('#collegeRows tr').length;window.dispatchEvent(new Event('afterprint'));};}''')
 page.locator('#printTable').click()
 check(page.evaluate('window.__printRows')==25,'colleges: printing all 25 filtered rows, not 10')
 check(page.locator('#collegeRows tr').count()==10,'colleges: table restored after printing')
 page.close()

 page=b.new_page(viewport={'width':1200,'height':820})
 load(page,'books.html','bookList.js')
 check(page.locator('.doc-card').count()==6,'books: six documents loaded')
 check(page.locator('iframe').count()==0,'books: previews lazy-load by default')
 page.locator('.doc-preview-btn').first.click()
 page.wait_for_timeout(250)
 check(page.locator('#bookPreviewDialog').evaluate('(e)=>e.open'),'books: preview dialog opens')
 check(page.locator('iframe').count()==1,'books: opening preview mounts iframe')
 page.locator('#closeBookPreview').click()
 page.wait_for_function('document.querySelector("#previewFrameWrap iframe") === null')
 check(page.locator('iframe').count()==0,'books: closing preview unloads iframe')
 check(page.locator('.doc-card a[target="_blank"]').count()==6,'books: direct open links')
 page.close()

 page=b.new_page(viewport={'width':1280,'height':900})
 load(page,'link.html',None)
 check(page.locator('.official-link').count()==8,'links: eight official portal links carried across')
 check(page.locator('.official-link[href^="http"]').count()==8,'links: external URLs remain')
 page.close()
 for filename,logic in [('year.html','subject.js'),('collegelist.html','clgo_script.js'),('books.html','bookList.js'),('link.html',None)]:
  mobile=b.new_page(viewport={'width':390,'height':844})
  load(mobile,filename,logic)
  check(mobile.evaluate('document.documentElement.scrollWidth <= innerWidth + 2'), f'mobile: {filename} has no page-wide horizontal overflow')
  mobile.close()
 # Fetch failure must create an explicit, user-readable fallback rather than a blank page.
 fail=b.new_page()
 source=(P/'books.html').read_text()
 source=re.sub(r'<script\s+src=[^>]*></script>','',source)
 source=re.sub(r'<link[^>]*rel="stylesheet"[^>]*>','',source)
 fail.set_content(source)
 fail.evaluate('() => { window.fetch = () => Promise.reject(new Error("offline")); }')
 fail.add_script_tag(content=(P/'script/bookList.js').read_text())
 fail.wait_for_timeout(50)
 check('Unable to load' in fail.locator('#booksStatus').inner_text(),'books: fetch errors shown to visitors')
 fail.close()
 b.close()
print('\n'.join(RESULTS))
print('TOTAL',len(RESULTS))
