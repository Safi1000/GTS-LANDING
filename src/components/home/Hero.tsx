import { HeroLogo } from "@/components/HeroLogo";
import { HeroMotion } from "@/components/HeroMotion";
import { MagneticButton } from "@/components/MagneticButton";
import { ArrowIcon } from "@/components/icons";
import { Orn } from "@/components/ui";
import { LINKS } from "@/lib/site";

const FLOATERS = [
  ["f1", 7, "XAUUSD", "LONG", "+2.0R", "Sweep reversal"],
  ["f2", 9, "BTCUSDT", "SHORT", "+1.0R", "Range break"],
  ["f3", 11, "ETHUSDT", "LONG", "+2.0R", "Trend continuation"],
] as const;

export function Hero() {
  return (
    <HeroMotion>
      <div className="grid-bg" aria-hidden="true" />
      <div className="floaters" aria-hidden="true">
        {FLOATERS.map(([cls, f, pair, dir, r, meta]) => (
          <div className={`floater ${cls}`} data-float={f} key={cls}>
            <div className="top">
              <span className="pair">{pair}</span>
              <span className="badge badge-muted" style={{ padding: "3px 8px", letterSpacing: ".14em" }}>
                {dir}
              </span>
            </div>
            <div className="r">{r}</div>
            <div className="meta">{meta}</div>
          </div>
        ))}
      </div>

      <div className="wrap" data-hero="inner">
        <HeroLogo />
        <div className="wordmark" data-hero="word">
          GLITCHERS
        </div>
        <div data-hero="orn">
          <Orn style={{ marginTop: 18 }} />
        </div>
        <div className="eyebrow" style={{ marginTop: 18 }} data-hero="eye">
          Gold &amp; Crypto · Trading Desk
        </div>
        <h1 className="d-xl">
          <span className="ln">
            <span className="w">Read the chart.</span>
          </span>
          <span className="ln">
            <span className="w">
              Take the{" "}
              <em className="foil" style={{ fontStyle: "normal" }}>
                signal
              </em>
              .
            </span>
          </span>
          <span className="ln">
            <span className="w dim">Know why it worked.</span>
          </span>
        </h1>
        <p className="lede" data-hero="lede">
          A trading desk that runs in Discord. Daily gold and crypto signals, an indicator we built ourselves, and a
          masterclass that gives the entire method away for free.
        </p>
        <div className="btn-row center" data-hero="btns" style={{ marginTop: 34 }}>
          <MagneticButton href={LINKS.discordInvite} className="btn btn-primary btn-lg">
            Join the Discord
            <ArrowIcon />
          </MagneticButton>
          <MagneticButton href="/indicator" className="btn btn-secondary btn-lg">
            See the indicator
          </MagneticButton>
        </div>
        <p className="hero-micro" data-hero="micro">
          Free to join · Masterclass included · No card required
        </p>
        <div style={{ marginTop: 44 }} data-hero="cue">
          <div className="scroll-cue" />
        </div>
      </div>
    </HeroMotion>
  );
}
