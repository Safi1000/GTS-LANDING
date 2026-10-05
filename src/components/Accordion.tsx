"use client";

import { useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export type AccItem = { q: string; a: string };

/**
 * Single-open accordion. Answers are always in the DOM (server-rendered,
 * crawlable); collapsed ones are height: 0.
 *
 * `columns={2}` splits the items into two columns (first half left, second
 * half right) that share one open state; it collapses to one column on
 * narrow screens (`.acc-cols` in globals.css).
 */
export function Accordion({
  items,
  columns = 1,
  className = "",
  style,
  ...rest
}: {
  items: AccItem[];
  columns?: 1 | 2;
  className?: string;
  style?: React.CSSProperties;
  "data-rv"?: boolean;
}) {
  const [open, setOpen] = useState<{ i: number; h: number } | null>(null);

  const item = (it: AccItem, i: number) => {
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
  };

  const rv = rest["data-rv"] ? { "data-rv": "" } : {};
  if (columns === 1) {
    return (
      <div className={`acc ${className}`.trim()} style={style} {...rv}>
        {items.map(item)}
      </div>
    );
  }
  const half = Math.ceil(items.length / 2);
  return (
    <div className={`acc acc-cols ${className}`.trim()} style={style} {...rv}>
      <div>{items.slice(0, half).map((it, k) => item(it, k))}</div>
      <div>{items.slice(half).map((it, k) => item(it, half + k))}</div>
    </div>
  );
}
