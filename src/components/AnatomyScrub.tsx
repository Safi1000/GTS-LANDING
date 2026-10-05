"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION, ScrollTrigger, useGSAP, within } from "@/lib/gsap";

/**
 * "Anatomy of a setup" - pins `.anat-grid` and builds the GTS Levels chart
 * against scroll progress while highlighting the matching step on the left.
 *
 * The section content (steps, chart) is rendered by children; this component
 * only owns the scrub. Progress thresholds:
 *   GTS Levels > .02 · candles up to the reversal .04 → .44 (their arrows
 *   print with them) · main GTS Reversal > .48 · entry/SL/TP1/TP2 .54 → .70 ·
 *   the rally candles .72 → .96
 *   steps: <.18 → 0 levels, <.46 → 1 tap, <.54 → 2 reversal, else 3 entry
 *
 * The grid pins directly under the stuck nav and is sized to the rest of the
 * viewport (`.anatomy.scrub` in globals.css), so the steps and chart are fully
 * on screen for the whole scrub. On narrow/short screens the steps stack in one
 * cell and cross-fade, so heading + active step + chart fit together.
 * `.scrub` is only added while the scrub runs: reduced-motion and no-JS
 * visitors get the normal layout with all four steps visible.
 */
// Height of the nav once it is "stuck" (62px bar + 1px border); the pinned grid starts below it.
const NAV_STUCK = 63;
export function AnatomyScrub({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const root = ref.current!;
      const zones = within<SVGGElement>(root, ".zone");
      const cdl = within<SVGGElement>(root, ".cdl");
      const arw = within<SVGElement>(root, ".arw");
      const [main] = within<SVGGElement>(root, ".arw-main");
      const sig = within<SVGGElement>(root, ".sig");
      const steps = within<HTMLElement>(root, ".anat-step");
      const [grid] = within<HTMLElement>(root, ".anat-grid");
      const all = [...zones, ...cdl, ...arw, ...sig, main].filter(Boolean);
      const R = main ? +(main.dataset.i ?? cdl.length - 1) : cdl.length - 1; // the reversal (entry) candle
      const clamp01 = (v: number) => Math.max(0, Math.min(v, 1));

      const show = (n: Element, on: boolean) => n.setAttribute("opacity", on ? "1" : "0");
      const setStep = (i: number) => steps.forEach((s, j) => s.classList.toggle("on", j === i));

      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        root.classList.add("scrub");
        all.forEach((n) => show(n, false));
        const st = ScrollTrigger.create({
          trigger: grid,
          start: `top ${NAV_STUCK}px`,
          end: "+=2200",
          pin: grid,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            zones.forEach((z) => show(z, p > 0.02));
            // candles up to and including the reversal, then the rally
            const pre = Math.round(clamp01((p - 0.04) / 0.4) * (R + 1));
            const post = Math.round(clamp01((p - 0.72) / 0.24) * (cdl.length - R - 1));
            const shown = (i: number) => (i <= R ? i < pre : i - R - 1 < post);
            cdl.forEach((c, i) => show(c, shown(i)));
            arw.forEach((a) => show(a, shown(+(a.dataset.i ?? 0))));
            if (main) show(main, p > 0.48);
            const nS = Math.round(clamp01((p - 0.54) / 0.16) * sig.length);
            sig.forEach((s, i) => show(s, i < nS));
            setStep(p < 0.18 ? 0 : p < 0.46 ? 1 : p < 0.54 ? 2 : 3);
          },
        });
        // Back to the server-rendered state if motion is turned off or we unmount.
        return () => {
          st.kill();
          root.classList.remove("scrub");
          all.forEach((n) => show(n, true));
          setStep(0);
        };
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
