import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What personal information GLITCHERS collects, why, who it is shared with, and the choices you have.",
  alternates: { canonical: "/privacy" },
};

const Ticket = () => (
  <a href={LINKS.discordInvite} target="_blank" rel="noopener noreferrer">
    a ticket in our Discord server
  </a>
);

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="What personal information we collect, why we collect it, who it is shared with, and the choices you have."
    >
      <h2>1. Who is responsible</h2>
      <p>
        GLITCHERS (GTS), operated by an individual sole trader, is responsible for the personal information described
        here. It covers this website, our Discord server, the masterclass and the GTS Terminal. For any privacy
        question or request, open <Ticket />.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li>
          <b>Discord account details</b> when you sign in with Discord or open a ticket: your Discord user ID,
          username, avatar and, where Discord provides it, your email address.
        </li>
        <li>
          <b>Payment details:</b> card payments are handled by Stripe, and we never see or store your full card
          number. We receive the invoice ID, amount, plan, payment status and the billing details Stripe shares with
          us. For crypto payments we keep the invoice ID, amount and transaction reference.
        </li>
        <li>
          <b>Terminal access:</b> the Google email address you give us so we can grant access to the GTS Terminal.
        </li>
        <li>
          <b>Terminal and journal data:</b> the settings you save in the terminal and the trades the journal tracks
          for you, so your journal and statistics work.
        </li>
        <li>
          <b>Learning progress:</b> which lessons you have watched and completed.
        </li>
        <li>
          <b>Newsletter:</b> your email address, if you subscribe to the weekly email.
        </li>
        <li>
          <b>Technical data:</b> basic information your browser sends, such as IP address, browser type and the pages
          you request, kept in server logs for security and troubleshooting.
        </li>
      </ul>

      <h2>3. Why we use it</h2>
      <ul>
        <li>To provide the Services: sign-in, video lessons, progress tracking, and terminal access.</li>
        <li>To verify payments and manage subscriptions, renewals and reminders.</li>
        <li>To provide support through Discord tickets.</li>
        <li>To send the weekly email if you subscribed. You can unsubscribe at any time.</li>
        <li>To keep the Services secure, prevent abuse and account sharing, and fix problems.</li>
        <li>To meet legal, tax and accounting obligations.</li>
      </ul>

      <h2>4. Cookies</h2>
      <p>
        We use only the cookies and similar storage needed to run the Services, such as keeping you signed in and
        remembering small preferences. We do not use advertising cookies and we do not sell your information.
      </p>

      <h2>5. Who we share it with</h2>
      <p>We share personal information only with the providers that help us run the Services:</p>
      <ul>
        <li>Stripe, to process card payments;</li>
        <li>Discord, for sign-in, the community and support tickets;</li>
        <li>Google, to grant terminal access to your Google account;</li>
        <li>our hosting, database and video providers, to store data and deliver lessons.</li>
      </ul>
      <p>
        We may also disclose information if the law requires it, or to protect our rights or the safety of others.
        We never sell personal information.
      </p>

      <h2>6. How long we keep it</h2>
      <p>
        We keep account, access and journal data while you use the Services, and delete or anonymise it within a
        reasonable time after you ask us to or after your account has been inactive for a long period. Payment
        records are kept for as long as tax and accounting rules require.
      </p>

      <h2>7. Your choices and rights</h2>
      <p>
        You can ask us to show you the personal information we hold about you, correct it, delete it, or stop using it
        for the weekly email. Depending on where you live, you may have further rights under local law. To make a
        request, open <Ticket />. We may need to confirm it is you before acting on a request.
      </p>

      <h2>8. Security</h2>
      <p>
        We take reasonable measures to protect your information, including limiting who can access it. No online
        service can be completely secure, so please keep your Discord and Google accounts protected.
      </p>

      <h2>9. Age</h2>
      <p>
        The Services are for people aged 18 and over. We do not knowingly collect information from anyone under 18.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update this policy. The &ldquo;Last updated&rdquo; date above shows when it last changed, and we
        announce significant changes in Discord.
      </p>
    </LegalPage>
  );
}
