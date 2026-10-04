"use client";

import { useRef, useState, type ReactNode } from "react";
import { Preloader } from "@/components/Preloader";
import { gsap, MOTION, useGSAP, within } from "@/lib/gsap";
import { INTRO_KEY, navState } from "@/lib/nav-state";

/**
 * Owns all hero motion: the preloader → crest → headline intro timeline, the
 * scroll parallax and the floating signal cards. The hero content itself is
 * server-rendered and passed in as children; elements are found through
 * scoped selectors (`[data-hero=…]`, `.hl`, `.floater`, `.dial`).
 *
 * The intro plays only on the first hard load of `/` in a session. Repeat
 * visits and client-side navigations to `/` show the hero as-is.
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [showPre, setShowPre] = useState(true);
  // decided once per mount; a ref survives StrictMode's double effect run
  const playIntro = useRef<boolean | null>(null);

  useGSAP(
    () => {
      if (playIntro.current === null) {
        let seen = false;
        try {
          seen = !!sessionStorage.getItem(INTRO_KEY);
        } catch {}
        playIntro.current = !navState.navigated && !seen;
      }
      const root = ref.current!;
      const mm = gsap.matchMedia();

      mm.add({ motion: MOTION, reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        if (ctx.conditions?.reduce) {
          setShowPre(false);
          return;
        }

        /* parallax + floaters (built before the intro, as in the HTML) */
        const scrub = (s: number) => ({ trigger: root, start: "top top", end: "bottom top", scrub: s });
        gsap.to("[data-hero=inner]", { y: -70, opacity: 0.15, ease: "none", scrollTrigger: scrub(0.6) });
        gsap.to(".grid-bg", { y: 90, ease: "none", scrollTrigger: scrub(0.6) });
        gsap.utils.toArray<HTMLElement>(".floater").forEach((f, i) => {
          gsap.to(f, {
            y: -14,
            duration: +(f.dataset.float ?? 8),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.4,
          });
          gsap.to(f, { y: -120 - i * 40, opacity: 0, ease: "none", scrollTrigger: scrub(0.8) });
        });

        if (!playIntro.current) {
          setShowPre(false);
          return;
        }
        playIntro.current = false; // never replay on a later matchMedia change
        try {
          sessionStorage.setItem(INTRO_KEY, "1");
        } catch {}

        /* intro */
        const [pre] = within<HTMLElement>(root, "#pre");
        const [pct] = within<HTMLElement>(root, "#pre .pct");
        if (pre) pre.style.animation = "none"; // JS has taken over from the CSS failsafe
        const tl = gsap.timeline();
        tl.to("#pre img", { opacity: 1, duration: 0.7, ease: "power2.out" })
          .to("#pre .wm", { opacity: 1, duration: 0.5 }, "-=.3")
          .to(
            "#pre .bar i",
            {
              width: "100%",
              duration: 1.15,
              ease: "power2.inOut",
              onUpdate() {
                if (pct) pct.textContent = Math.round(this.progress() * 100) + "%";
              },
            },
            "-=.2",
          )
          .to("#pre .box", { opacity: 0, y: -14, duration: 0.4, ease: "power2.in" }, "+=.15")
          .to("#pre .curtain", { scaleY: 0, duration: 0.9, ease: "power4.inOut", transformOrigin: "top" }, "-=.15")
          .add(() => setShowPre(false))
          .from("[data-hero=crest]", { opacity: 0, scale: 0.9, filter: "blur(10px)", duration: 0.9, ease: "power3.out" }, "-=.55")
          .from("[data-hero=glow]", { opacity: 0, scale: 0.6, duration: 1, ease: "power2.out" }, "<")
          .from(".dial", { opacity: 0, scale: 0.85, duration: 1.1, stagger: 0.1, ease: "power3.out" }, "<")
          .from("[data-hero=word]", { opacity: 0, y: 12, duration: 0.6 }, "-=.5")
          .from("[data-hero=orn]", { opacity: 0, scaleX: 0.4, duration: 0.6 }, "-=.45")
          .from("[data-hero=eye]", { opacity: 0, y: 10, duration: 0.5 }, "-=.4")
          .from(".hl", { yPercent: 110, opacity: 0, duration: 0.85, stagger: 0.07, ease: "power3.out" }, "-=.35")
          .from("[data-hero=lede]", { opacity: 0, y: 14, duration: 0.6 }, "-=.45")
          .from("[data-hero=btns]", { opacity: 0, y: 14, duration: 0.6 }, "-=.45")
          .from("[data-hero=micro]", { opacity: 0, duration: 0.5 }, "-=.4")
          .from(".floater", { opacity: 0, y: 26, scale: 0.94, duration: 0.7, stagger: 0.12, ease: "power3.out" }, "-=.6")
          .from("[data-hero=cue]", { opacity: 0, duration: 0.5 }, "-=.3");

        /* two ceremonial rings, 0.55s apart, starting 1.6s before the end */
        const ringFrom = { scale: 0.55, opacity: 0.6 };
        const ringTo = { scale: 1.5, opacity: 0, duration: 1.3, ease: "power2.out", immediateRender: false };
        const [ringA, ringB] = within(root, ".crest-ring");
        tl.addLabel("rings", "-=1.6");
        if (ringA) tl.fromTo(ringA, ringFrom, ringTo, "rings");
        if (ringB) tl.fromTo(ringB, ringFrom, ringTo, "rings+=0.55");

        // StrictMode (dev) reverts and re-runs this immediately: let an
        // unfinished intro run again instead of being skipped.
        return () => {
          if (tl.progress() < 1) playIntro.current = true;
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <header className="hero" ref={ref}>
      {showPre && <Preloader />}
      {children}
    </header>
  );
}
