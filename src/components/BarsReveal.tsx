"use client";

import { useRef } from "react";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/**
 * "R per week" bars. Heights are server-rendered at their final values;
 * with motion allowed they grow from 0 when scrolled into view.
 */
export function BarsReveal({ bars }: { bars: { label: string; h: number }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from("i", {
          height: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div className="bars" ref={ref}>
      {bars.map((b) => (
        <div key={b.label}>
          <i style={{ height: `${b.h}%` }} />
          <span>{b.label}</span>
        </div>
      ))}
    </div>
  );
}
