/**
 * Static page content lifted from gts-site-v2.html.
 *
 * Items marked SAMPLE / PLACEHOLDER were placeholders in the HTML and stay
 * placeholders: the testimonials and the methodology figures. They get
 * replaced by CMS / database data in Phase 5.
 */
import type { AccItem } from "@/components/Accordion";

export const ROOMS = [
  ["#discussion", "Open floor", "Charts, questions, disagreements. The part that makes traders better.", "I"],
  ["#challenges", "Two running now", "Gold and crypto, with the leaderboard posted publicly.", "II"],
  ["#perks", "Prop firms & exchanges", "Discount codes, fee rebates and giveaways from our partners.", "III"],
  ["#news", "Automated feed", "Our bot posts releases and events before they move price.", "IV"],
] as const;

export const SYLLABUS = [
  "Market structure", "Price action", "Dow theory", "Wyckoff", "Elliott wave", "Technical analysis",
  "Liquidity & order flow", "Risk & position sizing", "Session timing", "Every indicator strategy",
  "Backtesting your edge", "Journaling & review",
];

export const PARTNER_LOGOS = [
  "PROP FIRM", "EXCHANGE", "PROP FIRM", "EXCHANGE", "BROKER", "PROP FIRM",
  "EXCHANGE", "PROP FIRM", "BROKER",
];

export const PERKS = [
  ["Prop firms", "Challenge discounts", "Reduced fees on funded account challenges with the firms we work with."],
  ["Exchanges", "Fee rebates", "Sign-up links that cut your taker fees for as long as the account is open."],
  ["Giveaways", "Funded accounts", "Regular giveaways of challenge accounts and indicator subscriptions."],
  ["Challenges", "Two running", "Gold and crypto, with prizes and a public leaderboard in the server."],
] as const;

export type Quote = { p: string; av: string; hd: string };
/** SAMPLE COPY — testimonials (each row repeats with shorter cuts for the loop) */
export const QUOTES_A: Quote[] = [
  { p: "The free masterclass is better than two paid courses I bought last year. Took three weeks to work through and I stopped revenge trading after module four.", av: "KH", hd: "@kh_trades" },
  { p: "Indicator does not think for you, which I like. It marks the sweep and the break, I decide if the daily agrees. Cut my screen time in half.", av: "SA", hd: "@saad.fx" },
  { p: "Terminal is the underrated part. Replaying gold on a consolidated feed instead of one broker's wicks changed how I backtest.", av: "JD", hd: "@jdoyle" },
  { p: "The free masterclass is better than two paid courses I bought last year. I stopped revenge trading after module four.", av: "KH", hd: "@kh_trades" },
  { p: "It marks the sweep and the break, I decide if the daily agrees. Cut my screen time in half.", av: "SA", hd: "@saad.fx" },
  { p: "Replaying gold on a consolidated feed changed how I backtest.", av: "JD", hd: "@jdoyle" },
];
export const QUOTES_B: Quote[] = [
  { p: "Stayed for #discussion. Getting your chart torn apart by people who actually trade is worth more than any course.", av: "TN", hd: "@tariqn" },
  { p: "Prop firm code paid for my indicator subscription twice over. Genuinely did not expect that.", av: "LB", hd: "@lenab" },
  { p: "Two months in, first green month ever. The position sizing module did it.", av: "AY", hd: "@ayo_trades" },
  { p: "They told me not to subscribe until I had finished the masterclass. First trading group that has ever talked me out of spending money.", av: "DV", hd: "@dvriend" },
  { p: "Getting your chart torn apart by people who actually trade is worth more than any course.", av: "TN", hd: "@tariqn" },
  { p: "Prop firm code paid for my indicator subscription twice over.", av: "LB", hd: "@lenab" },
  { p: "First green month ever. The position sizing module did it.", av: "AY", hd: "@ayo_trades" },
  { p: "First trading group that has ever talked me out of spending money.", av: "DV", hd: "@dvriend" },
];

export const HOME_FAQ: AccItem[] = [
  { q: "Is the masterclass really free?", a: "Yes, all of it. Written lessons, chart breakdowns, video and the live sessions. No card, no subscription. We make money on the indicator, and people who understand the method get more out of it — so teaching first is in our interest as much as yours." },
  { q: "How do I actually get the indicator?", a: "Subscribe, then give us your TradingView username in your account settings. The script is invite-only, so we grant access to your specific TradingView account by hand. That usually happens within a few hours, and you get a Discord message when it is live." },
  { q: "What is the win rate, really?", a: "75% at 1R and 60% at 2R across our own backtests. Those are backtested figures, not live account statements, and the full methodology — pairs, date range, sample size and the worst losing streak — is posted in the server. A win rate without a sample size attached is marketing, not data." },
  { q: "Do you offer refunds?", a: "Card subscriptions can be cancelled any time and you keep access to the end of the paid period. Crypto payments are a fixed-term purchase and cannot be refunded, which is why we say so plainly at checkout rather than burying it in the terms." },
  { q: "Do I need experience to join?", a: "No. The masterclass starts at market structure and candles and assumes nothing. Most people spend a few weeks in the free material before they think about the indicator, and we would rather you did it in that order." },
  { q: "Which markets do you cover?", a: "Gold and crypto. Gold on the London and New York sessions, crypto around the clock with a focus on majors and a small rotation of liquid alts. We do not teach equities, indices or FX pairs, because that is not where our edge is." },
  { q: "Is any of this financial advice?", a: "No. Everything we publish is educational, and we have no idea what your account size or risk tolerance is. GLITCHERS is not a broker, adviser or asset manager and never handles anyone's funds." },
  { q: "What happens if I cancel?", a: "Indicator and terminal access end when the paid period does, and the script disappears from your TradingView list. You keep your Discord membership, the masterclass, the live sessions and the partner perks — those never depended on paying." },
];

