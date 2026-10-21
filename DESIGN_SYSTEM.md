# NU–CSE UI / UX Design System (v2)

This guide documents the redesign of the static NU–CSE Student Hub. It retains the **original project's cyan, warm canvas, and blue-gray shadow character**, rather than introducing an unrelated palette. The new styling is centralized in `style.css` for maintainability.

## 1. 60–30–10 Color Rule

This is a **visual composition guideline**, not a computed measurement of every pixel. Images, typography, and overlapping surfaces make a pixel-exact ratio impractical.

| Role | Approx. visual weight | Token / color | Main purpose |
|---|---|---|---|
| Primary / neutral (60%) | Dominant background and negative space | `--canvas: #F4F2EE`, `--surface: #FFFFFF` | Readability, spacious layout, reduced visual noise |
| Secondary / structural (30%) | Primary text, headers, footer, hero, boundaries | `--navy: #102D52`, `--ink: #122C48`, `--border: #DAE3E9` | Visual hierarchy, orientation, contrast |
| Accent / action (10%) | Primary CTAs, status details, icon backgrounds, focus | `--accent: #00BCEB`, `--accent-soft: #E7F8FD` | Draw attention to meaningful interactive actions |

**Accessible contrast:** The original bright cyan `#00BCEB` is used for **fills, icons and highlights**, not as normal text on white. Smaller accent-colored labels use `--accent-ink: #006B87`, with stronger contrast. Most copy remains navy on white or warm neutral.

## 2. Original-Look Shadow System

All card elevation colors are based on the original CSS shadow family `rgba(9, 30, 66, …)`:

- `--shadow-xs` — navigation bars and subtle boundaries.
- `--shadow-sm` — resource cards, college table container, document cards.
- `--shadow-md` — interactive card hover; limited to high-value interactions.
- `--shadow-hero` — hero floating panel; stronger because it sits on dark navy.

Do **not** increase shadow intensity on every element. Use border and whitespace first; elevation second. Hover changes are subtle, and animations respect `prefers-reduced-motion`.

## 3. Typography, Spacing, Components

- **Font:** `Inter` if installed, otherwise Segoe UI, system UI, and Arial. No remote font is required.
- **Body:** 16px base with line-height `1.65`. Long paragraphs use greater line spacing.
- **Hierarchy:** One H1 per page; section headers and card titles stay visually smaller.
- **Spacing:** Reuse a 4/8/12/16/24/32px rhythm; give feature areas and data tables generous breathing room.
- **Buttons:** Strong navy for secondary primary actions, cyan for the main landing-page CTA, outlined controls for exports/resets.
- **Shape:** Small controls ~9–10px; content cards ~14–16px; hero feature panel ~22px.
- **Vector icons:** Simple inline SVG in four homepage cards and eight official-link cards; no emoji styling mismatch.
- **Interactive targets:** Controls generally have approximately 40–46px tap-friendly heights; semester picker is even larger.
- **Responsive:** Four-, two-, and one-column layouts as available, with a mobile menu and horizontal scrolling restricted to the college table.

## 4. Shneiderman's Eight Golden Rules of Interface Design

| Golden rule | How it is implemented in this project |
|---|---|
| 1. Strive for consistency | Shared navigation, title/description layouts, button styles, cards, icon size, shadows, colors and footer across all 5 pages. |
| 2. Seek universal usability | Desktop/tablet/mobile layouts, skip link, visible keyboard focus, ARIA names, keyboard-selectable semesters, reduced-motion support. |
| 3. Offer informative feedback | Loading/failure states, subject counts, college result/pagination summaries, library filtered counts, CSV status text. |
| 4. Design dialogs to yield closure | CSV preparation feedback; document preview toggles with a clear "Open document" fallback. |
| 5. Prevent errors | Invalid resource URLs and missing data are not offered as clickable links; file previews are deferred; CSV exports escape values for spreadsheet safety. |
| 6. Permit easy reversal of actions | Clear/reset college and library search; reversible preview toggles; semester buttons allow reselection without page navigation. |
| 7. Support internal locus of control | Visitors can choose semester, filter, sort, preview, export, and paginate; no forced popups or auto-navigation. |
| 8. Reduce short-term memory load | Breadcrumbs, explicit labels, visible selected semester, stable navigation, result summaries and consistent page structure. |

