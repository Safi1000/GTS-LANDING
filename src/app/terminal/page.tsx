import type { Metadata } from "next";
import { AnatomyChart } from "@/components/AnatomyChart";
import { Counter } from "@/components/Counter";
import { Crest } from "@/components/Crest";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { SignalChart } from "@/components/SignalChart";
import { StepsTrack } from "@/components/StepsTrack";
import { Tabs } from "@/components/Tabs";
import { TiltCard } from "@/components/TiltCard";
import { PlainChart } from "@/components/charts/PlainChart";
import { Orn, PanelBar, Rail } from "@/components/ui";
import { TOOLS } from "@/lib/content";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "The GTS Terminal",
  description:
    "Our own charting terminal for gold and crypto: GTS Levels, GTS Reversals, a liquidation heatmap and orderflow confirmations on one chart, plus bar replay on a consolidated price feed.",
  alternates: { canonical: "/terminal" },
  openGraph: { title: "The GTS Terminal — GLITCHERS" },
};

const BONE_B = { color: "var(--bone)" };

const ACCESS = [
  ["I", "Pay by card or crypto", "Card through Stripe, or USDT, BTC and ETH. You get an invoice ID once the payment goes through.", "Stripe or crypto"],
  ["II", "Open a ticket in Discord", "Send us the invoice ID in a ticket. We verify the payment against it.", "Invoice ID"],
  ["III", "Access on your Google email", "We grant the terminal to your Google email, and you sign in at charts.glitchtrading.co.", "Google email"],
];

