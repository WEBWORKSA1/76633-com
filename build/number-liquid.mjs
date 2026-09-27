// Jekyll/Liquid version of render.js numberBody(): assembles angel-number readings at build time on GitHub Pages
// from _data/d.json (digit texts) + per-page front matter (computed values). Keeps each number page ~1 KB.
import { D, report, POPULAR, reduce, trail } from '../assets/js/core.js';

const first = (t) => t.split('.')[0] + '.';
const lc1 = (t) => t.charAt(0).toLowerCase() + t.slice(1);

export function digitData() {
  const out = {};
  for (const [k, d] of Object.entries(D)) {
    out[k] = { name: d.name, kw: d.kw, kw1: d.kw.split(',')[0], planet: d.planet, color: d.color, core: d.core };
    if (d.spirit) Object.assign(out[k], {
      spirit: d.spirit, spirit1: first(d.spirit), love: d.love, love_tail: d.love.split('.').slice(-2).join('.').trim() || d.love,
      tf: d.tf, career: d.career, career1: first(d.career), warn: d.warn, warn1: first(d.warn), warn_lc: lc1(d.warn), act: d.act, bible: d.bible
    });
  }
  return out;
}

const WHY = [
  'Numbers like NUM show up on clocks, receipts, licence plates and phone screens. In numerology, repetition is the signal: your attention keeps snagging on the same pattern because it mirrors something you are already thinking about.',
  'If NUM keeps appearing, notice what was on your mind the moment you saw it. That thought is usually the real subject of the message.',
  'Psychologists call it the frequency illusion; numerologists call it synchronicity. Either way, NUM has become meaningful to you — which makes it a useful prompt for reflection.'
];

// Front-matter record for one number (computed values only; digit texts come from _data/d.json)
export function numberFM(n) {
  const r = report(n);
  const pick = (a, s) => a[s % a.length];
  const rb = reduce(r.root, false);
  const order = r.breakdown.map((b) => b.d);
  return {
    n, lead: String(r.lead), second: order[1] !== undefined ? String(order[1]) : '', rootd: String(r.root), rootb: String(rb), root: r.root, total: r.total,
    plabel: r.pattern.label, kw: D[r.lead].kw, sum: n.split('').join(' + '), trail: (trail(r.total).includes('→') ? `, then ${trail(r.total)}` : '') + (r.root > 9 && r.root !== reduce(r.total) ? `, but ${n} is itself a master number, so it is kept whole` : ''), master: r.root > 9,
    tldr: r.tldr, why: r.seed % 3, kwlist: r.faq[1][1].match(/carries (.*) energy/)[1],
    rows: r.breakdown.map((b) => `${b.d}|${b.n}|${b.weight}`), order: order.map(String),
    p_single: pick(['be the one who reaches out first', 'say yes to the invitation', 'let people see the real you', 'raise your standards, not your walls'], r.seed),
    p_couple: pick(['Plan something new together this month.', 'Have the honest conversation you have been postponing.', 'Protect time that is only for the two of you.', 'Celebrate how far you have come together.'], r.seed + 1),
    p_money: pick(['track every rupee or dollar for 30 days', 'raise your price or ask for the raise', 'turn one skill into a paid offer', 'cut one expense that no longer serves you'], r.seed + 2),
    p_goal: pick(['work and money', 'relationships and home', 'health and routine', 'learning and creativity'], r.seed + rb),
    p_act: r.actions[2], chinese: r.chinese,
    related: r.related.map((x) => (POPULAR.includes(x) ? `${x}|angel-numbers/${x}/` : `${x}|angel-numbers/lookup/?n=${x}`))
  };
}

