"use strict";
/*
 * NU-CSE Digital Library
 * Resource data remains in json/book.json. No framework or external API required.
 * Use the native HTML <dialog> for a keyboard-accessible, full-size preview.
 */
(() => {
  const root = document.getElementById('bookList');
  if (!root) return;

  const count = document.getElementById('bookCount');
  const status = document.getElementById('booksStatus');
  const retry = document.getElementById('retryLibrary');
  const search = document.getElementById('bookSearch');
  const category = document.getElementById('bookCategory');
  const sort = document.getElementById('bookSort');
  const clearSearch = document.getElementById('clearBookSearch');
  const reset = document.getElementById('resetBookFilters');
  const summary = document.getElementById('librarySummary');
  const dialog = document.getElementById('bookPreviewDialog');
  const dialogTitle = document.getElementById('previewDialogTitle');
  const closePreview = document.getElementById('closeBookPreview');
  const dialogLink = document.getElementById('previewOpenLink');
  const frameArea = document.getElementById('previewFrameWrap');
  const frameStatus = document.getElementById('previewFrameStatus');

  const TYPES = new Map([
    ['book', 'Book'],
    ['project', 'Project example'],
    ['guide', 'Guide']
  ]);
  let resources = [];
  let loaded = false;
  let activeTrigger = null;
  let previewTimer = null;

  function safeHttpUrl(value) {
    if (typeof value !== 'string') return null;
    try {
      const u = new URL(value.trim());
      return u.protocol === 'https:' ? u : null;
    } catch {
      return null;
    }
  }

  // Drive /preview is an embed URL, not the normal full document viewer.
  // Separate the full-size document action and iframe preview action.
  function documentLinks(raw) {
    const u = safeHttpUrl(raw);
    if (!u) return { open: null, preview: null };
    const isDrive = u.hostname === 'drive.google.com';
    const driveMatch = isDrive && u.pathname.match(/^\/file\/d\/([A-Za-z0-9_-]+)\/(?:view|preview|edit)\/?$/);
    if (!driveMatch) return { open: u.href, preview: null };
    const base = `https://drive.google.com/file/d/${driveMatch[1]}`;
    return { open: `${base}/view`, preview: `${base}/preview` };
  }

  function typeOf(item) {
    return TYPES.has(item.category) ? item.category : 'resource';
  }

  function formatType(item) {
    return TYPES.get(typeOf(item)) || 'Resource';
  }

  function iconSVG() {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.8');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    const paths = ['M7 3.5h7l4 4v13H6a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h1Z', 'M14 3.5v4h4', 'M8.5 12h7', 'M8.5 16h7'];
    paths.forEach(d => {
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', d);
      svg.append(path);
    });
    return svg;
  }

  function addCard(item) {
    const links = documentLinks(item.link);
    const column = document.createElement('div');
    column.className = 'col-md-6 col-xl-4';
    const card = document.createElement('article');
    card.className = 'doc-card';

    const top = document.createElement('div');
    top.className = 'doc-card-top';
    const icon = document.createElement('span');
    icon.className = 'doc-icon';
    icon.append(iconSVG());
    const badge = document.createElement('span');
    badge.className = 'doc-type';
    badge.textContent = formatType(item);
    top.append(icon, badge);

    const heading = document.createElement('h3');
    heading.textContent = item.name || 'Untitled document';
    card.append(top, heading);

    const actions = document.createElement('div');
    actions.className = 'doc-actions';
    if (links.preview) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn btn-primary-hub btn-sm doc-preview-btn';
      button.textContent = 'Preview PDF';
      button.setAttribute('aria-label', 'Preview ' + heading.textContent);
      button.addEventListener('click', () => openDialog(item, links, button));
      actions.append(button);
    }
    if (links.open) {
      const link = document.createElement('a');
      link.className = 'btn btn-outline-hub btn-sm doc-open-link';
      link.href = links.open;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Open file ↗';
      link.setAttribute('aria-label', 'Open ' + heading.textContent + ' in a new tab');
      actions.append(link);
    }
    if (!links.open) {
      const note = document.createElement('p');
      note.className = 'doc-unavailable';
      note.textContent = 'Document link unavailable';
      actions.append(note);
    }
    card.append(actions);
    column.append(card);
    root.append(column);
  }

  function render() {
    if (!loaded) return;
    const query = search.value.trim().toLocaleLowerCase();
    const selectedType = category.value;
    const sorting = sort.value;
    clearSearch.hidden = search.value.length === 0;
    reset.hidden = !query && selectedType === 'all' && sorting === 'default';
    const results = resources.filter(item => {
      const matchesQuery = String(item.name || '').toLocaleLowerCase().includes(query);
      const matchesType = selectedType === 'all' || typeOf(item) === selectedType;
      return matchesQuery && matchesType;
    });
    if (sorting === 'title-asc') results.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    if (sorting === 'title-desc') results.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    summary.textContent = `Showing ${results.length} of ${resources.length} documents`;
    root.replaceChildren();
    if (!results.length) {
      const holder = document.createElement('div');
      holder.className = 'col-12';
      const empty = document.createElement('div');
      empty.className = 'library-empty';
      const title = document.createElement('strong');
      title.textContent = resources.length ? 'No matching documents' : 'No documents are available yet';
      const detail = document.createElement('p');
      detail.textContent = resources.length
        ? 'Try a different title or reset your search and filters.'
        : 'Check back later for books and study materials.';
      empty.append(title, detail);
      if (resources.length) {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-hub btn-sm';
        button.type = 'button';
        button.textContent = 'Reset filters';
        button.addEventListener('click', resetFilters);
        empty.append(button);
      }
      holder.append(empty);
      root.append(holder);
      return;
    }
    results.forEach(addCard);
  }

  function resetFilters() {
    search.value = '';
    category.value = 'all';
    sort.value = 'default';
    render();
    search.focus();
  }

  function removeFrame() {
    if (previewTimer !== null) {
      clearTimeout(previewTimer);
      previewTimer = null;
    }
    frameArea.querySelector('iframe')?.remove();
    frameStatus.hidden = false;
    frameStatus.textContent = 'Loading Google Drive preview…';
  }

  function openDialog(item, links, trigger) {
    if (!links.preview) return;
    activeTrigger = trigger;
    removeFrame();
    dialogTitle.textContent = item.name || 'Untitled document';
    dialogLink.href = links.open;
    dialog.showModal();
    const iframe = document.createElement('iframe');
    iframe.title = 'Google Drive preview: ' + dialogTitle.textContent;
    iframe.referrerPolicy = 'no-referrer';
    iframe.setAttribute('allowfullscreen', '');
    iframe.addEventListener('load', () => {
      if (iframe.isConnected) frameStatus.hidden = true;
      if (previewTimer !== null) clearTimeout(previewTimer);
      previewTimer = null;
    });
    iframe.addEventListener('error', () => {
      frameStatus.hidden = false;
      frameStatus.textContent = 'Preview could not load. Use “Open file” instead.';
    });
    frameArea.append(iframe);
    iframe.src = links.preview;
    previewTimer = setTimeout(() => {
      if (dialog.open && !frameStatus.hidden) {
        frameStatus.textContent = 'Preview is taking longer than expected. You can open the file in a new tab.';
      }
    }, 12000);
  }

  dialog.addEventListener('close', () => {
    removeFrame(); // unload the external Drive iframe; do not consume bandwidth in background
    if (activeTrigger?.isConnected) activeTrigger.focus({ preventScroll: true });
    activeTrigger = null;
  });
  closePreview.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close(); // backdrop click
  });

  function setControlsDisabled(disabled) {
    search.disabled = disabled;
    category.disabled = disabled;
    sort.disabled = disabled;
  }

  async function loadLibrary() {
    loaded = false;
    setControlsDisabled(true);
    retry.hidden = true;
    status.textContent = 'Loading library…';
    count.textContent = 'Loading library…';
    summary.textContent = '';
    root.replaceChildren();
    try {
      const response = await fetch('json/book.json');
      if (!response.ok) throw new Error('Library returned HTTP ' + response.status);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Library format is invalid');
      resources = data.filter(item => item && typeof item === 'object' && !Array.isArray(item))
        .map(item => ({name: typeof item.name === 'string' ? item.name.trim() : '', link: item.link, category: item.category}));
      loaded = true;
      setControlsDisabled(false);
      count.textContent = `${resources.length} documents`;
      status.textContent = '';
      render();
    } catch {
      resources = [];
      count.textContent = 'Library unavailable';
      status.textContent = 'Unable to load the library. Check your connection or run the site from a local web server.';
      retry.hidden = false;
    }
  }

  search.addEventListener('input', render);
  category.addEventListener('change', render);
  sort.addEventListener('change', render);
  clearSearch.addEventListener('click', () => {
    search.value = '';
    render();
    search.focus();
  });
  reset.addEventListener('click', resetFilters);
  retry.addEventListener('click', loadLibrary);
  loadLibrary();
})();
