import { D, POPULAR, report } from '../assets/js/core.js';
import { SITE_URL, esc } from './layout.mjs';

const chips = (R, list) => `<div class="num-chips">${list.map((n) => `<a href="${R}angel-numbers/${n}/">${n}</a>`).join('')}</div>`;
const searchForm = (ph = 'Type the number you keep seeing… e.g. 444') => `<form class="search" data-numsearch role="search"><input name="q" inputmode="numeric" pattern="[0-9: ]*" aria-label="Number" placeholder="${ph}" required><button class="btn btn-gold" type="submit">Decode</button></form>`;
const faqSchema = (qs) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: qs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const faqHTML = (qs) => qs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p class="mb0">${esc(a)}</p></details>`).join('');
export const crumb = (R, items) => `<nav class="crumbs wrap" aria-label="Breadcrumb"><a href="${R}">Home</a>${items.map(([u, t]) => ` / ${u ? `<a href="${R}${u}">${t}</a>` : t}`).join('')}</nav>`;
export const crumbSchema = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['', 'Home'], ...items].map(([u, t], i) => ({ '@type': 'ListItem', position: i + 1, name: t, item: `${SITE_URL}/${u}` })) });

export const TOOLS = [
  { slug: 'life-path-calculator', icon: '✦', name: 'Life Path Calculator', short: 'Your core number from your birth date.', tool: 'lifepath',
    form: `<div class="field"><label for="dob">Date of birth</label><input id="dob" name="dob" type="date" required></div>`,
    about: 'Your Life Path number is the most important number in Pythagorean numerology. We reduce the month, day and year separately, then add them — keeping master numbers 11, 22 and 33 intact.' },
  { slug: 'name-numerology', icon: 'Aa', name: 'Name Numerology Calculator', short: 'Expression, Soul Urge & Personality numbers.', tool: 'name',
    form: `<div class="field"><label for="fn">Full birth name</label><input id="fn" name="fullname" required placeholder="As on your birth certificate"></div><div class="field"><label for="sys">System</label><select id="sys" name="system"><option value="pythagorean">Pythagorean (Western)</option><option value="chaldean">Chaldean (Indian / Vedic practice)</option></select></div>`,
    about: 'Each letter carries a number. Pythagorean numerology maps A–I to 1–9 and repeats; Chaldean numerology uses sound-based values from 1 to 8. Vowels reveal your Soul Urge, consonants your outer Personality.' },
  { slug: 'compatibility', icon: '♥', name: 'Love Compatibility Calculator', short: 'Compare two life path numbers.', tool: 'compat',
    form: `<div class="row"><div class="field"><label for="d1">Your birth date</label><input id="d1" name="dob1" type="date" required></div><div class="field"><label for="d2">Partner’s birth date</label><input id="d2" name="dob2" type="date" required></div></div>`,
    about: 'Traditional numerology groups numbers into natural matches (1-5-7, 2-4-8, 3-6-9), compatible pairs and growth pairs. Use the score as a conversation starter, not a verdict.' },
  { slug: 'mobile-number-numerology', icon: '☎', name: 'Mobile Number Numerology', short: 'Is your phone number lucky for you?', tool: 'mobile',
    form: `<div class="field"><label for="ph">Mobile number</label><input id="ph" name="phone" inputmode="tel" required placeholder="e.g. 98765 43210"></div><div class="field"><label for="dob">Date of birth</label><input id="dob" name="dob" type="date" required></div>`,
    about: 'Popular across India and Asia: the digits of your mobile number are totalled and compared with your birth number (Mulank) and destiny number (Bhagyank). We also add a Chinese lucky-digit check.' },
  { slug: 'vehicle-number-numerology', icon: '🚗', name: 'Vehicle Number Numerology', short: 'Match a car or bike plate to your birth date.', tool: 'vehicle',
    form: `<div class="field"><label for="pl">Vehicle / licence plate number</label><input id="pl" name="plate" required placeholder="e.g. MH 01 AB 7663"></div><div class="field"><label for="dob">Owner’s date of birth</label><input id="dob" name="dob" type="date" required></div>`,
    about: 'Letters are converted with Chaldean values, digits are added directly, and the total is compared with the owner’s birth numbers — the method most Indian numerologists use.' },
  { slug: 'chinese-lucky-number-checker', icon: '八', name: 'Chinese Lucky Number Checker', short: 'Score any number for 8s, 6s, 9s and 4s.', tool: 'chinese',
    form: `<div class="field"><label for="nm">Any number (phone, plate, price, address)</label><input id="nm" name="num" inputmode="numeric" required placeholder="e.g. 168888"></div>`,
    about: 'Chinese number luck is based on sound: 8 sounds like prosperity, 6 like smooth flow, 9 like longevity, while 4 sounds like death. Combinations like 168, 520 and 1314 carry special meanings.' },
  { slug: 'personal-year-calculator', icon: '⟳', name: 'Personal Year Calculator', short: 'Your theme for this year or any year.', tool: 'year',
    form: `<div class="row"><div class="field"><label for="dob">Date of birth</label><input id="dob" name="dob" type="date" required></div><div class="field"><label for="yr">Year</label><input id="yr" name="year" type="number" min="1900" max="2100" placeholder="2026"></div></div>`,
    about: 'Your Personal Year number runs in a nine-year cycle. Add your birth month and day to the calendar year and reduce to a single digit.' },
  { slug: 'lo-shu-grid', icon: '▦', name: 'Lo Shu Grid Calculator', short: 'Missing numbers & planes from your birth date.', tool: 'loshu',
    form: `<div class="field"><label for="dob">Date of birth</label><input id="dob" name="dob" type="date" required></div>`,
    about: 'The Lo Shu magic square (4-9-2 / 3-5-7 / 8-1-6) is a 4,000-year-old Chinese grid. Place the digits of your birth date into it to see strong, repeated and missing numbers.' },
  { slug: 'lucky-number-calculator', icon: '☘', name: 'Lucky Number Calculator', short: 'Your lucky numbers, day and colour.', tool: 'lucky',
    form: `<div class="field"><label for="fn">Full name</label><input id="fn" name="fullname" required></div><div class="field"><label for="dob">Date of birth</label><input id="dob" name="dob" type="date" required></div>`,
    about: 'Your lucky numbers combine your Life Path, birth number and name number. Traditional associations add a ruling planet, day and colour.' },
  { slug: 'clock-time-decoder', icon: '⏰', name: 'Clock Time Decoder', short: 'Saw 11:11 or 4:44? Decode the time.', tool: 'clock',
    form: `<div class="field"><label for="tm">Time you saw</label><input id="tm" name="time" type="time" required></div>`,
    about: 'Mirror hours (like 12:21) and repeating times (like 11:11) are read the same way as angel numbers. Enter the time and we open its full meaning.' }
];

const toolCards = (R, list = TOOLS) => `<div class="grid g3">${list.map((t) => `<a class="card tool-card" href="${R}tools/${t.slug}/"><div class="ic">${t.icon}</div><h3>${t.name}</h3><p class="muted mb0">${t.short}</p></a>`).join('')}</div>`;

const HOME_FAQ = [
  ['What are angel numbers?', 'Angel numbers are repeating number sequences such as 111, 444 or 1212 that people notice again and again. In numerology each digit carries a meaning, and repetition is read as emphasis — a prompt to pay attention to a theme in your life.'],
  ['Are the calculators free?', 'Yes. Every calculator and number guide on 76633.com is free with no sign-up. Ads and voluntary support keep it that way.'],
  ['Which numerology system do you use?', 'Pythagorean numerology is our default, with Chaldean values available for names and vehicle plates, and Lo Shu / Chinese number culture for grids and lucky-number checks.'],
  ['Is numerology scientific?', 'No. Numerology is a symbolic and cultural tradition, not a science. We present it for entertainment, reflection and cultural education.'],
  ['What does 76633 mean?', '7 + 6 + 6 + 3 + 3 = 25, and 2 + 5 = 7. The number blends 7 (wisdom), 66 (love and care) and 33 (the master teacher), reducing to 7 — the seeker.']
];

export const mainPages = [
  { path: '', title: '76633.com — Angel Number Meanings & Free Numerology Calculators', desc: 'Decode any number you keep seeing. Free angel number meanings, life path, name, compatibility, mobile & vehicle number numerology and Chinese lucky number tools.', sticky: true,
    schema: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: '76633.com', url: `${SITE_URL}/`, potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/angel-numbers/lookup/?n={search_term_string}`, 'query-input': 'required name=search_term_string' } }, { '@context': 'https://schema.org', '@type': 'Organization', name: '76633.com', url: `${SITE_URL}/`, logo: `${SITE_URL}/assets/img/icon-512.png` }, faqSchema(HOME_FAQ)],
    body: (R) => `
<section class="hero"><div class="wrap hero-grid"><div>
<span class="eyebrow">7 · 66 · 33 — the seeker, the nurturer, the teacher</span>
<h1>Keep seeing the same number? <span class="grad-text">Decode it in seconds.</span></h1>
<p class="lead">Free meanings for every angel number, plus 10 numerology calculators — life path, name, love compatibility, mobile and vehicle numbers, Lo Shu grid and Chinese lucky numbers. No sign-up.</p>
${searchForm()}
<div class="trust"><span><b>${POPULAR.length}+</b> in-depth number guides</span><span><b>10</b> free calculators</span><span><b>3</b> numerology systems</span><span><b>0</b> sign-ups needed</span></div>
</div><div class="orbit" aria-hidden="true"><div class="ring"></div><div class="ring"></div><div class="ring"></div><div class="core">7</div><span style="top:2%;left:46%">7</span><span style="top:46%;right:0">66</span><span style="bottom:4%;left:44%">33</span><span style="top:46%;left:0">✦</span></div></div></section>
<section class="sec-sm"><div class="wrap"><span class="eyebrow">Most searched</span><h2>Popular angel numbers</h2>${chips(R, ['111', '222', '333', '444', '555', '666', '777', '888', '999', '1111', '1212', '1234', '1010', '911', '369', '0000'])}<p><a href="${R}angel-numbers/">Browse all angel numbers →</a></p></div></section>
<div class="wrap"><div class="ad" data-ad="top"></div></div>
<section><div class="wrap"><span class="eyebrow">Free calculators</span><h2>Numerology tools people actually use</h2><p class="muted">Results appear instantly on the page. Nothing is stored unless you ask us for a report.</p>${toolCards(R)}</div></section>
<section class="sec-sm"><div class="wrap"><div class="lead-box"><div class="grid g2" style="align-items:center">
<div><span class="eyebrow">Free personalised reading</span><h2>Your numbers, explained for <span class="grad-text">your</span> life</h2><ul class="check-list"><li>Life Path, Expression & Soul Urge decoded</li><li>Your lucky numbers, day and colour</li><li>Personal Year forecast for ${new Date().getFullYear()}</li><li>Delivered by email (or WhatsApp on request)</li></ul></div>
<form data-form="quick-reading" data-ok="Received! Your free snapshot is on its way within 48 hours.">
<div class="field"><label for="q-n">First name</label><input id="q-n" name="name" required autocomplete="given-name"></div>
<div class="row"><div class="field"><label for="q-e">Email</label><input id="q-e" name="email" type="email" required autocomplete="email"></div><div class="field"><label for="q-d">Birth date</label><input id="q-d" name="birth_date" type="date" required></div></div>
<input class="hp" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
<label class="check"><input type="checkbox" name="consent" value="yes" required> I agree to receive my reading and occasional emails. Unsubscribe anytime.</label>
<button class="btn btn-gold btn-block mt" type="submit">Send my free reading ✦</button></form></div></div></div></section>
<section><div class="wrap"><span class="eyebrow">Core numbers</span><h2>Life Path numbers 1–9, 11, 22 & 33</h2><div class="grid g4">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((n) => `<a class="card tool-card" href="${R}life-path/${n}/"><div class="big-num grad-text" style="font-size:2.4rem">${n}</div><p class="muted mb0 small">${esc(D[n].kw)}</p></a>`).join('')}</div></div></section>
<section class="sec-sm"><div class="wrap grid g2" style="align-items:center"><div><span class="eyebrow">The name behind the site</span><h2>What does 76633 mean?</h2><p>Seven is the seeker. Sixty-six doubles the energy of love and care. Thirty-three is the master teacher. Add them up — 7 + 6 + 6 + 3 + 3 = 25 → 7 — and the whole number comes back to wisdom. That is the promise of this site: turn curiosity into insight.</p><a class="btn btn-ghost" href="${R}meaning-of-76633/">Read the full meaning →</a></div>
<div class="card"><h3>Watch & learn</h3><div class="vid soon" data-yt=""></div><p class="small muted mt mb0">Short videos on angel numbers every week. <a data-yt-sub href="#">Subscribe →</a></p></div></div></section>
<section><div class="wrap grid g3">
<div class="card"><span class="eyebrow">Monthly contest</span><h3>Share your number story, win a premium reading</h3><p class="muted">Free to enter. New theme every month.</p><a href="${R}contests/">Enter the contest →</a></div>
<div class="card"><span class="eyebrow">For practitioners</span><h3>Numerologists & astrologers: get clients</h3><p class="muted">List your practice and receive qualified reading requests.</p><a href="${R}partners/">Partner with us →</a></div>
<div class="card"><span class="eyebrow">Keep it free</span><h3>Support independent numerology</h3><p class="muted">Every contribution funds new tools, videos and translations.</p><a href="${R}support/">Become a supporter →</a></div></div></section>
<section class="sec-sm"><div class="wrap prose"><h2>Frequently asked questions</h2>${faqHTML(HOME_FAQ)}</div></section>` },

  { path: 'angel-numbers/', title: 'Angel Numbers A–Z: Meanings for 0–9999 | 76633.com', desc: 'Look up the meaning of any angel number — love, twin flame, career, spiritual and biblical meaning for 111, 222, 333, 444, 1111, 1212 and more.',
    schema: [crumbSchema([['angel-numbers/', 'Angel Numbers']])],
    body: (R) => `${crumb(R, [['', 'Angel Numbers']])}
<section class="hero" style="padding-top:30px"><div class="wrap"><span class="eyebrow">Angel number library</span><h1>Angel number meanings</h1><p class="lead">Type any number — 1 to 12 digits — and get a full reading: numerology breakdown, love, twin flame, career, biblical and Chinese meanings.</p>${searchForm()}</div></section>
<section class="sec-sm"><div class="wrap">
<h2>Single digits 0–9</h2>${chips(R, '0123456789'.split(''))}
<h2 class="mt">Double & master numbers</h2>${chips(R, ['11', '22', '33', '44', '55', '66', '77', '88', '99'])}
<div class="ad" data-ad="inArticle"></div>
<h2>Triple numbers</h2>${chips(R, ['000', '111', '222', '333', '444', '555', '666', '777', '888', '999'])}
<h2 class="mt">Quadruple numbers</h2>${chips(R, ['0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999'])}
<h2 class="mt">Sequences, mirrors & pairs</h2>${chips(R, ['123', '1234', '1010', '1212', '1122', '1133', '1144', '1155', '1221', '1313', '1331', '1414', '1515', '1717', '1818', '1919', '2020', '2121', '2323', '369', '717', '747', '818', '911', '1001', '1011', '76633'])}
<p class="muted mt">Not listed? Every number has a page — just type it in the search box above.</p></div></section>
<section class="sec-sm"><div class="wrap prose"><h2>How we interpret angel numbers</h2><p>Every reading on 76633.com follows the same transparent method: we identify the pattern (repeating, ascending, mirror, pairs), weigh each digit by how often it appears, reduce the number to its root (keeping master numbers 11, 22 and 33), and then combine the traditional meanings. We add Chinese number-culture readings and biblical symbolism so you can compare traditions.</p><p>Angel numbers are a tool for reflection. They cannot predict events and should never replace professional advice.</p></div></section>` },

  { path: 'angel-numbers/lookup/', title: 'Angel Number Lookup | 76633.com', desc: 'Instant meaning for any number you keep seeing.', noindex: true, sticky: true,
    body: (R) => `${crumb(R, [['angel-numbers/', 'Angel Numbers'], ['', 'Lookup']])}
<section style="padding-top:24px"><div class="wrap"><div class="num-hero"><div class="num-badge" id="lkNum">?</div><div><span class="eyebrow">Angel number meaning</span><h1 id="lkH1">Look up any number</h1><p class="muted" id="lkSub">Enter a number to see its full meaning.</p>${searchForm()}</div></div>
<div class="article mt"><article id="lookup"><p class="muted">Type a number above to generate its reading.</p></article><aside><div class="card toc"><b>On this page</b><div id="lkToc"></div><div class="ad" data-ad="sidebar"></div></div></aside></div></div></section>` },

  { path: 'numerology/', title: 'Numerology Explained: Numbers 1–9, Master Numbers & Systems | 76633.com', desc: 'A clear beginner-to-advanced numerology guide: Pythagorean, Chaldean and Lo Shu systems, core numbers, the meanings of 1–9 and master numbers 11, 22, 33.',
    schema: [crumbSchema([['numerology/', 'Numerology']]), { '@context': 'https://schema.org', '@type': 'Article', headline: 'Numerology explained', author: { '@type': 'Organization', name: '76633.com Editorial' } }],
    body: (R) => `${crumb(R, [['', 'Numerology']])}
<section style="padding-top:30px"><div class="wrap prose"><span class="eyebrow">Guide</span><h1>Numerology, explained simply</h1>
<p class="lead muted">Numerology is the symbolic study of numbers and their meanings. It is thousands of years old, appears in many cultures, and today is used mostly for self-reflection, naming, and choosing “lucky” numbers.</p>
<h2>The three systems we use</h2>
<div class="grid g3"><div class="card"><h3>Pythagorean</h3><p class="muted mb0">The Western standard. Letters A–I = 1–9, repeating. Used for Life Path, Expression and Soul Urge.</p></div><div class="card"><h3>Chaldean</h3><p class="muted mb0">Sound-based values 1–8, popular in Indian practice for names, businesses and vehicle numbers.</p></div><div class="card"><h3>Lo Shu & Chinese</h3><p class="muted mb0">The 3×3 magic square and the sound-based luck of numbers like 8, 6 and 9.</p></div></div>
<h2>Your five core numbers</h2><ul><li><b>Life Path</b> — from your full birth date. Your main theme. <a href="${R}tools/life-path-calculator/">Calculate</a></li><li><b>Expression / Destiny</b> — from your full birth name. Your talents. <a href="${R}tools/name-numerology/">Calculate</a></li><li><b>Soul Urge</b> — from the vowels. What you want deep down.</li><li><b>Personality</b> — from the consonants. How others see you.</li><li><b>Birthday (Mulank)</b> — the day you were born, reduced.</li></ul>
<div class="ad" data-ad="inArticle"></div>
<h2>Meanings of numbers 1–9</h2><div style="overflow-x:auto"><table><thead><tr><th>Number</th><th>Keywords</th><th>Planet</th><th>Colour</th></tr></thead><tbody>${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<tr><td><a href="${R}life-path/${n}/"><b>${n}</b></a></td><td>${D[n].kw}</td><td>${D[n].planet}</td><td>${D[n].color}</td></tr>`).join('')}</tbody></table></div>
<h2>Master numbers 11, 22 and 33</h2><p>When a total reduces to 11, 22 or 33 before the final step, numerologists keep it as a “master number”. ${D[11].core} ${D[22].core} ${D[33].core}</p>
<h2>How to calculate your Life Path</h2><p>Reduce the month, day and year separately, then add and reduce again. Example — 15 July 1990: month 7; day 1 + 5 = 6; year 1 + 9 + 9 + 0 = 19 → 10 → 1. Total 7 + 6 + 1 = 14 → 5. Life Path 5.</p>
<p><a class="btn btn-gold" href="${R}tools/life-path-calculator/">Try the calculator</a></p></div></section>` },

  { path: 'life-path/', title: 'Life Path Numbers 1–9, 11, 22, 33: Meanings | 76633.com', desc: 'Traits, love compatibility, careers and challenges for every Life Path number.',
    schema: [crumbSchema([['life-path/', 'Life Path']])],
    body: (R) => `${crumb(R, [['', 'Life Path Numbers']])}<section style="padding-top:30px"><div class="wrap"><span class="eyebrow">Core number</span><h1>Life Path numbers</h1><p class="lead muted">Find your number with the <a href="${R}tools/life-path-calculator/">free calculator</a>, then read your guide.</p>