// The Liquid body (mirrors render.js numberBody in lean mode)
export const NUMBER_LIQUID = `{% assign d = site.data.d %}{% assign L = d[page.lead] %}{% assign RB = d[page.rootb] %}{% assign RD = d[page.rootd] %}{% if page.second != '' %}{% assign S2 = d[page.second] %}{% endif %}{% assign R = site.baseurl | append: '/' %}
<div class="tldr" id="meaning"><b>{{ page.n }} in one line:</b> {{ page.tldr | escape }}</div>
<div class="ad" data-ad="inArticle"></div>
<h2 id="why">Why you keep seeing {{ page.n }}</h2><p>{{ site.data.why[page.why] | replace: 'NUM', page.n }}</p>
<h2 id="breakdown">Numerology breakdown of {{ page.n }}</h2>
<p><b>Pattern:</b> {{ page.plabel | escape }}. <b>Sum:</b> {{ page.sum }} = {{ page.total }} → <b>root {{ page.root }}</b>. Ruling planet: {{ RB.planet }} · Colour: {{ RB.color }}.</p>
<div style="overflow-x:auto"><table><thead><tr><th>Digit</th><th>Count</th><th>Energy</th><th>Weight</th></tr></thead><tbody>{% for row in page.rows %}{% assign c = row | split: '|' %}{% assign k = c[0] %}{% assign x = d[k] %}<tr><td><b>{{ c[0] }}</b> · {{ x.name }}</td><td>{{ c[1] }}×</td><td>{{ x.kw | escape }}</td><td style="min-width:90px"><div class="bar"><i style="width:{{ c[2] }}%"></i></div></td></tr>{% endfor %}</tbody></table></div>
<h2 id="spiritual">Spiritual meaning of {{ page.n }}</h2><p>{{ page.plabel | escape }}. {{ L.spirit | escape }} {% if S2 %}{{ S2.spirit1 | escape }}{% endif %} The root {{ page.root }} adds: {{ RD.core | escape }}</p>
<h2 id="love">{{ page.n }} meaning in love</h2><p><b>If you are single:</b> {{ L.love_tail | escape }} With {{ page.n }}, {{ page.p_single }}.</p><p><b>If you are in a relationship:</b> {{ RB.love | escape }} {{ page.p_couple }}</p>
<h2 id="twin-flame">{{ page.n }} and twin flames</h2><p>{{ L.tf | escape }} {% if page.master %}The master-number root intensifies the spiritual side of this bond.{% else %}{{ RB.tf | escape }}{% endif %}</p>
<h2 id="career">{{ page.n }} for career &amp; money</h2><p>{{ L.career | escape }} {% if S2 %}{{ S2.career1 | escape }}{% endif %} Money angle: {{ page.p_money }}.</p>
<div class="ad" data-ad="inArticle"></div>
<h2 id="manifest">Manifesting with {{ page.n }}</h2><p>Use {{ page.n }} as a manifestation cue: every time you see it, restate one clear intention in the present tense. Root {{ page.root }} energy ({{ RB.kw1 }}) favours goals about {{ page.p_goal }}.</p>
<h2 id="biblical">Biblical symbolism</h2><p>{% for o in page.order %}{{ o }}: {{ d[o].bible | escape }} {% endfor %}</p>
<h2 id="chinese">{{ page.n }} in Chinese number culture</h2><p>{{ page.chinese | escape }}</p>
<h2 id="warning">The shadow side of {{ page.n }}</h2><p>{{ L.warn | escape }} {% if S2 %}{{ S2.warn1 | escape }}{% endif %} {{ page.n }} is not an omen of bad luck — no number is. Treat it as feedback, not fate.</p>
<h2 id="action">What to do when you see {{ page.n }}</h2>
<ol><li>{{ L.act | escape }}</li><li>{{ RB.act | escape }}</li><li>{{ page.p_act | escape }}</li></ol>
<p><b>Journaling prompts:</b></p><ul><li>What was I thinking about the last time I saw {{ page.n }}?</li><li>Where in my life do I need more {{ L.kw1 }}?</li><li>What would I do this week if I trusted the message of {{ page.root }}?</li></ul>
<h2 id="faq">{{ page.n }} FAQ</h2>
<details><summary>What does {{ page.n }} mean?</summary><p class="mb0">{{ page.tldr | escape }}</p></details>
<details><summary>Is {{ page.n }} a good or bad number?</summary><p class="mb0">Neither. {{ page.n }} carries {{ page.kwlist }} energy. The only “warning” side is {{ L.warn_lc | escape }}</p></details>
<details><summary>What does {{ page.n }} mean in love?</summary><p class="mb0">{{ RB.love | escape }}</p></details>
<details><summary>What is the root number of {{ page.n }}?</summary><p class="mb0">Add the digits: {{ page.sum }} = {{ page.total }}{{ page.trail }}. Root: {{ page.root }}.</p></details>
<details><summary>What should I do when I see {{ page.n }}?</summary><p class="mb0">{{ L.act | escape }} {{ RB.act | escape }}</p></details>
<h2>Related numbers</h2><div class="num-chips">{% for rel in page.related %}{% assign q = rel | split: '|' %}<a href="{{ R }}{{ q[1] }}">{{ q[0] }}</a>{% endfor %}</div>`;

export { WHY };
