import { Crest } from "@/components/Crest";
import { HeroMotion } from "@/components/HeroMotion";
import { MagneticButton } from "@/components/MagneticButton";
import { ArrowIcon } from "@/components/icons";
import { Orn } from "@/components/ui";
import { r3 } from "@/lib/chart";
import { LINKS } from "@/lib/site";

/** 72 tick marks around the outer dial (built with innerHTML in the HTML). */
function DialTicks() {
  return (
    <g stroke="rgba(201,154,75,.45)">
      {Array.from({ length: 72 }, (_, i) => {
        const a = (i * 5 * Math.PI) / 180;
        const long = i % 6 === 0;
        const r1 = long ? 84 : 89, r2 = 96;
        return (
          <line
            key={i}
            x1={r3(100 + Math.cos(a) * r1)}
            y1={r3(100 + Math.sin(a) * r1)}
            x2={r3(100 + Math.cos(a) * r2)}
            y2={r3(100 + Math.sin(a) * r2)}
            stroke={`rgba(201,154,75,${long ? 0.5 : 0.22})`}
            strokeWidth={long ? 1.2 : 0.8}
          />
        );
      })}
    </g>
  );
}

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
        <div className="crest-stage">
          <div className="crest-glow" data-hero="glow" />
          <div className="dial">
            <svg viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="96" stroke="rgba(201,154,75,.18)" />
              <DialTicks />
            </svg>
          </div>
          <div className="dial rev">
            <svg viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="78" stroke="rgba(201,154,75,.1)" strokeDasharray="2 7" />
            </svg>
          </div>
          <div className="crest-ring" aria-hidden="true" />
          <div className="crest-ring" aria-hidden="true" />
          <div className="crest-wrap" data-hero="crest">
            <Crest className="crest" w={98} h={116} alt="GLITCHERS crest" eager />
            <div className="crest-sheen" />
          </div>
        </div>
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
            <span className="hl">Read the chart.</span>
          </span>
          <span className="ln">
            <span className="hl">
              Take the{" "}
              <em className="foil" style={{ fontStyle: "normal" }}>
                signal
              </em>
              .
            </span>
          </span>
          <span className="ln">
            <span className="hl dim">Know why it worked.</span>
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
