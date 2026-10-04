"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * "Anatomy of a signal" — pins `.anat-grid` and draws the signal chart
 * against scroll progress while highlighting the matching step on the left.
 *
 * The section content (steps, chart SVG) is server-rendered and passed in as
 * children; this component only owns the scrub. Progress thresholds are the
 * ones from gts-site-v2.html:
 *   candles 0 → .5 · sweep .36 · BOS .52 · levels .58 → .82 · tag .88
 *   steps: <.34 → 0, <.55 → 1, <.8 → 2, else 3
 */
export function AnatomyScrub({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const root = ref.current!;
      const q = gsap.utils.selector(root);
      const cdl = q(".cdl") as SVGGElement[];
      const sig = q(".sig") as SVGGElement[];
      const [mk1] = q(".mk1") as SVGGElement[];
      const [mk2] = q(".mk2") as SVGGElement[];
      const [tag] = q(".tag") as SVGGElement[];
      const steps = q(".anat-step") as HTMLElement[];
      const [grid] = q(".anat-grid") as HTMLElement[];
      const all = [...cdl, ...sig, mk1, mk2, tag].filter(Boolean);

      const show = (n: Element, on: boolean) => n.setAttribute("opacity", on ? "1" : "0");
      const setStep = (i: number) => steps.forEach((s, j) => s.classList.toggle("on", j === i));

      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        all.forEach((n) => show(n, false));
        const st = ScrollTrigger.create({
          trigger: root,
          start: "top 12%",
          end: "+=2200",
          pin: grid,
          scrub: 0.4,
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
