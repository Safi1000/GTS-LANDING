import type { Metadata } from "next";
import { Countdown } from "@/components/Countdown";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { CurriculumFilter } from "@/components/CurriculumFilter";
import { Rail } from "@/components/ui";
import { CURRICULUM } from "@/lib/content";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Masterclass",
  description:
    "The entire GTS method in six modules and twelve lessons, from risk management and market structure to the Glitch Models and a full gold backtest. Included in Education and Pro.",
  alternates: { canonical: "/masterclass" },
  openGraph: { title: "Masterclass | GLITCHERS" },
};

/* Curriculum lives in lib/content.ts (CURRICULUM); it moves to Payload in Phase 5. */
const LESSON_COUNT = CURRICULUM.reduce((n, m) => n + m.lessons.length, 0);

export default function MasterclassPage() {
  return (
    <Reveal>
      <header className="wrap phero">
        <div className="free-tag" style={{ marginInline: "auto" }}>Education plan</div>
        <h1 className="d-lg">
          The entire method.
          <br />
          <span className="foil">In order.</span>
        </h1>
        <p className="lede" style={{ marginInline: "auto" }}>
          Six modules and twelve lessons, from risk management and market structure to the Glitch Models and a
          full gold backtest. Included in the Education and Pro plans; sign in with Discord to watch the videos and
          track your progress.
        </p>
      </header>

      <section className="wrap band-t">
        <div className="card card-glow frame" data-rv style={{ padding: 40, marginBottom: 44 }}>
          <span className="badge">The course</span>
          <h2 style={{ fontSize: 32, marginTop: 18 }}>From risk management to the Glitch Models.</h2>
          <p className="lede" style={{ maxWidth: "70ch" }}>
            Six modules in the order they build on each other: risk and mentality, market structure, liquidity and
            imbalances, supply and demand, the trading models, and a full gold backtest that ties it all together.
          </p>
          <div className="mono small" style={{ marginTop: 22, color: "var(--faint)" }}>
            {CURRICULUM.length} modules · {LESSON_COUNT} lessons · Education and Pro
          </div>
          <div className="btn-row" style={{ marginTop: 26 }}>
            <MagneticButton href="/pricing" className="btn btn-primary">
              Get Education
            </MagneticButton>
            <MagneticButton href="#curriculum" className="btn btn-secondary">
              See the curriculum
            </MagneticButton>
          </div>
        </div>
        <div id="curriculum">
          <CurriculumFilter modules={CURRICULUM} />
        </div>
      </section>

      <section className="wrap band-t">
        <Rail n="I" label="Live sessions" />
        <div className="split top">
          <div data-rv>
            <h2>Thursdays, with your mentors.</h2>
            <p className="lede">
              A live chart session every Thursday: the week&apos;s charts broken down, mistakes explained, and
              whatever the room asks. Recorded and added to the library afterwards.
            </p>
          </div>
          <div className="card frame" data-rv>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="dot" />
              <span className="mono small" style={{ color: "var(--gold-400)" }}>NEXT SESSION</span>
            </div>
            <Countdown />
            <p className="small" style={{ marginTop: 8 }}>Thursday 20:00 UTC · Weekly chart review · Education and Pro</p>
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
