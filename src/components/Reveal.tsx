"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/**
 * Scroll reveal for every `[data-rv]` element inside it.
 *
 * Renders a `display: contents` wrapper, so it adds no box and cannot disturb
 * grid/flex layouts — the server-rendered children lay out exactly as in the
 * HTML. Content starts visible; gsap.from() only runs with motion allowed.
 */
export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 22,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
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
