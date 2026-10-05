import { HeroLogo } from "@/components/HeroLogo";
import { HeroMotion } from "@/components/HeroMotion";
import { MagneticButton } from "@/components/MagneticButton";
import { ArrowIcon } from "@/components/icons";
import { LINKS } from "@/lib/site";

export function Hero() {
  return (
    <HeroMotion>
      <div className="grid-bg" aria-hidden="true" />

      <div className="wrap" data-hero="inner">
        <HeroLogo />
        <div className="eyebrow hero-gap-s" data-hero="eye">
          Gold &amp; Crypto · Education &amp; Mentorship
        </div>
        <h1 className="d-xl">
          <span className="ln">
            <span className="w">Read the chart.</span>
          </span>
          <span className="ln">
            <span className="w">
              Learn the method.
            </span>
          </span>
          <span className="ln">
            <span className="w dim">Know why it works.</span>
          </span>
        </h1>
        <p className="lede" data-hero="lede">
          A trading education community that runs in Discord. Free to join, with a full masterclass, weekly live
          sessions and a charting terminal we built ourselves for members.
        </p>
        <div className="btn-row center hero-gap-l" data-hero="btns">
          <MagneticButton href={LINKS.discordInvite} className="btn btn-primary btn-lg">
            Join the Discord
            <ArrowIcon />
          </MagneticButton>
          <MagneticButton href="/terminal" className="btn btn-secondary btn-lg">
            See the terminal
          </MagneticButton>
        </div>
      </div>
    </HeroMotion>
  );
}
