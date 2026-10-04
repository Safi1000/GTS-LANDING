"use client";

import Link from "next/link";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, POINTER_MOTION, useGSAP } from "@/lib/gsap";

/** `.card.tilt`: a slight 3D tilt toward the pointer. Pass `href` to render a link card. */
export function TiltCard({
  href,
  className = "",
  style,
  children,
  ...rest
}: {
  href?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  "data-rv"?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(POINTER_MOTION, () => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
        el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
      };
      const leave = () => (el.style.transform = "");
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
        el.style.transform = "";
      };
    });
    return () => mm.revert();
  });

  const cls = `card tilt ${className}`.trim();
  const rv = rest["data-rv"] ? { "data-rv": "" } : {};
  return href ? (
    <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} style={style} {...rv}>
      {children}
    </Link>
  ) : (
    <div ref={ref as React.Ref<HTMLDivElement>} className={cls} style={style} {...rv}>
      {children}
    </div>
  );
}
