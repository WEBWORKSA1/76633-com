// Page shell: head, top bar, header, newsletter band, footer, consent
export const SITE_URL = process.env.SITE_URL || 'https://webworksa1.github.io/76633-com';
export const BASE_PATH = process.env.BASE_PATH || '/76633-com/'; // use '/' once 76633.com points here
export const BRAND = '76633.com';
export const INTEREST_URL = 'https://web.works/contact';

const NAV = [
  ['angel-numbers/', 'Angel Numbers'], ['numerology/', 'Numerology'], ['tools/', 'Free Tools'], ['videos/', 'Videos'],
  ['contests/', 'Contests'], ['support/', 'Support']
];

export const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function layout(p) {
  const depth = p.path ? p.path.split('/').filter(Boolean).length : 0;
  const R = p.flat ? BASE_PATH : depth ? '../'.repeat(depth) : './';
  const body = typeof p.body === 'function' ? p.body(R) : p.body;
  return shell({ R, title: esc(p.title), desc: esc(p.desc), canonical: `${SITE_URL}/${p.path}`, ogType: p.ogType || 'website', ogImage: `${SITE_URL}/assets/img/og.png`,
    robots: p.noindex ? '<meta name="robots" content="noindex">' : '', cur: (h) => (p.path.startsWith(h) ? ' aria-current="page"' : ''),
    schema: (p.schema || []).map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join(''), body,
    newsletter: p.noNewsletter ? '' : newsletter(R), sticky: p.sticky ? stickyHTML(R) : '' });
}

// Jekyll layout (_layouts/default.html) generated from the same shell
export function jekyllLayout() {
  const R = '{{ site.baseurl }}/';
  return shell({ R, title: '{{ page.title | escape }}', desc: '{{ page.description | escape }}', canonical: '{{ site.url }}{{ site.baseurl }}{{ page.url }}', ogType: '{{ page.og_type | default: "website" }}', ogImage: '{{ site.url }}{{ site.baseurl }}/assets/img/og.png',
    robots: '{% if page.noindex %}<meta name="robots" content="noindex">{% endif %}', cur: (h) => `{% if page.url contains '/${h}' %} aria-current="page"{% endif %}`,
    schema: '', body: '{{ content }}', newsletter: `{% unless page.no_newsletter %}${newsletter(R)}{% endunless %}`, sticky: `{% if page.sticky %}${stickyHTML(R)}{% endif %}` });
}
const stickyHTML = (R) => `<div class="sticky-cta"><a class="btn btn-gold" href="${R}free-reading/">✦ Get my free numerology reading</a></div>`;

