/**
 * Site-wide links and copy constants.
 *
 * Everything marked PLACEHOLDER was a dead `#/` link in gts-site-v2.html.
 * Fill these in once the real destinations exist — they are deliberately
 * not invented here.
 */
export const SITE = {
  name: "GLITCHERS",
  short: "GTS",
  title: "GLITCHERS — Gold & Crypto Trading Education",
  description:
    "A Discord trading education community for gold and crypto. A free masterclass, live mentorship, and the GTS Terminal: our own charting terminal with GTS Levels, GTS Reversals, a liquidation heatmap, orderflow confirmations and an auto-tracking journal.",
  promoCode: "GTS20",
} as const;

export const LINKS = {
  terminal: "https://charts.glitchtrading.co", // GTS charting terminal (levels, reversals, heatmap, orderflow)
  discordInvite: "#", // PLACEHOLDER — Discord invite URL
  signIn: "#", // PLACEHOLDER — becomes /login in Phase 5
  account: "#", // PLACEHOLDER — becomes /account in Phase 5
  calendar: "#", // PLACEHOLDER — live session .ics / calendar link
  pastRecordings: "#", // PLACEHOLDER
  social: {
    x: "#", // PLACEHOLDER
    youtube: "#", // PLACEHOLDER
    instagram: "#", // PLACEHOLDER
    discord: "#", // PLACEHOLDER
  },
} as const;
