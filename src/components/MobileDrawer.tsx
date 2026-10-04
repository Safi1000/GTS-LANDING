"use client";

import Link from "next/link";
import { LINKS } from "@/lib/site";

const ITEMS: [string, string][] = [
  ["/indicator", "Indicator"],
  ["/masterclass", "Masterclass"],
  ["/pricing", "Pricing"],
];

/** Full-screen mobile menu. Open state is owned by SiteHeader (the burger). */
export function MobileDrawer({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const delay = (i: number) => ({ transitionDelay: open ? `${i * 45 + 90}ms` : "0ms" });
  return (
    <div className={`drawer${open ? " open" : ""}`} aria-hidden={!open} inert={!open}>
      {ITEMS.map(([href, label], i) => (
        <Link key={href} href={href} style={delay(i)} onClick={onNavigate}>
          {label}
        </Link>
      ))}
      <a
        href={LINKS.discordInvite}
        style={{ ...delay(ITEMS.length), color: "var(--gold-300)" }}
        onClick={onNavigate}
      >
        Join the Discord
      </a>
    </div>
  );
}