## 5. Main Changes by Page

**Home:** Professional vector icons, cyan primary CTA, navy hero, balanced floating panel, restrained cards, clean layout and clear "unofficial" disclaimer.

**Semester Resources:** Eight consistent semester buttons, visible active indicator, explicit theory/lab counts, arrow-key and Home/End keyboard support, hash links such as `year.html#semester-5`.

**College Directory:** Search and clear/reset, four sort choices, accessible feedback, compact table, pagination, CSV export and print; formula-like spreadsheet content is escaped.

**Library:** New title search with zero-result state, counts and reset; lazy document previews (loaded only when opened), stable document links and a sharing-permission note.

**Important Links:** Consistent iconography, breadcrumb and polished cards; link destinations are preserved from the supplied project.

## 6. Accessibility / Quality Notes

Programmatic spot checks passed WCAG AA 4.5:1 text contrast for accent text on white and muted text on the warm canvas; white on navy exceeded 7:1. These checks **do not constitute a complete accessibility certification**. Conduct a full screen-reader and real-device audit before public release.

The 60–30–10 design proportions are deliberate aesthetic guidance and are **not an exact measured CSS surface-area split**.

## 7. Next Feature Suggestions (not implemented)

1. **Highest priority:** Batch- or syllabus-version selector, so outdated material cannot be mistaken for current official curriculum.
2. **High priority:** Content review dates and a periodic validator for college websites, admission details, Drive file permissions and official links.
3. **Medium priority:** A secure admin/content-management panel for editing resources instead of changing JSON by hand; authenticate the editor before adding it.
4. **Medium priority:** Book/topic categories and semester-specific filtering if the library grows.
5. **Later:** Automated CI with Lighthouse, link validation, keyboard tests and visual regression snapshots on every pull request.

## 8. Testing and Scope

Run `python tests/static_checks.py`, `python tests/interactive_smoke.py`, and `python tests/ui_design_checks.py`. The latter two use Chromium with local JSON mocks to support environments where local browser network access is blocked. Browser layout and interactions were inspected at 1440px, 390px, and 360px widths. External Drive links, university portals, real user devices, and deployed server behavior were **not** verified.

## 9. Library Page Stability & Usability (v3)

The library retains the same **60–30–10** palette and original blue-gray layered shadows. Book cards now use icon + category label, consistent equal-height CTA placement, refined borders/shadows, and a search/filter panel.

- **Consistency / informative feedback:** counts, category filters, alphabetic sort, loading, retry, no-results, and empty-library states.
- **Error prevention:** malformed and non-HTTPS URLs never become clickable; iframe embedding only applies to the expected Google Drive file URL form. Unrecognized HTTPS links remain external-only.
- **Easy reversal / user control:** clear title search, reset filters, modal close button, backdrop and Escape dismissal, and return focus to the triggering button.
- **Recognition, not recall:** distinct **Preview PDF** and **Open file** actions, so users understand which stays on the site and which opens the owner-hosted document.
- **Responsive preview:** the modal is near-full-width on mobile rather than a small iframe inside a third-width card. It loads only when requested and is removed on close.
- **Maintainability:** library category values in `json/book.json` are `book`, `project`, or `guide`. New resources with other/missing categories fall back to “Resource.”

Test coverage: `tests/library_regression.py` has 57 focused Chromium UI assertions; the existing static, interactive and general UI suites continue to pass. External sharing/permission constraints remain unverified and cannot be solved through local client code.
