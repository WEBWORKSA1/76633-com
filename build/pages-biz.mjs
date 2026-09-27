import { crumb, crumbSchema, faqHTML, faqSchema } from './pages-main.mjs';
import { SITE_URL } from './layout.mjs';

const hp = '<input class="hp" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">';
const consent = (t = 'I agree to be contacted about my request and accept the privacy policy.') => `<label class="check"><input type="checkbox" name="consent" value="yes" required> ${t}</label>`;
const CONTEST_END = '2026-10-31T23:59:00+05:30';

// Edit this list to publish videos: add the YouTube video id to "id".
export const VIDEOS = [
  { id: '', t: '111 Angel Number: what it really means' }, { id: '', t: '444 — protection or pressure?' }, { id: '', t: 'Calculate your Life Path in 60 seconds' },
  { id: '', t: '11:11 and mirror hours explained' }, { id: '', t: 'Is your mobile number lucky? (Indian numerology)' }, { id: '', t: 'Chinese lucky numbers: 8, 168, 520' },
  { id: '', t: 'Life Path compatibility: 3, 6 and 9' }, { id: '', t: 'Master numbers 11, 22, 33' }, { id: '', t: 'The meaning of 76633' }
];

const SUPPORT_FAQ = [
  ['Where does my contribution go?', 'Hosting and tools, new calculators, video production, translations (Hindi, Spanish, Chinese next), contest prizes and paying freelance writers and editors.'],
  ['Is my support tax-deductible?', '76633.com is an independent publication, not a registered charity, so contributions are not tax-deductible.'],
  ['Can I support without paying online?', 'Yes — send a pledge with the form and we will reply with bank, UPI or invoice options. Sharing the site also helps enormously.']
];

