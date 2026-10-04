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
              Learn the{" "}
              <em className="foil" style={{ fontStyle: "normal" }}>
                method
              </em>
              .
            </span>
          </span>
          <span className="ln">
            <span className="w dim">Know why it works.</span>
          </span>
        </h1>
        <p className="lede" data-hero="lede">
          A trading education community that runs in Discord. A free masterclass, live mentorship, and an
          indicator we built ourselves.
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
      </div>
    </HeroMotion>
  );
}
