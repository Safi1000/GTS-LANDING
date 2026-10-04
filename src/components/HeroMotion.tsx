"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { Preloader } from "@/components/Preloader";
import { gsap, MOTION, useGSAP, within } from "@/lib/gsap";
import { INTRO_KEY, navState } from "@/lib/nav-state";

/**
 * Owns all hero motion: the preloader → logo → headline intro timeline, the
 * scroll parallax. The hero content itself is
 * server-rendered and passed in as children; elements are found through
 * scoped selectors (`[data-hero=…]`, `.w`).
 *
 * The intro plays only on the first hard load of `/` in a session. Repeat
 * visits and client-side navigations to `/` show the hero as-is.
 *
 * `useHeroRevealed()` tells children (the animated logo) when the hero is
 * actually visible — after the preloader curtain lifts, or immediately when
 * there is no preloader — so the logo intro never plays behind the curtain.
 */
const RevealedCtx = createContext(false);
export const useHeroRevealed = () => useContext(RevealedCtx);

export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [showPre, setShowPre] = useState(true);
  const [revealed, setRevealed] = useState(false);
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
          setRevealed(true);
          return;
        }

        /* parallax (built before the intro, as in the HTML) */
        const scrub = (s: number) => ({ trigger: root, start: "top top", end: "bottom top", scrub: s });
        gsap.to("[data-hero=inner]", { y: -70, opacity: 0.15, ease: "none", scrollTrigger: scrub(0.6) });
        gsap.to(".grid-bg", { y: 90, ease: "none", scrollTrigger: scrub(0.6) });

        if (!playIntro.current) {
          setShowPre(false);
          setRevealed(true);
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
          // the logo mounts and starts its own intro where the crest used to fade in;
          // the empty 0.9s spacer keeps the headline timings exactly as before
          .add(() => setRevealed(true), "-=.55")
          .to({}, { duration: 0.9 }, "<")
          .from("[data-hero=eye]", { opacity: 0, y: 10, duration: 0.5 }, "-=.5")
          .from(".w", { yPercent: 110, opacity: 0, duration: 0.85, stagger: 0.07, ease: "power3.out" }, "-=.35")
          .from("[data-hero=lede]", { opacity: 0, y: 14, duration: 0.6 }, "-=.45")
          .from("[data-hero=btns]", { opacity: 0, y: 14, duration: 0.6 }, "-=.45");

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
    <RevealedCtx.Provider value={revealed}>
      <header className="hero" ref={ref}>
        {showPre && <Preloader />}
        {children}
      </header>
    </RevealedCtx.Provider>
  );
}
