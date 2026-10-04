"use client";

import { useState, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap";

const FILTERS = [
  ["all", "All"],
  ["gold", "Gold"],
  ["crypto", "Crypto"],
  ["win", "Wins"],
  ["loss", "Losses"],
] as const;

/**
 * Filter chips for the results ledger. The table itself is server-rendered
 * and passed as children; the chip only sets `data-filter`, and CSS in
 * globals.css (.lf[data-filter=…]) hides the non-matching rows.
 */
export function LedgerFilters({ children }: { children: ReactNode }) {
  const [f, setF] = useState<(typeof FILTERS)[number][0]>("all");
  return (
    <div className="lf" data-filter={f} style={{ display: "contents" }}>
      <div className="chips" data-rv style={{ marginBottom: 26 }}>
        {FILTERS.map(([k, label]) => (
          <button
            key={k}
            className={`chip${f === k ? " on" : ""}`}
            aria-pressed={f === k}
            onClick={() => {
              setF(k);
              requestAnimationFrame(() => ScrollTrigger.refresh());
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
