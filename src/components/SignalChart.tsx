"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION, useGSAP, within } from "@/lib/gsap";

/**
 * Autoplaying signal chart (indicator page). Wraps a server-rendered
 * <SignalChartSvg>. When it first comes into view it prints the candles,
 * markers, levels and tag in sequence, then loops every ~7.4s, using the
 * same timings as the HTML.
 */
export function SignalChart({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const cdl = within<SVGGElement>(ref.current, ".cdl");
      const sig = within<SVGGElement>(ref.current, ".sig");
      const [mk1] = within<SVGGElement>(ref.current, ".mk1");
      const [mk2] = within<SVGGElement>(ref.current, ".mk2");
      const [tag] = within<SVGGElement>(ref.current, ".tag");
      const [svg] = within<SVGSVGElement>(ref.current, "svg");
      const all = [...cdl, ...sig, mk1, mk2, tag].filter(Boolean);
      if (!svg) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        let T: ReturnType<typeof setTimeout>[] = [];
        const on = (n: Element) => n.setAttribute("opacity", "1");
        all.forEach((n) => ((n as SVGGElement).style.transition = "opacity .34s"));
        const play = () => {
          T.forEach(clearTimeout);
          T = [];
          all.forEach((n) => n.setAttribute("opacity", "0"));
          cdl.forEach((c, i) => T.push(setTimeout(() => on(c), 240 + i * 52)));
          const a = 240 + cdl.length * 52;
          T.push(setTimeout(() => on(mk1), a - 500));
          T.push(setTimeout(() => on(mk2), a - 200));
          sig.forEach((c, i) => T.push(setTimeout(() => on(c), a + 110 + i * 110)));
          T.push(setTimeout(() => on(tag), a + 680));
          T.push(setTimeout(play, a + 7400));
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
            (n as SVGGElement).style.removeProperty("transition");
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
