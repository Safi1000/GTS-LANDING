"use client";

import { createContext, useContext, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Monthly/annual billing. The toggle, the "Save 20%" badge and the plan
 * prices sit in different parts of the page, so they share state through
 * context. The plan cards' feature lists between them stay server-rendered.
 */
type Bill = "m" | "y";
const Ctx = createContext<{ bill: Bill; setBill: (b: Bill) => void }>({ bill: "m", setBill: () => {} });

/**
 * Paid plans. Annual is 20% off the monthly price: `y` is the per-month figure
 * shown, `yTotal` the amount billed once a year (round(m × 12 × 0.8)).
 */
export const PRICES = {
  education: { m: 29, y: 23, yTotal: 278 },
  pro: { m: 49, y: 39, yTotal: 470 },
} as const;
export type Plan = keyof typeof PRICES;

export function BillingProvider({ children }: { children: ReactNode }) {
  const [bill, setBill] = useState<Bill>("m");
  return <Ctx.Provider value={{ bill, setBill }}>{children}</Ctx.Provider>;
}

export function BillingToggle() {
  const { bill, setBill } = useContext(Ctx);
  const knob = useRef<HTMLSpanElement>(null);
  const btns = useRef<Record<Bill, HTMLButtonElement | null>>({ m: null, y: null });

  useLayoutEffect(() => {
    const mv = () => {
      const b = btns.current[bill];
      if (!b || !knob.current) return;
      knob.current.style.left = b.offsetLeft + "px";
      knob.current.style.width = b.offsetWidth + "px";
    };
    mv();
    document.fonts?.ready.then(mv);
  }, [bill]);

  return (
    <div className="toggle">
      <span className="knob" ref={knob} />
      {(["m", "y"] as const).map((b) => (
        <button
          key={b}
          ref={(el) => {
            btns.current[b] = el;
          }}
          className={bill === b ? "on" : undefined}
          aria-pressed={bill === b}
          onClick={() => setBill(b)}
        >
          {b === "m" ? "Monthly" : "Annual"}
        </button>
      ))}
    </div>
  );
}

export function SaveBadge() {
  const { bill } = useContext(Ctx);
  return (
    <span className="badge" style={{ opacity: bill === "y" ? 1 : 0, transition: "opacity .3s" }}>
      Save 20%
    </span>
  );
}

/** One plan's price; it animates between monthly and annual with the shared toggle. */
export function PlanPrice({ plan, highlight = false }: { plan: Plan; highlight?: boolean }) {
  const { bill } = useContext(Ctx);
  const price = PRICES[plan];
  const num = useRef<HTMLSpanElement>(null);
  const mounted = useRef(false);

  useLayoutEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const el = num.current!;
    const o = { v: +(el.textContent || price.m) };
    const tw = gsap.to(o, {
      v: price[bill],
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = String(Math.round(o.v));
      },
    });
    return () => {
      tw.kill();
    };
  }, [bill, price]);

  return (
    <>
      <div className={`price${highlight ? " hi" : ""}`} style={{ marginTop: 22 }}>
        <sup>$</sup>
        <span ref={num}>{price.m}</span>
      </div>
      <p className="per">
        {bill === "y" ? `per month, billed annually at $${price.yTotal}` : "per month, billed monthly"}
      </p>
    </>
  );
}
