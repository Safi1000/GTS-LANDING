import type { SVGProps } from "react";
import { BEAR, BULL, reversalScene } from "@/lib/chart";

/**
 * GTS Levels + GTS Reversals chart for "Anatomy of a setup".
 *
 * Pure render at an exact pixel size (`w` × `h`), so text stays crisp and the
 * chart can match whatever box it sits in (AnatomyChart measures that box).
 * Every layer renders visible; AnatomyScrub hides and reveals them via:
 *   .zone          GTS Levels (peach = live, grey = that orderflow no longer matters)
 *   .cdl[data-i]   candles, in order
 *   .arw[data-i]   GTS Reversal arrows, shown with their candle
 *   .arw-main      the reversal on the level tap (entry), with its tag
 *   .sig           entry / SL / TP1 / TP2, in that order (drawn under the arrows)
 *
 * Colours: candles bone/oxblood and arrows gold (bullish) / oxblood (bearish),
 * per the design rule (gold marks a signal; never green/red).
 */
const MONO = { fontFamily: "var(--f-mono)" } as const;
const PEACH = "232,164,140";
const ARROW_UP = "#E0B863";
const ARROW_DOWN = "#9A3247";

export function GtsLevelsChart({
  w,
  h,
  ...svg
}: { w: number; h: number } & Omit<SVGProps<SVGSVGElement>, "viewBox">) {
  const { bars, zones, arrows, R, entry, sl, tp1, tp2 } = reversalScene();
  // PB leaves room for the GTS REVERSAL tag under the lowest candle
  const PT = 18, PB = 40, PL = 10, PR = 92;
  const lo = Math.min(...bars.map((b) => b.l), sl) - 1.2;
  const hi = Math.max(...bars.map((b) => b.h), ...zones.map((z) => z.hi), tp2) + 1.2;
  const sp = hi - lo;
  const y = (v: number) => PT + ((hi - v) / sp) * (h - PT - PB);
  const cw = (w - PL - PR) / bars.length;
  const x = (i: number) => PL + i * cw + cw / 2;
  const right = w - PR + 2;

  // level lines (labels at the right) — computed first so grid labels can avoid them
  const levels: [number, string, string, string][] = [
    [entry, "#C99A4B", "ENTRY " + entry.toFixed(1), "0"],
    [sl, "#9A3247", "SL " + sl.toFixed(1), "3 3"],
    [tp1, "#F5E3A3", "TP1 " + tp1.toFixed(1), "3 3"],
    [tp2, "#F5E3A3", "TP2 " + tp2.toFixed(1), "3 3"],
  ];
  const grid = Array.from({ length: 5 }, (_, g) => {
    const gy = PT + (g * (h - PT - PB)) / 4;
    return { gy, gp: hi - (g / 4) * sp, clash: levels.some(([p]) => Math.abs(y(p) - gy) < 12) };
  });
  const s = Math.max(6, Math.min(cw * 0.9, 10)); // arrow size

  return (
    <svg viewBox={`0 0 ${w} ${h}`} {...svg}>
      {grid.map(({ gy, gp, clash }, g) => (
        <g key={g}>
          <line x1={PL} y1={gy} x2={right + 4} y2={gy} stroke="rgba(237,227,212,.05)" />
          {!clash && (
            <text x={right + 12} y={gy + 3.5} fill="#6E656B" style={MONO} fontSize={9.5}>
              {gp.toFixed(1)}
            </text>
          )}
        </g>
      ))}

      {zones.map((z, k) => {
        const x0 = x(z.from) - cw / 2;
        const x1 = z.to === null ? right : x(z.to) + cw / 2;
        const rgb = z.active ? PEACH : "237,227,212";
        return (
          <g className="zone" opacity={1} key={k}>
            <rect
              x={x0}
              y={y(z.hi)}
              width={x1 - x0}
              height={y(z.lo) - y(z.hi)}
              fill={`rgba(${rgb},${z.active ? 0.15 : 0.06})`}
              stroke={`rgba(${rgb},${z.active ? 0.45 : 0.16})`}
              strokeWidth={1}
            />
            {z.active && z.labelAt !== undefined && (
              <text x={x(z.labelAt)} y={y(z.hi) + 11} fill={`rgba(${PEACH},.8)`} style={MONO} fontSize={8.5} letterSpacing=".08em">
                GTS LEVEL
              </text>
            )}
          </g>
        );
      })}

      {bars.map((b, i) => {
        const up = b.c >= b.o;
        const col = up ? BULL : BEAR;
        const bw = Math.max(cw * 0.58, 2.4);
        const t = y(Math.max(b.o, b.c));
        const bo = y(Math.min(b.o, b.c));
        return (
          <g className="cdl" data-i={i} opacity={1} key={i}>
            <line x1={x(i)} y1={y(b.h)} x2={x(i)} y2={y(b.l)} stroke={col} strokeWidth={1.1} opacity={0.72} />
            <rect x={x(i) - bw / 2} y={t} width={bw} height={Math.max(bo - t, 1.2)} fill={up ? "none" : col} stroke={col} strokeWidth={1.1} />
          </g>
        );
      })}

      {/* level lines sit under the arrows, so the GTS REVERSAL tag covers the SL line */}
      {levels.map(([p, c, lab, d]) => (
        <g className="sig" opacity={1} key={lab}>
          <line x1={x(R) - cw / 2} y1={y(p)} x2={right} y2={y(p)} stroke={c} strokeWidth={1} strokeDasharray={d} opacity={0.85} />
          <rect x={right - 1} y={y(p) - 8} width={84} height={16} fill={c} opacity={0.13} />
          <text x={right + 5} y={y(p) + 3.6} fill={c} style={MONO} fontSize={9.5}>
            {lab}
          </text>
        </g>
      ))}

      {arrows.map((a) => {
        const b = bars[a.i];
        const size = a.main ? s * 1.35 : s;
        const cx = x(a.i);
        const tri =
          a.dir === "up"
            ? `M${cx} ${y(b.l) + 6} l${size / 2} ${size} h${-size} z`
            : `M${cx} ${y(b.h) - 6} l${size / 2} ${-size} h${-size} z`;
        const fill = a.dir === "up" ? ARROW_UP : ARROW_DOWN;
        if (!a.main) return <path key={a.i} className="arw" data-i={a.i} opacity={1} d={tri} fill={fill} />;
        const ty = y(b.l) + 6 + size + 6;
        return (
          <g key={a.i} className="arw-main" data-i={a.i} opacity={1}>
            <path d={tri} fill={fill} />
            <rect x={cx - 46} y={ty} width={92} height={19} rx={2} fill={ARROW_UP} />
            <text x={cx} y={ty + 13} textAnchor="middle" fill="#231703" style={MONO} fontSize={9.5} letterSpacing=".08em">
              GTS REVERSAL
            </text>
          </g>
        );
      })}

    </svg>
  );
}
