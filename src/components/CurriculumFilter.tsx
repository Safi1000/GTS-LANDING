"use client";

import { useState } from "react";
import { TiltCard } from "@/components/TiltCard";
import { KICKER } from "@/components/ui";
import { ScrollTrigger } from "@/lib/gsap";
import type { CourseModule } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Masterclass curriculum: module chips + the modules and their lessons.
 * Every lesson is server-rendered; the chips only hide the other modules.
 * Lesson numbers run across the whole course (01–12).
 */
export function CurriculumFilter({ modules }: { modules: CourseModule[] }) {
  const [active, setActive] = useState<string>("all");

  let n = 0;
  const numbered = modules.map((m) => ({ ...m, lessons: m.lessons.map((l) => ({ ...l, n: ++n })) }));

  return (
    <>
      <div className="chips" data-rv style={{ marginBottom: 34 }}>
        {[{ id: "all", name: "All" }, ...modules].map((m) => (
          <button
            key={m.id}
            type="button"
            className={`chip${active === m.id ? " on" : ""}`}
            aria-pressed={active === m.id}
            onClick={() => {
              setActive(m.id);
              requestAnimationFrame(() => ScrollTrigger.refresh());
            }}
          >
            {m.name}
          </button>
        ))}
      </div>
      {numbered.map((m, i) => (
        <div
          className="module"
          key={m.id}
          id={`module-${m.id}`}
          style={active === "all" || active === m.id ? undefined : { display: "none" }}
        >
          <div className="module-head" data-rv>
            <span className="mono" style={KICKER}>Module {pad(i + 1)}</span>
            <h3>{m.name}</h3>
            <span className="small">
              {m.lessons.length} {m.lessons.length === 1 ? "lesson" : "lessons"}
            </span>
          </div>
          <div className="grid-3">
            {m.lessons.map((l) => (
              <TiltCard key={l.title} className="card-glow" data-rv>
                <span className="mono" style={{ fontSize: 11, color: "var(--faint)" }}>Lesson {pad(l.n)}</span>
                <h3 style={{ marginTop: 12, fontSize: 17 }}>{l.title}</h3>
                <p className="small" style={{ marginTop: 9 }}>{l.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
