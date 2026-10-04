import type { Metadata } from "next";
import { Countdown } from "@/components/Countdown";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { PlainChart } from "@/components/charts/PlainChart";
import { PlayIcon } from "@/components/icons";
import { KICKER, Rail } from "@/components/ui";
import { LESSONS } from "@/lib/content";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Masterclass",
  description:
    "The entire GTS method, free. Twelve modules, from what a candle is telling you up to every strategy inside the indicator.",
  alternates: { canonical: "/masterclass" },
  openGraph: { title: "Masterclass — GLITCHERS" },
};

/* Category chips are inert, as in the HTML. Lessons move to Payload in Phase 5. */
const CATS = ["All", "Foundations", "Price action", "Advanced theory", "The indicator", "Risk"];

export default function MasterclassPage() {
  return (
    <Reveal>
      <header className="wrap phero">
        <div className="free-tag" style={{ marginInline: "auto" }}>Free · No paywall</div>
        <h1 className="d-lg">
          The entire method.
          <br />
          <span className="foil">No paywall.</span>
        </h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          Twelve modules, from what a candle is telling you up to every strategy inside the indicator. Sign in with
          Discord to track progress and watch the videos.
        </p>
      </header>

      <section className="wrap band-t">
        <div className="chips" data-rv style={{ marginBottom: 34 }}>
          {CATS.map((c, i) => (
            <button key={c} className={`chip${i === 0 ? " on" : ""}`}>{c}</button>
          ))}
        </div>
        <div className="card card-glow frame" data-rv style={{ padding: 0, overflow: "hidden", marginBottom: 28 }}>
          <div className="split" style={{ gap: 0, alignItems: "stretch" }}>
            <div style={{ padding: 40, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="badge">Start here</span>
              <h2 style={{ fontSize: 32, marginTop: 18 }}>Foundations: reading a chart without indicators</h2>
              <p className="lede">
                Before any of the fancy stuff — what price is actually doing, why a candle closes where it does, and
                how to see structure without a single line on the chart.
              </p>
              <div className="mono small" style={{ marginTop: 22, color: "var(--faint)" }}>
                6 lessons · 1h 48m · Updated Jul 2026
              </div>
              <div className="btn-row" style={{ marginTop: 26 }}>
                <MagneticButton href="#" className="btn btn-primary">Start module 1</MagneticButton>
              </div>
            </div>
            <div
              style={{
                background: "var(--grad-ox)",
                borderLeft: "1px solid var(--line)",
                display: "grid",
                placeItems: "center",
                minHeight: 300,
                position: "relative",
              }}
            >
              <PlainChart seed={31} w={400} h={260} n={34} style={{ width: "100%", height: "100%" }} aria-hidden="true" />
              <div
                style={{
                  position: "absolute",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "var(--grad-gold)",
                  display: "grid",
                  placeItems: "center",
                  boxShadow: "var(--glow-gold)",
                }}
              >
                <PlayIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="grid-3">
          {LESSONS.map(([cat, title, desc, dur], i) => (
            <TiltCard key={title} href="/masterclass" className="card-glow" data-rv style={{ display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="mono" style={KICKER}>{cat}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--faint)" }}>{dur}</span>
              </div>
              <h3 style={{ marginTop: 14, fontSize: 17 }}>
                {String(i + 1).padStart(2, "0")} · {title}
              </h3>
              <p className="small" style={{ marginTop: 9 }}>{desc}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="wrap band-t">
        <Rail n="I" label="Live sessions" />
        <div className="split top">
          <div data-rv>
            <h2>Thursdays, with the desk.</h2>
            <p className="lede">
              A live chart session every Thursday — the week&apos;s signals reviewed, the losers explained, and
              whatever the room asks. Recorded and added to the library afterwards.
            </p>
          </div>
          <div className="card frame" data-rv>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="dot" />
              <span className="mono small" style={{ color: "var(--gold-400)" }}>NEXT SESSION</span>
            </div>
            <Countdown />
            <p className="small" style={{ marginTop: 8 }}>Thursday 20:00 UTC · Weekly signal review</p>
            <div className="btn-row" style={{ marginTop: 22 }}>
              <MagneticButton href={LINKS.calendar} className="btn btn-secondary btn-sm">Add to calendar</MagneticButton>
              <a href={LINKS.pastRecordings} className="btn btn-ghost btn-sm">Past recordings</a>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
