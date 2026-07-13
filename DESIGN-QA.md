# Design QA — bucksgarageconversions.co.uk

**Audit date:** 9 July 2026 · **Method:** scripted Chromium audit of all 18 pages at 360×740, 768×740 and 1280×740, plus static analysis. Every finding below was measured, fixed, and re-measured — before/after values included.

## 1. Horizontal overflow

| Finding | Before | Fix | After |
|---|---|---|---|
| **All 18 pages overflowed +114px at exactly 768px.** The desktop nav switched on at 768px but its 7 links + CTA need ~880px. | 18/18 pages, +114px | Nav given its own breakpoint: burger menu until **900px**, desktop nav from 900px (styles.css and the inline critical CSS on all 18 pages). Other 768px layout rules unchanged. | 0 pages overflow at 360 / 768 / 1280 |
| 360px and 1280px | 0 overflow | — none needed | 0 |

## 2. Tap targets under 44px

| Finding | Before | Fix | After |
|---|---|---|---|
| Footer navigation links | `min-height: 36px` | Raised to `min-height: var(--tap)` (44px) | 44px |
| All other interactive elements (nav links, buttons, FAQ summaries, form fields, card links) | ≥44px already | — | Audit reports **zero** targets under 44px at any width (inline prose links exempt per WCAG 2.5.8 inline exception) |

## 3. Text under 16px on mobile (360px)

Before: reading text ran 14.1–15.7px (card copy, step text, tables, trust items, use-strip costs, footer, form hints, labels).

Fix: mobile (<768px) type-scale block — all **reading text now ≥16px**: `.card p`, `.steps li p`, `table` (incl. `.figure` cells), `.trust-strip .trust-item`, `.use-strip .use-cost/.use-note`, `.form-hint`, `label`, `.site-footer`, `.card-link`, `.nav-toggle`, transformation-panel lists. (One round of specificity fixes was needed — base selectors like `.trust-strip .trust-item` beat the first override; verified computed 16px in-browser after.)

Documented exception — **caption/label text**: the uppercase mono labels (eyebrow, breadcrumb, guide-meta, card-meta, pane-label, table headers, footer legal) are intentional caption-scale typography. All were raised to a **13px minimum** (eyebrow 12.5→13, breadcrumb/guide-meta 12.8→13, pane-label 11.5→13, table headers 13.6→14, footer legal 13.6→14). No caption sits below 13px.

## 4. Hero exceeding one mobile viewport (360×740)

| Page (worst offenders) | Before (header+hero) | After |
|---|---|---|
| Home | 829px | 652px |
| Covenants guide | 844px | 697px |
| Building regs / value guides | 771px | 628px |
| PD guide | 741px | 660px |
| All other pages | ≤735px | 404–594px |

Fix: mobile-only compression — hero/page-intro padding 4rem/3.5rem → 2.5rem/2.25rem, H1 mobile floor 2rem → 1.75rem (`clamp(1.75rem, 7.5vw, 3.25rem)`), lede 1.2rem → 1.0625rem, tighter breadcrumb/btn-row/trust-strip margins. Desktop values unchanged. **All 18 heroes now fit one 740px viewport including the sticky header.**

## 5. Accordion behaviour

Tested programmatically: FAQ `<details>` opens on summary click and closes on second click; custom +/− marker switches; default disclosure marker suppressed in WebKit. **No defect found; no fix needed.** (JS-free component — works with scripting disabled.)

## 6. Sticky element overlap

The site has no floating call button; the sticky element is the header (with the "Get a quote" CTA). Two findings:

- **In-page anchors** (`#costs`, `#worked-example`) landed underneath the 64px sticky header. Fixed: `[id] { scroll-margin-top: 5rem; }` — verified computed 80px offset.
- The sticky header never overlaps content at any tested width (it's in normal flow, `position: sticky`).

## 7. Table overflow

All 21 data tables sit in `.table-wrap { overflow-x: auto }` scroll containers (14 pages have at least one table that scrolls at 360px). Added the required **visual hint**: `main.js` marks scrollable wrappers with `.is-scrollable`, which renders a mono "← swipe →" label above the table and a fading right-edge gradient that disappears when scrolled to the end. Re-checked on `load` because the stylesheet loads asynchronously (the first check ran before `min-width` applied). Verified: 4/4 scrollable tables on the cost guide receive the hint.

## 8. Font flash

- No FOIT: Google Fonts loads with `display=swap`; first paint uses metric-similar fallbacks (PT Serif→Georgia, Space Grotesk→Arial).
- No flash of unstyled content: ~2.5KB critical CSS is inlined in every `<head>`, so the above-fold renders fully styled before the async stylesheet arrives.
- `preconnect` to both font hosts cuts the swap window. Residual reflow on font swap is the accepted trade-off of async loading; measured layout is stable because fallback stacks are metric-close.

## Consistency pass

**Spacing rhythm** — six ad-hoc inline `style="margin-top: 1.5/1.75/2rem"` attributes (across 6 pages) replaced with a single `.flow-top { margin-top: 1.75rem }` utility. Zero inline styles remain site-wide. Section rhythm is uniform: sections 3.5rem mobile / 4.5rem desktop; intros 2.5rem/2.25rem mobile, 4rem/3.5rem desktop.

**Signature element (floorplan corner)** — the dashed steel corner bracket exists in exactly one rule (`.section-head::before`) and therefore appears on every section header and nowhere else. Other dashed lines in the design (trust-strip separator, transformation divider, footer rule) are plain single-edge separators, not corner brackets. ✔ as specified.

**Accent colour discipline** — oak is now reserved for CTAs and key data only:
- Kept: primary buttons (CTA), `.figure--oak` cost highlights (key data), direct-answer and callout left borders (key data).
- Removed: `::selection` background (→ charcoal) and trust-item markers (→ steel) — both decorative.
- Logged exception: the brand wordmark's "Garage" uses oak as brand identity in header/footer.

**Placeholder text** — visible bracketed placeholders (`[Street address placeholder]`, `[HP19 XXX]`) removed from all 18 footers; the footer NAP now reads name + "Aylesbury, Buckinghamshire" + phone + email. The three pages carrying the older short footer (about, contact, guides index) were brought up to the same full NAP block, so all 18 footers are now identical. Remaining known-placeholder values that **cannot be invented**: the schema `TODO:` address fields (the phone number has since been supplied and is live as `01296 924042`) — tenant-blocked and already documented in TECHNICAL-CHECKLIST.md. The contact form's input `placeholder` attribute is a UX hint, not placeholder copy.

**Link crawl** — every internal `href` on all 18 pages plus every URL in `llms.txt` resolved against the filesystem, including `#fragment` targets checked against `id` attributes in the target document: **0 broken links, 0 dead anchors, 0 404s.**

## Final state (re-audit after all fixes)

- Overflow: **0** pages at 360 / 768 / 1280. (One regression was caught by the re-audit itself: the 16px mobile bump made the homepage use-strip cost figures overflow +9px at 360px; fixed by wrapping the cost onto its own right-aligned line below 480px.)
- Tap targets <44px: **0**.
- Reading text <16px at 360px: **0** (captions ≥13px, documented).
- Heroes over one 740px viewport: **0** (max 697px including header).
- Scrollable tables without visual hint: **0**.
- Broken internal links/anchors: **0**.
- Accordion, sticky offset, font-flash mitigations: verified in-browser.
