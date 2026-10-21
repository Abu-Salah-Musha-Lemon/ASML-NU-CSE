# Night Mode and Smooth Transitions (v4)

## How it works
- The header includes a keyboard-accessible Night mode / Day mode button on every page.
- The preference is saved to `localStorage` under `nu-cse-theme` (`light` or `dark`).
- On the first visit with no explicit preference, the page follows the OS `prefers-color-scheme` preference, including later changes.
- The small inline script in each document `<head>` sets the mode **before the stylesheet renders**, preventing a white flash.
- `script/site.js` updates the toggle's readable name, `aria-pressed`, button text and the mobile browser theme-color.
- The toggle continues to work if storage is blocked in a private window.
- Color variables and dark component overrides live in `style.css`. The cyan accent remains `#00BCEB`; dark surfaces are navy/blue-gray.

## Motion principles
- Short (180–440ms) native CSS ease animations for cards, the hero, dialogs and selected resource items.
- Hover feedback uses a slight elevation, never transforms that alter layout.
- Supported browsers get same-origin document `@view-transition`, with graceful fallback.
- `prefers-reduced-motion: reduce` turns off entrance animations, transition motion and smooth scrolling.
- Buttons remain usable mid-animation. Pages do not wait for animations before loading content.

## Run locally
Run `python -m http.server 8000` from this folder, then visit `http://localhost:8000`.
Avoid `file://` because JSON data is fetched asynchronously.

## Test
`python tests/theme_motion_regression.py` (requires Python Playwright and Chromium).
Additional original tests under `tests/` remain available.

## Notes
- The Google Drive files are hosted by external owners. Theme and motion changes do not modify their access permissions.
- Legacy archived pages were preserved unchanged.
