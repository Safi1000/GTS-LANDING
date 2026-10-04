"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { navState } from "@/lib/nav-state";

/**
 * App Router navigations don't reload the page, so ScrollTrigger has to be
 * told when layout changes underneath it:
 *  - after every route change (the new page's triggers already exist by now:
 *    child layout effects run before this effect)
 *  - once web fonts have loaded (Archivo/Cinzel widths shift every pin)
 *  - on window load (images)
 * Each page's own triggers are killed by useGSAP's cleanup on unmount.
 */
export function RouteWatcher() {
  const pathname = usePathname();
  const prev = useRef<string | null>(null);

  useEffect(() => {
    if (prev.current !== null && prev.current !== pathname) navState.navigated = true;
    prev.current = pathname;
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  // Placeholder links (href="#", no destination yet) would jump to the top and
  // put "#" in the URL. Swallow those clicks until real URLs exist.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (a && a.getAttribute("href") === "#") e.preventDefault();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState !== "complete") window.addEventListener("load", onLoad, { once: true });
    return () => {
      alive = false;
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return null;
}
