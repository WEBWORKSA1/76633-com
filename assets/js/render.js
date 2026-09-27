// Shared HTML renderer for number reports (used by the static builder and the live lookup page)
import { POPULAR } from './core.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
export const numUrl = (n, R) => (POPULAR.includes(n) ? `${R}angel-numbers/${n}/` : `${R}angel-numbers/lookup/?n=${n}`);

export const TOC = [
  ['meaning', 'Quick meaning'], ['why', 'Why you keep seeing it'], ['breakdown', 'Digit breakdown'], ['spiritual', 'Spiritual meaning'],
  ['love', 'Love & relationships'], ['twin-flame', 'Twin flame'], ['career', 'Career & money'], ['manifest', 'Manifestation'],
  ['biblical', 'Biblical symbolism'], ['chinese', 'Chinese number culture'], ['warning', 'The shadow side'], ['action', 'What to do next'], ['faq', 'FAQ']
];

export function numberBody(r, R, lean = false) {
  const s = r.s;
  const rows = r.breakdown.map((b) => `<tr><td><b>${b.d}</b> · ${b.name}</td><td>${b.n}×</td><td>${esc(b.kw)}</td><td style="min-width:90px"><div class="bar"><i style="width:${b.weight}%"></i></div></td></tr>`).join('');
  const faq = r.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p class="mb0">${esc(a)}</p></details>`).join('');
  const rel = r.related.map((n) => `<a href="${numUrl(n, R)}">${n}</a>`).join('');
  return `
<div class="tldr" id="meaning"><b>${s} in one line:</b> ${esc(r.tldr)}</div>
<div class="ad" data-ad="inArticle"></div>
<h2 id="why">Why you keep seeing ${s}</h2><p>${esc(r.why)}</p>
<h2 id="breakdown">Numerology breakdown of ${s}</h2>
<p><b>Pattern:</b> ${esc(r.pattern.label)}. <b>Sum:</b> ${s.split('').join(' + ')} = ${r.total} → <b>root ${r.root}</b>. Ruling planet: ${esc(r.planet)} · Colour: ${esc(r.color)}.</p>
<div style="overflow-x:auto"><table><thead><tr><th>Digit</th><th>Count</th><th>Energy</th><th>Weight</th></tr></thead><tbody>${rows}</tbody></table></div>
<h2 id="spiritual">Spiritual meaning of ${s}</h2><p>${esc(r.spiritual)}</p>
<h2 id="love">${s} meaning in love</h2><p><b>If you are single:</b> ${esc(r.love.single)}</p><p><b>If you are in a relationship:</b> ${esc(r.love.couple)}</p>
${lean ? '' : leadBox(s, R)}
<h2 id="twin-flame">${s} and twin flames</h2><p>${esc(r.twin)}</p>
<h2 id="career">${s} for career & money</h2><p>${esc(r.career)}</p>
<div class="ad" data-ad="inArticle"></div>
<h2 id="manifest">Manifesting with ${s}</h2><p>${esc(r.manifest)}</p>
<h2 id="biblical">Biblical symbolism</h2><p>${esc(r.bible)}</p>
<h2 id="chinese">${s} in Chinese number culture</h2><p>${esc(r.chinese)}</p>
<h2 id="warning">The shadow side of ${s}</h2><p>${esc(r.warning)}</p>
<h2 id="action">What to do when you see ${s}</h2>
<ol>${r.actions.map((a) => `<li>${esc(a)}</li>`).join('')}</ol>
<p><b>Journaling prompts:</b></p><ul>${r.prompts.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
${lean ? '' : videoBox()}
<h2 id="faq">${s} FAQ</h2>${faq}
<h2>Related numbers</h2><div class="num-chips">${rel}</div>${lean ? '' : `<h3 class="mt">Share ${s}</h3><div class="share" data-share></div>`}`;
}

export function tocHTML() {
  return TOC.map(([id, t]) => `<a href="#${id}">${t}</a>`).join('');
}

export const leadBox = (s, R) => `<div class="lead-box" style="margin:26px 0"><span class="eyebrow">Free personal reading</span><h3>Want to know what ${s} means for <em>you</em>?</h3><p class="muted">Your birth date changes the message. Get a free personalised numerology snapshot in your inbox.</p><a class="btn btn-gold" href="${R}free-reading/?n=${s}">Get my free reading →</a></div>`;
export const videoBox = () => `<div class="card" style="margin:24px 0"><h3>Watch: angel numbers explained</h3><div class="vid soon" data-yt=""></div><p class="small muted mt">New videos every week. <a data-yt-sub href="#">Subscribe on YouTube →</a></p></div>`;
