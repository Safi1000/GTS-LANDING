"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION, useGSAP } from "@/lib/gsap";

/**
 * Pins the section and translates `.htrack` sideways by its overflow.
 *
 * The distance is a function, re-read on every refresh
 * (invalidateOnRefresh), so a resize or a late font swap re-measures the
 * track instead of reusing a stale number.
 */
export function HorizontalRooms({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const q = gsap.utils.selector(ref.current);
      const [scroller] = q(".hscroll") as HTMLElement[];
      const [track] = q(".htrack") as HTMLElement[];
      if (!scroller || !track) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        scroller.classList.add("pinned");
        scroller.scrollLeft = 0;
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 40);
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => "+=" + dist(),
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        return () => scroller.classList.remove("pinned");
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
