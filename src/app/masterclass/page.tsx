import type { Metadata } from "next";
import { Countdown } from "@/components/Countdown";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { CurriculumFilter } from "@/components/CurriculumFilter";
import { PlainChart } from "@/components/charts/PlainChart";
import { PlayIcon } from "@/components/icons";
import { Rail } from "@/components/ui";
import { CURRICULUM } from "@/lib/content";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Masterclass",
  description:
    "The entire GTS method, free. Six modules and twelve lessons, from risk management and market structure to the Glitch Models and a full gold backtest.",
  alternates: { canonical: "/masterclass" },
  openGraph: { title: "Masterclass — GLITCHERS" },
};

/* Curriculum lives in lib/content.ts (CURRICULUM); it moves to Payload in Phase 5. */
const LESSON_COUNT = CURRICULUM.reduce((n, m) => n + m.lessons.length, 0);
const [FIRST] = CURRICULUM;

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
          Six modules and twelve lessons, from risk management and market structure to the Glitch Models and a
          full gold backtest. Sign in with Discord to track progress and watch the videos.
        </p>
      </header>

      <section className="wrap band-t">
        <div className="card card-glow frame" data-rv style={{ padding: 0, overflow: "hidden", marginBottom: 28 }}>
          <div className="split" style={{ gap: 0, alignItems: "stretch" }}>
            <div style={{ padding: 40, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="badge">Start here</span>
              <h2 style={{ fontSize: 32, marginTop: 18 }}>Foundations: risk and mentality first</h2>
              <p className="lede">
                Before market structure, before any setup: how to manage risk, and the mentality that decides whether
                any strategy works at all.
              </p>
              <div className="mono small" style={{ marginTop: 22, color: "var(--faint)" }}>
                Module 01 · {FIRST.lessons.length} lessons · {CURRICULUM.length} modules, {LESSON_COUNT} lessons in total
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
        <CurriculumFilter modules={CURRICULUM} />
      </section>

      <section className="wrap band-t">
        <Rail n="I" label="Live sessions" />
        <div className="split top">
          <div data-rv>
            <h2>Thursdays, with your mentors.</h2>
            <p className="lede">
              A live chart session every Thursday — the week&apos;s charts broken down, mistakes explained, and
              whatever the room asks. Recorded and added to the library afterwards.
            </p>
          </div>
          <div className="card frame" data-rv>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="dot" />
              <span className="mono small" style={{ color: "var(--gold-400)" }}>NEXT SESSION</span>
            </div>
            <Countdown />
            <p className="small" style={{ marginTop: 8 }}>Thursday 20:00 UTC · Weekly chart review</p>
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
