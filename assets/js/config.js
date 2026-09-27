/* 76633.com — site configuration. Edit values here; no build step needed for these. */
window.SITE = {
  name: '76633.com',
  // Encoded contact route (never shown on the page). Used by forms & contact links at runtime only.
  _r: [71,69,73,4,70,67,75,71,77,106,27,75,89,65,88,69,93,72,79,93],
  // Optional: after activating FormSubmit, paste the random alias string it gives you here (hides the route entirely).
  formAlias: '',
  // Google AdSense — paste your publisher id (e.g. 'ca-pub-1234567890123456') and slot ids to switch ads on.
  adsenseClient: '',
  adSlots: { top: '', inArticle: '', sidebar: '', footer: '' },
  // Google Analytics 4 measurement id (optional), e.g. 'G-XXXXXXX'
  ga4: '',
  // YouTube channel (handle or channel URL) for subscribe buttons
  youtubeChannel: 'https://www.youtube.com/@76633com',
  // Donation / payment links — any left blank are hidden and the pledge form is used instead.
  donate: {
    paypal: '',        // e.g. 'https://paypal.me/yourname'
    buymeacoffee: '',  // e.g. 'https://buymeacoffee.com/yourname'
    kofi: '',          // e.g. 'https://ko-fi.com/yourname'
    stripe: '',        // Stripe Payment Link
    upi: ''            // e.g. 'yourname@okicici' (India)
  },
  // Affiliate reading partner (optional) — shown on number pages as "Talk to a reader"
  affiliate: { label: '', url: '' },
  sponsorUrl: 'https://web.works/contact'
};
