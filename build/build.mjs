// Static site generator: node build/build.mjs  → writes ./dist
import fs from 'node:fs';
import path from 'node:path';
import { D, POPULAR, report } from '../assets/js/core.js';
import { numberBody, tocHTML, leadBox, videoBox } from '../assets/js/render.js';
import { layout, jekyllLayout, SITE_URL, esc } from './layout.mjs';
const J = !!process.env.JEKYLL; // emit a Jekyll site for GitHub Pages
const JR = '{{ site.baseurl }}/';
import { mainPages, TOOLS, crumb, crumbSchema, faqSchema, faqHTML, chips } from './pages-main.mjs';
import { bizPages } from './pages-biz.mjs';
import { numberFM, digitData, NUMBER_LIQUID, WHY } from './number-liquid.mjs';

const OUT = path.resolve(J ? 'site' : 'dist');
fs.rmSync(OUT, { recursive: true, force: true });
const pages = [...mainPages, ...bizPages];

// ---------- Angel number pages ----------
function numberChrome(R, m, inner) {
  return `${crumb(R, [['angel-numbers/', 'Angel Numbers'], ['', m.n]])}
<section style="padding-top:24px"><div class="wrap"><div class="num-hero"><div class="num-badge">${m.n}</div><div><span class="eyebrow">Angel number meaning</span><h1>${m.n} Angel Number Meaning</h1><p class="muted">${m.plabel} · Root ${m.root} · ${m.kw}</p><p class="small muted">By 76633.com Editorial · Updated September 2026 · 6 min read</p></div></div>
<div class="article mt"><article>${inner}${leadBox(m.n, R)}${videoBox()}<h3 class="mt">Share ${m.n}</h3><div class="share" data-share></div></article>
<aside><div class="card toc"><b>On this page</b>${tocHTML()}<div class="ad" data-ad="sidebar"></div><a class="btn btn-gold btn-block" href="${R}free-reading/?n=${m.n}">Free personal reading</a></div></aside></div></div></section>`;
}
for (const n of POPULAR) {
  const r = report(n);
  pages.push({
    path: `angel-numbers/${n}/`, ogType: 'article', sticky: true,
    title: `${n} Angel Number Meaning: Love, Twin Flame, Career & Spiritual | 76633.com`,
    desc: `What does ${n} mean? ${r.tldr}`.slice(0, 158),
    schema: [crumbSchema([['angel-numbers/', 'Angel Numbers'], [`angel-numbers/${n}/`, n]]),
      { '@context': 'https://schema.org', '@type': 'Article', headline: `${n} Angel Number Meaning`, author: { '@type': 'Organization', name: '76633.com Editorial' }, publisher: { '@type': 'Organization', name: '76633.com' }, dateModified: '2026-09-27', mainEntityOfPage: `${SITE_URL}/angel-numbers/${n}/` }],
    number: numberFM(n),
    body: (R) => numberChrome(R, { n, plabel: esc(r.pattern.label), root: r.root, kw: esc(D[r.lead].kw) }, numberBody(r, R, true))
  });
}

