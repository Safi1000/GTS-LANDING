import Link from "next/link";
import { Crest } from "@/components/Crest";
import { NewsletterForm } from "@/components/NewsletterForm";
import { DiscordIcon, InstagramIcon, XIcon, YouTubeIcon } from "@/components/icons";
import { RISK_WARNING } from "@/lib/content";
import { LINKS } from "@/lib/site";

/* Links marked "#" were dead `#/` links in the HTML; Phase 4 gives them routes. */
const COLS: [string, [string, string][]][] = [
  ["Community", [[LINKS.discordInvite, "Join the Discord"], ["/results", "Weekly results"], ["#", "Challenges"], ["#", "Partners & perks"], ["#", "Giveaways"]]],
  ["Learn", [["/masterclass", "Masterclass"], ["/masterclass", "Live sessions"], ["/indicator", "Strategy library"], ["#", "FAQ"], ["#", "About the desk"]]],
  ["Product", [["/indicator", "The indicator"], ["/pricing", "Pricing"], ["#", "Backtesting terminal"], [LINKS.signIn, "Sign in"], [LINKS.account, "Account"]]],
];

const A = ({ href, children }: { href: string; children: React.ReactNode }) =>
  href.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href}>{children}</a>;

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
              Signals recap, new lessons, partner deals. Nothing else.
            </p>
          </div>
          <NewsletterForm />
        </div>
        <div className="fgrid">
          <div>
            <Link href="/" className="mark">
              <Crest w={26} h={31} />
              <b>GLITCHERS</b>
            </Link>
            <p className="small" style={{ marginTop: 16, maxWidth: "34ch" }}>
              A gold and crypto trading desk that runs in Discord. Teaching the method, selling the tool.
            </p>
            <div className="socials">
              <a href={LINKS.social.x} aria-label="X"><XIcon /></a>
              <a href={LINKS.social.youtube} aria-label="YouTube"><YouTubeIcon /></a>
              <a href={LINKS.social.instagram} aria-label="Instagram"><InstagramIcon /></a>
              <a href={LINKS.social.discord} aria-label="Discord"><DiscordIcon /></a>
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
        {/* LEGALLY LOAD-BEARING — verbatim from gts-site-v2.html */}
        <div className="disc">
          <b>Risk warning.</b> {RISK_WARNING}
        </div>
        <div className="fbot">
          <span>© {year} GLITCHERS (GTS)</span>
          <div className="r">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Refund policy</a>
            <a href="#">Risk disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
