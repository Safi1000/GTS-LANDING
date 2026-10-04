"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

/**
 * `.spot`: a soft gold radial that follows the pointer.
 * Ported for completeness — the HTML defines `.spot` but no element uses it.
 */
export function SpotlightCard({
  className = "",
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  };
  return (
    <div ref={ref} className={`spot ${className}`.trim()} style={style} onMouseMove={onMove}>
      {children}
    </div>
  );
}
