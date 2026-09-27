// 76633.com — site runtime
import * as N from './core.js';
import { numberBody, tocHTML, numUrl } from './render.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const R = document.body.dataset.root || './';
const S = window.SITE || {};
const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// ---------- Contact route (decoded only at the moment of use; never written into the page) ----------
const route = () => S._r.slice().reverse().map((c) => String.fromCharCode(c ^ 42)).join('');
const endpoint = () => `https://formsubmit.co/ajax/${S.formAlias || route()}`;
$$('[data-mail]').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  const subj = encodeURIComponent(a.dataset.mail || '76633.com inquiry');
  window.location.href = 'mai' + 'lto:' + route() + '?subject=' + subj;
}));

// ---------- Theme & menu ----------
const root = document.documentElement;
const saved = store.get('theme'); if (saved) root.dataset.theme = saved;
$('#themeBtn')?.addEventListener('click', () => { const t = root.dataset.theme === 'light' ? 'dark' : 'light'; root.dataset.theme = t; store.set('theme', t); });
$('#menuBtn')?.addEventListener('click', () => { const n = $('#nav'); n.classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded', n.classList.contains('open')); });

// ---------- Consent, analytics, ads ----------
function loadScript(src, attrs = {}) { const s = document.createElement('script'); s.async = true; s.src = src; Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v)); document.head.appendChild(s); }
function startServices(consent) {
  if (S.ga4) { loadScript(`https://www.googletagmanager.com/gtag/js?id=${S.ga4}`); window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag('js', new Date()); gtag('consent', 'default', { ad_storage: consent === 'all' ? 'granted' : 'denied', analytics_storage: consent === 'all' ? 'granted' : 'denied' }); gtag('config', S.ga4); }
  if (S.adsenseClient) {
    window.adsbygoogle = window.adsbygoogle || [];
    if (consent !== 'all') window.adsbygoogle.requestNonPersonalizedAds = 1;
    loadScript(`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${S.adsenseClient}`, { crossorigin: 'anonymous' });
  }
  fillAds();
}
function fillAds() {
  $$('[data-ad]').forEach((el, i) => {
    const slot = S.adSlots?.[el.dataset.ad];
    if (S.adsenseClient && slot) {
      el.innerHTML = `<ins class="adsbygoogle" style="display:block;width:100%" data-ad-client="${S.adsenseClient}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
      el.style.border = '0'; el.style.background = 'none';
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
    } else {
      const msgs = ['Your brand here — reach people searching number meanings every day.', 'Sponsor a calculator: logo + link on thousands of results.', 'Advertise to a spiritual & self-growth audience.'];
      el.innerHTML = `<div><span class="ad-label">Sponsored space</span>${msgs[i % msgs.length]} <a href="${R}advertise/">Advertise with us →</a></div>`;
    }
  });
}
const consent = store.get('consent');
if (!consent) {
  const c = $('#consent'); c?.classList.add('show');
  $$('#consent [data-consent]').forEach((b) => b.addEventListener('click', () => { store.set('consent', b.dataset.consent); c.classList.remove('show'); startServices(b.dataset.consent); }));
  fillAds();
} else startServices(consent);

// ---------- Forms (all submissions go to the site inbox via FormSubmit; route stays hidden) ----------
$$('form[data-form]').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = $('.form-msg', form) || form.appendChild(Object.assign(document.createElement('div'), { className: 'form-msg' }));
    if (form.querySelector('[name="_honey"]')?.value) return;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(form).entries());
    delete data._honey;
    const payload = { ...data, _subject: `[76633.com] ${form.dataset.form} — ${data.name || data.email || ''}`.trim(), _template: 'table', _captcha: 'false', form: form.dataset.form, page: location.href, submitted: new Date().toISOString() };
    const btn = form.querySelector('[type=submit]'); const old = btn?.textContent; if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    try {
      const res = await fetch(endpoint(), { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(res.status);
      msg.className = 'form-msg ok'; msg.textContent = form.dataset.ok || 'Thank you! Your message has been received — we will reply shortly.';
      form.reset(); store.set('lead', '1');
      if (window.gtag) gtag('event', 'generate_lead', { form: form.dataset.form });
    } catch {
      msg.className = 'form-msg err';
      msg.innerHTML = 'Could not send right now. <a href="#" data-retry>Send by email instead</a>.';
      $('[data-retry]', msg).addEventListener('click', (ev) => { ev.preventDefault(); const body = encodeURIComponent(Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join('\n')); location.href = 'mai' + 'lto:' + route() + '?subject=' + encodeURIComponent(payload._subject) + '&body=' + body; });
    } finally { if (btn) { btn.disabled = false; btn.textContent = old; } }
  });
});

// ---------- Multi-step lead form ----------
$$('[data-steps]').forEach((form) => {
  const steps = $$('.step', form), dots = $$('.steps i', form); let i = 0;
  const show = (k) => { steps.forEach((s, j) => s.classList.toggle('on', j === k)); dots.forEach((d, j) => d.classList.toggle('on', j <= k)); i = k; };
  $$('[data-next]', form).forEach((b) => b.addEventListener('click', () => { const req = $$('[required]', steps[i]); if (req.every((f) => f.reportValidity())) show(Math.min(i + 1, steps.length - 1)); }));
  $$('[data-prev]', form).forEach((b) => b.addEventListener('click', () => show(Math.max(i - 1, 0))));
  const n = new URLSearchParams(location.search).get('n'); if (n && form.elements.number) form.elements.number.value = n.replace(/\D/g, '');
  show(0);
});

// ---------- Number search ----------
$$('form[data-numsearch]').forEach((f) => f.addEventListener('submit', (e) => {
  e.preventDefault(); const v = (f.elements.q.value || '').replace(/\D/g, '').slice(0, 12);
  if (v) location.href = numUrl(v, R);
}));

// ---------- Live lookup page ----------
const lk = $('#lookup');
if (lk) {
  const n = (new URLSearchParams(location.search).get('n') || '').replace(/\D/g, '').slice(0, 12);
  const r = n && N.report(n);
  if (r) {
    document.title = `${n} Angel Number Meaning: Love, Twin Flame & Career | 76633.com`;
    $('#lkNum').textContent = n; $('#lkH1').textContent = `${n} Angel Number Meaning`;
    $('#lkSub').textContent = r.pattern.label; lk.innerHTML = numberBody(r, R); $('#lkToc').innerHTML = tocHTML();
    fillAds(); initDynamic();
  }
}

// ---------- Tools ----------
const out = (id, html) => { const el = document.getElementById(id); el.innerHTML = html; el.classList.add('show'); el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); fillAds(); };
const ctaHTML = (n) => `<div class="lead-box mt"><b>Want the full picture?</b> <span class="muted">Get your free personalised report — life path, name, lucky numbers and year ahead.</span><div class="mt"><a class="btn btn-gold" href="${R}free-reading/${n ? '?n=' + n : ''}">Get my free report →</a> <a class="btn btn-ghost" href="${R}support/">Keep these tools free ♥</a></div></div>`;
const meaning = (n) => { const d = N.D[n] || N.D[N.reduce(n, false)]; return `<p><b>${esc(d.kw)}</b></p><p>${esc(d.core)}</p>`; };
const lp = (n) => `<a href="${R}life-path/${n}/">Read the full Life Path ${n} guide →</a>`;
const meter = (s) => `<div class="meter"><i style="width:${s}%"></i></div>`;
const T = {
  lifepath(f) { const r = N.lifePath(f.dob.value); if (!r) return; out('res', `<div class="card"><span class="eyebrow">Your Life Path Number</span><div class="big-num grad-text">${r.value}</div><p class="small muted">${esc(r.steps)}</p>${meaning(r.value)}${lp(r.value)}</div>${ctaHTML()}`); },
  name(f) { const r = N.nameNumbers(f.fullname.value, f.system.value); out('res', `<div class="grid g3"><div class="card"><span class="eyebrow">Expression / Destiny</span><div class="big-num grad-text">${r.expression}</div><p class="small muted">Compound ${r.compound}</p></div><div class="card"><span class="eyebrow">Soul Urge</span><div class="big-num grad-text">${r.soulUrge}</div><p class="small muted">From vowels — your inner drive</p></div><div class="card"><span class="eyebrow">Personality</span><div class="big-num grad-text">${r.personality}</div><p class="small muted">From consonants — how others see you</p></div></div><div class="card mt">${meaning(r.expression)}</div>${ctaHTML()}`); },
  compat(f) { const a = N.lifePath(f.dob1.value), b = N.lifePath(f.dob2.value); if (!a || !b) return; const c = N.compatibility(a.value, b.value); out('res', `<div class="card"><span class="eyebrow">Compatibility</span><div class="big-num grad-text">${c.score}%</div>${meter(c.score)}<p><b>${c.label}.</b> Life Path ${a.value} + Life Path ${b.value}.</p><div class="grid g2"><div>${meaning(a.value)}</div><div>${meaning(b.value)}</div></div></div>${ctaHTML()}`); },
  mobile(f) { const r = N.phoneScore(f.phone.value, f.dob.value); out('res', `<div class="card"><span class="eyebrow">Mobile number score</span><div class="big-num grad-text">${r.score}/100</div>${meter(r.score)}<p>Digit total <b>${r.total}</b> → vibration <b>${r.root}</b>. Your birth number (Mulank) <b>${r.bn}</b>, destiny (Bhagyank) <b>${r.dn}</b>.</p>${meaning(r.root)}<p><b>Chinese reading:</b> ${r.chinese.verdict}${r.chinese.notes.length ? ' — ' + esc(r.chinese.notes.join('; ')) : ''}.</p><p class="small muted">Tip: numbers whose total reduces to your Mulank or a friendly number (${r.bn}) are traditionally preferred.</p></div>${ctaHTML()}`); },
  vehicle(f) { const r = N.plateScore(f.plate.value, f.dob.value); out('res', `<div class="card"><span class="eyebrow">Vehicle number match</span><div class="big-num grad-text">${r.score}%</div>${meter(r.score)}<p>Plate total <b>${r.total}</b> → vibration <b>${r.root}</b> (letters use Chaldean values). Your Mulank <b>${r.bn}</b>.</p>${meaning(r.root)}<p class="small muted">Drive safely — no number replaces good driving, insurance and maintenance.</p></div>${ctaHTML()}`); },
  chinese(f) { const d = f.num.value.replace(/\D/g, ''); const r = N.chineseScore(d); out('res', `<div class="card"><span class="eyebrow">Chinese lucky number check</span><div class="big-num grad-text">${esc(r.verdict)}</div><p>Score ${r.score}. ${[...new Set(d.split(''))].map((x) => `<span class="pill">${x} ${N.CN[x][0]} · ${esc(N.CN[x][1])}</span>`).join('')}</p>${r.notes.length ? `<ul>${r.notes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</div>${ctaHTML(d)}`); },
  year(f) { const y = +f.year.value || new Date().getFullYear(); const n = N.personalYear(f.dob.value, y); const themes = { 1: 'new starts & planting seeds', 2: 'patience, partnerships & waiting', 3: 'expression, social life & creativity', 4: 'hard work & building foundations', 5: 'change, travel & freedom', 6: 'home, family & responsibility', 7: 'reflection, study & inner growth', 8: 'money, power & achievement', 9: 'completion, release & endings' }; out('res', `<div class="card"><span class="eyebrow">Personal Year ${y}</span><div class="big-num grad-text">${n}</div><p><b>Theme:</b> ${themes[n]}.</p>${meaning(n)}</div>${ctaHTML()}`); },
  loshu(f) { const r = N.loShu(f.dob.value); const cells = r.layout.map((n) => { const c = r.counts[n] + ([r.lp, r.bn].includes(n) ? 1 : 0); return `<div class="${c ? '' : 'miss'}">${c ? String(n).repeat(Math.min(c, 4)) : n}</div>`; }).join(''); out('res', `<div class="card"><span class="eyebrow">Lo Shu Grid</span><div class="loshu">${cells}</div><p class="mt"><b>Missing numbers:</b> ${r.missing.length ? r.missing.join(', ') : 'none'}.</p><p><b>Complete planes:</b> ${r.full.length ? r.full.join(', ') : 'none yet'}.</p><p class="small muted">Includes your Mulank (${r.bn}) and Bhagyank (${r.lp}), as in Indian practice.</p></div>${ctaHTML()}`); },
  lucky(f) { const r = N.luckyProfile(f.fullname.value, f.dob.value); out('res', `<div class="card"><span class="eyebrow">Your lucky profile</span><p class="big-num grad-text">${r.numbers.join(' · ')}</p><p>Extended: ${r.extended.join(', ')}</p><div class="grid g3"><div><b>Lucky day</b><br>${r.day}</div><div><b>Lucky colour</b><br>${r.color}</div><div><b>Ruling planet</b><br>${r.planet}</div></div></div>${ctaHTML()}`); },
  clock(f) { const t = f.time.value.replace(':', ''); if (t) location.href = numUrl(t.replace(/^0(?=\d{3}$)/, ''), R); }
};
$$('form[data-tool]').forEach((f) => f.addEventListener('submit', (e) => { e.preventDefault(); T[f.dataset.tool]?.(f.elements); if (window.gtag) gtag('event', 'tool_use', { tool: f.dataset.tool }); }));

// ---------- Donations ----------
$$('[data-amounts]').forEach((box) => { $$('button', box).forEach((b) => b.addEventListener('click', () => { $$('button', box).forEach((x) => x.classList.remove('on')); b.classList.add('on'); const f = $('[name=amount]', box.closest('form') || document); if (f) f.value = b.dataset.v; })); });
const pay = $('#payLinks');
if (pay) {
  const d = S.donate || {}; const map = [['paypal', 'PayPal'], ['buymeacoffee', 'Buy Me a Coffee'], ['kofi', 'Ko-fi'], ['stripe', 'Card (Stripe)']];
  const links = map.filter(([k]) => d[k]).map(([k, l]) => `<a class="btn btn-ghost" target="_blank" rel="noopener" href="${d[k]}">${l}</a>`).join('');
  pay.innerHTML = (links || '') + (d.upi ? `<a class="btn btn-ghost" href="upi://pay?pa=${encodeURIComponent(d.upi)}&pn=76633.com&cu=INR">UPI</a>` : '');
  if (!pay.innerHTML) pay.closest('[data-paybox]')?.setAttribute('hidden', '');
}

// ---------- Countdown ----------
$$('[data-countdown]').forEach((el) => {
  const end = new Date(el.dataset.countdown).getTime();
  const tick = () => { let t = Math.max(0, end - Date.now()); const d = Math.floor(t / 864e5); t -= d * 864e5; const h = Math.floor(t / 36e5); t -= h * 36e5; const m = Math.floor(t / 6e4); el.innerHTML = `<div><b>${d}</b>days</div><div><b>${h}</b>hours</div><div><b>${m}</b>mins</div>`; };
  tick(); setInterval(tick, 30000);
});

// ---------- Dynamic bits (video, share, sticky CTA) ----------
function initDynamic() {
  $$('.vid[data-yt]').forEach((v) => { const id = v.dataset.yt; if (!id) return; v.classList.remove('soon'); v.style.backgroundImage = `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`; v.addEventListener('click', () => { v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Video"></iframe>`; }, { once: true }); });
  $$('[data-yt-sub]').forEach((a) => { a.href = S.youtubeChannel; a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-share]').forEach((box) => {
    const u = encodeURIComponent(location.href), t = encodeURIComponent(document.title);
    box.innerHTML = `<a target="_blank" rel="noopener" href="https://wa.me/?text=${t}%20${u}">WhatsApp</a><a target="_blank" rel="noopener" href="https://pinterest.com/pin/create/button/?url=${u}&description=${t}">Pinterest</a><a target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${u}">Facebook</a><a target="_blank" rel="noopener" href="https://x.com/intent/tweet?url=${u}&text=${t}">X</a><button type="button" data-copy>Copy link</button>`;
    $('[data-copy]', box).addEventListener('click', (e) => { navigator.clipboard?.writeText(location.href); e.target.textContent = 'Copied ✓'; });
  });
}
initDynamic();
const sticky = $('.sticky-cta');
if (sticky && !store.get('lead')) addEventListener('scroll', () => sticky.classList.toggle('show', scrollY > 900), { passive: true });

// Year in footer
$$('[data-year]').forEach((e) => { e.textContent = new Date().getFullYear(); });

// PWA
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register(R + 'sw.js').catch(() => {});
