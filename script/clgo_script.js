"use strict";
(() => {
  const tbody = document.getElementById('collegeRows');
  if (!tbody) return;
  const search = document.getElementById('collegeSearch');
  const sort = document.getElementById('collegeSort');
  const results = document.getElementById('resultSummary');
  const range = document.getElementById('rangeSummary');
  const prev = document.getElementById('prevPage');
  const next = document.getElementById('nextPage');
  const clearSearch = document.getElementById('clearCollegeSearch');
  const exportStatus = document.getElementById('exportStatus');
  const pageSize = 10;
  let records = [], filtered = [], page = 0;
  function getFiltered() {
    const q = search.value.toLowerCase().trim();
    filtered = records.filter(r => [r.collegeName, r.address, r.seats, r.id].some(v => String(v ?? '').toLowerCase().includes(q)));
    filtered.sort((a,b) => {
      if (sort.value === 'name') return String(a.collegeName).trim().localeCompare(String(b.collegeName).trim());
      if (sort.value === 'seats-desc') return Number(b.seats) - Number(a.seats) || a.id - b.id;
      if (sort.value === 'seats-asc') return Number(a.seats) - Number(b.seats) || a.id - b.id;
      return Number(a.id) - Number(b.id);
    });
  }
  function makeCell(tr, value) {
    const td = document.createElement('td');
    td.textContent = String(value ?? '—').trim();
    tr.append(td);
    return td;
  }
  function draw() {
    getFiltered();
    clearSearch.hidden = !search.value;
    page = Math.min(page, Math.max(0, Math.ceil(filtered.length / pageSize) - 1));
    const start = page * pageSize;
    const visible = filtered.slice(start, start + pageSize);
    tbody.replaceChildren();
    visible.forEach(item => {
      const tr = document.createElement('tr');
      makeCell(tr, item.id);
      makeCell(tr, item.collegeName);
      makeCell(tr, item.seats);
      makeCell(tr, item.address);
      const cell = document.createElement('td');
      if (typeof item.Website === 'string' && /^https?:\/\//i.test(item.Website)) {
        const a = document.createElement('a');
        a.href = item.Website;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = 'Visit ↗';
        a.setAttribute('aria-label', 'Visit website: ' + String(item.collegeName));
        cell.append(a);
      } else cell.textContent = 'Not listed';
      tr.append(cell);
      tbody.append(tr);
    });
    if (!visible.length) {
      const tr = document.createElement('tr'), td = document.createElement('td');
      td.colSpan = 5;td.className = 'text-center py-5 text-muted';td.textContent = 'No colleges match your search.';tr.append(td);tbody.append(tr);
    }
    results.textContent = filtered.length + ' of ' + records.length + ' colleges';
    range.textContent = filtered.length ? `Showing ${start + 1}–${start + visible.length} of ${filtered.length}` : 'No results';
    prev.disabled = page === 0;
    next.disabled = start + pageSize >= filtered.length;
  }
  function escapeCSV(value) {
    // Prevent spreadsheet formula injection in CSV exported from user-maintained JSON.
    let safe = String(value ?? '');
    if (/^[\s]*[=+@-]/.test(safe)) safe = '\'' + safe;
    return '"' + safe.replace(/"/g, '""') + '"';
  }
  function download() {
    const rows = [['ID','College','Seats','Address','Website'], ...filtered.map(r => [r.id,r.collegeName,r.seats,r.address,r.Website])];
    const content = '\uFEFF' + rows.map(r => r.map(escapeCSV).join(',')).join('\r\n');
    const blob = new Blob([content], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');a.href = url;a.download = 'nu-cse-colleges.csv';document.body.append(a);a.click();a.remove();setTimeout(() => URL.revokeObjectURL(url), 1000);
    exportStatus.textContent = `CSV prepared for ${filtered.length} college${filtered.length === 1 ? '' : 's'}.`;
  }
  search.addEventListener('input', () => {page = 0;draw();});
  clearSearch.addEventListener('click', () => {search.value = '';page = 0;draw();search.focus();});
  sort.addEventListener('change', () => {page = 0;draw();});
  prev.addEventListener('click', () => {if (page > 0){page--;draw();}});
  next.addEventListener('click', () => {if ((page + 1)*pageSize < filtered.length){page++;draw();}});
  document.getElementById('downloadCsv').addEventListener('click', download);
  // beforeprint handles both our Print button and browser Ctrl+P.
  // Keep the complete filtered set in the DOM until the print dialog closes.
  window.addEventListener('beforeprint', () => {
    tbody.replaceChildren();
    filtered.forEach(item => {
      const tr = document.createElement('tr');
      [item.id, item.collegeName, item.seats, item.address, item.Website || 'Not listed'].forEach(v => makeCell(tr, v));
      tbody.append(tr);
    });
    if (!filtered.length) {
      const tr = document.createElement('tr'), td = document.createElement('td');
      td.colSpan = 5;td.textContent = 'No matching colleges';tr.append(td);tbody.append(tr);
    }
  });
  window.addEventListener('afterprint', draw);
  document.getElementById('printTable').addEventListener('click', () => window.print());
  fetch('json/data.json')
    .then(response => {if (!response.ok) throw new Error('HTTP ' + response.status);return response.json();})
    .then(data => {if (!Array.isArray(data)) throw new Error('Malformed data');records = data;draw();})
    .catch(() => {tbody.innerHTML = '<tr><td colspan="5">Unable to load the college directory. Run the website from a web server and try again.</td></tr>';results.textContent = 'Directory unavailable';range.textContent = '';});
})();
