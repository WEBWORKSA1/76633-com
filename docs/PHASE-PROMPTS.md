# 76633.com — Phase-Wise Build Prompts

This file contains copy-paste prompts for building, extending or rebuilding 76633.com with an AI coding assistant. Each phase ends with a checklist that must pass before the next phase starts.

> **Global rules (paste at the top of every phase):**
> - Domain: 76633.com. Brand story: 7 · 66 · 33 (seeker · double love · master teacher); 7+6+6+3+3 = 25 → 7.
> - Niche: angel numbers, numerology calculators, lucky-number tools (Western + Indian + Chinese traditions).
> - Hosting: GitHub Pages free plan. Static only: HTML/CSS/vanilla JS plus Jekyll layouts. No server, no paid services required.
> - Top of **every** page: a bar reading "Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership", linked to https://web.works/contact.
> - All forms and contact links deliver to the site owner's single inbox. The email address must **never** appear in HTML, JS source, schema or visible text. Store it encoded (XOR char codes, reversed) in `config.js`. Decode it only at submit or click time, and send via FormSubmit AJAX. Replace it with the FormSubmit alias once activated.
> - No trademark use of "76633". Include a trademark & copyright disclosure page and a footer notice stating no affiliation with any company or SMS short code using 76633.
> - Numerology is entertainment and self-reflection only. Never make predictive, medical or financial claims. Never publish fake testimonials, fake counts or fake reviews.
> - Mobile-first, accessible (WCAG AA contrast, labels, focus states, reduced motion), dark/light theme, no horizontal scroll at 360px.

---

## Phase 1: Foundation & design system
**Prompt:**
"Create a GitHub Pages–ready Jekyll site for 76633.com. Build a design system in `assets/css/style.css` with CSS tokens: deep navy background, violet→pink→gold gradient, Fraunces headings, Inter body text, cards, buttons (gold, gradient, ghost), form controls, a grid (2/3/4 columns collapsing on mobile) and a light-theme override. Create `_layouts/default.html` with:
- the interest top bar;
- a sticky header with logo, nav (Angel Numbers, Numerology, Free Tools, Videos, Contests, Support), a gold 'Free Reading' CTA and a theme toggle;
- a mobile hamburger menu;
- a newsletter band;
- a 5-column footer with disclaimer and trademark notice;
- a cookie consent banner.

Add `_config.yml` with the baseurl for github.io and commented values for the custom domain, plus the jekyll-sitemap plugin, robots.txt, manifest and a service worker."

**Done when:** the site renders at 360px, 768px and 1366px with no overflow; the theme toggle persists; Lighthouse accessibility ≥ 95.

## Phase 2: Numerology engine (single source of truth)
**Prompt:**
"Write `assets/js/core.js` as an isomorphic ES module (it must run in Node for the static build and in the browser). It needs:
- digit meanings for 0–9 and 11/22/33 (keywords, planet, colour, core, spiritual, love, twin flame, career, warning, action, biblical);
- a Chinese digit table and combos (168, 520, 1314, 518, 888, 666, 250, 14, 74);
- Pythagorean and Chaldean letter maps;
- functions: reduce (keeping masters), lifePath with explanation steps, birthdayNumber (Mulank), destinyFromDOB (Bhagyank), nameNumbers (expression, soul urge, personality), personalYear, compatibility (natural/compatible/challenging groups → score), loShu (grid, missing numbers, planes), phoneScore, plateScore, chineseScore, luckyProfile;
- pattern detection (single, repeat, ascending, descending, alternating, mirror, pairs, mixed);
- report(n), which returns every section of an angel-number reading plus FAQ and related numbers.

Write `render.js` to turn a report into HTML with section IDs for a table of contents."

**Done when:** `report('444').root === 3`, `lifePath('1990-07-15').value === 5`, and every POPULAR number renders without undefined values.

## Phase 3: Programmatic SEO content
**Prompt:**
"Write `build/build.mjs` to generate static pages:
- one page per number in POPULAR (0–9, doubles, triples, quads, sequences, mirrors, 76633) using `_layouts/number.html` (hero badge, TOC sidebar, lead box, video slot, share bar);
- Life Path pages 1–9, 11, 22, 33 (strengths, challenges, love compatibility, careers, FAQ);
- hub pages for angel numbers (search + grouped chips), numerology guide, life path, Chinese lucky numbers, mirror hours and the meaning of 76633;
- a noindex live lookup page for any other number.

Add JSON-LD for BreadcrumbList, FAQPage, Article, WebSite with SearchAction and Organization."

**Done when:** zero broken internal links; each page has a unique title, meta description, canonical and OG tags; Rich Results Test validates the FAQ markup.

