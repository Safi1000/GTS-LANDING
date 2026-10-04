import type { Metadata } from "next";
import { Counter } from "@/components/Counter";
import { EquityDraw } from "@/components/EquityDraw";
import { LedgerFilters } from "@/components/LedgerFilters";
import { Reveal } from "@/components/Reveal";
import { EquityCurve } from "@/components/charts/EquityCurve";
import { sampleLedger } from "@/lib/content";

export const metadata: Metadata = {
  title: "Results",
  description: "Every GTS signal, logged as it is sent and published on Sunday. The losing weeks are here too.",
  alternates: { canonical: "/results" },
  openGraph: { title: "Results — GLITCHERS" },
};

export default function ResultsPage() {
  // SAMPLE DATA — wire to signal_results in Phase 5
  const rows = sampleLedger();
  return (
    <Reveal>
      <header className="wrap phero">
        <div className="eyebrow">Results</div>
        <h1 className="d-lg" style={{ marginTop: 18 }}>Every signal, published.</h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          Logged as it is sent, published on Sunday. The losing weeks are here too.
        </p>
      </header>

      <section className="wrap">
        <div className="strip frame" data-rv style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
          <div><Counter as="b" to={1240} /><span>Signals logged</span></div>
          <div><Counter as="b" to={75} suffix="%" /><span>Win rate</span></div>
          <div><b>+1.2R</b><span>Average per signal</span></div>
          <div><b className="w">+18R</b><span>Best week</span></div>
          <div><b className="l">&minus;7R</b><span>Worst week</span></div>
        </div>
      </section>

      <section className="wrap band-t">
        <div className="card frame" data-rv style={{ padding: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
            <h3>Cumulative R</h3>
            <span className="mono small" style={{ color: "var(--faint)" }}>Last 24 weeks</span>
          </div>
          <EquityDraw>
            <EquityCurve style={{ width: "100%", height: "auto", marginTop: 20 }} aria-label="Cumulative R over 24 weeks" />
          </EquityDraw>
        </div>
      </section>

      <section className="wrap band-t">
        <LedgerFilters>
          <div data-rv style={{ overflowX: "auto" }}>
            <table className="ledger">
              <thead>
                <tr>
                  <th>Date</th><th>Pair</th><th>Direction</th><th className="hide-sm">Strategy</th><th>Outcome</th>
                  <th className="num">R</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((x, i) => (
                  <tr key={i} data-mkt={x.m} data-res={x.wk}>
                    <td>{x.d}</td>
                    <td className="t">{x.p}</td>
                    <td>{x.dir}</td>
                    <td className="hide-sm">{x.st}</td>
                    <td className={x.cls}>{x.out}</td>
                    <td className={`num ${x.cls}`}>{x.R}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </LedgerFilters>
        <div className="card" data-rv style={{ marginTop: 34 }}>
          <h3>How these are recorded</h3>
          <p className="small" style={{ marginTop: 12 }}>
            A signal is logged the moment it is posted in the server, with its entry, stop and targets fixed at that
            point. A win is TP1 reached before the stop. Break even is a stop moved to entry after a partial.
            Partially filled signals count at the fill. Nothing is edited after the fact, and the weekly post goes up
            whether the week was good or not.{" "}
            <span style={{ color: "var(--gold-400)" }}>Sample data shown — wire this table to your results database.</span>
          </p>
        </div>
      </section>
    </Reveal>
  );
}
