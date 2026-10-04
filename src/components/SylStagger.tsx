"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/** The masterclass syllabus list, staggered in on scroll. */
export function SylStagger({ children }: { children: ReactNode }) {
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
    <div className="syl" ref={ref}>
      {children}
    </div>
  );
}
