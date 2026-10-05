"use client";

import { preload } from "react-dom";
import AnimatedLogo from "@/components/gts-logo/AnimatedLogo";
import { LAYER_ORDER } from "@/components/gts-logo/layers";
import { LOGO_SRC } from "@/components/Crest";
import { useHeroRevealed } from "@/components/HeroMotion";

/**
 * The animated GTS logo in the hero ("Bull vs bear" intro).
 *
 * The logo only mounts once the hero is revealed (after the preloader curtain,
 * or straight away when there is none), so its intro is never played unseen.
 * Until then the box is reserved at full size so nothing shifts.
 */
export function HeroLogo() {
  const revealed = useHeroRevealed();

  // Start downloading the layers while the preloader is still up (~430 KB).
  // (mask.png is a CSS mask, fetched in CORS mode, so a preload hint would go unused.)
  LAYER_ORDER.forEach((n) => preload(`/gts-logo/${n}.png`, { as: "image" }));

  return (
    <div className="logo-stage">
      {revealed ? (
        <AnimatedLogo variant="bull-vs-bear" label="GLITCHERS crest" />
      ) : (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_SRC} alt="GLITCHERS logo" className="logo-fallback" />
        </noscript>
      )}
    </div>
  );
}
