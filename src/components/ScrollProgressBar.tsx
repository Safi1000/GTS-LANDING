"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** 2px gold bar at the top tracking page scroll. Lives in the root layout. */
export function ScrollProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.to(ref.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
    });
  });
  return <div id="sprog" ref={ref} aria-hidden="true" />;
}