## Phase 4: Interactive tools
**Prompt:**
"Build 10 tool pages with instant in-browser results: Life Path, Name (Pythagorean/Chaldean), Love Compatibility, Mobile Number, Vehicle Number, Chinese Lucky Number, Personal Year, Lo Shu Grid, Lucky Number, Clock Time Decoder. Each result shows the number, the working steps, a meaning, a score meter where relevant, and a CTA to the free reading and support pages. Add WebApplication schema. Store nothing."

**Done when:** every tool returns a result for valid input and shows native validation for invalid input.

## Phase 5: Lead generation (highest priority revenue)
**Prompt:**
"Create `/free-reading/`, a Typeform-style 3-step form with a progress bar:
1. Focus (love, career, spiritual, decision) and the number you keep seeing (prefilled from `?n=`).
2. Full birth name and DOB.
3. Email, WhatsApp (optional), language, premium-interest checkbox and consent.

Create `/consult/` with three offers (personal, business/brand name, number selection) and a qualification form (type, budget, timeline). Create `/partners/` for practitioner applications. Add inline lead boxes on every number page, a sticky CTA after 900px of scroll, and a homepage quick-reading form. All forms POST JSON to FormSubmit AJAX, with a honeypot and a mailto fallback, using the decoded route."

**Done when:** a Playwright test intercepts the request, confirms the payload, and confirms the email never appears in DOM or source (a repo-wide search for the address returns nothing).

## Phase 6: Monetization layer
**Prompt:**
"Add ad slots (`data-ad` = top, inArticle, sidebar, footer). When `config.adsenseClient` and slot IDs are set, inject AdSense units (non-personalised if the user chose 'Essential only'). Otherwise render house ads that sell sponsorship.
- Add GA4 with consent mode (optional id).
- Add `ads.txt`.
- Add a YouTube video library driven by a `VIDEOS` list with lazy nocookie embeds and subscribe buttons from config.
- Add an optional affiliate reading-partner link.
- Create `/advertise/` with a media kit, placements, audience fit, excluded categories and an inquiry form."

**Done when:** setting a publisher ID in `config.js` turns ads on with no other change.

## Phase 7: Community, donations, contests, hiring
**Prompt:**
"Create:
- `/support/` with preset amounts ($5/$11/$33/$77/other), frequency, purpose (operations, promotion & marketing, hiring talent, contest prizes, translations), a pledge form, configurable pay links (PayPal, Buy Me a Coffee, Ko-fi, Stripe, UPI deep link) hidden when blank, membership tiers ($3/$9/$33) and an honest goal bar;
- `/contests/` with a countdown, prizes, bonus entries, an entry form (18+ and rules consent) and official rules (no purchase necessary, skill-judged, void where prohibited, no platform endorsement);
- `/careers/` with 6 remote roles and an application form."

**Done when:** all forms submit, and the countdown shows the correct IST end date.

## Phase 8: Trust, legal, compliance
**Prompt:**
"Create About (editorial standards, funding), Contact (form + hidden-email mailto button + web.works/contact card), FAQ (schema), Privacy (AdSense cookie disclosure, GA4, YouTube nocookie, GDPR/CCPA/PIPEDA/DPDP rights, retention), Terms, Disclaimer (entertainment, affiliate, donation not tax-deductible), Trademark & Copyright disclosure (no affiliation with any 76633 short code or company, third-party marks, takedown process) and a 404 page with number search."

**Done when:** legal pages are linked in the footer of every page and AdSense policy requirements are met.

## Phase 9: Deploy & launch
**Prompt:**
"Push the Jekyll site to the `gh-pages` branch of github.com/webworksa1/76633-com (Pages publishes it automatically) and keep `main` in sync. Verify https://webworksa1.github.io/76633-com/. For the custom domain:
1. Add a `CNAME` file containing `76633.com`.
2. Set `url: https://76633.com` and `baseurl: ""` in `_config.yml`.
3. Point DNS A records to 185.199.108.153, .109.153, .110.153 and .111.153, and CNAME `www` to webworksa1.github.io.
4. Tick 'Enforce HTTPS'.

Submit the sitemap to Google Search Console and Bing, then apply for AdSense."

**Done when:** the live URL returns 200, the sitemap is indexed and HTTPS is enforced.

## Phase 10: Growth roadmap (post-launch)
1. Human-written intros and expert bylines for the top 30 numbers (E-E-A-T, AdSense approval).
2. Hindi and Spanish editions (`/hi/`, `/es/`) using the same engine.
3. Pinterest-sized shareable result images (canvas export).
4. Daily "Number of the Day" email and push notifications.
5. A practitioner directory with paid featured listings.
6. A premium PDF report generator (client-side jsPDF), sold via Stripe Payment Links.
7. Expand POPULAR to 1,000+ pages based on Search Console queries.