<div class="grid g4 mt">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33].map((n) => `<a class="card tool-card" href="${R}life-path/${n}/"><div class="big-num grad-text" style="font-size:2.4rem">${n}</div><h3>${D[n].name}</h3><p class="muted mb0 small">${esc(D[n].kw)}</p></a>`).join('')}</div></div></section>` },

  { path: 'tools/', title: 'Free Numerology Calculators & Lucky Number Tools | 76633.com', desc: 'Ten free numerology tools: life path, name, compatibility, mobile number, vehicle number, Chinese lucky number, personal year, Lo Shu grid, lucky number and clock time.',
    schema: [crumbSchema([['tools/', 'Tools']])],
    body: (R) => `${crumb(R, [['', 'Free Tools']])}<section style="padding-top:30px"><div class="wrap"><span class="eyebrow">100% free · no sign-up</span><h1>Numerology calculators</h1><p class="lead muted">Instant results, calculated in your browser. Nothing you type is stored.</p><div class="mt">${toolCards(R)}</div>
<div class="card mt"><h3>Want a tool for your website?</h3><p class="muted">We license white-label calculators and sponsor placements on results pages.</p><a href="${R}advertise/">Sponsorship & licensing →</a></div></div></section>` },

  { path: 'chinese-lucky-numbers/', title: 'Chinese Lucky Numbers: 8, 6, 9, 168, 520 & Unlucky 4 | 76633.com', desc: 'Why 8 is lucky and 4 is avoided in Chinese culture, what 168, 520, 1314 and 666 mean, and how to check any phone number or plate.',
    schema: [crumbSchema([['chinese-lucky-numbers/', 'Chinese Lucky Numbers']])],
    body: (R) => `${crumb(R, [['', 'Chinese Lucky Numbers']])}<section style="padding-top:30px"><div class="wrap prose"><span class="eyebrow">Culture guide</span><h1>Chinese lucky numbers</h1>