export const BILLING_FAQ: AccItem[] = [
  { q: "Can I cancel any time?", a: "Yes, from your account page in two clicks. Access continues to the end of the period you have already paid for, then the script is removed from your TradingView account." },
  { q: "What happens if my card fails?", a: "Nothing immediately. Stripe retries over roughly two weeks and you stay in a grace period the whole time. We only revoke indicator access once the subscription has actually failed, not on the first decline." },
  { q: "How do crypto payments work?", a: "They buy a fixed term — 30 days or 365 days — rather than a subscription. There is no auto-renew, so we message you at seven days, three days and one day before access ends. Crypto payments cannot be refunded." },
  { q: "Do I lose the free stuff if I cancel?", a: "No. The Discord, masterclass, live sessions and partner perks were never tied to paying, and they stay exactly as they were." },
];

export const STRATEGIES = [
  {
    id: "s1", label: "Trend continuation", title: "Trend continuation",
    body: "For markets already in a clean directional move. The script waits for a pullback into a prior demand or supply zone, confirms the trend is intact by checking the last swing, and prints on the reclaim.",
    invalidation: "the swing that defined the trend gets taken out.",
    bestOn: "gold during London, crypto majors on a strong daily.", w1: "78%", w2: "62%",
  },
  {
    id: "s2", label: "Sweep reversal", title: "Liquidity sweep reversal",
    body: "The highest-conviction setup in the script. Price runs a well-defined high or low, fails to hold beyond it, and reclaims the level within a set number of bars. The stop sits beyond the sweep, which keeps risk small and R high.",
    invalidation: "a close beyond the swept extreme.",
    bestOn: "gold at session opens, crypto on weekend liquidity.", w1: "74%", w2: "64%",
  },
  {
    id: "s3", label: "Range break", title: "Range break",
    body: "For compressed markets. The script identifies a range with at least three touches on each side, then prints on the break with a retest requirement — which filters most of the false breaks that make this setup frustrating to trade manually.",
    invalidation: "price closes back inside the range.",
    bestOn: "crypto during low-volatility stretches.", w1: "71%", w2: "55%",
  },
  {
    id: "s4", label: "Session scalp", title: "Session scalp",
    body: "Intraday only, tuned to the first two hours of London and New York. Smaller targets, tighter stops, higher frequency. This is the setup that needs the most context from you — it will print in conditions where you should stand down.",
    invalidation: "time-based as well as price-based; the setup expires.",
    bestOn: "gold, opening ranges.", w1: "76%", w2: "52%",
  },
];

export const LESSONS = [
  ["Foundations", "What a candle actually tells you", "Open, high, low, close — and why the close is the only one carrying information.", "14m"],
  ["Foundations", "Support, resistance and why levels fail", "Levels are zones, not lines. Drawing them so they survive contact with price.", "19m"],
  ["Price action", "Market structure from scratch", "Higher highs, lower lows, and the exact moment structure breaks.", "23m"],
  ["Price action", "Liquidity: where the stops are", "Why price runs a high before reversing, and how to see it in advance.", "21m"],
  ["Advanced theory", "Dow theory, properly", "The six tenets, and which two still matter on a 15-minute chart.", "17m"],
  ["Advanced theory", "Wyckoff accumulation and distribution", "Reading the schematics without forcing every range into one.", "28m"],
  ["Advanced theory", "Elliott wave without the cult", "Counting waves as a bias tool, not a prediction machine.", "26m"],
  ["The indicator", "Setting up the GTS script", "Inputs, alerts and which settings to leave alone.", "12m"],
  ["The indicator", "Every strategy, one by one", "All four setups, when each fires, and when to ignore it.", "41m"],
  ["Risk", "Position sizing that survives a losing streak", "Fixed fractional sizing and what a 7R drawdown does to an account.", "18m"],
  ["Risk", "Session timing and when to stand down", "Why the same setup has a different win rate at 3am.", "15m"],
  ["Risk", "Journaling and reviewing your own data", "The habit that turns a losing trader into a breakeven one.", "16m"],
] as const;

/** Footer risk warning. LEGALLY LOAD-BEARING — verbatim from the HTML. Do not edit without sign-off. */
export const RISK_WARNING =
  "Trading gold, foreign exchange and cryptocurrency carries a high level of risk and can result in the loss of all of your capital. Past performance, including any win rates, backtested figures or published results shown on this site, is not a reliable indicator of future results — backtested performance in particular benefits from hindsight and does not fully account for slippage, liquidity or the psychological cost of a losing streak. All performance figures shown here are from in-house backtesting, and the complete methodology, including sample size, date range, pairs tested and worst drawdown, is published in our Discord server. Nothing on this site or in our Discord is financial, investment or tax advice; everything we publish is educational, and every trading decision you make is your own. GLITCHERS is not a licensed broker, financial adviser or asset manager, does not manage funds on anyone's behalf, and never takes custody of member capital. We hold commercial affiliate relationships with the prop firms and exchanges listed on this site and may earn a commission when you use our links or discount codes. Only trade with capital you can afford to lose.";
