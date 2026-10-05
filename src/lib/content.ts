/**
 * Static page content lifted from gts-site-v2.html.
 *
 * Items marked SAMPLE / PLACEHOLDER were placeholders in the HTML and stay
 * placeholders: the methodology figures. They get replaced by CMS / database
 * data in Phase 5.
 */
import type { AccItem } from "@/components/Accordion";

export const ROOMS = [
  ["#discussion", "Open floor", "Charts, questions, disagreements. The part that makes traders better.", "I"],
  ["#challenges", "Our own challenge", "Real gold and crypto accounts, traded with the goal of doubling. Proof, not promises.", "II"],
  ["#perks", "Prop firms & exchanges", "Discount codes, fee rebates and giveaways from our partners.", "III"],
  ["#news", "Automated feed", "Our bot posts releases and events before they move price.", "IV"],
] as const;


export const PARTNER_LOGOS = [
  "PROP FIRM", "EXCHANGE", "PROP FIRM", "EXCHANGE", "BROKER", "PROP FIRM",
  "EXCHANGE", "PROP FIRM", "BROKER",
];

export const PERKS = [
  ["Prop firms", "Challenge discounts", "Reduced fees on funded account challenges with the firms we work with."],
  ["Exchanges", "Fee rebates", "Sign-up links that cut your taker fees for as long as the account is open."],
  ["Giveaways", "Funded accounts", "Regular giveaways of challenge accounts and terminal subscriptions."],
] as const;

export const HOME_FAQ: AccItem[] = [
  { q: "What is free, and what is paid?", a: "The Discord community is free: the discussion channels, partner perks and our public account challenges. The masterclass and weekly live sessions are in the Education plan, and Pro adds the GTS Terminal. Both plans are on the pricing page." },
  { q: "How do I get access after paying?", a: "Pay by card through Stripe or in crypto, then open a ticket in our Discord with the invoice ID you receive. We verify the payment, unlock the masterclass and live sessions on your Discord account and, on Pro, give your Google email access to the terminal." },
  { q: "What is the win rate, really?", a: "80% at 1R and 70% at 2R across our own backtests. Those are backtested figures, not live account statements, and the full methodology (pairs, date range, sample size and the worst losing streak) is posted in the server. A win rate without a sample size attached is marketing, not data." },
  { q: "Do you offer refunds?", a: "Card subscriptions can be cancelled any time and you keep access to the end of the paid period. Crypto payments are a fixed-term purchase and cannot be refunded, which is why we say so plainly at checkout rather than burying it in the terms." },
  { q: "Do I need experience to join?", a: "No. The masterclass starts with risk management and basic market structure and assumes nothing. Most people work through it before relying on the terminal, and we would rather you did it in that order." },
  { q: "Which markets do you cover?", a: "Gold and crypto. Gold on the London and New York sessions, crypto around the clock with a focus on majors and a small rotation of liquid alts. We do not teach equities, indices or FX pairs, because that is not where our edge is." },
  { q: "Is any of this financial advice?", a: "No. Everything we publish is educational, and we have no idea what your account size or risk tolerance is. GLITCHERS is not a broker, adviser or asset manager and never handles anyone's funds." },
  { q: "What happens if I cancel?", a: "Paid access (the masterclass, live sessions and, on Pro, the terminal) ends when the paid period does. You keep your Discord membership, the partner perks and the public challenges. Those never depended on paying." },
];

export const BILLING_FAQ: AccItem[] = [
  { q: "Can I cancel any time?", a: "Yes, by opening a ticket in our Discord. Access continues to the end of the period you have already paid for, then paid access is removed." },
  { q: "What happens if my card fails?", a: "Nothing immediately. Stripe retries over roughly two weeks and you stay in a grace period the whole time. We only remove paid access once the subscription has actually failed, not on the first decline." },
  { q: "How do crypto payments work?", a: "They buy a fixed term of 30 or 365 days rather than a subscription. There is no auto-renew, so we message you at seven days, three days and one day before access ends. Crypto payments cannot be refunded." },
  { q: "Do I lose the Discord if I cancel?", a: "No. The Discord community, partner perks and public challenges are free, and they stay exactly as they were. Only your paid plan's access ends." },
];

