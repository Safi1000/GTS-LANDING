import { HeroLogo } from "@/components/HeroLogo";
import { HeroMotion } from "@/components/HeroMotion";
import { MagneticButton } from "@/components/MagneticButton";
import { ArrowIcon } from "@/components/icons";
import { Orn } from "@/components/ui";
import { LINKS } from "@/lib/site";

export function Hero() {
  return (
    <HeroMotion>
      <div className="grid-bg" aria-hidden="true" />

      <div className="wrap" data-hero="inner">
        <HeroLogo />
        <div className="wordmark" data-hero="word">
          GLITCHERS
        </div>
        <div className="hero-gap-s" data-hero="orn">
          <Orn />
        </div>
        <div className="eyebrow hero-gap-s" data-hero="eye">
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
        <div className="btn-row center hero-gap-l" data-hero="btns">
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
        <div className="hero-cue" data-hero="cue">
          <div className="scroll-cue" />
        </div>
      </div>
    </HeroMotion>
  );
}
