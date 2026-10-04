import type { SVGProps } from "react";
import { BEAR, BULL, signalGeometry, type SignalOpts } from "@/lib/chart";

/**
 * The GTS signal chart, rendered on the server.
 *
 * Every layer renders fully visible (opacity 1). Client wrappers
 * (AnatomyScrub, SignalChart) hide and re-reveal the layers through the
 * .cdl / .sig / .mk1 / .mk2 / .tag classes. If JS never runs, the finished
 * chart is what people see.
 *
 * SVG text uses var(--f-mono) rather than the literal "JetBrains Mono":
 * next/font renames the family, so the literal name would not resolve.
 */
const MONO = { fontFamily: "var(--f-mono)" } as const;

export function SignalChartSvg({
  opts,
  ...svg
}: { opts: SignalOpts } & Omit<SVGProps<SVGSVGElement>, "viewBox">) {
  const { W, H, PL, PR, bars, EI, entry, sl, tp1, tp2, y, x, cw, grid } = signalGeometry(opts);
  const lx = x(EI) - cw / 2;
  const rx = W - PR + 2;
  const sw = EI - 8;

  const level = (p: number, c: string, lab: string, d: string) => (
    <g className="sig" opacity={1} key={lab}>
      <line x1={lx} y1={y(p)} x2={rx} y2={y(p)} stroke={c} strokeWidth={1} strokeDasharray={d} opacity={0.85} />
      <rect x={rx - 1} y={y(p) - 8} width={84} height={16} fill={c} opacity={0.13} />
      <text x={rx + 5} y={y(p) + 3.6} fill={c} style={MONO} fontSize={9.5}>
        {lab}
      </text>
    </g>
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} {...svg}>
      {grid.map(({ gy, gp }, g) => (
        <g key={g}>
          <line x1={PL} y1={gy} x2={W - PR + 6} y2={gy} stroke="rgba(237,227,212,.05)" />
          <text x={W - PR + 14} y={gy + 3.5} fill="#6E656B" style={MONO} fontSize={9.5}>
            {gp.toFixed(1)}
          </text>
        </g>
      ))}
      {bars.map((b, i) => {
        const up = b.c >= b.o;
        const col = up ? BULL : BEAR;
        const bw = Math.max(cw * 0.58, 2.4);
        const t = y(Math.max(b.o, b.c));
        const bo = y(Math.min(b.o, b.c));
        return (
          <g className="cdl" opacity={1} key={i}>
            <line x1={x(i)} y1={y(b.h)} x2={x(i)} y2={y(b.l)} stroke={col} strokeWidth={1.1} opacity={0.72} />
            <rect
              x={x(i) - bw / 2}
              y={t}
              width={bw}
              height={Math.max(bo - t, 1.2)}
              fill={up ? "none" : col}
              stroke={col}
              strokeWidth={1.1}
            />
          </g>
        );
      })}
      {level(tp2, "#F5E3A3", "TP2 " + tp2.toFixed(1), "3 3")}
      {level(tp1, "#F5E3A3", "TP1 " + tp1.toFixed(1), "3 3")}
      {level(entry, "#C99A4B", "ENTRY " + entry.toFixed(1), "0")}
      {level(sl, "#9A3247", "SL " + sl.toFixed(1), "3 3")}
      <g className="mk1" opacity={1}>
        <text x={x(sw)} y={y(bars[sw].l) + 18} fill="#A3949A" textAnchor="middle" style={MONO} fontSize={9}>
          sweep
        </text>
      </g>
      <g className="mk2" opacity={1}>
        <text
          x={x(EI)}
          y={y(bars[EI].h) - 14}
          fill="#C99A4B"
          textAnchor="middle"
          style={MONO}
          fontSize={9}
          letterSpacing=".08em"
        >
          BOS
        </text>
      </g>
      <g className="tag" opacity={1}>
        <path d={`M${x(EI)} ${y(entry) + 16} l6 10 h-12 z`} fill="#C99A4B" />
        <rect x={x(EI) - 40} y={y(entry) + 26} width={80} height={21} rx={2} fill="#C99A4B" />
        <text
          x={x(EI)}
          y={y(entry) + 40.5}
          textAnchor="middle"
          fill="#231703"
          style={MONO}
          fontSize={10}
          letterSpacing=".1em"
        >
          GTS SETUP
        </text>
      </g>
    </svg>
  );
}
