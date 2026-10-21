# NU–CSE Student Hub — Code Audit and QA Report

**Audit date:** 21 October 2026  
**Source:** User-provided `ASML-NU-CSE-main.zip`  
**Delivered:** Revised, portable static website, with updated features and preserved source data.

## Summary

The original contained five main website pages, three JSON data collections, legacy test pages, and mixed-version Bootstrap dependencies. The revised site retains the original core resource types and makes browsing, directory lookup, and documents easier to use. It is substantially more consistent in UI/UX, but cannot be called fully production-verified until external links and academic data are checked.

## Defects and changes

| Finding | Impact | Resolution |
| --- | --- | --- |
| Bootstrap 4 and Bootstrap 5, multiple copies of jQuery and overlapping CSS assets | Unstable collapses, potential plugin conflicts, large load footprint | Replaced with **one locally bundled Bootstrap 5.3.6** CSS/JS set, MIT notice included. |
| Semester accordions mixed Bootstrap 4 and 5 data attributes, duplicate IDs | Buttons may not open reliably | Replaced nested accordion complexity with a straightforward **eight-semester selector**, using one JSON fetch. |
| Repeated subject JSON requests (16 fetches) | Extra bandwidth and duplicated logic | Single request; dynamic rendering for theory, lab, resources and missing-link states. |
| Books page reused `accordionExample` ID and loaded every preview immediately | Confusing collapse target and unnecessary remote loading | Six document cards; previews loaded on demand using `<details>` and lazy iframe; direct links retained. |
| College data could be inserted after DataTables initialization | Inconsistent search and export results | Native searchable, sortable, paginated directory, independent of jQuery/DataTables. |
| College data included an empty 26th row | Shows fake institution and seat count | Removed from the public list; original invalid entry preserved at `archive/legacy/incomplete_college_record.json`. |
| Tejgaon College linked to Shaikh Burhanuddin Post Graduate College's site | Misleading college navigation | Removed the clearly incorrect destination (`Website: null`) until verified; not replaced with an unverified URL. |
| "null" website strings | Dead outgoing links | Normalized to JSON `null`, shown as "Not listed." |
| An empty "Project Paper" link | Dead button | Removed while preserving the functioning project-proposal folder. |
| Dynamic injection of `<head>`, navigation and footer; wrong active-state timing | Layout flashes, delayed metadata, unreliable navigation | All five public pages now contain proper inline metadata, consistent accessible nav/footer and titles. |
| Right-click and keyboard shortcuts blocked | Poor accessibility without meaningful IP protection | Removed input restrictions. |
| Invalid font declarations, inconsistent visual system | Unprofessional appearance | Rebuilt style layer with consistent spacing, typography, colors, hover and focus states, and mobile breakpoints. |
| External dependency for all visual framework resources | Failure when CDNs are unreachable | Bundled Bootstrap assets locally. External content documents still require online access. |
| Unused legacy source and test pages mixed with production pages | Confusing directory structure | Kept prototypes under `archive/legacy/`, away from primary navigation. |

## Features in the revised site

**Homepage** — responsive hero, quick-access navigation, four feature cards and clear site identity.  
**Semester resources** — eight selectable semesters, theory/lab lists, question banks and notes, current selection state, usable empty/loading/error states and archived syllabus references.  
**College directory** — 25 meaningful records, keyword search, four sort modes, 10-per-page pagination, filtered CSV download and print-all-filtered-data support (browser Save as PDF).  
**Digital library** — six documents, accessible expand-to-preview, on-demand iframe, direct-open links.  
**Important links** — eight original service references in clearly named cards, with links preserved from the original.  
**Global** — responsive navigation, focus styles, skip-to-content, semantic page structure, no right-click restrictions, no analytics/tracking code.

## QA test coverage and results

- **38 automated Chromium DOM-interaction assertions passed**, using Playwright, the actual page JavaScript and the source JSON returned via test-mocked `fetch()`. Included mobile viewport testing at 390px wide. See `tests/interactive_smoke.py`.
- **8 structural/data integrity checks passed:** HTML IDs, metadata, one H1 per main page, local asset references, and all three JSON datasets. See `tests/static_checks.py`.
- **JavaScript syntax checks passed:** all four production `script/*.js` checked using `node --check`.
- **Static HTTP asset checks passed:** HTML, Bootstrap CSS/JS, all three JSON files and local logo returned HTTP 200 from a local Python file server.
- **Screenshots manually reviewed** for desktop home, semester and directory layout. No major layout issue identified.

### Scope limitations (important)

- This environment blocked browser navigation to local test servers and public websites. Browser interaction testing was performed using page HTML loaded into Chromium with local CSS/JS injected, and project JSON supplied by a mocked `fetch` response. **This is functional DOM testing, not a production-site end-to-end test.** Local HTTP availability was independently confirmed outside the browser.
- **External destinations are unverified:** National University, college, and Google Drive links may have changed, deny access or disable inline preview.
- Student-admission advice, seat counts and the 2017–2018 syllabus need confirmation with primary institutional sources before being presented as current policy.
- Only Chromium-based interactive testing was performed, not Firefox, Safari or physical-device testing.
- CSV creation and print DOM behavior were tested; actual operating-system file downloads and real print/PDF dialogs were not exercised.
- This is a static website, with no backend, authentication, database or admin-panel editing capability.

## Professional readiness assessment