<p class="lead muted">In Chinese culture, number luck comes from sound. A number that sounds like a good word is lucky; one that sounds like a bad word is avoided — in phone numbers, licence plates, floor numbers, wedding dates and prices.</p>
<div style="overflow-x:auto"><table><thead><tr><th>Digit</th><th>Character</th><th>Association</th></tr></thead><tbody>
<tr><td>8</td><td>八 bā</td><td>Sounds like 发 fā — wealth & prosperity. The luckiest digit.</td></tr><tr><td>6</td><td>六 liù</td><td>Sounds like 流 liú — things flow smoothly.</td></tr><tr><td>9</td><td>九 jiǔ</td><td>Sounds like 久 jiǔ — long-lasting; linked with the emperor.</td></tr><tr><td>2</td><td>二 èr</td><td>“Good things come in pairs.”</td></tr><tr><td>3</td><td>三 sān</td><td>Sounds like 生 shēng — life and birth (in Cantonese).</td></tr><tr><td>7</td><td>七 qī</td><td>Sounds like 起 “arise” and togetherness; mixed because of the ghost month.</td></tr><tr><td>4</td><td>四 sì</td><td>Sounds like 死 sǐ — death. Often skipped in buildings.</td></tr></tbody></table></div>
<h2>Famous combinations</h2><ul><li><b>168</b> — “all the way to prosperity”.</li><li><b>520</b> — sounds like “I love you”; 20 May is an unofficial love day.</li><li><b>1314</b> — “for a lifetime”, popular for weddings.</li><li><b>518</b> — “I will prosper”.</li><li><b>666</b> — “everything goes smoothly” (very positive in China).</li><li><b>250</b> — slang for a fool; avoid in prices and gifts.</li></ul>
<div class="ad" data-ad="inArticle"></div>
<h2>Check any number</h2><p>Paste a phone number, plate or price into the <a href="${R}tools/chinese-lucky-number-checker/">Chinese lucky number checker</a>.</p>
<h2>Red envelope amounts</h2><p>Gift amounts usually use even numbers and lucky digits: 666, 888, 1,688 or 8,888. Avoid anything with 4. In India a similar custom adds one to round sums — ₹101, ₹501 or ₹1,100 (shagun).</p></div></section>` },

  { path: 'mirror-hours/', title: 'Mirror Hours & Repeating Times: 11:11, 12:21, 4:44 Meanings | 76633.com', desc: 'What it means when you see 11:11, 12:12, 21:12 or 4:44 on a clock — and a decoder for any time.',
    schema: [crumbSchema([['mirror-hours/', 'Mirror Hours']])],
    body: (R) => `${crumb(R, [['', 'Mirror Hours']])}<section style="padding-top:30px"><div class="wrap prose"><span class="eyebrow">Clock numbers</span><h1>Mirror hours & repeating times</h1><p class="lead muted">Seeing the same time again and again — 11:11, 12:21, 3:33 — is the most common way people notice angel numbers.</p>
