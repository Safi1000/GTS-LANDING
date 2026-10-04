import { ambientCandles } from "@/lib/chart";
import { AmbientDrift } from "@/components/AmbientDrift";

/** The faint candle field behind CTA bands. */
export function AmbientCandles() {
  const candles = ambientCandles();
  return (
    <div className="candles" aria-hidden="true">
      <AmbientDrift>
        <svg viewBox="0 0 1400 300" preserveAspectRatio="none">
          {candles.map((c) => (
            <g key={c.x}>
              <rect x={c.x} y={c.t} width={7} height={c.h} fill="#EDE3D4" />
              <rect x={c.x + 3} y={c.wy} width={1} height={c.wh} fill="#EDE3D4" />
            </g>
          ))}
        </svg>
      </AmbientDrift>
    </div>
  );
}