| Dimension | Assessment |
| --- | --- |
| Interface consistency | Good for a student portal; systematic layout, responsive cards, clear action hierarchy. |
| Primary features | Implemented and exercised through browser DOM tests. |
| Accessibility | Improved semantics, active states, keyboard focus and skip-to-content; **no formal WCAG audit**. |
| Maintainability | Simple and dependency-light; JSON-backed content. Header/footer repeated in five files remain a maintenance trade-off. |
| Content correctness | **Needs verification**; old admissions data and external links carry publishing risk. |
| Release status | **Ready for user review and staging**, not independently verified for a public production deployment. |

## Prioritized next steps

1. **Verify official content** — recheck college accreditation/eligibility, seat figures, outdated service URLs, broken file shares and copyright permission. The original `json/data.json` linked Tejgaon College to another institution, while `Mohammadpur Central College` has an unverified `mkc.edu.bd` destination. Confirm these manually rather than guessing.
2. **Introduce a content-maintenance workflow** — version syllabus files by year/intake, add a last-verified date for records and make stale items visible.
3. **Add continuous link and deployment checks** — automate JSON validation and smoke testing on every GitHub pull request (GitHub Actions) and perform a staging review on real desktop/mobile devices.
4. **Optional feature roadmap** — bilingual Bangla/English UI, unified search across resources, and a controlled editor/admin interface when nontechnical contributors need to update data regularly.

## Reproduce tests

From the website root:

```bash
python tests/static_checks.py
node --check script/site.js
node --check script/subject.js
node --check script/clgo_script.js
node --check script/bookList.js
```

For interactive DOM tests, install Playwright and Chromium, then run:

```bash
python -m pip install playwright
python -m playwright install chromium
python tests/interactive_smoke.py
```

**Start the actual site** with `python -m http.server 8000` and visit `http://localhost:8000` in your own browser for an end-to-end manual check. If deploying to GitHub Pages, keep the project files at the published site root and use the appropriate repository settings.

---

## Design Refresh v2 — 60–30–10 and UX Golden Rules

The website has been updated again based on the original user's requested colors and shadows: `#F4F2EE`, `#00BCEB`, and a softened `rgba(9,30,66)` elevation system. The major background/structural/accent balance follows the **visual intent** of 60–30–10, not a literal pixel measurement.

### New or refined

- Shared color tokens, accessible accent-ink text, focus rings, reduced-motion support and consistent elevations.
- SVG feature and official-service icons replace emoji/inconsistent external-link badges.
- Breadcrumbs, better spacing, stronger active buttons and mobile polish.
- Semester Arrow/Home/End keyboard selection, hashed links and visible counts.
- College search clear/reset button and CSV status feedback. CSV cell escaping now mitigates formula injection.
- Document title search with live results, clear/reset and descriptive no-results state.
- Existing resource data and official URLs remain preserved; no claims of live document availability.

### Automated verification

- `tests/static_checks.py`: **8 passed**.
- `tests/interactive_smoke.py`: **38 passed**.
- `tests/ui_design_checks.py`: **32 passed**.
- **78 assertions passed in total**, plus JavaScript syntax checks.
- Chromium mock-data visual inspection: desktop 1440px and mobile 390px across all five pages; no page-wide horizontal overflow. Additional checks at 360px.

### Limits / production risks

The browser test environment disallows HTTP loopback (`ERR_BLOCKED_BY_ADMINISTRATOR`), so the browser uses injected HTML/CSS/JS and mocked JSON. The website has **not** received a live-host deployment smoke test. External links and file permissions were not validated; admissions, seats and the legacy syllabus may be outdated. Verify these before publishing. A complete WCAG conformance audit (assistive-tech users, screen readers, and production-host testing) was not performed.


---

## v3 Library fix – 21 October 2026

### Issues addressed

1. **Unusable inline PDF preview:** Each card originally expanded a 440px-high iframe inside a 1/3-width desktop column, distorting the grid. Replaced with one responsive, native modal preview for the whole page.
2. **Unreleased hidden previews:** Inline iframes stayed in the DOM after `details` was closed. The modal iframe is now removed on every dismissal to stop unnecessary background loads.
3. **Misleading direct action:** Original `/preview` URLs were used for “Open document.” Recognized Google Drive file URLs are now normalized to `/view` for the full document, and `/preview` only for embeds; original Drive file IDs are intact.
4. **Poor discovery:** Added explicit Book / Project example / Guide classification, combined search & filter, title sorting and reset actions.
5. **Missing recovery action:** Added a retry button and disabled controls during fetch failure/loading. Empty catalog, no-match and invalid-link states are handled separately.
6. **Accessibility and mobile quality:** Native `<dialog>` supports Escape, close, backdrop dismissal, labelled iframe, safe focus restoration and a larger responsive preview. Mobile width checks cover 360/390px, tablet 768px and desktop 1280px.

### Local verification

- `tests/static_checks.py`: **8 passed**.
- `tests/interactive_smoke.py`: **40 passed** (updated to cover modal open/unload).
- `tests/ui_design_checks.py`: **32 passed**.
- `tests/library_regression.py`: **57 passed**, including search/filter/sort, document links, modal lifecycle, error/retry states, invalid inputs, and viewport overflow.
- JavaScript syntax and JSON syntax validated.

**Important limits:** Chromium was run using injected local markup and mocked `fetch` responses: the test environment blocks browser requests to loopback HTTP. Real deployment, external Google Drive preview permissions and file availability have not been verified. `iframe` load events alone cannot guarantee that Google Drive granted file access. Do not claim the links are confirmed working until checked while deployed.
