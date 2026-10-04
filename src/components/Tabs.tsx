"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap, MOTION, ScrollTrigger } from "@/lib/gsap";

/**
 * Underline tabs with a sliding indicator. Panels are server-rendered
 * ReactNodes; inactive ones are display:none but still in the HTML.
 */
export function Tabs({ tabs }: { tabs: { id: string; label: string; panel: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const ind = useRef<HTMLSpanElement>(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    const mv = () => {
      const b = btns.current[active];
      if (!b || !ind.current) return;
      ind.current.style.left = b.offsetLeft + "px";
      ind.current.style.width = b.offsetWidth + "px";
    };
    mv();
    window.addEventListener("resize", mv);
    // fonts change button widths
    document.fonts?.ready.then(mv);
    return () => window.removeEventListener("resize", mv);
  }, [active]);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const pn = panels.current[active];
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      gsap.from(pn, { opacity: 0, y: 10, duration: 0.4, ease: "power2.out" });
    });
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, [active]);

  return (
    <>
      <div className="tabs" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              btns.current[i] = el;
            }}
            role="tab"
            aria-selected={i === active}
            className={i === active ? "on" : undefined}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
        <span className="ind" ref={ind} />
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          id={t.id}
          role="tabpanel"
          className={`tabpanel${i === active ? " on" : ""}`}
          ref={(el) => {
            panels.current[i] = el;
          }}
        >
          {t.panel}
        </div>
      ))}
    </>
  );
}
