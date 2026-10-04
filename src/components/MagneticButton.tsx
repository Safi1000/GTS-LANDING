"use client";

import Link from "next/link";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, POINTER_MOTION, useGSAP } from "@/lib/gsap";

type Props = {
  href?: string;
  type?: "button" | "submit";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * `.btn` that leans toward the pointer (the HTML's `.mag`).
 * Internal hrefs render a next/link, `#`/external ones a plain anchor, and no
 * href renders a <button>.
 */
export function MagneticButton({ href, type = "button", className, style, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const b = ref.current;
    if (!b) return;
    const mm = gsap.matchMedia();
    mm.add(POINTER_MOTION, () => {
      let t: ReturnType<typeof setTimeout>;
      const move = (e: MouseEvent) => {
        const r = b.getBoundingClientRect();
        const mx = (e.clientX - r.left - r.width / 2) * 0.22;
        const my = (e.clientY - r.top - r.height / 2) * 0.3;
        b.style.transform = `translate(${mx}px,${my}px)`;
      };
      const leave = () => {
        b.style.transform = "";
        b.style.transition = "transform .45s cubic-bezier(.22,1,.36,1)";
        clearTimeout(t);
        t = setTimeout(() => (b.style.transition = ""), 450);
      };
      b.addEventListener("mousemove", move);
      b.addEventListener("mouseleave", leave);
      return () => {
        clearTimeout(t);
        b.removeEventListener("mousemove", move);
        b.removeEventListener("mouseleave", leave);
        b.style.transform = "";
        b.style.transition = "";
      };
    });
    return () => mm.revert();
  });

  if (href === undefined) {
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} type={type} className={className} style={style}>
        {children}
      </button>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={className} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={className} style={style}>
      {children}
    </a>
  );
}
