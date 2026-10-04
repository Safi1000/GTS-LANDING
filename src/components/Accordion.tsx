"use client";

import { useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export type AccItem = { q: string; a: string };

/**
 * Single-open accordion. Answers are always in the DOM (server-rendered,
 * crawlable); collapsed ones are height: 0.
 */
export function Accordion({
  items,
  className = "",
  style,
  ...rest
}: {
  items: AccItem[];
  className?: string;
  style?: React.CSSProperties;
  "data-rv"?: boolean;
}) {
  const [open, setOpen] = useState<{ i: number; h: number } | null>(null);

  return (
    <div className={`acc ${className}`.trim()} style={style} {...(rest["data-rv"] ? { "data-rv": "" } : {})}>
      {items.map((it, i) => {
        const isOpen = open?.i === i;
        return (
          <div className={`acc-item${isOpen ? " open" : ""}`} key={it.q}>
            <button
              className="acc-q"
              aria-expanded={isOpen}
              onClick={(e) => {
                const panel = e.currentTarget.nextElementSibling as HTMLElement;
                setOpen(isOpen ? null : { i, h: panel.scrollHeight });
              }}
            >
              {it.q}
              <span className="pm" />
            </button>
            <div
              className="acc-a"
              style={{ height: isOpen ? open.h : 0 }}
              // refresh after the height transition, not before (the HTML refreshed
              // immediately, so pins below measured the pre-animation height)
              onTransitionEnd={(e) => e.propertyName === "height" && ScrollTrigger.refresh()}
            >
              <p>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
