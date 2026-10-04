import type { SVGProps } from "react";
import { equityPoints } from "@/lib/chart";

/** Cumulative-R curve. Rendered fully drawn; EquityDraw animates the stroke. */
export function EquityCurve(svg: Omit<SVGProps<SVGSVGElement>, "viewBox">) {
  const W = 900, H = 260, P = 30;
  const pts = equityPoints();
  const lo = Math.min(...pts, 0);
  const hi = Math.max(...pts);
  const sp = hi - lo || 1;
  const x = (i: number) => P + (i * (W - P * 2)) / (pts.length - 1);
  const y = (p: number) => H - P - ((p - lo) / sp) * (H - P * 2);
  const d = pts.map((p, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(p).toFixed(1)).join(" ");
  const last = pts.length - 1;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} {...svg}>
      <defs>
        <linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C99A4B" stopOpacity=".24" />
          <stop offset="100%" stopColor="#C99A4B" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((g) => {
        const gy = P + (g * (H - P * 2)) / 3;
        return <line key={g} x1={P} y1={gy} x2={W - P} y2={gy} stroke="rgba(237,227,212,.05)" />;
      })}
      <path d={`${d} L ${x(last)} ${H - P} L ${x(0)} ${H - P} Z`} fill="url(#eg)" />
      <path className="eq" d={d} fill="none" stroke="#C99A4B" strokeWidth={1.7} strokeLinejoin="round" />
      {pts.map((_, i) =>
        i % 4 === 0 ? (
          <text
            key={i}
            x={x(i)}
            y={H - 8}
            fill="#6E656B"
            style={{ fontFamily: "var(--f-mono)" }}
            fontSize={9}
            textAnchor="middle"
          >
            W{i + 1}
          </text>
        ) : null,
      )}
      <circle cx={x(last)} cy={y(pts[last])} r={3.6} fill="#F5E3A3" />
    </svg>
  );
}