export const bizPages = [
  { path: 'free-reading/', title: 'Free Personalised Numerology Reading | 76633.com', desc: 'Get a free personalised numerology snapshot: life path, name numbers, lucky numbers and year-ahead theme. Delivered by email or WhatsApp.', noNewsletter: true,
    schema: [crumbSchema([['free-reading/', 'Free Reading']])],
    body: (R) => `${crumb(R, [['', 'Free Reading']])}
<section style="padding-top:30px"><div class="wrap"><div class="grid g2" style="align-items:start;gap:40px">
<div><span class="eyebrow">Free · personalised · 2 minutes</span><h1>Get your free numerology reading</h1><p class="lead muted">Answer three quick steps. We calculate your core numbers and send a personalised snapshot — plus what the number you keep seeing means for you.</p>
<ul class="check-list"><li><b>Life Path, Expression & Soul Urge</b> with plain-English meanings</li><li><b>Your lucky numbers</b>, day, colour and ruling planet</li><li><b>Your Personal Year</b> theme for the next 12 months</li><li><b>Your repeating number</b> decoded in context</li><li>Optional upgrade to an in-depth premium report or live consultation</li></ul>
<div class="card mt"><p class="mb0"><b>Private by design.</b> Your details are used only to prepare your reading. We never sell your data. Unsubscribe from any email in one click.</p></div></div>
<form class="lead-box" data-form="free-reading" data-steps data-ok="Thank you! Your free reading will arrive within 48 hours. Check your spam folder just in case.">
<div class="steps"><i></i><i></i><i></i></div>
<div class="step"><h3>1. What brings you here?</h3>
<div class="choice"><label><input type="radio" name="focus" value="Love & relationships" required><span>♥ Love & relationships</span></label><label><input type="radio" name="focus" value="Career & money"><span>◆ Career & money</span></label><label><input type="radio" name="focus" value="Spiritual growth"><span>✦ Spiritual growth</span></label><label><input type="radio" name="focus" value="A decision / new start"><span>➜ A decision or new start</span></label></div>
<div class="field"><label for="fr-n">The number you keep seeing (optional)</label><input id="fr-n" name="number" inputmode="numeric" placeholder="e.g. 444"></div>
<button type="button" class="btn btn-gold btn-block" data-next>Continue →</button></div>
<div class="step"><h3>2. Your numbers</h3>
<div class="field"><label for="fr-fn">Full birth name</label><input id="fr-fn" name="full_name" required autocomplete="name"></div>
<div class="field"><label for="fr-d">Date of birth</label><input id="fr-d" name="birth_date" type="date" required></div>
<div class="row"><button type="button" class="btn btn-ghost" data-prev>← Back</button><button type="button" class="btn btn-gold" data-next>Continue →</button></div></div>
<div class="step"><h3>3. Where should we send it?</h3>
<div class="field"><label for="fr-e">Email</label><input id="fr-e" name="email" type="email" required autocomplete="email"></div>
<div class="field"><label for="fr-w">WhatsApp (optional, with country code)</label><input id="fr-w" name="whatsapp" type="tel" placeholder="+91 …" autocomplete="tel"></div>
<div class="field"><label for="fr-l">Preferred language</label><select id="fr-l" name="language"><option>English</option><option>Hindi</option><option>Spanish</option><option>French</option><option>Chinese</option></select></div>
<label class="check"><input type="checkbox" name="premium_interest" value="yes"> I'm also interested in a premium in-depth report or live consultation.</label>
${consent('I agree to receive my reading and occasional emails. I can unsubscribe anytime.')}${hp}
<div class="row mt"><button type="button" class="btn btn-ghost" data-prev>← Back</button><button type="submit" class="btn btn-gold">Send my free reading ✦</button></div></div>
<div class="form-msg"></div></form></div></div></section>
<section class="sec-sm"><div class="wrap grid g3 center"><div class="card"><div class="big-num grad-text">1</div><p class="mb0">Answer 3 quick steps</p></div><div class="card"><div class="big-num grad-text">2</div><p class="mb0">We calculate & interpret your numbers</p></div><div class="card"><div class="big-num grad-text">3</div><p class="mb0">Your snapshot arrives within 48 hours</p></div></div></section>` },

  { path: 'consult/', title: 'Book a Numerology Consultation — Name, Business & Number Selection | 76633.com', desc: 'One-to-one numerology consultations: business and brand names, baby names, mobile and vehicle number selection, launch dates and personal readings.',
    schema: [crumbSchema([['consult/', 'Consultation']])],
    body: (R) => `${crumb(R, [['', 'Consultation']])}
<section style="padding-top:30px"><div class="wrap"><span class="eyebrow">One-to-one</span><h1>Numerology consultations</h1><p class="lead muted">For decisions that matter — naming a business, choosing a number, picking a date — get a personal session with a vetted numerologist from our partner network.</p>
<div class="grid g3 mt">
<div class="card tier"><h3>Personal reading</h3><p class="muted">Full chart: life path, name, personal year, Lo Shu grid, lucky numbers.</p><ul><li>PDF report</li><li>30-min video / phone call</li><li>Follow-up questions by email</li></ul></div>
<div class="card tier pop"><span class="badge">Most requested</span><h3>Business & brand name</h3><p class="muted">Company, product, domain or shop name analysis — Pythagorean and Chaldean.</p><ul><li>Up to 10 name options scored</li><li>Launch / registration date suggestions</li><li>Logo colour guidance</li></ul></div>
<div class="card tier"><h3>Number selection</h3><p class="muted">Mobile number, vehicle plate, house or flat number matched to your birth chart.</p><ul><li>Up to 20 candidate numbers scored</li><li>Chinese lucky-digit check</li><li>Best purchase / registration dates</li></ul></div></div></div></section>
<section class="sec-sm"><div class="wrap"><form class="lead-box" data-form="consultation" data-ok="Request received! We'll reply within 24–48 hours with availability and pricing.">
<h2>Request a consultation</h2>
<div class="row"><div class="field"><label for="c-n">Name</label><input id="c-n" name="name" required></div><div class="field"><label for="c-e">Email</label><input id="c-e" name="email" type="email" required></div></div>
<div class="row"><div class="field"><label for="c-p">Phone / WhatsApp</label><input id="c-p" name="phone" type="tel"></div><div class="field"><label for="c-t">Consultation type</label><select id="c-t" name="type" required><option value="">Choose…</option><option>Personal reading</option><option>Business & brand name</option><option>Baby name</option><option>Mobile number selection</option><option>Vehicle number selection</option><option>House / property number</option><option>Launch or wedding date</option><option>Other</option></select></div></div>
<div class="row"><div class="field"><label for="c-b">Budget</label><select id="c-b" name="budget"><option>Under $50</option><option>$50–$150</option><option>$150–$500</option><option>$500+ (business)</option></select></div><div class="field"><label for="c-u">Timeline</label><select id="c-u" name="timeline"><option>This week</option><option>This month</option><option>Just exploring</option></select></div></div>
<div class="field"><label for="c-m">Tell us about your situation</label><textarea id="c-m" name="message" required></textarea></div>
${consent()}${hp}<button class="btn btn-gold mt" type="submit">Request my consultation</button><div class="form-msg"></div></form></div></section>` },

  { path: 'partners/', title: 'Partner With 76633.com — Numerologists, Astrologers & Brands | 76633.com', desc: 'Join the 76633.com partner network: receive qualified reading requests, feature your practice, co-create content or license our calculators.',
    schema: [crumbSchema([['partners/', 'Partners']])],
    body: (R) => `${crumb(R, [['', 'Partners']])}
<section style="padding-top:30px"><div class="wrap"><span class="eyebrow">Grow with us</span><h1>Partner with 76633.com</h1><p class="lead muted">People arrive here with a question about a number. Many want a real person to answer it. If you are a numerologist, astrologer, vastu or feng shui consultant, author, app or brand in this space — let's work together.</p>
<div class="grid g4 mt"><div class="card"><h3>Lead referrals</h3><p class="muted mb0">Receive consultation requests matched to your specialty and language.</p></div><div class="card"><h3>Featured listing</h3><p class="muted mb0">A profile in our practitioner directory, linked from relevant number pages.</p></div><div class="card"><h3>Content & video</h3><p class="muted mb0">Guest articles, expert quotes, YouTube collaborations.</p></div><div class="card"><h3>Tool licensing</h3><p class="muted mb0">Embed our calculators on your site with your branding.</p></div></div></div></section>
<section class="sec-sm"><div class="wrap"><form class="lead-box" data-form="partner-application" data-ok="Thanks! We review partner applications within 5 business days.">
<h2>Apply to partner</h2>
<div class="row"><div class="field"><label for="p-n">Name / business</label><input id="p-n" name="name" required></div><div class="field"><label for="p-e">Email</label><input id="p-e" name="email" type="email" required></div></div>
<div class="row"><div class="field"><label for="p-w">Website or social profile</label><input id="p-w" name="website" type="url" placeholder="https://"></div><div class="field"><label for="p-t">Partnership type</label><select id="p-t" name="type"><option>Lead referrals</option><option>Featured listing</option><option>Content / video collaboration</option><option>Tool licensing</option><option>Affiliate / product</option><option>Other</option></select></div></div>
<div class="row"><div class="field"><label for="p-x">Experience (years)</label><input id="p-x" name="experience" type="number" min="0"></div><div class="field"><label for="p-l">Languages</label><input id="p-l" name="languages" placeholder="English, Hindi…"></div></div>
<div class="field"><label for="p-m">Tell us about your work</label><textarea id="p-m" name="message" required></textarea></div>
${consent()}${hp}<button class="btn btn-gold mt" type="submit">Submit application</button><div class="form-msg"></div></form></div></section>` },

  { path: 'support/', title: 'Support 76633.com — Donate, Become a Member or Sponsor | 76633.com', desc: 'Keep every numerology tool free. Make a one-time contribution, become a monthly supporter, fund contest prizes or sponsor a calculator.',
    schema: [crumbSchema([['support/', 'Support']]), faqSchema(SUPPORT_FAQ)],
    body: (R) => `${crumb(R, [['', 'Support']])}
<section style="padding-top:30px"><div class="wrap"><div class="grid g2" style="align-items:start;gap:40px"><div>
<span class="eyebrow">Free forever — powered by you</span><h1>Support 76633.com</h1><p class="lead muted">Every calculator, number guide and video here is free. Your support pays for new tools, translations, videos, contest prizes and the people who make them.</p>
<h3>This quarter's goal: launch Hindi & Spanish editions</h3><div class="progress"><i style="width:3%"></i></div><p class="small muted">Just launched — be one of our first supporters. Progress is updated manually as support arrives.</p>
<h3 class="mt">Where your support goes</h3><ul class="check-list"><li><b>Operations</b> — hosting, domains, security, tools</li><li><b>Promotion & marketing</b> — reaching new readers</li><li><b>Hiring talent</b> — writers, editors, video creators, translators</li><li><b>Contests & prizes</b> — monthly community giveaways</li></ul></div>
<form class="lead-box" data-form="donation-pledge" data-ok="Thank you for your generosity! We'll reply with secure payment details within 24 hours.">
<h3>Make a contribution</h3>
<div data-paybox><p class="small muted">Pay instantly:</p><div id="payLinks" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px"></div><p class="small muted">— or send a pledge and we'll send you payment options —</p></div>
<div class="field"><label>Choose an amount (USD)</label><div class="amounts" data-amounts><button type="button" data-v="5">$5</button><button type="button" data-v="11" class="on">$11</button><button type="button" data-v="33">$33</button><button type="button" data-v="77">$77</button><button type="button" data-v="other">Other</button></div><input name="amount" value="11" aria-label="Amount"></div>
<div class="field"><label for="d-f">Frequency</label><select id="d-f" name="frequency"><option>One-time</option><option>Monthly</option><option>Yearly</option></select></div>
<div class="field"><label for="d-p">Purpose</label><select id="d-p" name="purpose"><option>General operations</option><option>Promotion & marketing</option><option>Hiring talent</option><option>Contest prizes</option><option>Translations</option></select></div>
<div class="row"><div class="field"><label for="d-n">Name</label><input id="d-n" name="name" required></div><div class="field"><label for="d-e">Email</label><input id="d-e" name="email" type="email" required></div></div>
<div class="field"><label for="d-m">Message (optional — shown on the supporter wall if you allow)</label><input id="d-m" name="message"></div>
<label class="check"><input type="checkbox" name="public_credit" value="yes"> Show my first name on the supporter wall</label>${hp}
<button class="btn btn-gold btn-block mt" type="submit">Pledge my support ♥</button><div class="form-msg"></div></form></div></div></section>
<section class="sec-sm"><div class="wrap"><span class="eyebrow">Monthly membership</span><h2>Become a member</h2><div class="grid g3">
<div class="card tier"><h3>Seeker</h3><div class="price">$3<span class="small muted">/mo</span></div><ul><li>Supporter badge & wall credit</li><li>Members-only weekly forecast</li><li>Early access to new tools</li></ul></div>
<div class="card tier pop"><span class="badge">Best value</span><h3>Nurturer</h3><div class="price">$9<span class="small muted">/mo</span></div><ul><li>Everything in Seeker</li><li>Ad-free reading experience</li><li>Monthly personal number forecast</li><li>Extra contest entries</li></ul></div>
<div class="card tier"><h3>Master Teacher</h3><div class="price">$33<span class="small muted">/mo</span></div><ul><li>Everything in Nurturer</li><li>Quarterly 1-to-1 consultation</li><li>Vote on new tools & videos</li><li>Name credit in video end-cards</li></ul></div></div>
<p class="muted mt">Pick a tier in the form above (set frequency to “Monthly”) and we'll set you up.</p></div></section>
<section class="sec-sm"><div class="wrap grid g2"><div class="card"><h3>Sponsor a tool or contest</h3><p class="muted">Businesses can fund a calculator or a month's prize pool in exchange for branded placement.</p><a href="${R}advertise/">Sponsorship options →</a></div><div class="card"><h3>Other ways to help</h3><p class="muted mb0">Share a number page, subscribe on YouTube, suggest a tool, or <a href="${R}careers/">volunteer your skills</a>.</p></div></div></section>
<section class="sec-sm"><div class="wrap prose"><h2>Support FAQ</h2>${faqHTML(SUPPORT_FAQ)}</div></section>` },

  { path: 'advertise/', title: 'Advertise & Sponsor on 76633.com — Media Kit | 76633.com', desc: 'Reach a global audience interested in numerology, spirituality, self-growth and lucky numbers. Display, sponsored tools, newsletter, video and contest sponsorships.',
    schema: [crumbSchema([['advertise/', 'Advertise']])],
    body: (R) => `${crumb(R, [['', 'Advertise']])}
<section style="padding-top:30px"><div class="wrap"><span class="eyebrow">Media kit</span><h1>Advertise with 76633.com</h1><p class="lead muted">Our readers come with intent: they are thinking about love, money, career and big decisions — and they are looking for answers. Put your brand in front of them.</p>
<div class="grid g3 mt">
<div class="card"><h3>Sponsored calculator</h3><p class="muted mb0">Your logo and offer on every result of a chosen tool (e.g. Vehicle Number, Compatibility).</p></div>
<div class="card"><h3>Number page takeover</h3><p class="muted mb0">Exclusive placement on a high-traffic angel number (111, 444, 1111…).</p></div>
<div class="card"><h3>Newsletter sponsor</h3><p class="muted mb0">A native slot in the weekly forecast email.</p></div>
<div class="card"><h3>Video integration</h3><p class="muted mb0">Pre-roll mention or dedicated segment on our YouTube videos.</p></div>
<div class="card"><h3>Contest sponsor</h3><p class="muted mb0">Provide the prize, get the entries' attention and brand lift.</p></div>
<div class="card"><h3>Domain / site partnership</h3><p class="muted mb0">Interested in the 76633.com domain or a strategic partnership? <a href="https://web.works/contact" target="_blank" rel="noopener">Contact us</a>.</p></div></div>
<div class="card mt"><h3>Audience fit</h3><p class="muted mb0">Good fits: wellness & mindfulness apps, astrology and reading platforms, books & courses, jewellery & gemstones, dating apps, personal finance, insurance (vehicle numbers), telecom (fancy / VIP numbers), travel. We do not accept gambling, crypto-scheme, adult or predatory-lending advertisers.</p></div></div></section>
<section class="sec-sm"><div class="wrap"><form class="lead-box" data-form="advertising-inquiry" data-ok="Thanks! Our media kit and rates will reach you within 24–48 hours.">
<h2>Request the media kit & rates</h2>
<div class="row"><div class="field"><label for="a-n">Name</label><input id="a-n" name="name" required></div><div class="field"><label for="a-c">Company</label><input id="a-c" name="company" required></div></div>
<div class="row"><div class="field"><label for="a-e">Work email</label><input id="a-e" name="email" type="email" required></div><div class="field"><label for="a-w">Website</label><input id="a-w" name="website" type="url" placeholder="https://"></div></div>
<div class="row"><div class="field"><label for="a-t">Interested in</label><select id="a-t" name="interest"><option>Sponsored calculator</option><option>Number page takeover</option><option>Newsletter</option><option>Video integration</option><option>Contest sponsorship</option><option>Domain / partnership</option><option>Other</option></select></div><div class="field"><label for="a-b">Monthly budget</label><select id="a-b" name="budget"><option>Under $250</option><option>$250–$1,000</option><option>$1,000–$5,000</option><option>$5,000+</option></select></div></div>
<div class="field"><label for="a-m">Campaign goals</label><textarea id="a-m" name="message"></textarea></div>
${consent()}${hp}<button class="btn btn-gold mt" type="submit">Get the media kit</button><div class="form-msg"></div></form></div></section>` },

  { path: 'contests/', title: 'Contests & Prizes — The 76633 Number Story Challenge | 76633.com', desc: 'Free monthly contest: share the number you keep seeing and the story behind it. Win a premium numerology reading and more.',
    schema: [crumbSchema([['contests/', 'Contests']])],
    body: (R) => `${crumb(R, [['', 'Contests']])}
<section style="padding-top:30px"><div class="wrap"><div class="grid g2" style="align-items:start;gap:40px"><div>
<span class="eyebrow">Free to enter · no purchase necessary</span><h1>The Number Story Challenge</h1><p class="lead muted">Which number keeps following you — and what happened when you noticed it? Share your story. The most moving, surprising or funny stories win.</p>
<h3>Ends in</h3><div class="countdown" data-countdown="${CONTEST_END}"></div>
<h3 class="mt">Prizes</h3><ul class="check-list"><li><b>Grand prize:</b> premium in-depth numerology report + 30-min consultation + featured story</li><li><b>2 runners-up:</b> premium personalised report</li><li><b>Everyone:</b> free numerology snapshot</li></ul>
<h3>How to earn bonus entries</h3><ul class="check-list"><li>Subscribe to the weekly newsletter (+1)</li><li>Subscribe on YouTube (+1)</li><li>Refer a friend who enters (+2 each)</li></ul>
<p class="small muted">Want your brand to sponsor next month's prize? <a href="${R}advertise/">Sponsor a contest</a>.</p></div>
<form class="lead-box" data-form="contest-entry" data-ok="You're entered! Good luck — winners are announced on this page and by email.">
<h3>Enter now</h3>
<div class="row"><div class="field"><label for="k-n">Name</label><input id="k-n" name="name" required></div><div class="field"><label for="k-e">Email</label><input id="k-e" name="email" type="email" required></div></div>
<div class="row"><div class="field"><label for="k-c">Country</label><input id="k-c" name="country" required></div><div class="field"><label for="k-num">Your number</label><input id="k-num" name="number" inputmode="numeric" required placeholder="e.g. 1111"></div></div>
<div class="field"><label for="k-s">Your story (50–500 words)</label><textarea id="k-s" name="story" required minlength="120"></textarea></div>
<div class="field"><label for="k-r">Referred by (friend's email, optional)</label><input id="k-r" name="referred_by" type="email"></div>
<label class="check"><input type="checkbox" name="age_ok" value="yes" required> I am 18 or older (or the age of majority where I live).</label>
<label class="check"><input type="checkbox" name="rules_ok" value="yes" required> I accept the <a href="#rules">official rules</a> and allow my story to be published (first name + country only).</label>${hp}
<button class="btn btn-gold btn-block mt" type="submit">Submit my entry</button><div class="form-msg"></div></form></div></div></section>
<section class="sec-sm" id="rules"><div class="wrap prose"><h2>Official rules (summary)</h2><ol>
<li><b>No purchase or payment necessary.</b> A purchase does not improve your chances.</li><li>Open to individuals aged 18+ where such contests are legal. Void where prohibited. Organiser's staff and family are not eligible.</li><li>Entry period ends on the date shown by the countdown (Asia/Kolkata time). One entry per person; bonus entries as listed.</li><li>Winners are chosen by an editorial panel on originality, storytelling and relevance (skill-based), and notified by email within 14 days. Unclaimed prizes after 14 days may be re-awarded.</li><li>Prizes are non-transferable and have no cash alternative unless required by law. Taxes, if any, are the winner's responsibility.</li><li>Entries must be original and must not infringe anyone's rights. We may decline entries that are offensive or unlawful.</li><li>Personal data is used only to run the contest — see our <a href="${R}privacy/">privacy policy</a>.</li><li>This contest is not sponsored, endorsed or administered by YouTube, Google, Meta or any platform.</li></ol>
<h2>Past winners</h2><p class="muted">The first draw closes on the date above. Winners will be featured here.</p></div></section>` },

  { path: 'careers/', title: 'Careers & Talent — Write, Create and Grow With 76633.com | 76633.com', desc: 'We hire freelance writers, video editors, numerologists, translators, designers and community ambassadors. Remote, flexible, paid or revenue-share.',
    schema: [crumbSchema([['careers/', 'Careers']])],
    body: (R) => `${crumb(R, [['', 'Careers']])}
<section style="padding-top:30px"><div class="wrap"><span class="eyebrow">Remote · flexible · global</span><h1>Join the 76633.com team</h1><p class="lead muted">We are building the friendliest place on the internet to understand numbers. We work with freelancers and part-timers worldwide.</p>
<div class="grid g3 mt">${[
    ['Content writer — numerology & spirituality', 'Freelance · per article', 'Clear, warm, well-researched guides. SEO experience a plus.'],
    ['YouTube / Shorts video editor', 'Freelance · per video', 'Short-form edits, captions, thumbnails. Animation skills welcome.'],
    ['Numerology / astrology expert reviewer', 'Part-time · revenue share', 'Review content accuracy and take consultation referrals.'],
    ['Translator — Hindi, Spanish, Chinese', 'Freelance · per word', 'Localise number guides and tools for new audiences.'],
    ['Social media & community manager', 'Part-time', 'Pinterest, Instagram, YouTube community and contests.'],
    ['Campus / creator ambassador', 'Commission', 'Share tools, recruit partners and earn on referrals.']
  ].map(([t, m, d]) => `<div class="card"><span class="pill">${m}</span><h3>${t}</h3><p class="muted mb0">${d}</p></div>`).join('')}</div></div></section>
<section class="sec-sm"><div class="wrap"><form class="lead-box" data-form="job-application" data-ok="Application received! If there's a fit, we'll be in touch within 7 days.">
<h2>Apply</h2>
<div class="row"><div class="field"><label for="j-n">Name</label><input id="j-n" name="name" required></div><div class="field"><label for="j-e">Email</label><input id="j-e" name="email" type="email" required></div></div>
<div class="row"><div class="field"><label for="j-r">Role</label><select id="j-r" name="role" required><option value="">Choose…</option><option>Content writer</option><option>Video editor</option><option>Numerology / astrology expert</option><option>Translator</option><option>Social & community</option><option>Ambassador</option><option>Other / general</option></select></div><div class="field"><label for="j-l">Location & time zone</label><input id="j-l" name="location"></div></div>
<div class="row"><div class="field"><label for="j-p">Portfolio / LinkedIn / samples</label><input id="j-p" name="portfolio" type="url" placeholder="https://" required></div><div class="field"><label for="j-a">Availability (hours/week)</label><input id="j-a" name="availability" type="number" min="1"></div></div>
<div class="field"><label for="j-m">Why you? (short)</label><textarea id="j-m" name="message" required></textarea></div>
${consent('I agree that my application details may be stored for recruiting purposes.')}${hp}<button class="btn btn-gold mt" type="submit">Send application</button><div class="form-msg"></div></form></div></section>` },

  { path: 'videos/', title: 'Numerology & Angel Number Videos | 76633.com', desc: 'Short, clear videos on angel numbers, life path numbers, Chinese lucky numbers and mobile number numerology.',
    schema: [crumbSchema([['videos/', 'Videos']])],
    body: (R) => `${crumb(R, [['', 'Videos']])}
<section style="padding-top:30px"><div class="wrap"><span class="eyebrow">Watch</span><h1>Videos</h1><p class="lead muted">Angel numbers and numerology in minutes. New episodes weekly.</p><a class="btn btn-grad" data-yt-sub href="#">▶ Subscribe on YouTube</a>
<div class="grid g3 mt">${VIDEOS.map((v) => `<div class="card"><div class="vid${v.id ? '' : ' soon'}" data-yt="${v.id}"></div><h3 class="mt">${v.t}</h3></div>`).join('')}</div>
<div class="ad" data-ad="footer"></div>
<div class="card mt"><h3>Collaborate on a video</h3><p class="muted mb0">Creators, experts and brands — <a href="${R}partners/">pitch a collaboration</a> or <a href="${R}advertise/">sponsor an episode</a>.</p></div></div></section>` },

  { path: 'about/', title: 'About 76633.com | 76633.com', desc: 'Who we are, how we create numerology content and how the site is funded.',
    schema: [crumbSchema([['about/', 'About']])],
    body: (R) => `${crumb(R, [['', 'About']])}<section style="padding-top:30px"><div class="wrap prose"><span class="eyebrow">About</span><h1>About 76633.com</h1>
<p class="lead muted">76633.com is an independent publication that explains the meaning of numbers — angel numbers, life path numbers, lucky numbers and number traditions from around the world — with free, fast tools.</p>
<h2>Our editorial standards</h2><ul><li><b>Transparent method.</b> Every number reading uses the same published rules (pattern, digit weighting, root number, master numbers).</li><li><b>Many traditions.</b> Pythagorean, Chaldean, Lo Shu and Chinese number culture side by side.</li><li><b>No fear-mongering.</b> No number is “cursed”. We present shadow sides as reflection, never as threats.</li><li><b>Clear limits.</b> Numerology is entertainment and self-reflection, not prediction or professional advice.</li></ul>
<h2>How we are funded</h2><p>Display advertising (including Google AdSense), sponsorships, optional paid consultations through partners, and reader support. Advertisers never influence number meanings. Some links may be affiliate links — we disclose them.</p>
<h2>Get involved</h2><p><a href="${R}careers/">Write or create with us</a> · <a href="${R}partners/">Partner</a> · <a href="${R}support/">Support</a> · <a href="${R}contact/">Contact</a></p></div></section>` },

  { path: 'contact/', title: 'Contact 76633.com | 76633.com', desc: 'Contact the 76633.com team for questions, corrections, partnerships, advertising or press.',
    schema: [crumbSchema([['contact/', 'Contact']])],
    body: (R) => `${crumb(R, [['', 'Contact']])}<section style="padding-top:30px"><div class="wrap"><div class="grid g2" style="gap:40px;align-items:start"><div>
<span class="eyebrow">Say hello</span><h1>Contact us</h1><p class="lead muted">Questions, corrections, ideas, partnerships or press — send a message and we'll reply within 1–2 business days.</p>
<div class="card"><h3>Interested in this website or domain?</h3><p class="muted">For acquisition of the website / domain name, sponsorship, advertisement or partnership:</p><a class="btn btn-gold" href="https://web.works/contact" target="_blank" rel="noopener">web.works/contact →</a></div>
<div class="card mt"><h3>Prefer email?</h3><p class="muted">Open a pre-addressed message in your email app.</p><a class="btn btn-ghost" href="#" data-mail="76633.com inquiry">✉ Email us</a></div></div>
<form class="lead-box" data-form="contact" data-ok="Message sent! We'll get back to you soon.">
<div class="row"><div class="field"><label for="ct-n">Name</label><input id="ct-n" name="name" required></div><div class="field"><label for="ct-e">Email</label><input id="ct-e" name="email" type="email" required></div></div>
<div class="field"><label for="ct-t">Topic</label><select id="ct-t" name="topic"><option>General question</option><option>Correction / feedback</option><option>Website / domain acquisition</option><option>Sponsorship / advertising</option><option>Partnership</option><option>Press / media</option><option>Privacy request</option><option>Copyright / trademark notice</option></select></div>
<div class="field"><label for="ct-m">Message</label><textarea id="ct-m" name="message" required></textarea></div>
${consent()}${hp}<button class="btn btn-gold mt" type="submit">Send message</button><div class="form-msg"></div></form></div></div></section>` },

  { path: 'faq/', title: 'FAQ — 76633.com', desc: 'Answers about angel numbers, our calculators, readings, privacy, contests and support.',
    schema: [crumbSchema([['faq/', 'FAQ']]), faqSchema(FAQ_ALL())],
    body: (R) => `${crumb(R, [['', 'FAQ']])}<section style="padding-top:30px"><div class="wrap prose"><h1>Frequently asked questions</h1>${faqHTML(FAQ_ALL())}<p class="mt">Still curious? <a href="${R}contact/">Contact us</a>.</p></div></section>` },

  legal('privacy/', 'Privacy Policy', `<p>Last updated: September 2026.</p>
<h2>What we collect</h2><ul><li><b>Calculator inputs</b> (dates, names, numbers) are processed in your browser and not sent to us.</li><li><b>Form submissions</b> (e.g. free reading, contest, contact) — the details you type, sent securely to our inbox via the form service FormSubmit.</li><li><b>Cookies</b> — a theme and consent preference stored in your browser; analytics and advertising cookies only as described below.</li></ul>
<h2>Advertising (Google AdSense)</h2><p>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visits. You may opt out of personalised advertising at <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Ads Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener">aboutads.info</a>. Choosing “Essential only” in our banner requests non-personalised ads.</p>
<h2>Analytics</h2><p>If enabled, we use Google Analytics 4 with consent mode to understand aggregate usage.</p>
<h2>YouTube</h2><p>Videos load from youtube-nocookie.com only after you click play.</p>
<h2>How we use your data</h2><p>To answer requests, send readings or newsletters you asked for, run contests and improve the site. We never sell personal data.</p>
<h2>Your rights</h2><p>You can request access, correction or deletion of your data, and withdraw consent at any time, using the <a href="../contact/">contact form</a> (topic “Privacy request”). Residents of the EU/UK (GDPR), California (CCPA/CPRA), Canada (PIPEDA) and India (DPDP Act 2023) have the rights granted by those laws.</p>
<h2>Children</h2><p>This site is not directed to children under 13, and contests are for adults only.</p>
<h2>Retention</h2><p>Form messages are kept only as long as needed for the purpose, generally no more than 24 months.</p>`),

  legal('terms/', 'Terms of Use', `<p>Last updated: September 2026. By using 76633.com you agree to these terms.</p>
<h2>Entertainment purposes</h2><p>All readings, calculators and articles are provided for entertainment, cultural education and self-reflection. They are not predictions and not professional (medical, legal, financial, psychological) advice. Decisions you make are your own responsibility.</p>
<h2>Acceptable use</h2><p>Do not scrape, overload, reverse-engineer for resale or misuse the site or its forms. Do not submit unlawful, infringing or abusive content.</p>
<h2>User submissions</h2><p>By submitting stories, comments or contest entries you grant 76633.com a non-exclusive, royalty-free licence to publish them (with first name and country only) and confirm they are your own.</p>
<h2>Consultations & third parties</h2><p>Consultations may be delivered by independent partner practitioners who are responsible for their own services. Links to third-party sites are provided for convenience.</p>
<h2>Intellectual property</h2><p>Original text, design, code and graphics are © 76633.com. See the <a href="../trademark-copyright/">trademark & copyright disclosure</a>.</p>
<h2>Liability</h2><p>The site is provided “as is”. To the maximum extent permitted by law, we are not liable for any indirect or consequential loss arising from its use.</p>
<h2>Changes</h2><p>We may update these terms; the date above shows the latest version.</p>`),

  legal('disclaimer/', 'Disclaimer', `<p>Numerology, angel numbers, Lo Shu grids and Chinese number traditions are symbolic and cultural systems. They are not scientifically proven and cannot predict the future.</p>
<p>Nothing on 76633.com is medical, psychological, legal, financial or investment advice. If you are facing a health, safety, legal or financial issue, please consult a qualified professional.</p>
<p><b>Advertising & affiliate disclosure:</b> 76633.com displays ads (including Google AdSense) and may earn commissions from some links or partner referrals, at no extra cost to you. This never changes our number meanings.</p>
<p><b>Donations:</b> 76633.com is not a registered charity; contributions are voluntary support for an independent publication and are not tax-deductible.</p>`),

  legal('trademark-copyright/', 'Trademark & Copyright Disclosure', `<h2>Independent publication</h2><p>76633.com is an independent website. The number “76633” is used solely as a domain name and as a numeric identifier describing our numerology subject matter (7, 66 and 33).</p>
<h2>No affiliation</h2><p>76633.com is <b>not affiliated with, endorsed by, sponsored by or connected to</b> any company, brand, product, SMS / text short code, phone service, postal code holder, trademark owner or organisation that uses the number 76633 or any similar number or name. Any such use by others is theirs alone.</p>
<h2>Third-party marks</h2><p>Names such as Google, AdSense, YouTube, WhatsApp, Pinterest, Facebook, X, PayPal, Buy Me a Coffee, Ko-fi, Stripe and UPI are trademarks of their respective owners and are mentioned only to describe services we use or offer to link with. No endorsement is implied.</p>
<h2>Our copyright</h2><p>Unless stated otherwise, all original text, number interpretations, page designs, graphics and source code on this site are © 76633.com, all rights reserved. Short quotations with a link back are welcome. Numerology systems themselves (Pythagorean, Chaldean, Lo Shu) are traditional public-domain knowledge.</p>
<h2>Fonts & libraries</h2><p>Fonts are served by Google Fonts under the SIL Open Font License.</p>
<h2>Notices & takedown</h2><p>If you believe content on this site infringes your trademark or copyright, send a notice through our <a href="../contact/">contact form</a> (topic “Copyright / trademark notice”) with: your contact details, the work or mark concerned, the URL of the material, and a good-faith statement. We respond promptly and remove infringing material where appropriate.</p>`),

  { path: '404.html', flat: true, title: 'Page not found | 76633.com', desc: 'This page could not be found.', noindex: true,
    body: (R) => `<section class="hero center"><div class="wrap"><div class="big-num grad-text" style="font-size:6rem">404</div><h1>This number doesn't add up</h1><p class="lead muted" style="margin:auto">The page you're looking for isn't here. Try a number instead:</p><form class="search" data-numsearch style="margin:22px auto"><input name="q" inputmode="numeric" aria-label="Number" placeholder="e.g. 1111" required><button class="btn btn-gold" type="submit">Decode</button></form><p><a class="btn btn-ghost" href="${R}">Go to homepage</a></p></div></section>` }
];

