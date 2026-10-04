"use client";

import { useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useToast } from "@/components/Toast";
import { SITE } from "@/lib/site";
import { CopyIcon } from "@/components/icons";

const ITEMS = ["Annual plan — 20% off", "Gold & crypto challenges live", "Masterclass free, always"];

export function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);
  const toast = useToast();

  return (
    <div
      className={`anno${hidden ? " hide" : ""}`}
      // re-measure pinned sections once the collapse has actually finished
      onTransitionEnd={(e) => e.propertyName === "height" && ScrollTrigger.refresh()}
    >
      <div className="anno-in">
        <div className="anno-track">
          <div className="anno-move">
            {[0, 1].flatMap((k) =>
              ITEMS.flatMap((t, i) => [<span key={`${k}${i}t`}>{t}</span>, <span key={`${k}${i}d`}>◆</span>]),
            )}
          </div>
        </div>
        <button
          className="code-btn"
          onClick={() => {
            navigator.clipboard?.writeText(SITE.promoCode).catch(() => {});
            toast(`Promo code ${SITE.promoCode} copied`);
          }}
        >
          {SITE.promoCode}
          <CopyIcon />
        </button>
        <button className="anno-x" aria-label="Dismiss" onClick={() => setHidden(true)}>
          &times;
        </button>
      </div>
    </div>
  );
}
