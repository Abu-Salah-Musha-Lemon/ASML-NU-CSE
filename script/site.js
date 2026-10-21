"use strict";
// Highlight the current page after the DOM is available. No external libraries required.
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-header .nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});


// Color-mode control: persists the explicit choice and synchronizes all pages.
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  const label = toggle.querySelector('.theme-label');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const media = window.matchMedia?.('(prefers-color-scheme: dark)');
  const storageKey = 'nu-cse-theme';
  let savedPreference = false;
  let transitionTimer = null;
  try { savedPreference = ['dark', 'light'].includes(localStorage.getItem(storageKey)); } catch (_) {}

  function applyTheme(theme, animated = false) {
    if (transitionTimer !== null) clearTimeout(transitionTimer);
    if (animated && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theme-transitions');
      transitionTimer = setTimeout(() => {
        root.classList.remove('theme-transitions');
        transitionTimer = null;
      }, 360);
    } else {
      root.classList.remove('theme-transitions');
    }
    const dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    root.setAttribute('data-bs-theme', dark ? 'dark' : 'light');
    toggle.setAttribute('aria-pressed', String(dark));
    const next = dark ? 'Switch to day mode' : 'Switch to night mode';
    toggle.setAttribute('aria-label', next);
    toggle.title = next;
    label.textContent = dark ? 'Day mode' : 'Night mode';
    if (themeMeta) themeMeta.setAttribute('content', dark ? '#0b1726' : '#102d52');
  }

  applyTheme(root.dataset.theme);
  toggle.addEventListener('click', function () {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    savedPreference = true;
    try { localStorage.setItem(storageKey, next); } catch (_) {} // Private browsing still works.
    applyTheme(next, true);
  });
  // Respect OS changes only before the visitor makes an explicit choice.
  if (media) {
    media.addEventListener?.('change', event => {
      if (!savedPreference) applyTheme(event.matches ? 'dark' : 'light', true);
    });
  }
}());
