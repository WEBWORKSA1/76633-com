# 76633.com — Angel Number Meanings & Free Numerology Tools

**Live site:** https://webworksa1.github.io/76633-com/ (GitHub Pages, free plan)

76633.com is a static site about number meanings. It has:
- a programmatic angel-number library
- 10 in-browser numerology calculators
- lead-generation funnels
- donations and memberships
- contests
- careers
- a sponsor and media kit
- full legal and trademark disclosures

Docs: [Idea & business case](docs/IDEA.md) · [Phase-wise build prompts](docs/PHASE-PROMPTS.md) · [Competitor research (35 sites)](docs/RESEARCH.md)

## How it's built
- **Jekyll on GitHub Pages.** `_layouts/default.html` holds the shared shell and `_layouts/number.html` holds the angel-number page chrome. Pages builds and publishes the `gh-pages` branch automatically.
- **One numerology engine.** `assets/js/core.js` powers both the static generator (Node) and the live tools and lookup (browser).
- **Generator.** Run `build/build.mjs` to regenerate every page:
  ```bash
  npm run pages     # rebuild the Jekyll site into the repo root (for gh-pages)
  npm run preview   # standalone HTML preview in ./dist
  ```

## Configure (no rebuild needed): `assets/js/config.js`

| Setting | What it does |
|---|---|
| `adsenseClient`, `adSlots` | Turns on Google AdSense. Until set, empty slots show house ads selling sponsorship |
| `ga4` | Google Analytics 4 measurement ID |
| `youtubeChannel` | Target of all "Subscribe" buttons |
| `donate.*` | PayPal / Buy Me a Coffee / Ko-fi / Stripe / UPI buttons on the Support page (hidden while blank) |
| `affiliate` | Optional reading-partner link |
| `formAlias` | FormSubmit alias (see below) |

To publish videos, add YouTube IDs to `VIDEOS` in `build/pages-biz.mjs` and to the `data-yt` attributes.

## Forms & the hidden inbox
The site has 11 forms: newsletter, quick reading, free reading, consultation, partner, donation pledge, advertising, contest, careers, contact and the email button. All of them deliver to one inbox through [FormSubmit](https://formsubmit.co).

The address never appears in the source. It is stored XOR-encoded in `config.js` and decoded only when a form is submitted.

1. Submit any form once. FormSubmit emails an **activation link** to the inbox. Click it.
2. FormSubmit then shows a random alias string. Paste it into `formAlias` in `config.js`. After that, even the encoded address is no longer used.

## Custom domain (76633.com)
1. In `_config.yml`, set `url: "https://76633.com"` and `baseurl: ""`.
2. Add a file named `CNAME` containing `76633.com`.
3. Set these DNS records:
   - `A @` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - `CNAME www` → `webworksa1.github.io`
4. In repo Settings → Pages, tick **Enforce HTTPS**.

## Images
Upload `assets/img/og.png` (1200×630 social card), `icon-192.png` and `icon-512.png` through GitHub's web uploader (Add file → Upload files → `assets/img/`).

## Legal
Content is for entertainment and self-reflection. "76633" is used only as a domain name. The site is not affiliated with any company, SMS short code or trademark using that number. See `/trademark-copyright/`.

© 2026 76633.com. All rights reserved.
