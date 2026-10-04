"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Crest } from "@/components/Crest";
import { MagneticButton } from "@/components/MagneticButton";
import { MobileDrawer } from "@/components/MobileDrawer";
import { LINKS } from "@/lib/site";

const DROPS = {
  indicator: [
    ["/indicator", "Overview", "What it prints, and what it won't do"],
    ["/indicator", "Strategies", "Four setups, one script"],
    ["/indicator", "Methodology", "How the win rates were measured"],
    ["/pricing", "Pricing", "Monthly or annual"],
  ],
  masterclass: [
    ["/masterclass", "All lessons", "The full free curriculum"],
    ["/masterclass", "Start here", "Foundations for new traders"],
    ["/masterclass", "Live sessions", "Thursdays with the desk"],
    ["/indicator", "Strategy library", "Rules, examples, invalidation"],
  ],
} as const;

function Drop({ items }: { items: readonly (readonly [string, string, string])[] }) {
  return (
    <div className="drop">
      <div className="drop-in">
        {items.map(([href, t, s]) => (
          <Link key={t} href={href}>
            <strong>{t}</strong>
            <span>{s}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Sticky nav (+ "stuck" state on scroll), active link, burger and drawer. */
export function SiteHeader() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("lock", open);
    return () => document.body.classList.remove("lock");
  }, [open]);

  const nl = (r: string) => `nlink${pathname === r ? " active" : ""}`;

  return (
    <>
      <nav className={`nav${stuck ? " stuck" : ""}`}>
        <div className="wrap nav-in">
          <Link href="/" className="mark">
            <Crest w={26} h={31} alt="GLITCHERS" eager />
            <b>GLITCHERS</b>
          </Link>
          <div className="nav-links">
            <div className="has-drop">
              <Link href="/indicator" className={nl("/indicator")}>
                Indicator
              </Link>
              <Drop items={DROPS.indicator} />
            </div>
            <div className="has-drop">
              <Link href="/masterclass" className={nl("/masterclass")}>
                Masterclass
              </Link>
              <Drop items={DROPS.masterclass} />
            </div>
            <Link href="/results" className={nl("/results")}>
              Results
            </Link>
            <Link href="/pricing" className={nl("/pricing")}>
              Pricing
            </Link>
          </div>
          <div className="nav-cta">
            <a href={LINKS.signIn} className="btn btn-ghost btn-sm">
              Sign in
            </a>
            <MagneticButton href={LINKS.discordInvite} className="btn btn-primary btn-sm">
              Join the Discord
            </MagneticButton>
            <button
              className={`burger${open ? " on" : ""}`}
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <i />
              <i />
              <i />
            </button>
          </div>
        </div>
      </nav>
      <MobileDrawer open={open} onNavigate={() => setOpen(false)} />
    </>
  );
}
