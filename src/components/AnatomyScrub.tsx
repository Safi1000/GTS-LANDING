"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION, ScrollTrigger, useGSAP, within } from "@/lib/gsap";

/**
 * "Anatomy of a setup" — pins `.anat-grid` and draws the indicator chart
 * against scroll progress while highlighting the matching step on the left.
 *
 * The section content (steps, chart SVG) is server-rendered and passed in as
 * children; this component only owns the scrub. Progress thresholds are the
 * ones from gts-site-v2.html:
 *   candles 0 → .5 · sweep .36 · BOS .52 · levels .58 → .82 · tag .88
 *   steps: <.34 → 0, <.55 → 1, <.8 → 2, else 3
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
      const cdl = within<SVGGElement>(root, ".cdl");
      const sig = within<SVGGElement>(root, ".sig");
      const [mk1] = within<SVGGElement>(root, ".mk1");
      const [mk2] = within<SVGGElement>(root, ".mk2");
      const [tag] = within<SVGGElement>(root, ".tag");
      const steps = within<HTMLElement>(root, ".anat-step");
      const [grid] = within<HTMLElement>(root, ".anat-grid");
      const all = [...cdl, ...sig, mk1, mk2, tag].filter(Boolean);

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
            const nC = Math.round(Math.min(p / 0.5, 1) * cdl.length);
            cdl.forEach((c, i) => show(c, i < nC));
            show(mk1, p > 0.36);
            show(mk2, p > 0.52);
            const nS = Math.round(Math.max(0, Math.min((p - 0.58) / 0.24, 1)) * sig.length);
            sig.forEach((s, i) => show(s, i < nS));
            show(tag, p > 0.88);
            setStep(p < 0.34 ? 0 : p < 0.55 ? 1 : p < 0.8 ? 2 : 3);
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