// ---------- Life path pages ----------
const LP_EXTRA = {
  1: ['Independent, driven, original', 'Stubbornness, impatience', '3, 5, 9', 'Entrepreneur, executive, inventor, freelancer'],
  2: ['Diplomatic, intuitive, supportive', 'Over-sensitivity, indecision', '4, 6, 8', 'Counsellor, mediator, designer, HR, nursing'],
  3: ['Expressive, social, creative', 'Scattered energy, self-doubt', '1, 5, 6, 9', 'Writer, performer, marketer, content creator'],
  4: ['Reliable, practical, disciplined', 'Rigidity, overwork', '2, 6, 7, 8', 'Engineer, accountant, builder, project manager'],
  5: ['Adventurous, curious, adaptable', 'Restlessness, excess', '1, 3, 7', 'Sales, travel, media, digital business'],
  6: ['Caring, responsible, artistic', 'Perfectionism, control', '2, 3, 4, 9', 'Teacher, healer, interior designer, chef'],
  7: ['Analytical, spiritual, wise', 'Isolation, cynicism', '4, 5, 7', 'Researcher, analyst, developer, spiritual teacher'],
  8: ['Ambitious, authoritative, capable', 'Materialism, workaholism', '2, 4, 6', 'CEO, investor, lawyer, real-estate developer'],
  9: ['Compassionate, idealistic, generous', 'Martyrdom, holding on', '3, 6, 9', 'Non-profit, artist, doctor, activist'],
  11: ['Visionary, inspiring, highly intuitive', 'Nervous tension, self-doubt', '2, 4, 6, 22', 'Spiritual teacher, artist, counsellor, innovator'],
  22: ['Visionary builder, disciplined, strategic', 'Pressure, fear of failure', '4, 6, 8, 11', 'Architect, founder, diplomat, large-scale leader'],
  33: ['Selfless, nurturing, wise', 'Self-sacrifice, burnout', '6, 9, 11, 22', 'Teacher, healer, social entrepreneur, mentor']
};
for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]) {
  const d = D[n], base = D[n > 9 ? n % 9 || 9 : n], [str, chal, comp, jobs] = LP_EXTRA[n];
  const faq = [[`What is Life Path ${n}?`, `${d.core} Keywords: ${d.kw}.`], [`Who is Life Path ${n} compatible with?`, `Traditionally most compatible with ${comp}.`], [`Best careers for Life Path ${n}?`, jobs + '.']];
  pages.push({
    path: `life-path/${n}/`, ogType: 'article', sticky: true,
    title: `Life Path Number ${n}: Personality, Love, Career & Compatibility | 76633.com`,
    desc: `Life Path ${n} meaning — ${d.kw}. Strengths, challenges, love compatibility and best careers.`,
    schema: [crumbSchema([['life-path/', 'Life Path'], [`life-path/${n}/`, `Life Path ${n}`]])],
    body: (R) => `${crumb(R, [['life-path/', 'Life Path'], ['', String(n)]])}
<section style="padding-top:24px"><div class="wrap"><div class="num-hero"><div class="num-badge">${n}</div><div><span class="eyebrow">Life Path number</span><h1>Life Path ${n}: ${d.name}</h1><p class="muted">${esc(d.kw)} · Planet ${d.planet} · Colour ${d.color}</p></div></div>
<div class="article mt"><article>
<div class="tldr"><b>In one line:</b> ${esc(d.core)}</div>
<div class="ad" data-ad="inArticle"></div>
<h2>Personality</h2><p>${esc(base.spirit)} ${n > 9 ? `As a master number, ${n} also carries the lessons of ${n % 9 || 9} at a higher intensity.` : ''}</p>
<div class="grid g2"><div class="card"><h3>Strengths</h3><p class="mb0">${str}</p></div><div class="card"><h3>Challenges</h3><p class="mb0">${chal}</p></div></div>
<h2>Love & relationships</h2><p>${esc(base.love)} Most compatible Life Paths: <b>${comp}</b>. <a href="${R}tools/compatibility/">Check your compatibility →</a></p>
<h2>Career & money</h2><p>${esc(base.career)} Suited careers: ${jobs}.</p>
<div class="lead-box" style="margin:26px 0"><h3>Go deeper than your Life Path</h3><p class="muted">Your name, birthday and personal year change the picture. Get a free personalised snapshot.</p><a class="btn btn-gold" href="${R}free-reading/">Get my free reading →</a></div>
<h2>Growth advice</h2><p>${esc(base.warn)} ${esc(base.act)}</p>
<h2>Angel numbers linked to ${n}</h2>${chips(R, POPULAR.filter((x) => x.length > 1 && x.split('').every((c) => c === String(n)[0])).slice(0, 4).concat(n <= 9 ? [String(n)] : []))}
<h2>FAQ</h2>${faqHTML(faq)}
<h3 class="mt">Share</h3><div class="share" data-share></div>
</article><aside><div class="card toc"><b>Other Life Paths</b><div class="num-chips mt">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].filter((x) => x !== n).map((x) => `<a href="${R}life-path/${x}/">${x}</a>`).join('')}</div><div class="ad" data-ad="sidebar"></div></div></aside></div></div></section>`
  });
}

