"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Media conditions for gsap.matchMedia(). Every motion effect is registered
 * under MOTION, so a reduced-motion user never gets the tween at all and the
 * server-rendered (fully visible) state is what they see.
 */
export const MOTION = "(prefers-reduced-motion: no-preference)";
export const POINTER_MOTION = "(hover: hover) and (prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
