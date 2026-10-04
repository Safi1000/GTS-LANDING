import type { Metadata } from "next";
import { Accordion } from "@/components/Accordion";
import { BillingProvider, BillingToggle, MemberPrice, SaveBadge } from "@/components/BillingToggle";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { CheckIcon, DashIcon } from "@/components/icons";
import { Rail } from "@/components/ui";
import { BILLING_FAQ } from "@/lib/content";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One subscription for the indicator and the backtesting terminal. The Discord, the masterclass, the signals, the results and the partner perks stay free.",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Pricing — GLITCHERS" },
};

const COMMUNITY = [
  "Daily gold and crypto signals", "The complete masterclass", "Live sessions with the desk",
  "Weekly published results", "Prop firm and exchange perks", "Both trading challenges",
];
const MEMBER = [
  "Everything in Community", "The GTS indicator on TradingView", "All four strategies", "Backtesting terminal",
  "Consolidated multi-provider data", "Member-only Discord channels", "Priority support", "Cancel any time",
];
const WITH = [
  "Education is free and complete", "Losing signals published alongside winners",
  "Win rates come with a sample size", "One price, no upsells inside the server",
  "Affiliate relationships disclosed up front",
];
const ELSEWHERE = [
  "Course locked behind a second payment", "Only the winning screenshots get posted",
  "90% win rate, no methodology anywhere", "VIP tier, then a VIP+ tier", "Broker referral links with no disclosure",
];
const LI = { display: "flex", gap: 12, fontSize: 14.5 } as const;

export default function PricingPage() {
  return (
    <BillingProvider>
      <Reveal>
        <header className="wrap phero">
          <div className="eyebrow">Pricing</div>
          <h1 className="d-lg" style={{ marginTop: 18 }}>
            One subscription.
            <br />
            Indicator and terminal.
          </h1>
          <p className="lede" style={{ marginInline: "auto" }}>
            Everything else — the Discord, the masterclass, the signals, the results and the partner perks — stays
            free.
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 34 }}>
            <BillingToggle />
          </div>
          <p style={{ marginTop: 16 }}>
            <SaveBadge />
          </p>
        </header>

        <section className="wrap">
          <div className="grid-2" style={{ gap: 20, maxWidth: 860, marginInline: "auto" }}>
            <div className="card plan frame" data-rv>
              <span className="badge badge-muted">Free forever</span>
              <h3 style={{ marginTop: 20, fontSize: 23 }}>Community</h3>
              <div className="price" style={{ marginTop: 22 }}>$0</div>
              <p className="per">No card required</p>
              <MagneticButton href={LINKS.discordInvite} className="btn btn-secondary" style={{ width: "100%", marginTop: 26 }}>
                Join the Discord
              </MagneticButton>
              <ul>
                {COMMUNITY.map((f) => (
                  <li key={f}><CheckIcon color="#C99A4B" />{f}</li>
                ))}
                <li className="off"><DashIcon />The indicator</li>
                <li className="off"><DashIcon />Backtesting terminal</li>
              </ul>
            </div>
            <div className="card card-glow plan feature frame" data-rv>
              <span className="badge badge-ox">Most popular</span>
              <h3 style={{ marginTop: 20, fontSize: 23 }}>Member</h3>
              <MemberPrice />
              {/* PLACEHOLDER — becomes Stripe checkout in Phase 5 */}
              <MagneticButton href="#" className="btn btn-primary" style={{ width: "100%", marginTop: 26 }}>
                Get access
              </MagneticButton>
              <ul>
                {MEMBER.map((f) => (
                  <li key={f}><CheckIcon color="#F5E3A3" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="small" data-rv style={{ textAlign: "center", marginTop: 26 }}>
            Card via Stripe, or pay in USDT, BTC and ETH. Crypto payments are a fixed-term purchase and do not renew
            automatically — we send a reminder before access ends.
          </p>
        </section>

        <section className="wrap band">
          <Rail n="I" label="What you are not paying for" />
          <div className="grid-2" style={{ gap: 20 }}>
            <div
              className="card frame"
              data-rv
              style={{
                borderColor: "var(--line-gold)",
                background: "linear-gradient(158deg,rgba(92,15,34,.32),var(--ink-700) 60%)",
              }}
            >
              <h3 style={{ marginBottom: 20 }}>With GTS</h3>
              <ul style={{ listStyle: "none", display: "grid", gap: 13 }}>
                {WITH.map((t) => (
                  <li key={t} style={LI}><span style={{ color: "var(--gold-400)" }}>✓</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="card" data-rv>
              <h3 style={{ marginBottom: 20 }} className="dim">Elsewhere</h3>
              <ul style={{ listStyle: "none", display: "grid", gap: 13 }}>
                {ELSEWHERE.map((t) => (
                  <li key={t} style={{ ...LI, color: "var(--muted)" }}><span style={{ color: "var(--loss)" }}>×</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="wrap band-t">
          <Rail n="II" label="Billing questions" />
          <Accordion items={BILLING_FAQ} data-rv style={{ maxWidth: 780 }} />
        </section>
      </Reveal>
    </BillingProvider>
  );
}