/** The GTS Terminal's tools (terminal page tabs). */
export const TOOLS = [
  {
    id: "levels", label: "GTS Levels", title: "GTS Levels",
    body: "Levels drawn straight from orderflow: the places where real buying and selling actually happened. Live levels show in peach; when that piece of orderflow stops mattering, its level turns grey, so the chart only highlights what is still in play.",
    shows: "where the meaningful orderflow sits, and which of it still matters.",
    use: "we only look for trades at a level. No level, no setup.",
  },
  {
    id: "reversals", label: "GTS Reversals", title: "GTS Reversals",
    body: "Arrows that print above or below a candle when price rejects a level: bullish under the candle, bearish above it. The candle that prints the arrow is the trigger.",
    shows: "the moment price turns at a level, on the candle where it happens.",
    use: "entry on the reversal candle after it taps a GTS Level, stop beyond the level with room to breathe, targets at 1R and 2R.",
  },
  {
    id: "heatmap", label: "Liquidation heatmap", title: "Liquidation heatmap",
    body: "A heatmap of the liquidations that actually took place: where leveraged positions were forced out, drawn on the chart at the price and time it happened. The hotter the area, the more was liquidated there.",
    shows: "where traders got liquidated, and which moves were driven by forced buying or selling.",
    use: "as context: a GTS Reversal that prints right after a wave of liquidations tells you the move was forced, not chosen.",
  },
  {
    id: "orderflow", label: "Orderflow confirmations", title: "Orderflow confirmations",
    body: "Shows absorption and exhaustion. Absorption is when resting orders soak up aggressive buying or selling without letting price through; exhaustion is when the aggressive side simply runs out of steam.",
    shows: "whether a move into a level is being absorbed, or is running out on its own.",
    use: "as the final check before taking a reversal, and the first thing to look at when one fails.",
  },
];

/**
 * The masterclass curriculum: modules in order, each with its lessons.
 * Copy is deliberately generic (no first or third person). No durations yet.
 */
export type Lesson = { title: string; desc: string };
export type CourseModule = { id: string; name: string; lessons: Lesson[] };

export const CURRICULUM: CourseModule[] = [
  {
    id: "foundations",
    name: "Foundations",
    lessons: [
      { title: "Risk Management", desc: "Consistent profitability is not possible without managing risk. That is why it comes first." },
      { title: "How to Actually Win", desc: "Strategy matters less than most traders think: almost any strategy can be profitable once the mentality is in check." },
    ],
  },
  {
    id: "structure",
    name: "Market Structure",
    lessons: [
      { title: "Basic Market Structure", desc: "The basic building blocks of market structure. Essential for every beginner." },
      { title: "Intro to Zones", desc: "A different way of reading market structure, built on original zone concepts that change everything that follows." },
      { title: "Advanced Market Structure", desc: "Builds on the previous lesson by combining traditional market structure with zones." },
      { title: "Market Cycles", desc: "The theory of market cycles, premium and discount, and one of the ten algorithmic functions of price delivery." },
    ],
  },
  {
    id: "liquidity",
    name: "Liquidity & Imbalances",
    lessons: [
      { title: "External Liquidity", desc: "The type of liquidity most traders already know, and why there is more to it than that." },
      { title: "Internal Liquidity", desc: "The part of the market few traders recognise as liquidity, and the opportunities it opens up." },
    ],
  },
  {
    id: "snd",
    name: "Supply & Demand",
    lessons: [
      { title: "Basic Supply & Demand", desc: "Almost everything in technical analysis, summarised through supply and demand structures." },
      { title: "Advanced Supply & Demand", desc: "Combining everything so far to find the right points to trade. Advanced material." },
    ],
  },
  {
    id: "strategy",
    name: "Trading Strategy",
    lessons: [
      { title: "The Glitch Models", desc: "Where everything before it comes together, and where the part about making money begins." },
    ],
  },
  {
    id: "backtests",
    name: "Backtests & Narrative Building",
    lessons: [
      { title: "Gold Backtest", desc: "An over-the-shoulder recording of 25 gold trades tested with every concept in the course. A lesson in context and narrative building." },
    ],
  },
];

/** Home page syllabus: every lesson, in order. */
export const SYLLABUS = CURRICULUM.flatMap((m) => m.lessons.map((l) => l.title));

/** Footer risk warning. LEGALLY LOAD-BEARING: verbatim from the HTML (punctuation only changed: no em dashes). Do not edit without sign-off. */
export const RISK_WARNING =
  "Trading gold, foreign exchange and cryptocurrency carries a high level of risk and can result in the loss of all of your capital. Past performance, including any win rates, backtested figures or published results shown on this site, is not a reliable indicator of future results; backtested performance in particular benefits from hindsight and does not fully account for slippage, liquidity or the psychological cost of a losing streak. All performance figures shown here are from in-house backtesting, and the complete methodology, including sample size, date range, pairs tested and worst drawdown, is published in our Discord server. Nothing on this site or in our Discord is financial, investment or tax advice; everything we publish is educational, and every trading decision you make is your own. GLITCHERS is not a licensed broker, financial adviser or asset manager, does not manage funds on anyone's behalf, and never takes custody of member capital. We hold commercial affiliate relationships with the prop firms and exchanges listed on this site and may earn a commission when you use our links or discount codes. Only trade with capital you can afford to lose.";

/** GTS Terminal journal features (terminal page), taken from the journal screens. */
export const JOURNAL_FEATURES = [
  "Tracks every trade automatically, no spreadsheet",
  "Win rate, profit factor, net R, expectancy, best streak and max drawdown",
  "Equity curve, plus daily, weekly, monthly and by-hour breakdowns",
  "Filter by session (London, Asia, New York), time of day, and pair, gold or crypto",
  "Split by symbol, long vs short, and timeframe",
  "What-if: change your target and break-even rules and replay the same trades",
  "What could have been better: how far losers ran first, what winners left behind",
  "Monte Carlo runs on your own trade history",
];