export default function TerminalPage() {
  return (
    <Reveal>
      <header className="wrap phero">
        <Crest w={58} h={69} style={{ margin: "0 auto 20px" }} eager />
        <Orn style={{ marginBottom: 18 }} />
        <div className="eyebrow">The GTS Terminal</div>
        <h1 className="d-lg" style={{ marginTop: 18 }}>
          It marks the setup.
          <br />
          <span className="foil">You bring the context.</span>
        </h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          A charting terminal we built ourselves for gold and crypto. GTS Levels, GTS Reversals, a liquidation heatmap
          and orderflow confirmations on one chart, plus bar replay on a consolidated price feed.
        </p>
        <div className="btn-row center" style={{ marginTop: 32 }}>
          <MagneticButton href="/pricing" className="btn btn-primary btn-lg">Get access</MagneticButton>
          <MagneticButton href="/masterclass" className="btn btn-secondary btn-lg">Learn it free first</MagneticButton>
        </div>
        <p className="small" style={{ marginTop: 18 }}>
          Already a member?{" "}
          <a href={LINKS.terminal} target="_blank" rel="noopener noreferrer" className="hi">
            Open the terminal →
          </a>
        </p>
      </header>

      <section className="wrap">
        <div className="panel" data-rv>
          <PanelBar pair="XAUUSD" tf="15M" label="GTS Levels · GTS Reversals" />
          <SignalChart>
            <AnatomyChart
              className="chart-wide"
              label="Gold chart: price taps a GTS Level, a GTS Reversal prints, with entry, stop and two targets"
            />
          </SignalChart>
        </div>
      </section>

      <section className="wrap band-t">
        <div className="strip frame" data-rv>
          <div><Counter as="b" to={80} suffix="%" /><span>Win rate at 1R</span></div>
          <div><Counter as="b" to={70} suffix="%" /><span>Win rate at 2R</span></div>
          <div><b>4</b><span>Tools on one chart</span></div>
          <div><b>2</b><span>Markets</span></div>
        </div>
      </section>

      <section className="wrap band-t" id="methodology">
        <div
          className="card frame"
          data-rv
          style={{
            background: "linear-gradient(158deg,rgba(92,15,34,.36),var(--ink-700) 62%)",
            borderColor: "var(--line-gold)",
            padding: 36,
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 18 }}>
            <span className="badge">Methodology</span>
            <span className="tooltip">
              <span className="qmark">?</span>
              <span className="tip">
                We publish this because a win rate without a sample size behind it is a marketing number, not a
                measurement.
              </span>
            </span>
          </div>
          <h3 style={{ fontSize: 25 }}>Where the numbers come from</h3>
          {/* PLACEHOLDER figures — as flagged in the HTML */}
          <div className="grid-4" style={{ marginTop: 28 }}>
            <div><div className="mono" style={{ fontSize: 25, color: "var(--gold-300)" }}>1,240</div><p className="small" style={{ marginTop: 6 }}>Setups in sample</p></div>
            <div><div className="mono" style={{ fontSize: 25, color: "var(--gold-300)" }}>18 mo</div><p className="small" style={{ marginTop: 6 }}>Date range tested</p></div>
            <div><div className="mono" style={{ fontSize: 25, color: "var(--gold-300)" }}>6</div><p className="small" style={{ marginTop: 6 }}>Pairs tested</p></div>
            <div><div className="mono" style={{ fontSize: 25, color: "var(--loss)" }}>&minus;7R</div><p className="small" style={{ marginTop: 6 }}>Worst drawdown</p></div>
          </div>
          <p className="note" style={{ marginTop: 28 }}>
            <b>Read this before you subscribe.</b> These are backtested results, not a live track record. Backtests
            benefit from hindsight, do not model slippage perfectly, and cannot reproduce the psychological cost of a
            losing streak. The full breakdown is pinned in the server.{" "}
            <span style={{ color: "var(--gold-400)" }}>Placeholder figures — replace with your real backtest data.</span>
          </p>
        </div>
      </section>

      <section className="wrap band" id="tools">
        <Rail n="I" label="Inside the terminal" />
        <h2 data-rv style={{ marginBottom: 36 }}>Four tools, one chart.</h2>
        <div data-rv>
          <Tabs
            tabs={TOOLS.map((t) => ({
              id: t.id,
              label: t.label,
              panel: (
                <div style={{ maxWidth: 760 }}>
                  <h3>{t.title}</h3>
                  <p className="lede">{t.body}</p>
                  <p className="small" style={{ marginTop: 18 }}>
                    <b style={BONE_B}>What it shows:</b> {t.shows}
                  </p>
                  <p className="small">
                    <b style={BONE_B}>How we use it:</b> {t.use}
                  </p>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      <section className="wrap band-t" id="replay">
        <Rail n="II" label="Replay & backtesting" />
        <div className="split">
          <div data-rv>
            <h2>
              One chart per pair.
              <br />
              <span className="hi">Priced by consensus.</span>
            </h2>
            <p className="lede">
              We pull gold and crypto prices from several providers and consolidate them into a single clean series per
              pair, so you are not backtesting one exchange&apos;s wicks and calling it an edge.
            </p>
            <p className="lede">Replay any period bar by bar, mark your entries, and score every trade in R.</p>
          </div>
          <div className="panel" data-rv>
            <PanelBar pair="XAUUSD" tf="1H" label="Replay · 14 Mar 2026" live="REPLAY" />
            <PlainChart seed={88} w={720} h={300} n={54} aria-hidden="true" />
            <div style={{ display: "flex", gap: 10, padding: "13px 16px", borderTop: "1px solid var(--line)", flexWrap: "wrap" }}>
              <span className="chip">1M</span>
              <span className="chip">5M</span>
              <span className="chip on">1H</span>
              <span className="chip">4H</span>
              <span className="chip">1D</span>
              <span className="chip" style={{ marginLeft: "auto" }}>Step ›</span>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap band" id="access">
        <Rail n="III" label="Getting access" />
        <h2 data-rv style={{ marginBottom: 52 }}>
          Three steps,
          <br />
          <span className="dim">from payment to chart.</span>
        </h2>
        <div className="steps">
          <StepsTrack />
          {ACCESS.map(([n, h, p, tag]) => (
            <div className="step" data-rv key={n}>
              <div className="n"><span>{n}</span></div>
              <h3>{h}</h3>
              <p>{p}</p>
              <span className="tag">{tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap band-t">
        <Rail n="IV" label="What it is not" />
        <div className="grid-3">
          <TiltCard data-rv>
            <h3>Not a bot</h3>
            <p className="small" style={{ marginTop: 10 }}>
              It does not place trades, manage positions or close them. You execute every entry yourself.
            </p>
          </TiltCard>
          <TiltCard data-rv>
            <h3>Not a risk manager</h3>
            <p className="small" style={{ marginTop: 10 }}>
              It gives you a level and a stop distance. It has no idea what your account size is or how much you should
              be risking.
            </p>
          </TiltCard>
          <TiltCard data-rv>
            <h3>Not a substitute for reading a chart</h3>
            <p className="small" style={{ marginTop: 10 }}>
              It will mark setups against the higher timeframe. Knowing when to skip one is the whole skill.
            </p>
          </TiltCard>
        </div>
      </section>

      <section className="wrap band-t">
        <div className="cta-band" data-rv>
          <h2>Learn it first. Then get the terminal.</h2>
          <p className="lede" style={{ margin: "20px auto 0", textAlign: "center" }}>
            The masterclass teaches every tool in the terminal for free. If it turns out you do not need it, that is a
            good outcome.
          </p>
          <div className="btn-row center" style={{ marginTop: 32 }}>
            <MagneticButton href="/masterclass" className="btn btn-secondary btn-lg">Start the masterclass</MagneticButton>
            <MagneticButton href="/pricing" className="btn btn-primary btn-lg">See pricing</MagneticButton>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
