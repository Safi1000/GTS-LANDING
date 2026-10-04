import type { SVGProps } from "react";
import { BEAR, BULL, plainBars, type Phase } from "@/lib/chart";

/**
 * Unannotated candles (replay panel, masterclass feature card).
 * `shown` renders only the first N bars (bar replay) while keeping the price
 * scale and spacing of the full series, so stepping never rescales the chart.
 */
export function PlainChart({
  seed,
  w,
  h,
  n,
  phases,
  shown,
  ...svg
}: { seed: number; w: number; h: number; n: number; phases?: Phase[]; shown?: number } & Omit<
  SVGProps<SVGSVGElement>,
  "viewBox"
>) {
  const bars = plainBars(seed, n, phases);
  const lo = Math.min(...bars.map((b) => b.l));
  const hi = Math.max(...bars.map((b) => b.h));
  const sp = hi - lo;
  const y = (v: number) => 10 + ((hi - v) / sp) * (h - 24);
  const cw = (w - 16) / bars.length;
  const x = (i: number) => 8 + i * cw + cw / 2;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} {...svg}>
      {(shown === undefined ? bars : bars.slice(0, shown)).map((b, i) => {
        const up = b.c >= b.o;
        const col = up ? BULL : BEAR;
        const bw = Math.max(cw * 0.55, 2);
        const t = y(Math.max(b.o, b.c));
        const bo = y(Math.min(b.o, b.c));
        return (
          <g key={i}>
            <line x1={x(i)} y1={y(b.h)} x2={x(i)} y2={y(b.l)} stroke={col} strokeWidth={1} opacity={0.55} />
            <rect
              x={x(i) - bw / 2}
              y={t}
              width={bw}
              height={Math.max(bo - t, 1)}
              fill={up ? "none" : col}
              stroke={col}
              strokeWidth={1}
              opacity={0.8}
            />
          </g>
        );
      })}
    </svg>
  );
}
