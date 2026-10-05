import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "How cancellations and refunds work for the Education and Pro plans, paid by card or crypto.",
  alternates: { canonical: "/refund-policy" },
};

const Ticket = () => (
  <a href={LINKS.discordInvite} target="_blank" rel="noopener noreferrer">
    a ticket in our Discord server
  </a>
);

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      intro="How cancellations and refunds work for the Education and Pro plans, paid by card or crypto."
    >
      <h2>1. Free services</h2>
      <p>
        The Discord community, public account challenges and partner perks are free, so there is nothing to refund.
        You can spend as long as you like in the community before deciding on a paid plan.
      </p>

      <h2>2. Card subscriptions (Education and Pro)</h2>
      <ul>
        <li>Card payments are not refundable, including unused days of a monthly or annual period.</li>
        <li>
          You can cancel at any time by opening <Ticket />. Cancelling stops all future renewals.
        </li>
        <li>Your access continues until the end of the period you have already paid for, then it ends.</li>
      </ul>

      <h2>3. Crypto payments</h2>
      <p>
        Crypto payments (USDT, BTC and ETH) buy a fixed term of 30 or 365 days. They do not renew automatically and
        cannot be refunded. We say this plainly at checkout and send reminders before access ends.
      </p>

      <h2>4. Billing errors</h2>
      <p>
        If you are charged twice for the same period, or charged an amount that does not match the plan you chose, open{" "}
        <Ticket /> with your invoice ID. Once we confirm the error, we refund the incorrect amount.
      </p>

      <h2>5. Chargebacks</h2>
      <p>
        Please contact us before disputing a payment with your bank, as most problems can be solved through a ticket.
        If a chargeback is filed, paid access is suspended while it is open, and access may be removed if the
        chargeback is unjustified.
      </p>

      <h2>6. Your legal rights</h2>
      <p>
        This policy does not take away any rights you have under the consumer law that applies to you. Also see our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>

      <h2>7. Contact</h2>
      <p>
        For cancellations, billing questions or errors, open <Ticket /> and include your invoice ID.
      </p>
    </LegalPage>
  );
}
