"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/** Slow 60s horizontal loop for the ambient candle field. */
export function AmbientDrift({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.to("svg", { xPercent: -50, duration: 60, ease: "none", repeat: -1 });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
