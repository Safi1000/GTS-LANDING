"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION, useGSAP, within } from "@/lib/gsap";

/**
 * Autoplaying GTS Levels chart (terminal page). Wraps an <AnatomyChart>.
 * When it first comes into view it plays the setup in order (levels, candles
 * to the reversal, the GTS Reversal, entry/SL/TPs, then the rally) and loops
 * every few seconds. Everything renders visible; with reduced motion it never
 * hides anything.
 */
export function SignalChart({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const root = ref.current;
      const zones = within<SVGGElement>(root, ".zone");
      const cdl = within<SVGGElement>(root, ".cdl");
      const arw = within<SVGElement>(root, ".arw");
      const [main] = within<SVGGElement>(root, ".arw-main");
      const sig = within<SVGGElement>(root, ".sig");
      const [svg] = within<SVGSVGElement>(root, "svg");
      const all = [...zones, ...cdl, ...arw, ...sig, main].filter(Boolean) as SVGElement[];
      if (!svg) return;
      const R = main ? +(main.dataset.i ?? cdl.length - 1) : cdl.length - 1;

      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        let T: ReturnType<typeof setTimeout>[] = [];
        const on = (n: Element) => n.setAttribute("opacity", "1");
        const at = (ms: number, f: () => void) => T.push(setTimeout(f, ms));
        all.forEach((n) => (n.style.transition = "opacity .34s"));
        const play = () => {
          T.forEach(clearTimeout);
          T = [];
          all.forEach((n) => n.setAttribute("opacity", "0"));
          zones.forEach((z, i) => at(150 + i * 120, () => on(z)));
          const step = 45;
          cdl.forEach((c, i) => {
            const t = i <= R ? 600 + i * step : 600 + (R + 1) * step + 1700 + (i - R - 1) * step;
            at(t, () => {
              on(c);
              arw.filter((a) => +(a.dataset.i ?? -1) === i).forEach(on);
            });
          });
          const afterTap = 600 + (R + 1) * step;
          if (main) at(afterTap + 250, () => on(main));
          sig.forEach((s, i) => at(afterTap + 650 + i * 220, () => on(s)));
          const end = 600 + cdl.length * step + 1700;
          at(end + 5200, play);
        };
        const io = new IntersectionObserver(
          (e) => {
            if (e[0].isIntersecting) {
              play();
              io.disconnect();
            }
          },
          { threshold: 0.2 },
        );
        io.observe(svg);
        return () => {
          io.disconnect();
          T.forEach(clearTimeout);
          all.forEach((n) => {
            on(n);
            n.style.removeProperty("transition");
          });
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