function shell(o) {
  const R = o.R;
  const nav = NAV.map(([h, t]) => `<a href="${R}${h}"${o.cur(h)}>${t}</a>`).join('');
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${o.title}</title>
<meta name="description" content="${o.desc}">
<link rel="canonical" href="${o.canonical}">
<meta property="og:type" content="${o.ogType}"><meta property="og:site_name" content="${BRAND}"><meta property="og:title" content="${o.title}"><meta property="og:description" content="${o.desc}"><meta property="og:url" content="${o.canonical}"><meta property="og:image" content="${o.ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0b0b1a">${o.robots}
<link rel="icon" href="${R}assets/img/icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="${R}assets/img/icon-192.png"><link rel="manifest" href="${R}manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${R}assets/css/style.css">
<script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
${o.schema}
</head>
<body data-root="${R}">
<a class="skip" href="#main">Skip to content</a>
<div class="topbar"><a href="${INTEREST_URL}" target="_blank" rel="noopener">Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership</a></div>
<header class="hdr"><div class="wrap">
<a class="logo" href="${R}" aria-label="76633.com home"><b>7·6</b><span>76633<span class="muted" style="font-weight:600">.com</span></span></a>
<button class="icon-btn menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false" aria-controls="nav">☰</button>
<nav class="nav" id="nav" aria-label="Main">${nav}<a class="cta" href="${R}free-reading/">Free Reading</a><button class="icon-btn" id="themeBtn" aria-label="Toggle light/dark theme">◐</button></nav>
</div></header>
<main id="main">
${o.body}
</main>
${o.newsletter}
${footer(R)}
<div class="consent" id="consent" role="dialog" aria-label="Cookie consent"><b>Cookies & ads</b><p class="small muted mb0">We use cookies for analytics and to show ads that keep every tool free. Choose “Accept all” for personalised ads or “Essential only” for non-personalised ads. <a href="${R}privacy/">Privacy policy</a>.</p><div class="btns"><button class="btn btn-gold" data-consent="all">Accept all</button><button class="btn btn-ghost" data-consent="essential">Essential only</button></div></div>
${o.sticky}
<script src="${R}assets/js/config.js"></script>
<script type="module" src="${R}assets/js/app.js"></script>
</body></html>`;
}

function newsletter(R) {
  return `<section class="sec-sm"><div class="wrap"><div class="lead-box"><div class="grid g2" style="align-items:center">
<div><span class="eyebrow">Free · weekly</span><h2 class="mb0">Get your numbers in your inbox</h2><p class="muted">Weekly number forecast, new angel number guides and contest alerts. One email a week, unsubscribe anytime.</p></div>
<form data-form="newsletter" data-ok="You're in! Watch your inbox for your first forecast.">
<div class="row"><div class="field"><label for="nl-e">Email</label><input id="nl-e" name="email" type="email" required placeholder="you@example.com" autocomplete="email"></div>
<div class="field"><label for="nl-d">Birth date <span class="muted">(optional)</span></label><input id="nl-d" name="birth_date" type="date"></div></div>
<input class="hp" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
<button class="btn btn-gold btn-block" type="submit">Send me my weekly numbers</button>
<p class="small muted" style="margin:8px 0 0">No spam. See our <a href="${R}privacy/">privacy policy</a>.</p></form>
</div></div></div></section>`;
}

function footer(R) {
  const col = (h, links) => `<div><h4>${h}</h4>${links.map(([u, t]) => `<a href="${R}${u}">${t}</a>`).join('')}</div>`;
  return `<footer><div class="wrap"><div class="fgrid">
<div><a class="logo" href="${R}"><b>7·6</b><span>76633.com</span></a><p class="muted small mt">Decode the numbers you keep seeing. Free angel number meanings, numerology calculators and lucky-number tools — built for curiosity and self-reflection.</p>
<a class="btn btn-ghost" href="${R}support/">♥ Support 76633.com</a></div>
${col('Explore', [['angel-numbers/', 'Angel numbers A–Z'], ['numerology/', 'Numerology guide'], ['life-path/', 'Life path numbers'], ['chinese-lucky-numbers/', 'Chinese lucky numbers'], ['mirror-hours/', 'Mirror hours'], ['meaning-of-76633/', 'Meaning of 76633']])}
${col('Free tools', [['tools/life-path-calculator/', 'Life path calculator'], ['tools/name-numerology/', 'Name numerology'], ['tools/compatibility/', 'Compatibility'], ['tools/mobile-number-numerology/', 'Mobile number'], ['tools/vehicle-number-numerology/', 'Vehicle number'], ['tools/', 'All tools →']])}
${col('Community', [['free-reading/', 'Free reading'], ['consult/', 'Book a consultation'], ['videos/', 'Videos'], ['contests/', 'Contests & prizes'], ['careers/', 'Careers & talent'], ['partners/', 'Partner with us']])}
${col('Company', [['about/', 'About'], ['advertise/', 'Advertise & sponsor'], ['contact/', 'Contact'], ['faq/', 'FAQ'], ['privacy/', 'Privacy'], ['terms/', 'Terms'], ['disclaimer/', 'Disclaimer'], ['trademark-copyright/', 'Trademark & copyright']])}
</div>
<div class="legal"><p><b>Disclaimer:</b> Content on 76633.com is for entertainment, education and self-reflection only. It is not medical, legal, financial or psychological advice.</p>
<p><b>Trademark & copyright notice:</b> “76633” is used here only as a domain name and numeric identifier. 76633.com is an independent publication and is not affiliated with, endorsed by or connected to any company, SMS short code, product, service or trademark holder that uses the number 76633. All third-party names and marks belong to their respective owners. Original content © <span data-year>2026</span> 76633.com. All rights reserved. <a href="${R}trademark-copyright/">Full disclosure</a>.</p></div>
</div></footer>`;
}
