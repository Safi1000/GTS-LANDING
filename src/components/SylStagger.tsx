"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/**
 * The masterclass syllabus list, staggered in on scroll.
 * `rows` spreads the items over that many equal rows so the list can stretch to
 * the height of the column beside it (`.syl.fill`; reset when stacked on mobile).
 */
export function SylStagger({ children, rows }: { children: ReactNode; rows?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from(gsap.utils.toArray(ref.current!.children), {
          opacity: 0,
          x: -14,
          duration: 0.5,
          stagger: 0.045,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div
      className={rows ? "syl fill" : "syl"}
      ref={ref}
      style={rows ? { gridTemplateRows: `repeat(${rows}, 1fr)` } : undefined}
    >
      {children}
    </div>
  );
}
