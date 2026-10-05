import Link from "next/link";
import { Crest } from "@/components/Crest";
import { NewsletterForm } from "@/components/NewsletterForm";
import { DiscordIcon } from "@/components/icons";
import { RISK_WARNING } from "@/lib/content";
import { LINKS } from "@/lib/site";

/* Links marked "#" are placeholders (no destination yet); RouteWatcher stops them jumping to the top. */
const COLS: [string, [string, string][]][] = [
  ["Community", [[LINKS.discordInvite, "Join the Discord"], ["/#perks", "Partners & perks"], ["/#perks", "Giveaways"]]],
  ["Learn", [["/masterclass", "Masterclass"], ["/masterclass", "Live sessions"], ["/terminal#tools", "Terminal tools"], ["/#faq", "FAQ"], ["#", "About us"]]],
  ["Product", [["/terminal", "The GTS Terminal"], ["/pricing", "Pricing"], [LINKS.terminal, "Open the terminal"], [LINKS.signIn, "Sign in"], [LINKS.account, "Account"]]],
];

const A = ({ href, children }: { href: string; children: React.ReactNode }) =>
  href.startsWith("/") ? (
    <Link href={href}>{children}</Link>
  ) : href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <a href={href}>{children}</a>
  );

export function Footer() {
  // Static pages are rendered at build time, so this is the build year (one
  // server computation, never recomputed in the browser).
  const year = new Date().getUTCFullYear();
  return (
    <footer>
      <div className="wrap">
        <div className="news">
          <div>
            <h3>One email a week.</h3>
            <p className="small" style={{ marginTop: 6 }}>
              New lessons, session recaps, partner deals. Nothing else.
            </p>
          </div>
          <NewsletterForm />
        </div>
        <div className="fgrid">
          <div>
            <Link href="/" className="mark">
              <Crest size={32} />
              <b>GLITCHERS</b>
            </Link>
            <p className="small" style={{ marginTop: 16, maxWidth: "34ch" }}>
              A gold and crypto trading education community that runs in Discord. Free to join; the method and the tools are for members.
            </p>
            <div className="socials">
              <a href={LINKS.discordInvite} target="_blank" rel="noopener noreferrer" aria-label="Discord"><DiscordIcon /></a>
            </div>
          </div>
          {COLS.map(([h, links]) => (
            <div key={h}>
              <h4>{h}</h4>
              {links.map(([href, label]) => (
                <A key={label} href={href}>{label}</A>
              ))}
            </div>
          ))}
        </div>
        {/* LEGALLY LOAD-BEARING - verbatim from gts-site-v2.html */}
        <div className="disc">
          <b>Risk warning.</b> {RISK_WARNING}
        </div>
        <div className="fbot">
          <span>© {year} GLITCHERS (GTS)</span>
          <div className="r">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/refund-policy">Refund policy</Link>
            <Link href="/risk-disclosure">Risk disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
