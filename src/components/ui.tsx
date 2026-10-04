import type { CSSProperties } from "react";

/* Small presentational pieces shared by every page. All server components. */

/** Numbered section header: ◇ II ─ INSIDE THE SERVER ───── */
export function Rail({ n, label }: { n: string; label: string }) {
  return (
    <div className="rail" data-rv>
      <span className="dia">
        <span>{n}</span>
      </span>
      <span className="lbl">{label}</span>
      <span className="ln" />
    </div>
  );
}

/** ── ◆ ── ornament */
export function Orn({ style }: { style?: CSSProperties }) {
  return (
    <div className="orn" style={style}>
      <i />
      <b />
      <i />
    </div>
  );
}

/** Mono gold kicker label used on cards (an inline style repeated throughout the HTML). */
export const KICKER: CSSProperties = {
  fontSize: "10.5px",
  color: "var(--gold-500)",
  letterSpacing: ".12em",
  textTransform: "uppercase",
};

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="mono" style={KICKER}>
      {children}
    </span>
  );
}

/** Pulsing dot + label in panel bars ("LIVE", "REPLAY"). */
export function PanelBar({ pair, tf, label, live }: { pair: string; tf: string; label: string; live: string }) {
  return (
    <div className="panel-bar">
      <span className="pair">{pair}</span>
      <span className="tf">{tf}</span>
      <span>{label}</span>
      <span className="live">
        <i className="dot" />
        {live}
      </span>
    </div>
  );
}
