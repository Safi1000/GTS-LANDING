"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/** Draws the equity curve's stroke when it scrolls into view. */
export function EquityDraw({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const [path] = gsap.utils.selector(ref.current)(".eq") as SVGPathElement[];
      if (!path) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const L = path.getTotalLength();
        path.style.strokeDasharray = String(L);
        path.style.strokeDashoffset = String(L);
        const io = new IntersectionObserver(
          (e) => {
            if (e[0].isIntersecting) {
              path.style.transition = "stroke-dashoffset 1.5s cubic-bezier(.22,1,.36,1)";
              path.style.strokeDashoffset = "0";
              io.disconnect();
            }
          },
          { threshold: 0.3 },
        );
        io.observe(path.ownerSVGElement ?? path);
        return () => {
          io.disconnect();
          path.style.removeProperty("stroke-dasharray");
          path.style.removeProperty("stroke-dashoffset");
          path.style.removeProperty("transition");
        };
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