// ---------- Tool pages ----------
for (const t of TOOLS) {
  const faq = [[`Is the ${t.name} free?`, 'Yes — free, instant and no sign-up. Calculations run in your browser.'], ['How accurate is it?', 'It follows the standard published method for this calculation. Numerology is symbolic, so treat the result as a reflection tool.']];
  pages.push({
    path: `tools/${t.slug}/`, sticky: true,
    title: `${t.name} — Free & Instant | 76633.com`, desc: `${t.short} ${t.about}`.slice(0, 158),
    schema: [crumbSchema([['tools/', 'Tools'], [`tools/${t.slug}/`, t.name]]), { '@context': 'https://schema.org', '@type': 'WebApplication', name: t.name, applicationCategory: 'LifestyleApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url: `${SITE_URL}/tools/${t.slug}/` }],
    body: (R) => `${crumb(R, [['tools/', 'Tools'], ['', t.name]])}
<section style="padding-top:24px"><div class="wrap"><div class="article"><div>
<span class="eyebrow">Free tool</span><h1>${t.name}</h1><p class="lead muted">${t.short}</p>
<form class="card" data-tool="${t.tool}">${t.form}<button class="btn btn-gold btn-block" type="submit">Calculate</button></form>
<div class="result" id="res" aria-live="polite"></div>
<div class="ad" data-ad="inArticle"></div>
<div class="prose"><h2>How it works</h2><p>${t.about}</p><h2>FAQ</h2>${faqHTML(faq)}</div>
<h3 class="mt">Share this tool</h3><div class="share" data-share></div></div>
<aside><div class="card toc"><b>More free tools</b>${TOOLS.filter((x) => x !== t).map((x) => `<a href="${R}tools/${x.slug}/">${x.icon} ${x.name}</a>`).join('')}<div class="ad" data-ad="sidebar"></div></div></aside></div></div></section>`
  });
}

// ---------- Write pages ----------
const yq = (v) => JSON.stringify(String(v));
for (const p of pages) {
  const file = p.flat ? path.join(OUT, p.path) : path.join(OUT, p.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (!J) { fs.writeFileSync(file, layout(p).replace(/\n\s*\n/g, '\n')); continue; }
  const fm = ['---', `layout: ${p.number ? 'number' : 'default'}`, `title: ${yq(p.title)}`, `description: ${yq(p.desc)}`];
  if (p.flat) fm.push(`permalink: /${p.path}`);
  if (p.ogType) fm.push(`og_type: ${p.ogType}`);
  if (p.noindex) fm.push('noindex: true', 'sitemap: false');
  if (p.sticky) fm.push('sticky: true');
  if (p.noNewsletter) fm.push('no_newsletter: true');
  if (p.number) Object.entries(p.number).forEach(([k, v]) => fm.push(`${k}: ${JSON.stringify(v)}`));
  fm.push('---');
  const schema = (p.schema || []).map((x) => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('');
  const content = p.number ? '' : schema + p.body(JR);
  fs.writeFileSync(file, fm.join('\n') + '\n' + content.replace(/\n\s*/g, '\n') + '\n');
}
if (J) {
  fs.mkdirSync(path.join(OUT, '_layouts'), { recursive: true });
  fs.writeFileSync(path.join(OUT, '_layouts/default.html'), jekyllLayout());
  const U = '{{ site.url }}{{ site.baseurl }}';
  const numSchema = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"${U}/"},{"@type":"ListItem","position":2,"name":"Angel Numbers","item":"${U}/angel-numbers/"},{"@type":"ListItem","position":3,"name":"{{ page.n }}","item":"${U}/angel-numbers/{{ page.n }}/"}]}</script><script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"{{ page.n }} Angel Number Meaning","author":{"@type":"Organization","name":"76633.com Editorial"},"publisher":{"@type":"Organization","name":"76633.com"},"dateModified":"2026-09-27","mainEntityOfPage":"${U}/angel-numbers/{{ page.n }}/"}</script>\n`;
  fs.writeFileSync(path.join(OUT, '_layouts/number.html'), '---\nlayout: default\n---\n' + numSchema + numberChrome(JR, { n: '{{ page.n }}', plabel: '{{ page.plabel | escape }}', root: '{{ page.root }}', kw: '{{ page.kw | escape }}' }, '{{ content }}' + NUMBER_LIQUID));
  fs.mkdirSync(path.join(OUT, '_data'), { recursive: true });
  fs.writeFileSync(path.join(OUT, '_data/d.json'), JSON.stringify(digitData(), null, 1));
  fs.writeFileSync(path.join(OUT, '_data/why.json'), JSON.stringify(WHY, null, 1));
}

// ---------- Assets & site files ----------
fs.cpSync('assets', path.join(OUT, 'assets'), { recursive: true });
const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter((p) => !p.noindex && !p.flat).map((p) => `<url><loc>${SITE_URL}/${p.path}</loc><lastmod>${today}</lastmod><priority>${p.path === '' ? '1.0' : p.path.startsWith('angel-numbers/') || p.path.startsWith('tools/') ? '0.8' : '0.6'}</priority></url>`);
if (!J) fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `${J ? '---\nlayout: null\nsitemap: false\n---\n' : ''}User-agent: *\nAllow: /\nDisallow: /angel-numbers/lookup/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, 'ads.txt'), '# Google AdSense: replace pub-0000000000000000 with your publisher id once approved\n# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0\n');
if (!J) fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
else fs.writeFileSync(path.join(OUT, '_config.yml'), `# 76633.com — GitHub Pages (Jekyll) configuration
title: 76633.com
description: Angel number meanings and free numerology calculators.
# While hosted at webworksa1.github.io/76633-com:
url: "https://webworksa1.github.io"
baseurl: "/76633-com"
# When the custom domain 76633.com points here, change to:
#   url: "https://76633.com"
#   baseurl: ""
# and add a CNAME file containing: 76633.com
plugins:
  - jekyll-sitemap
exclude: [build, docs, dist, site, node_modules, README.md, package.json, package-lock.json, LICENSE]
defaults:
  - scope: { path: "" }
    values: { layout: default }
`);
fs.writeFileSync(path.join(OUT, 'manifest.webmanifest'), JSON.stringify({ name: '76633.com — Number Meanings', short_name: '76633', start_url: './', display: 'standalone', background_color: '#0b0b1a', theme_color: '#0b0b1a', icons: [{ src: 'assets/img/icon.svg', sizes: 'any', type: 'image/svg+xml' }, { src: 'assets/img/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }] }));
fs.writeFileSync(path.join(OUT, 'sw.js'), `const C='76633-v1';const CORE=['./','assets/css/style.css','assets/js/app.js','assets/js/core.js','assets/js/render.js','assets/js/config.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
`);
if (process.env.CNAME) fs.writeFileSync(path.join(OUT, 'CNAME'), process.env.CNAME + '\n');
console.log(`Built ${pages.length} pages → ${J ? 'site' : 'dist'}/`);
