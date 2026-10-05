import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use the GLITCHERS website, Discord community, masterclass and GTS Terminal.",
  alternates: { canonical: "/terms" },
};

const Ticket = () => (
  <a href={LINKS.discordInvite} target="_blank" rel="noopener noreferrer">
    a ticket in our Discord server
  </a>
);

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="The terms that apply when you use the GLITCHERS website, Discord community, masterclass and GTS Terminal."
    >
      <h2>1. Who we are</h2>
      <p>
        GLITCHERS (GTS) is a trading education community for gold and crypto, operated by an individual sole trader
        (&ldquo;GLITCHERS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). These terms apply to this website, our Discord
        server, the masterclass, live sessions, and the GTS Terminal at charts.glitchtrading.co (together, the
        &ldquo;Services&rdquo;). By using the Services you agree to these terms. If you do not agree, do not use them.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old to use the Services. By using them you confirm that you are 18 or over and
        that you are allowed to use trading education services and make payments where you live.
      </p>

      <h2>3. What we provide</h2>
      <ul>
        <li>
          <b>Free:</b> the Discord community, the masterclass, live sessions, our public account challenges and partner
          perks.
        </li>
        <li>
          <b>Paid:</b> a subscription to the GTS Terminal, our charting terminal with GTS Levels, GTS Reversals, a
          liquidation heatmap, orderflow confirmations, bar replay and a trade journal.
        </li>
      </ul>
      <p>
        We may add, change or remove features, lessons and tools at any time. If a change materially reduces what a
        paid subscription includes, we will tell you in advance through Discord.
      </p>

      <h2>4. Education only, not financial advice</h2>
      <p>
        Everything we publish is educational. Nothing on the website, in Discord, in the masterclass, in live sessions,
        in our public account challenges or in the GTS Terminal is financial, investment or tax advice, or a
        recommendation to buy or sell anything. Every trading decision you make is your own. GLITCHERS is not a
        broker, financial adviser or asset manager and never handles your funds. Please read our{" "}
        <Link href="/risk-disclosure">Risk Disclosure</Link> before you trade.
      </p>

      <h2>5. Access to the GTS Terminal</h2>
      <ul>
        <li>After paying by card or crypto, open <Ticket /> with your invoice ID.</li>
        <li>Once we verify the payment, we grant terminal access to the Google email address you give us.</li>
        <li>
          A subscription is for one person. You must not share your login, give others access, or resell or
          redistribute access in any form.
        </li>
        <li>
          You are responsible for keeping your Google and Discord accounts secure and for activity under your access.
        </li>
      </ul>

      <h2>6. Payments and billing</h2>
      <ul>
        <li>Prices are shown on our <Link href="/pricing">pricing page</Link> in US dollars.</li>
        <li>
          <b>Card payments</b> are processed by Stripe and renew automatically, monthly or annually, until you cancel.
          If a payment fails, Stripe retries it over roughly two weeks and you stay in a grace period during that time.
          Access is removed only if the subscription finally fails.
        </li>
        <li>
          <b>Crypto payments</b> (USDT, BTC and ETH) buy a fixed term of 30 or 365 days. They do not renew
          automatically; we send reminders before access ends.
        </li>
        <li>
          We may change prices. Changes never affect a period you have already paid for, and we give notice in Discord
          before a new price applies to a renewal.
        </li>
        <li>
          Refunds are covered by our <Link href="/refund-policy">Refund Policy</Link>.
        </li>
      </ul>

      <h2>7. Our content and tools</h2>
      <p>
        The masterclass, videos, written lessons, charts, the GTS Terminal, its indicators and tools, and all other
        material we provide belong to GLITCHERS. You may use them for your own personal, non-commercial trading
        education. You must not copy, record, download, republish, share, sell, or create derivative products from
        them, and you must not reverse engineer, scrape or interfere with the GTS Terminal.
      </p>

      <h2>8. Community rules</h2>
      <p>In our Discord and live sessions you must not:</p>
      <ul>
        <li>harass, threaten or abuse other members;</li>
        <li>spam, advertise, or promote other paid groups, services or referral links;</li>
        <li>present anything you post as financial advice or guaranteed returns;</li>
        <li>share other members&apos; personal information or our paid content.</li>
      </ul>
      <p>We may remove messages and remove or ban anyone who breaks these rules.</p>

      <h2>9. Public challenges and published figures</h2>
      <p>
        Our public account challenges show our own trades, taken on our own accounts, to demonstrate the method in
        the open. Win rates and other figures on this site come from backtesting, as explained in our{" "}
        <Link href="/risk-disclosure">Risk Disclosure</Link>. None of this is a promise of future results. If you
        choose to follow or copy any trade, you do so at your own risk.
      </p>

      <h2>10. Partners and third parties</h2>
      <p>
        We link to prop firms, exchanges and other third parties and may earn a commission when you use our links or
        codes. Their products and terms are their own, and we are not responsible for them. The Services also rely on
        third parties such as Discord, Google, Stripe and our hosting and video providers.
      </p>

      <h2>11. Availability</h2>
      <p>
        We aim to keep the Services available, but they are provided &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo;. Data, charts and tools may contain errors or delays, and there may be downtime for
        maintenance or outside our control. Do not rely on the Services as your only source of information.
      </p>

      <h2>12. Limitation of liability</h2>
      <p>
        To the extent the law allows, GLITCHERS is not liable for any trading losses, lost profits, or indirect or
        consequential losses arising from your use of the Services. Our total liability to you for any claim is
        limited to the amount you paid us for the Services in the 12 months before the claim. Nothing in these terms
        limits liability that cannot be limited by law.
      </p>

      <h2>13. Suspension and termination</h2>
      <p>
        You can stop using the Services at any time. We may suspend or end your access, without refund, if you break
        these terms, share or resell access, file an unjustified chargeback, or misuse the Services.
      </p>

      <h2>14. Changes to these terms</h2>
      <p>
        We may update these terms. The &ldquo;Last updated&rdquo; date above shows when they last changed, and we
        announce significant changes in Discord. Continuing to use the Services after a change means you accept it.
      </p>

      <h2>15. Governing law</h2>
      {/* PLACEHOLDER: fill in the operator's country, e.g. "the laws of Pakistan" */}
      <p>
        These terms are governed by the laws of the country in which the operator of GLITCHERS is based, and any
        dispute will be handled by the courts of that country.
      </p>

      <h2>16. Contact</h2>
      <p>
        For any question about these terms, open <Ticket />.
      </p>
    </LegalPage>
  );
}
