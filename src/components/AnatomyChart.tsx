"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { GtsLevelsChart } from "@/components/charts/GtsLevelsChart";

/**
 * Sizes the GTS Levels chart to its box. In "Anatomy of a setup" the box is
 * stretched to the height of the step list beside it (fixed aspect on phones);
 * elsewhere (terminal page) pass a className that gives it an aspect ratio.
 * The chart is drawn at the box's real pixel size (no scaling), so it fills the
 * box exactly and the text stays crisp. Server render uses a default size; the
 * client re-measures after mount. Re-renders keep the same DOM nodes, so the
 * scrub's imperative opacity changes on them survive.
 */
export function AnatomyChart({ label, className = "" }: { label: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 720, h: 460 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width), h = Math.round(e.contentRect.height);
      if (w > 0 && h > 0) setSize((s) => (s.w === w && s.h === h ? s : { w, h }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className={`anat-chart ${className}`.trim()} ref={ref}>
      <GtsLevelsChart w={size.w} h={size.h} role="img" aria-label={label} />
    </div>
  );
}
