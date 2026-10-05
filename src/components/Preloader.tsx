"use client";

import { Crest } from "@/components/Crest";
import { InlineScript } from "@/components/InlineScript";
import { INTRO_KEY } from "@/lib/nav-state";

/**
 * The crest preloader. Markup only - HeroMotion owns the timeline.
 *
 * It runs once per browser session, on a hard load of `/`. Three safety nets
 * keep it from ever hiding the page:
 *  1. an inline script hides it before first paint on repeat visits and for
 *     reduced-motion users (no flash, no wait)
 *  2. <noscript> hides it when JS is off
 *  3. a CSS failsafe animation fades it out after 6s if JS never takes over
 */
export function Preloader() {
  return (
    <>
      <div id="pre" suppressHydrationWarning>
        <div className="box">
          <Crest size={88} eager />
          <div className="wm">GLITCHERS</div>
          <div className="bar">
            <i />
          </div>
          <div className="pct">0%</div>
        </div>
        <div className="curtain" />
      </div>
      <InlineScript
        html={`try{if(sessionStorage.getItem(${JSON.stringify(INTRO_KEY)})||matchMedia('(prefers-reduced-motion: reduce)').matches){var p=document.getElementById('pre');if(p)p.style.display='none'}}catch(e){}`}
      />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>#pre{display:none}</style>" }} />
    </>
  );
}
