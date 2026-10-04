"use client";

import { useRef, useState } from "react";
import { preload } from "react-dom";
import AnimatedLogo, { type AnimatedLogoHandle, type LogoVariant } from "@/components/gts-logo/AnimatedLogo";
import { LAYER_ORDER } from "@/components/gts-logo/layers";
import { useHeroRevealed } from "@/components/HeroMotion";

const VARIANTS: [LogoVariant, string][] = [
  ["bull-vs-bear", "Bull vs bear"],
  ["market-open", "Market open"],
];

/**
 * The animated GTS logo in the hero, plus a switcher for the two intros.
 *
 * The logo only mounts once the hero is revealed (after the preloader curtain,
 * or straight away when there is none), so its intro is never played unseen.
 * Until then the box is reserved at full size so nothing shifts.
 *
 * The switcher re-plays the intro: picking the other variant swaps it,
 * clicking the active one replays it.
 */
export function HeroLogo() {
  const revealed = useHeroRevealed();
  const [variant, setVariant] = useState<LogoVariant>("bull-vs-bear");
  const logo = useRef<AnimatedLogoHandle>(null);

  // Start downloading the layers while the preloader is still up (~430 KB).
  // (mask.png is a CSS mask, fetched in CORS mode, so a preload hint would go unused.)
  LAYER_ORDER.forEach((n) => preload(`/gts-logo/${n}.png`, { as: "image" }));

  return (
    <>
      <div className="logo-stage">
        {revealed ? (
          <AnimatedLogo ref={logo} variant={variant} label="GLITCHERS crest" />
        ) : (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/crest.png" alt="GLITCHERS crest" className="logo-fallback" />
          </noscript>
        )}
      </div>
      <div className="logo-switch" role="group" aria-label="Logo animation">
        <span className="logo-switch-lbl">Logo intro</span>
        {VARIANTS.map(([v, label]) => (
          <button
            key={v}
            type="button"
            className={`chip${variant === v ? " on" : ""}`}
            aria-pressed={variant === v}
            onClick={() => (variant === v ? logo.current?.replay() : setVariant(v))}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
