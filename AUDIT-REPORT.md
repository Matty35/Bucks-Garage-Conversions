# Audit Report — bucksgarageconversions.co.uk

**Date:** 9 July 2026 · **Method:** scripted audit (`audit.py`) run repeatedly until a zero-failure pass. Pass 1 found 5 failures; all were fixed; pass 3 was clean. Every check below is machine-verified against the live files, not asserted.

## Iteration log

| Pass | Failures | Action |
|---|---|---|
| 1 | 5 — word count under target (about 366<450, contact 238<280, Princes Risborough 795<800); service pages with <2 guide links (double: 1, office: 0) | About +2 substantive paragraphs (survey checklist, specialisation quality); contact + "what to have ready" paragraph; Princes Risborough + consent-lead-time sentence; double + cost-guide link on the £/m² point; office + regs-guide and value-guide links in context |
| 2 | 1 — office guide links (patch strings mismatched actual copy) | Re-applied against the real paragraph text |
| 3 | **0 — clean** | Stopped |

## 1. Technical crawl — all PASS

| Check | Result |
|---|---|
| Unique `<title>` on all 18 pages | ✅ 18 unique, 0 duplicates |
| Unique meta descriptions | ✅ 18 unique, 0 duplicates |
| Self-referencing canonicals (full production URL) | ✅ 18/18 string-equal to own URL |
| Exactly one H1 per page | ✅ 18/18 |
| Valid JSON-LD (every block parsed; syntax errors = fail) | ✅ 44 blocks across 18 pages, all parse |
| Broken internal links (files **and** `#fragment` targets) | ✅ 0 |
| Alt text on every image | ✅ vacuous — 0 `<img>` elements ship; policy for future images documented in TECHNICAL-CHECKLIST.md |
| `sitemap.xml` matches actual pages exactly | ✅ 18 URLs ↔ 18 pages, 1:1 |

## 2. Content audit — all PASS

| Check | Result |
|---|---|
| No page under target word count | ✅ Targets: services ≥1,400 (actual 1,471–1,909); guides ≥1,000 (1,007–1,593); locations ≥800 (817–890); home ≥700 (1,031); about ≥450 (476); contact ≥280 (293); guides index ≥200 (259) |
| Every guide has a table and a FAQ | ✅ 6/6 guides carry ≥1 `<table>` and a FAQ block |
| Every service page links to ≥2 guides | ✅ flagship 3 · double 2 · home office 2 · bedroom/annexe 3 (in-content links) |
| No orphaned guides (each receives ≥2 in-content links) | ✅ every guide receives 2–13 in-content links from other pages (footer links excluded from the count) |
| Silo pages absent from main nav | ✅ no guide or location URL appears in any page's `<nav>`; guides reachable via footer + contextual links, locations via footer "Areas we cover" only |

## 3. Performance — all PASS

| Check | Result |
|---|---|
| Combined CSS + JS under 100KB | ✅ 22.7KB total (styles.css 20.3KB + main.js 2.4KB), plus ~2.5KB inline critical CSS per page |
| All images WebP | ✅ vacuous — zero raster images ship; any future image must be WebP with width/height/lazy per checklist |
| No render-blocking resources | ✅ stylesheet + fonts load via async print-swap with noscript fallback; JS deferred; no blocking `<link rel="stylesheet">` or `<script>` in any head |

## Stop condition

Pass 3 = **zero failures across all 16 checks**. Audit loop closed.

---

# DEPLOY-READY — manual TODOs (tenant input required)

The site is structurally, technically and editorially complete. Five things need real-world input before or at launch:

1. **Phone number** — `01296 000 000` is a placeholder in tel: links (hero, CTA bands, footers) and the homepage LocalBusiness JSON-LD. One find-and-replace across the repo when the real number exists.
2. **NAP: street address & postcode** — footers currently show "Aylesbury, Buckinghamshire" only; the JSON-LD address fields are marked `TODO:`. Fill both when the registered address is settled, keeping the wording identical everywhere (see entity-consistency note in TECHNICAL-CHECKLIST.md).
3. **Contact form endpoint** — the form posts to `action="#"`. Wire to Netlify Forms / Formspree / a mail handler at deploy; the fields and labels are ready.
4. **Real photography** — the site ships zero images by design. When before/after job photos exist: WebP, explicit width/height, `loading="lazy"` below the fold, and add an `og:image` (1200×630) — slots documented in TECHNICAL-CHECKLIST.md.
5. **Google Search Console verification** — add the DNS TXT or HTML-file verification after DNS goes live, submit `sitemap.xml`, and confirm the robots.txt AI-crawler allowances are being honoured. (Also worth registering the Google Business Profile at the same time — the LocalBusiness schema is ready to match it.)

Post-launch, first content job: gather genuine customer reviews, display them on-page, then enable the review schema using the commented template in the homepage `<head>`.
