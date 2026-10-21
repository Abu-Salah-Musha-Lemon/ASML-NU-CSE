"""No-dependency sanity tests for the publishable pages and source data.
Run: python tests/static_checks.py
"""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse,unquote
import json

ROOT=Path(__file__).resolve().parents[1]
PAGES=['index.html','year.html','collegelist.html','books.html','link.html']

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids=[]
        self.local=[]
        self.h1=0
        self.viewport=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'): self.ids.append(a['id'])
        if tag=='h1': self.h1+=1
        if tag=='meta' and a.get('name')=='viewport': self.viewport+=1
        attr = {'a':'href','link':'href','script':'src','img':'src'}.get(tag)
        if attr and a.get(attr):
            url=a[attr]
            if not url.startswith(('http:', 'https:', 'mailto:', 'tel:', 'data:', '#')):
                path=unquote(urlparse(url).path)
                if path: self.local.append(path)

def main():
    passed=0
    for filename in PAGES:
        html=(ROOT/filename).read_text(encoding='utf-8')
        parser=PageParser();parser.feed(html)
        assert not [x for x,n in Counter(parser.ids).items() if n>1],f'duplicate ids in {filename}'
        assert parser.h1==1, f'incorrect headings in {filename}'
        assert parser.viewport==1, f'viewport meta missing {filename}'
        for local in parser.local:
            assert (ROOT/local).is_file(),f'{filename} broken reference: {local}'
        print('PASS page structure & local references:',filename)
        passed+=1
    subjects=json.loads((ROOT/'json/subject.json').read_text(encoding='utf-8'))
    expected=['firstSemester','secondSemester','thirdSemester','fourthSemester','fifthSemester','sixthSemester','seventhSemester','eightSemester']
    assert list(subjects)==expected
    assert all(row.get('theory') and row.get('lab') for groups in subjects.values() for row in groups)
    print('PASS subjects: 8 semesters with populated theory and lab lists');passed+=1
    colleges=json.loads((ROOT/'json/data.json').read_text(encoding='utf-8'))
    assert len(colleges)==25
    assert len({i['id'] for i in colleges})==25
    assert all(i['collegeName'].strip() and isinstance(i['seats'],int) for i in colleges)
    assert all(i['Website'] is None or i['Website'].startswith(('http://','https://')) for i in colleges)
    print('PASS college records: 25 complete records, no fake URLs');passed+=1
    books=json.loads((ROOT/'json/book.json').read_text(encoding='utf-8'))
    assert len(books)==6
    assert all(i['name'] and i['link'].startswith('https://') for i in books)
    print('PASS digital library: six valid URL formats');passed+=1
    print('TOTAL',passed)
if __name__=='__main__':main()