function FAQ_ALL() {
  return [
    ['What is an angel number?', 'A repeating number sequence (such as 111, 444 or 1212) that someone notices often. In numerology each digit has a meaning and repetition adds emphasis.'],
    ['Do you store what I type into the calculators?', 'No. Calculators run entirely in your browser. Only forms you submit (like a free reading request) reach us.'],
    ['How do I get a free reading?', 'Use the Free Reading page — three short steps. Your snapshot is sent within 48 hours.'],
    ['Are consultations free?', 'The snapshot is free. In-depth reports and live consultations with partner practitioners are paid; pricing is shared before you commit.'],
    ['How do contests work?', 'Contests are free to enter, skill-judged by an editorial panel and open to adults where legal. See the official rules on the Contests page.'],
    ['How is the site funded?', 'Advertising (including Google AdSense), sponsorships, partner consultations and voluntary reader support.'],
    ['Is 76633.com linked to an SMS short code or company called 76633?', 'No. 76633 is only our domain name. See the trademark & copyright disclosure.'],
    ['I want to buy, sponsor or partner with this website. Who do I contact?', 'Use web.works/contact — the link at the top of every page.']
  ];
}

function legal(path, title, html) {
  return { path, title: `${title} | 76633.com`, desc: `${title} for 76633.com.`, schema: [crumbSchema([[path, title]])],
    body: (R) => `${crumb(R, [['', title]])}<section style="padding-top:30px"><div class="wrap prose"><h1>${title}</h1>${html}</div></section>` };
}
