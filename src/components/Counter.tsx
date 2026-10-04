"use client";

import { useRef } from "react";
import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap";

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * Count-up number. The server renders the real value (so crawlers, link
 * previews and no-JS visitors see "75%", not "0%"); with motion allowed the
 * client resets it to 0 and counts up when it scrolls into view.
 */
export function Counter({
  to,
  suffix = "",
  as: Tag = "span",
  className,
}: {
  to: number;
  suffix?: string;
  as?: "span" | "b";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      el.textContent = "0" + suffix;
      const o = { v: 0 };
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () =>
          gsap.to(o, {
            v: to,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = fmt(Math.round(o.v)) + suffix;
            },
          }),
      });
      return () => {
        st.kill();
        el.textContent = fmt(to) + suffix;
      };
    });
    return () => mm.revert();
  });
  return (
    <Tag ref={ref} className={className}>
      {fmt(to) + suffix}
    </Tag>
  );
}
