import type { Metadata } from "next";
import { Counter } from "@/components/Counter";
import { Crest } from "@/components/Crest";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { SignalChart } from "@/components/SignalChart";
import { Tabs } from "@/components/Tabs";
import { TiltCard } from "@/components/TiltCard";
import { SignalChartSvg } from "@/components/charts/SignalChartSvg";
import { Orn, PanelBar, Rail } from "@/components/ui";
import { STRATEGIES } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Indicator",
  description:
    "Four strategies in one TradingView script, built for gold and crypto. It marks the level, the trigger and the invalidation — then gets out of your way.",
  alternates: { canonical: "/indicator" },
  openGraph: { title: "The Indicator — GLITCHERS" },
};

const BONE_B = { color: "var(--bone)" };

export default function IndicatorPage() {
  return (
    <Reveal>
      <header className="wrap phero">
        <Crest w={58} h={69} style={{ margin: "0 auto 20px" }} eager />
        <Orn style={{ marginBottom: 18 }} />
        <div className="eyebrow">The Indicator</div>
        <h1 className="d-lg" style={{ marginTop: 18 }}>
          It prints the setup.
          <br />
          <span className="foil">You bring the context.</span>
        </h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          Four strategies in one TradingView script, built for gold and crypto. It marks the level, the trigger and
          the invalidation — then gets out of your way.
        </p>
        <div className="btn-row center" style={{ marginTop: 32 }}>
          <MagneticButton href="/pricing" className="btn btn-primary btn-lg">Get access</MagneticButton>
          <MagneticButton href="/masterclass" className="btn btn-secondary btn-lg">Learn it free first</MagneticButton>
        </div>
      </header>

      <section className="wrap">
        <div className="panel" data-rv>
          <PanelBar pair="XAUUSD" tf="15M" label="GTS Indicator v3" live="LIVE" />
          <SignalChart>
            <SignalChartSvg
              opts={{ w: 720, h: 400, seed: 20260807, start: 2404, entryIdx: 25 }}
              aria-label="Gold chart with a setup marked by the GTS indicator"
            />
          </SignalChart>
        </div>
      </section>

      <section className="wrap band-t">
        <div className="strip frame" data-rv>
          <div><Counter as="b" to={75} suffix="%" /><span>Win rate at 1R</span></div>
          <div><Counter as="b" to={60} suffix="%" /><span>Win rate at 2R</span></div>
          <div><b>4</b><span>Strategies</span></div>
          <div><b>2</b><span>Markets</span></div>
        </div>
      </section>

      <section className="wrap band-t">
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

      <section className="wrap band">
        <Rail n="I" label="The strategies" />
        <h2 data-rv style={{ marginBottom: 36 }}>Four setups, one script.</h2>
        <div data-rv>
          <Tabs
            tabs={STRATEGIES.map((s) => ({
              id: s.id,
              label: s.label,
              panel: (
                <div className="split top">
                  <div>
                    <h3>{s.title}</h3>
                    <p className="lede">{s.body}</p>
                    <p className="small" style={{ marginTop: 18 }}>
                      <b style={BONE_B}>Invalidation:</b> {s.invalidation}
                    </p>
                    <p className="small">
                      <b style={BONE_B}>Best on:</b> {s.bestOn}
                    </p>
                  </div>
                  <div className="figs frame">
                    <div className="fig"><b>{s.w1}</b><span>Win · 1R</span></div>
                    <div className="fig"><b>{s.w2}</b><span>Win · 2R</span></div>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>

      <section className="wrap band-t">
        <Rail n="II" label="What it is not" />
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
              It gives you a stop distance. It has no idea what your account size is or how much you should be
              risking.
            </p>
          </TiltCard>
          <TiltCard data-rv>
            <h3>Not a substitute for reading a chart</h3>
            <p className="small" style={{ marginTop: 10 }}>
              It will print setups against the higher timeframe. Knowing when to skip one is the whole skill.
            </p>
          </TiltCard>
        </div>
      </section>

      <section className="wrap band-t">
        <div className="cta-band" data-rv>
          <h2>Learn it first. Then buy the tool.</h2>
          <p className="lede" style={{ margin: "20px auto 0", textAlign: "center" }}>
            The masterclass teaches every one of these strategies for free. If it turns out you do not need the
            script, that is a good outcome.
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
