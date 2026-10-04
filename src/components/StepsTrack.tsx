"use client";

import { useRef } from "react";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/** The gold line that fills across the three "How it works" steps. */
export function StepsTrack() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const section = ref.current?.closest("section");
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.to("i", {
          width: "100%",
          ease: "none",
          scrollTrigger: { trigger: section, start: "top 65%", end: "bottom 75%", scrub: 0.5 },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div className="track" ref={ref}>
      <i />
    </div>
  );
}
