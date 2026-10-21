# NU–CSE: Night Mode + Smooth Transitions QA

**Build:** v4, October 2026  
**Base:** ASML-NU-CSE-Library-Issues-Fixed.zip (v3 Library fix retained)

## Implemented

1. **Theme toggle on five production pages:** Home, Semester resources, Colleges, Library, Important Links. Accessible sun/moon control with dynamically updated `aria-label`, `aria-pressed`, title and visible desktop label.
2. **Persisted preference:** saved as `nu-cse-theme` (`light` or `dark`) via localStorage. Without a saved preference, follows the OS setting and reacts to subsequent OS changes. Storage failure gracefully degrades to a temporary choice.
3. **No white flash on refresh:** each page initializes `data-theme` and Bootstrap `data-bs-theme` in the document head *before* styles load.
4. **Night design system:** navy/blue-gray surfaces, cyan highlight `#00BCEB`, bright legible text, dark-form styling, college table, semester cards, and Library preview dialog. Original warm-canvas day mode preserved.
5. **Motion:** brief entrance fades for page hero, cards and subject items, animated interactions, preview-dialog entrance and supported same-origin page transitions. The class responsible for explicit theme-change fades is removed automatically after the fade, so normal hover transitions remain active.
6. **Accessibility:** visible focus states, keyboard-operable theme button and dialog, system contrast modes, and reduced-motion fallback.

## Verification

| Suite | Result |
|---|---:|
| Existing static/data checks | 8 passed |
| Existing interaction smoke tests | 40 passed |
| Existing professional UI/design checks | 32 passed |
| Existing Library regression checks | 57 passed |
| New theme and motion regression checks | 111 passed |
| **Total across suites** | **248 passed** |

**Browser:** Playwright headless Chromium. Browser checks used local HTML/CSS/JS with mocked JSON responses, because this runtime blocks browser localhost/file/HTTPS navigation. Script syntax and ZIP extraction also checked.

**New regressions cover:** both initial OS color modes on each production page, toggle aria state, toggle browser theme color, no desktop overflow, dark-mobile navigation at 390px, dark Library preview and close, reduced-motion, dark design tokens, and storage persistence across page loads (mocked storage-capable origin).

## Limitations / staging checklist

- Browsers without support for cross-document View Transitions use normal page navigation; functionality is unchanged.
- Browser-based live hosting and the actual Google Drive permissions/preview content were **not** tested. Test both on GitHub Pages / production with HTTPS.
- Cross-device theme syncing is not supported; preferences are local to a browser profile.
- Images and external hosted resource links remain as in the previous fixed package.
- Contrast was checked through design tokens and visual review. This is not a full WCAG accessibility audit or assistive-technology certification.

## Developer commands

From `ASML-NU-CSE-Professional/`, run the site:

```bash
python -m http.server 8000
```

Run QA (requires Playwright and Chromium):

```bash
python tests/static_checks.py
python tests/interactive_smoke.py
python tests/ui_design_checks.py
python tests/library_regression.py
python tests/theme_motion_regression.py
```

See `NIGHT_MODE_AND_MOTION.md` for color variables, motion behavior and edit locations.
