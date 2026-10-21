# NU–CSE Student Hub

A lightweight, responsive, static website for CSE students of Bangladesh National University. The site is an **independent student resource**, not an official university service.

## Features

- Home: quick links to academic resources, colleges, library, official services.
- Semester resources: eight semesters, theory and lab material, syllabus links, and project templates. Uses `json/subject.json`.
- College directory: text search, seat/name sorting, 10-per-page navigation, CSV export, browser print / Save as PDF. Uses `json/data.json`.
- Digital library: six documents, title search, type filters, A–Z/Z–A sorting, retry/empty states, and accessible large-screen Google Drive preview dialog. Uses `json/book.json`.
- Important links: official service URLs from the original project (must be reverified periodically).
- Responsive, accessible navigation, visible focus, skip-to-content, active navigation states, and friendly loading/failure messages.
- Day/night theme switcher on every page (saved preference, first-visit OS theme), smooth transitions, and reduced-motion support.

## Run locally

The site is **static** and does not use npm or a build system. Start a local server in this folder (opening pages with `file://` can block JSON loading):

```bash
python -m http.server 8000
```

Then open http://localhost:8000/ or deploy the folder to GitHub Pages. Bootstrap CSS and JS are stored in `vendor/` so the site does not rely on a CDN to display or interact with the layout. External Google Drive links still require internet access and access permissions.

## Update content

- `json/subject.json` — semester/subject names and study links. The code accepts HTTPS links; unavailable links should be `null` or omitted.
- `json/data.json` — colleges, seats, addresses, and website links. Entries may be outdated; verify externally before updating.
- `json/book.json` — each resource includes `name`, HTTPS `link`, and `category` (`book`, `project`, or `guide`). The Library uses the appropriate `/view` link for opening a Drive document and `/preview` for the embedded modal. New HTTPS non-Drive links are opened externally without an unsafe iframe.
- `link.html` — official service links (site content is hand-authored HTML).
- `style.css` — design tokens and responsive styles.
- `script/subject.js`, `script/clgo_script.js`, `script/bookList.js` — functional pages.
- `script/site.js` — global active navigation state, stored appearance preference, and night-mode button.
- Common header and footer are embedded into each of the five production HTML pages to avoid async content shifts; update each page consistently if navigation changes.
- Older prototypes from the uploaded ZIP are preserved in `archive/legacy/` and are not part of the current site navigation.

## Quality and privacy

- No tracking, cookies, logins, or unnecessary right-click restrictions.
- College and academic reference links have **not** been validated against their external live destinations; reconfirm before publishing admission-related claims.
- PDF previews may be blocked by content owners; the direct document link remains available.
- Browser print allows users to choose “Save as PDF”; it does not generate a PDF directly in JavaScript.
- Bootstrap 5.3.6 is supplied under the MIT license; see `vendor/NOTICE.md`.

## Production checklist

1. Review college listings and remove outdated institutions/seat counts.
2. Verify document rights and Google Drive sharing settings.
3. Confirm the syllabus version for the intended intake/batch.
4. Verify official service URLs and migrate `http://` links where the service supports HTTPS.
5. If institutional branding is used, confirm permission and add an official/unofficial disclaimer prominently.

## Testing

Run `python tests/static_checks.py` for built-in data/HTML checks. For browser-logic tests, install Python Playwright and Chromium and run `python tests/interactive_smoke.py`. These tests use mocked local JSON fetches because some environments block browser network access. They are not a substitute for deploying and testing on a real host.

See `QA_REPORT.md` for tested features, resolved issues, and limitations.

## v2 professional design refresh

- Original warm canvas `#F4F2EE`, original cyan `#00BCEB`, navy contrast, and restrained original-style blue-gray layered shadows.
- 60–30–10 visual color balance and Shneiderman's Eight Golden Rules.
- Unified SVG iconography, breadcrumb navigation, component styling, responsive layouts, and keyboard focus states.
- Added reversible college search and searchable document library, with informative status and empty states.
- Semester keyboard shortcuts: arrows for next/previous; Home/End for first/last semester.

See **`DESIGN_SYSTEM.md`** for color tokens, golden-rule implementation, detailed decisions, future-feature priorities, and accessibility limitations.

### Extra UI regression checks

```bash
python tests/ui_design_checks.py
```

This command tests the new design tokens, color contrast, links/icon structure, breadcrumbs, keyboard semester controls, library and college filtering/reset, export feedback, and 360px viewport overflow. It uses Python Playwright and Chromium in the same way as `tests/interactive_smoke.py`.

## v3 Library stability and usability fix (October 2026)

The Library uses a single accessible native `<dialog>` for optional PDF previews instead of embedding iframes inside narrow document cards. The dialog supports a close button, Escape and clicking its backdrop. The external iframe is **created on demand and removed when the preview closes**. Browser focus returns to the relevant preview button. Some Google Drive owners disallow embedding or require login: a direct **Open file** link is always provided where the source URL is valid.

Other improvements: book/project/guide filters, combined title search, title ordering, clear/reset actions, more readable equal-height cards, explicit loading/empty/error states, and an in-page retry button. Categories were added to existing entries in `json/book.json`; all original six Google Drive file IDs are unchanged.

Run the focused UI tests:

```bash
python tests/library_regression.py
```

The browser test suite simulates the JSON response inside Chromium because loopback HTTP traffic is restricted in the development/testing environment. Deploy to a staging URL and verify Google Drive file sharing and real-browser document previews separately before release.

## v4 Smooth transitions and Night Mode (October 2026)

Every main page has a keyboard-accessible night/day toggle in the navigation. The chosen theme persists between pages and visits through `localStorage`; if no theme was chosen, the OS light/dark preference is followed. A small inline initializer applies the correct mode before the stylesheet to prevent white flashes.

Short CSS transitions cover cards, interactions, dialogs, and optionally page-to-page navigation (supported browsers only); `prefers-reduced-motion` disables these effects. Colors, shadows, and warm-neutral day theme remain consistent with the original project.

```bash
python tests/theme_motion_regression.py
```

See `NIGHT_MODE_AND_MOTION.md` and `THEME_QA_REPORT.md` for implementation details and tested scope.
