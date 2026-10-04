/**
 * Deterministic chart engine — ported 1:1 from gts-site-v2.html.
 *
 * Everything here is pure: a seeded PRNG plus integer/IEEE arithmetic, so the
 * server and every browser produce bit-identical geometry. That is what lets
 * the charts render on the server. Never introduce Math.random() or Date here.
 */

export type Bar = { o: number; h: number; l: number; c: number };
/** [bar count, drift per bar, volatility] */
export type Phase = [number, number, number];

/** mulberry32 */
export function prng(seed: number) {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeBars(seed: number, phases: Phase[], start: number): Bar[] {
  const r = prng(seed);
  const b: Bar[] = [];
  let p = start;
  phases.forEach(([n, d, v]) => {
    for (let i = 0; i < n; i++) {
      const o = p;
      const c = o + d + (r() - 0.5) * v * 2;
      b.push({ o, h: Math.max(o, c) + r() * v * 0.9, l: Math.min(o, c) - r() * v * 0.9, c });
      p = c;
    }
  });
  return b;
}

export const PHASES: Phase[] = [
  [10, -0.9, 3.2],
  [8, -2.4, 3.8],
  [4, 4.6, 3.4],
  [4, -1.1, 2.4],
  [14, 2.5, 3],
];

/** Candle palette — bone up, oxblood down. Never green/red. */
export const BULL = "#D8CFC2";
export const BEAR = "#7E1730";

export type SignalOpts = { w: number; h: number; seed: number; start: number; entryIdx: number };

export function signalGeometry(o: SignalOpts) {
  const W = o.w, H = o.h, PT = 24, PB = 28, PL = 12, PR = 92;
  const bars = makeBars(o.seed, PHASES, o.start);
  const EI = o.entryIdx;
  const entry = bars[EI].c;
  const sl = Math.min(...bars.slice(EI - 9, EI - 1).map((b) => b.l)) - 1.6;
  const risk = entry - sl;
  const tp1 = entry + risk, tp2 = entry + risk * 2;
  const lo = Math.min(...bars.map((b) => b.l), sl);
  const hi = Math.max(...bars.map((b) => b.h), tp2);
  const sp = hi - lo;
  const y = (v: number) => PT + ((hi - v) / sp) * (H - PT - PB);
  const cw = (W - PL - PR) / bars.length;
  const x = (i: number) => PL + i * cw + cw / 2;
  const grid = Array.from({ length: 5 }, (_, g) => ({
    gy: PT + (g * (H - PT - PB)) / 4,
    gp: hi - (g / 4) * sp,
  }));
  return { W, H, PL, PR, bars, EI, entry, sl, tp1, tp2, y, x, cw, grid };
}

export function plainBars(seed: number, n: number) {
  return makeBars(
    seed,
    [
      [Math.round(n * 0.3), 1.2, 3],
      [Math.round(n * 0.25), -2, 3.4],
      [Math.round(n * 0.45), 2.2, 3],
    ],
    2390,
  );
}

export function ambientCandles() {
  const r = prng(9);
  const out: { x: number; t: number; h: number; wy: number; wh: number }[] = [];
  let p = 150;
  for (let i = 0; i < 80; i++) {
    const o = p, c = o + (r() - 0.45) * 26, t = Math.min(o, c), b = Math.max(o, c);
    // keep the original call order: wick offset, then wick height
    const wy = t - r() * 14;
    const wh = b - t + r() * 26;
    out.push({ x: i * 18, t, h: Math.max(b - t, 2), wy, wh });
    p = c;
    if (p < 40 || p > 260) p = 150;
  }
  return out;
}

/**
 * Round trig output for SVG attributes. Math.cos/sin are not required to be
 * bit-identical across JS engines, so unrounded values can differ between
 * Node and Safari in the last digit and cause a hydration mismatch.
 */
export const r3 = (n: number) => Math.round(n * 1000) / 1000;

/* ─── GTS Levels + GTS Reversals scene (home "Anatomy of a setup") ───
   A hand-shaped path (waypoints + seeded noise) rather than random phases, so
   the story is guaranteed: price rejects the upper level, sells off, taps the
   lower GTS Level, a GTS Reversal prints on the rejection candle (entry), and
   the rally runs through TP1 / TP2 into the upper level. Pure and seeded. */

/** labelAt: candle index where the "GTS LEVEL" label sits (chosen where price is not trading) */
export type Zone = { from: number; to: number | null; lo: number; hi: number; active: boolean; labelAt?: number };
export type ReversalArrow = { i: number; dir: "up" | "down"; main?: boolean };

export function reversalScene() {
  const r = prng(20261005);
  const N = 56;
  const R = 34; // the reversal candle (entry)
  const WP: [number, number][] = [
    [0, 2399.5], [7, 2412], [17, 2392.2], [23, 2402.2], [33, 2391.6], [R, 2395.6], [50, 2411.4], [N - 1, 2408.2],
  ];
  const at = (i: number) => {
    for (let k = 0; k < WP.length - 1; k++) {
      const [a, pa] = WP[k], [b, pb] = WP[k + 1];
      if (i >= a && i <= b) return pa + ((pb - pa) * (i - a)) / (b - a);
    }
    return WP[WP.length - 1][1];
  };
  const isWaypoint = (i: number) => WP.some(([k]) => k === i);
  const bars: Bar[] = [];
  let prev = 2399;
  for (let i = 0; i < N; i++) {
    const c = isWaypoint(i) ? at(i) : at(i) + (r() - 0.5) * 2.2;
    const o = prev;
    bars.push({ o, c, h: Math.max(o, c) + 0.2 + r() * 1.3, l: Math.min(o, c) - 0.2 - r() * 1.3 });
    prev = c;
  }
  // the tap and the rejection candle both trade into the demand level
  bars[33].l = 2390.6;
  bars[R] = { o: bars[33].c, c: 2395.6, h: 2396.1, l: 2390.9 };

  const zones: Zone[] = [
    { from: 5, to: null, lo: 2410.6, hi: 2413.4, active: true, labelAt: 13 }, // supply, from the first high
    { from: 21, to: 41, lo: 2400.6, hi: 2403.0, active: false }, // lower-high level, broken by the rally
    { from: 15, to: null, lo: 2390.2, hi: 2393.2, active: true, labelAt: 44 }, // demand, from the swing low — the one that gets tapped
  ];
  const arrows: ReversalArrow[] = [
    { i: 7, dir: "down" }, { i: 17, dir: "up" }, { i: 23, dir: "down" }, { i: R, dir: "up", main: true }, { i: 50, dir: "down" },
  ];
  const entry = bars[R].c;
  const sl = zones[2].lo - 1.2; // below the level, with breathing room
  const risk = entry - sl;
  return { bars, zones, arrows, R, entry, sl, tp1: entry + risk, tp2: entry + risk * 2 };
}
