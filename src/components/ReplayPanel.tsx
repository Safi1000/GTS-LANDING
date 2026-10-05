"use client";

import { useState } from "react";
import { PlainChart } from "@/components/charts/PlainChart";
import { PanelBar } from "@/components/ui";
import { REPLAY_TFS } from "@/lib/chart";

const TFS = ["1M", "5M", "1H", "4H", "1D"] as const;
const N = 54; // bars per series
const START = 40; // replay opens part-way through the series

/**
 * Bar-replay demo panel (home "Replay & backtesting", terminal page).
 * Timeframe chips switch the series; "Step ›" reveals the next bar, and once
 * the series is fully played it becomes "Restart". The server renders the 1H
 * series at bar 40 - identical to the client's first render.
 */
export function ReplayPanel({ rv = true }: { rv?: boolean }) {
  const [tf, setTf] = useState<(typeof TFS)[number]>("1H");
  const [shown, setShown] = useState(START);
  const done = shown >= N;
  const { seed, phases } = REPLAY_TFS[tf];

  return (
    <div className="panel" {...(rv ? { "data-rv": "" } : {})}>
      <PanelBar pair="XAUUSD" tf={tf} label="Replay · 14 Mar 2026" live="REPLAY" />
      <PlainChart
        seed={seed}
        phases={phases}
        w={720}
        h={300}
        n={N}
        shown={shown}
        role="img"
        aria-label={`Gold ${tf} chart in bar replay, bar ${shown} of ${N}`}
      />
      <div className="replay-bar">
        {TFS.map((t) => (
          <button
            key={t}
            type="button"
            className={`chip${t === tf ? " on" : ""}`}
            aria-pressed={t === tf}
            onClick={() => {
              setTf(t);
              setShown(START);
            }}
          >
            {t}
          </button>
        ))}
        <span className="replay-count mono">
          {shown}/{N}
        </span>
        <button type="button" className="chip" onClick={() => setShown((s) => (s >= N ? START : s + 1))}>
          {done ? "Restart ↺" : "Step ›"}
        </button>
      </div>
    </div>
  );
}