<div class="card"><form data-tool="clock"><div class="field"><label for="tm">Time you saw</label><input id="tm" name="time" type="time" required></div><button class="btn btn-gold" type="submit">Decode this time</button></form></div>
<h2>Repeating times</h2>${chips(R, ['1111', '2222', '111', '222', '333', '444', '555'])}
<h2>Mirror & pair times</h2>${chips(R, ['1010', '1212', '1221', '2020', '2121', '1331', '1001'])}
<div class="ad" data-ad="inArticle"></div>
<h2>How to read a clock number</h2><p>Drop the colon and read the digits as one number: 12:21 becomes 1221, 4:44 becomes 444. Then read its pattern — mirror times are about reflection and alignment, repeating times amplify a single digit’s theme.</p></div></section>` },

  { path: 'meaning-of-76633/', title: 'Meaning of 76633: 7, 66 & 33 in Numerology | 76633.com', desc: 'The numerology of 76633 — seeker 7, nurturing 66, master teacher 33 — and why it reduces to 7.', ogType: 'article',
    schema: [crumbSchema([['meaning-of-76633/', 'Meaning of 76633']])],
    body: (R) => { const r = report('76633'); return `${crumb(R, [['', 'Meaning of 76633']])}<section style="padding-top:30px"><div class="wrap prose"><span class="eyebrow">Our name</span><h1>The meaning of 76633</h1>
<p class="lead muted">Read it as three parts: <b>7 · 66 · 33</b>.</p>
<div class="grid g3"><div class="card"><div class="big-num grad-text">7</div><h3>The seeker</h3><p class="muted mb0">${D[7].core}</p></div><div class="card"><div class="big-num grad-text">66</div><h3>Double love</h3><p class="muted mb0">${D[6].core} Doubled, it is care for others and care for yourself.</p></div><div class="card"><div class="big-num grad-text">33</div><h3>Master teacher</h3><p class="muted mb0">${D[33].core}</p></div></div>
<h2>The maths</h2><p>7 + 6 + 6 + 3 + 3 = 25, and 2 + 5 = <b>7</b>. The number starts with 7 and returns to 7: curiosity that becomes wisdom. ${esc(r.chinese)}</p>
<h2>Why we chose it</h2><p>A site about decoding numbers should itself be a number worth decoding. 76633 is our reminder to research carefully (7), write with care (66) and teach generously (33).</p>
<p><a class="btn btn-gold" href="${R}angel-numbers/76633/">See the full 76633 reading →</a></p></div></section>`; } }
];

export { toolCards, searchForm, faqHTML, faqSchema, chips };
