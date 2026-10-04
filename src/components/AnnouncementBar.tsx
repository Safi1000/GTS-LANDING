"use client";

import { useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { LINKS } from "@/lib/site";

/**
 * Top bar: a single static link to the GTS charting terminal (replaces the
 * scrolling marquee from the HTML). Dismissable; the height stays 38px so the
 * hero's viewport maths (100svh − 113px) still holds.
 */
export function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);

  return (
    <div
      className={`anno${hidden ? " hide" : ""}`}
      // re-measure pinned sections once the collapse has actually finished
      onTransitionEnd={(e) => e.propertyName === "height" && ScrollTrigger.refresh()}
    >
      <div className="anno-in">
        <a className="anno-link" href={LINKS.terminal} target="_blank" rel="noopener noreferrer">
          <span className="anno-kicker">GTS Terminal</span>
          <span className="anno-text">GTS Levels, GTS Reversals, liquidation heatmap and orderflow confirmations.</span>
          <span className="anno-cta">Open the terminal →</span>
        </a>
        <button className="anno-x" aria-label="Dismiss" onClick={() => setHidden(true)}>
          &times;
        </button>
      </div>
    </div>
  );
}
