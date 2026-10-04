# GLITCHERS (GTS) — web

Next.js port of `gts-site-v2.html`, the GTS landing page. GTS is positioned as **trading education and mentorship**: no signals service. The paid product is the **GTS Terminal** (https://charts.glitchtrading.co): GTS Levels, GTS Reversals, liquidation heatmap, orderflow confirmations, bar replay. The only performance figures on the site are its backtested win rates (80% at 1R / 70% at 2R). It will grow into the membership platform (masterclass, gated video, indicator and terminal entitlements).

**Status:** Phase 1–2 done (scaffold, design system, components, home, terminal, pricing, masterclass + 404; `/indicator` redirects permanently to `/terminal`; the HTML's Results page was removed with the signals content). Auth, CMS, video and payments have not started.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS 4: theme tokens in `src/app/globals.css` (`@theme inline`). Tailwind 4 has no `tailwind.config.ts`.
- GSAP 3 + ScrollTrigger via `@gsap/react` (`useGSAP`)
- Planned: Supabase (Discord OAuth), Payload CMS 3, Bunny Stream, Stripe

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Required | Used by | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | prod | `app/layout.tsx` `metadataBase` | Absolute origin for canonical and OG URLs, e.g. `https://glitchers.example`. Defaults to `http://localhost:3000`. |

Later phases add Supabase, Payload, Bunny and Stripe keys here. Server-only secrets must never get a `NEXT_PUBLIC_` prefix.

## Design system rules

- **Gold marks a signal, never decoration.** Bullish candles are bone (`#D8CFC2`), bearish are oxblood (`#7E1730`). Never green/red. The Tailwind theme has no default palette (`--color-*: initial`), so `text-green-500` doesn't exist.
- Token names and hex values in `:root` are sampled from the logo. Don't rename them.
- The component classes from the HTML (`.btn`, `.card`, `.rail`, `.strip`, `.panel`, `.acc-*`, …) are ported verbatim into `@layer components`. Use them; Tailwind is for layout and one-offs. They're layered so utilities can still override them.
- Fonts come from `next/font`, exposed as `--f-disp` (Archivo), `--f-crest` (Cinzel) and `--f-mono` (JetBrains Mono). SVG text must use `style={{ fontFamily: "var(--f-mono)" }}`, not the literal family name, because next/font renames families.

## Architecture

**Server by default.** Pages and section content are server components. Client components only own motion or interaction, and wrap server-rendered children:

| Client component | Owns |
|---|---|
| `Reveal` | scroll reveal for every `[data-rv]` inside it (`display: contents`, adds no box) |
| `HeroMotion` + `Preloader` | preloader → hero intro timeline, hero parallax, floaters |
| `AnatomyScrub` + `AnatomyChart` | pinned "anatomy of a setup" scrub building the GTS Levels / GTS Reversals chart (levels > .02, candles to the reversal .04→.44, reversal > .48, entry/SL/TPs .54→.70, rally .72→.96). The chart is drawn at its box's real pixel size; on desktop the box matches the step list's height |
| `SignalChart` | autoplaying GTS Levels chart (terminal page) |
| `Counter`, `SylStagger`, `StepsTrack`, `AmbientDrift`, `Marquee` | small scroll/loop effects |
| `MagneticButton`, `TiltCard`, `SpotlightCard`, `CrosshairCursor`, `ScrollProgressBar` | pointer / chrome |
| `Accordion`, `Tabs`, `BillingToggle`, `Countdown` | interactive widgets |
| `SiteHeader`, `MobileDrawer`, `AnnouncementBar`, `Toast`, `NewsletterForm` | site chrome |
| `RouteWatcher` | `ScrollTrigger.refresh()` after route changes, font load and window load |

**Motion rules**

- Content renders fully visible on the server. Animations use `gsap.from()`, so if JS fails, nothing is stuck invisible.
- Every effect is registered with `gsap.matchMedia()` under `MOTION` (`prefers-reduced-motion: no-preference`) in `src/lib/gsap.ts`. Reduced-motion users get the server-rendered state.
- Every animation lives in `useGSAP` with a scope ref, so unmounting reverts its tweens and ScrollTriggers. Verified: navigating `/` → `/pricing` → `/` twice leaves 0 pin-spacers on `/pricing` and exactly 1 on `/` (the anatomy scrub), with identical pin positions each time.
- No `document.querySelector` in components. Use refs, scoped selector strings, or `within(ref, sel)` from `src/lib/gsap.ts`.

**Determinism.** `src/lib/chart.ts` is a seeded PRNG plus plain arithmetic, so charts are identical on the server and in every browser. Don't add `Math.random()` or `Date` there. The trig output for the dial ticks is rounded (`r3`), because `Math.cos`/`sin` can differ across JS engines in the last digit.

**Preloader.** It plays once per browser session, on a hard load of `/` only. An inline pre-paint script hides it on repeat visits and for reduced motion. `<noscript>` hides it without JS, and a CSS failsafe fades it out after 6s if JS never takes over.

## Placeholders

These were placeholders in the HTML and still are. Search for `PLACEHOLDER` / `SAMPLE`:

- Discord invite, sign-in, account, socials, calendar links: `src/lib/site.ts`
- Testimonials: `src/lib/content.ts`
- Methodology figures: `src/app/indicator/page.tsx`
- Footer links to routes that don't exist yet (terms, privacy, FAQ, …): `#`

The footer risk warning (`RISK_WARNING` in `src/lib/content.ts`) is **legally load-bearing**. It's verbatim from the HTML, and a check confirmed it's byte-identical. Don't edit it without sign-off.

## Assets

`public/crest.png` is the logo extracted from the HTML's base64. It's **45×53 px and opaque RGB (no alpha)**, so it's blurry at hero size and shows a dark square behind the crest. It needs a re-export: transparent PNG at least ~470 px tall, or SVG.
