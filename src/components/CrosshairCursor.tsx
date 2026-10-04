"use client";

import { useEffect, useRef } from "react";

/**
 * The crosshair cursor with its fake price readout. Hidden by CSS below 940px
 * and on touch devices; the JS also bails on (hover: none).
 */
export function CrosshairCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const pxRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const c = ref.current!, px = pxRef.current!;
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, shown = false, raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        c.style.opacity = "1";
      }
      const t = (e.target as Element | null)?.closest?.("a,button,.card,.room,.chip,input");
      c.classList.toggle("hot", !!t);
      px.textContent = (2380 + (1 - y / innerHeight) * 60).toFixed(2);
    };
    const leave = () => {
      c.style.opacity = "0";
      shown = false;
    };
    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      c.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cx" />
      <span className="cy" />
      <span className="ring" />
      <span className="px" ref={pxRef} />
    </div>
  );
}
