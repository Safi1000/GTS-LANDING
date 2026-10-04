"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Infinite marquee whose speed follows scroll velocity.
 * Children must contain the item list twice (the loop translates by -50%).
 *
 * Negative `speed` runs the row left-to-right. The HTML did this with
 * `tween.reversed(true)` on a repeat:-1 tween at time 0, which leaves it
 * stuck at its start: the second testimonial row never moved there.
 * Here it runs as intended.
 */
export function Marquee({
  speed = 0.5,
  children,
  style,
}: {
  speed?: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const el = ref.current!.firstElementChild as HTMLElement;
        const duration = Math.abs(60 / speed);
        const loop =
          speed < 0
            ? gsap.fromTo(el, { xPercent: -50 }, { xPercent: 0, duration, ease: "none", repeat: -1 })
            : gsap.to(el, { xPercent: -50, duration, ease: "none", repeat: -1 });

        ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const v = Math.min(Math.abs(self.getVelocity()) / 900, 4);
            gsap.to(loop, { timeScale: 1 + v, duration: 0.3, overwrite: true });
          },
        });
        let vt: ReturnType<typeof setTimeout>;
        const settle = () => {
          clearTimeout(vt);
          vt = setTimeout(() => gsap.to(loop, { timeScale: 1, duration: 0.8 }), 160);
        };
        window.addEventListener("scroll", settle, { passive: true });
        return () => {
          clearTimeout(vt);
          window.removeEventListener("scroll", settle);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div className="marq" ref={ref} style={style}>
      <div className="marq-in">{children}</div>
    </div>
  );
}
