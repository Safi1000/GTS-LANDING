import type { Metadata } from "next";
import { Accordion } from "@/components/Accordion";
import { BillingProvider, BillingToggle, PlanPrice, SaveBadge } from "@/components/BillingToggle";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal } from "@/components/Reveal";
import { CheckIcon, DashIcon } from "@/components/icons";
import { Rail } from "@/components/ui";
import { BILLING_FAQ } from "@/lib/content";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "The Discord community is free. Education ($29/mo) covers the masterclass and weekly live sessions; Pro ($49/mo) adds the GTS Terminal.",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Pricing | GLITCHERS" },
};

const COMMUNITY = ["The Discord community", "Prop firm and exchange perks", "Both account challenges, followed live"];
const COMMUNITY_OFF = ["The masterclass", "Weekly live sessions", "The GTS Terminal"];
const EDUCATION = [
  "Everything in Community",
  "The complete masterclass: 6 modules, 12 lessons",
  "Weekly live sessions with mentors",
  "Member-only Discord channels",
  "Cancel any time",
];
const PRO = [
  "Everything in Education",
  "The GTS Terminal",
  "GTS Levels and GTS Reversals",
  "Liquidation heatmap",
  "Orderflow confirmations",
  "Bar replay on a consolidated feed",
  "Auto-tracking trade journal",
  "Priority support",
  "Cancel any time",
];
const WITH = [
  "The Discord community is free, for everyone",
  "Win rates come with a sample size",
  "Two clear plans, no hidden VIP tiers",
  "Affiliate relationships disclosed up front",
];
const ELSEWHERE = [
  "The community itself locked behind a paywall",
  "90% win rate, no methodology anywhere",
  "VIP tier, then a VIP+ tier, then another",
  "Broker referral links with no disclosure",
];
const LI = { display: "flex", gap: 12, fontSize: 14.5 } as const;
const BTN = { width: "100%", marginTop: 26 } as const;

export default function PricingPage() {
  return (
    <BillingProvider>
      <Reveal>
        <header className="wrap phero">
          <div className="eyebrow">Pricing</div>
          <h1 className="d-lg" style={{ marginTop: 18 }}>
            Learn the method.
            <br />
            Or get everything.
          </h1>
          <p className="lede" style={{ marginInline: "auto" }}>
            The Discord community is free. Education covers the masterclass and weekly live sessions, and Pro adds
            the GTS Terminal.
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 34 }}>
            <BillingToggle />
          </div>
          <p style={{ marginTop: 16 }}>
            <SaveBadge />
          </p>
        </header>

        <section className="wrap">
          <div className="grid-3 plans" style={{ gap: 20 }}>
            <div className="card plan frame" data-rv>
              <span className="badge badge-muted">Free</span>
              <h3 style={{ marginTop: 20, fontSize: 23 }}>Community</h3>
              <div className="price" style={{ marginTop: 22 }}>$0</div>
              <p className="per">No card required</p>
              <MagneticButton href={LINKS.discordInvite} className="btn btn-secondary" style={BTN}>
                Join the Discord
              </MagneticButton>
              <ul>
                {COMMUNITY.map((f) => (
                  <li key={f}><CheckIcon color="#C99A4B" />{f}</li>
                ))}
                {COMMUNITY_OFF.map((f) => (
                  <li className="off" key={f}><DashIcon />{f}</li>
                ))}
              </ul>
            </div>
            <div className="card plan frame" data-rv>
              <span className="badge">Learn the method</span>
              <h3 style={{ marginTop: 20, fontSize: 23 }}>Education</h3>
              <PlanPrice plan="education" />
              {/* points at the payment steps until Stripe checkout links exist */}
              <MagneticButton href="#how-to-pay" className="btn btn-secondary" style={BTN}>
                Get Education
              </MagneticButton>
              <ul>
                {EDUCATION.map((f) => (
                  <li key={f}><CheckIcon color="#C99A4B" />{f}</li>
                ))}
                <li className="off"><DashIcon />The GTS Terminal</li>
              </ul>
            </div>
            <div className="card card-glow plan feature frame" data-rv>
              <span className="badge badge-ox">Most popular</span>
              <h3 style={{ marginTop: 20, fontSize: 23 }}>Pro</h3>
              <PlanPrice plan="pro" highlight />
              <MagneticButton href="#how-to-pay" className="btn btn-primary" style={BTN}>
                Get Pro
              </MagneticButton>
              <ul>
                {PRO.map((f) => (
                  <li key={f}><CheckIcon color="#F5E3A3" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
          <p
            className="small"
            id="how-to-pay"
            data-rv
            style={{ textAlign: "center", marginTop: 26, maxWidth: "78ch", marginInline: "auto" }}
          >
            Card via Stripe, or pay in USDT, BTC and ETH. Crypto payments are a fixed-term purchase and do not renew
            automatically, so we send a reminder before access ends. After paying, open a ticket in our Discord with
            your invoice ID: we unlock the masterclass and live sessions on your Discord account and, on Pro, give your
            Google email access to the terminal.
          </p>
        </section>

        <section className="wrap band">
          <Rail n="I" label="How we are different" />
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
          <Accordion items={BILLING_FAQ} columns={2} data-rv />
        </section>
      </Reveal>
    </BillingProvider>
  );
}
