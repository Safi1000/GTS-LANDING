import { Accordion } from "@/components/Accordion";
import { AnatomyScrub } from "@/components/AnatomyScrub";
import { AmbientCandles } from "@/components/charts/AmbientCandles";
import { PlainChart } from "@/components/charts/PlainChart";
import { SignalChartSvg } from "@/components/charts/SignalChartSvg";
import { Counter } from "@/components/Counter";
import { Crest } from "@/components/Crest";
import { MagneticButton } from "@/components/MagneticButton";
import { Marquee } from "@/components/Marquee";
import { StepsTrack } from "@/components/StepsTrack";
import { SylStagger } from "@/components/SylStagger";
import { TiltCard } from "@/components/TiltCard";
import { ArrowIcon } from "@/components/icons";
import { Kicker, Orn, PanelBar, Rail } from "@/components/ui";
import {
  HOME_FAQ, PARTNER_LOGOS, PERKS, QUOTES_A, QUOTES_B, ROOMS, SYLLABUS, type Quote,
} from "@/lib/content";
import { LINKS } from "@/lib/site";

export const SIGNAL_OPTS = { w: 720, h: 430, seed: 20260807, start: 2404, entryIdx: 25 };

/* ══════════ TRUST ══════════ */
export function Trust() {
  return (
    <section className="wrap" style={{ marginTop: -30, position: "relative", zIndex: 5 }}>
      <div className="strip frame" data-rv>
        <div><Counter as="b" to={75} suffix="%" /><span>Win rate at 1R</span></div>
        <div><Counter as="b" to={60} suffix="%" /><span>Win rate at 2R</span></div>
        <div><b>12</b><span>Masterclass modules</span></div>
        <div><Counter as="b" to={2} suffix="×" /><span>Challenges running</span></div>
      </div>
    </section>
  );
}

/* ══════════ I. ANATOMY OF A SETUP (pinned scrub) ══════════ */
const ANAT_STEPS = [
  ["01 · RANGE", "Price builds a level", "The script tracks the highs and lows that everyone else is watching."],
  ["02 · SWEEP", "Liquidity gets taken", "Price runs the level, trips the stops sitting beyond it, and fails to hold."],
  ["03 · BOS", "Structure breaks back", "The reclaim confirms the move was a raid, not a breakout."],
  ["04 · ENTRY", "Entry, stop, two targets", "Printed and measured. From here it is your risk and your call."],
];

export function Anatomy() {
  return (
    <AnatomyScrub className="wrap band anatomy">
      <Rail n="I" label="Anatomy of a setup" />
      <div className="anat-grid">
        <div>
          <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", marginBottom: 26 }} data-rv>
            The setup
            <br />
            marks itself.
          </h2>
          <div className="anat-steps">
            {ANAT_STEPS.map(([n, h, p], i) => (
              <div className={`anat-step${i === 0 ? " on" : ""}`} key={n}>
                <div className="n">{n}</div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <PanelBar pair="XAUUSD" tf="15M" label="GTS Indicator v3" live="LIVE" />
          <SignalChartSvg
            opts={SIGNAL_OPTS}
            role="img"
            aria-label="Gold chart where the GTS indicator marks a setup as the page scrolls"
          />
        </div>
      </div>
    </AnatomyScrub>
  );
}

/* ══════════ II. THE ROOMS ══════════ */
export function Rooms() {
  return (
    <section className="wrap band">
      <Rail n="II" label="Inside the server" />
      <h2 data-rv>Four rooms, one community.</h2>
      <p className="lede" data-rv style={{ marginBottom: 44 }}>
        Everything runs where the conversation already is.
      </p>
      <div className="grid-4">
        {ROOMS.map(([code, h, p, idx]) => (
          <div className="room" data-rv key={code}>
            <div>
              <code>{code}</code>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
            <div className="idx">{idx}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════ III. HOW IT WORKS ══════════ */
const STEPS = [
  ["I", "Join the Discord", "Discussion, mentorship and partner perks. Nothing behind a card.", "Free"],
  ["II", "Take the masterclass", "The complete method, including every strategy the indicator uses.", "Free"],
  ["III", "Add the indicator", "Once you know the method, the tool that prints it saves you the screen time.", "From $39/mo"],
];

export function HowItWorks() {
  return (
    <section className="wrap band">
      <Rail n="III" label="How it works" />
      <h2 data-rv style={{ marginBottom: 52 }}>
        Free, free, then paid.
        <br />
        <span className="dim">In that order, deliberately.</span>
      </h2>
      <div className="steps">
        <StepsTrack />
        {STEPS.map(([n, h, p, tag]) => (
          <div className="step" data-rv key={n}>
            <div className="n"><span>{n}</span></div>
            <h3>{h}</h3>
            <p>{p}</p>
            <span className="tag">{tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════ IV. INDICATOR ══════════ */
export function IndicatorSection() {
  return (
    <section className="wrap band">
      <Rail n="IV" label="The indicator" />
      <div className="split top">
        <div data-rv>
          <h2>
            It prints the setup.
            <br />
            <span className="hi">You bring the context.</span>
          </h2>
          <p className="lede">
            Built in-house for gold and crypto. Four strategies ship inside one script, each suited to a different
            market condition, and every one of them is taught free in the masterclass.
          </p>
          <p className="lede">
            It is not a bot. It will not save bad risk management. It marks the level and gets out of your way.
          </p>
          <div className="chips" style={{ marginTop: 26 }}>
            <span className="chip">Trend continuation</span>
            <span className="chip">Sweep reversal</span>
            <span className="chip">Range break</span>
            <span className="chip">Session scalp</span>
          </div>
          <div className="btn-row" style={{ marginTop: 30 }}>
            <MagneticButton href="/indicator" className="btn btn-primary">
              Get access
              <ArrowIcon />
            </MagneticButton>
            <MagneticButton href="/pricing" className="btn btn-secondary">
              See pricing
            </MagneticButton>
          </div>
        </div>
        <div data-rv>
          <div className="figs frame">
            <div className="fig"><b><Counter to={75} suffix="%" /></b><span>Win rate · 1R</span></div>
            <div className="fig"><b><Counter to={60} suffix="%" /></b><span>Win rate · 2R</span></div>
            <div className="fig"><b>4</b><span>Strategies</span></div>
            <div className="fig"><b>2</b><span>Markets</span></div>
          </div>
          <p className="note">
            <b>On those numbers.</b> They come from our own backtests. The pairs tested, the date range, the sample
            size and the worst losing streak are all posted in the server — read them before you subscribe, not
            after.
          </p>
          <p className="note">
            <b>Delivery.</b> The script is invite-only on TradingView. You give us your username after subscribing
            and we grant access to your account, usually within a few hours.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════ V. MASTERCLASS ══════════ */
export function MasterclassSection() {
  return (
    <section className="wrap band">
      <Rail n="V" label="The masterclass" />
      <div className="split top">
        <div data-rv>
          <div className="free-tag">Free · No paywall</div>
          <h2>
            We teach the method
            <br />
            and sell the tool.
          </h2>
          <p className="lede">
            Not a funnel with the good parts removed. The curriculum runs from what a candle is actually telling you
            up to every strategy inside the indicator and how to size the trades it gives you.
          </p>
          <p className="lede">Video lessons, live sessions with mentors, and written breakdowns with annotated charts.</p>
          <div className="btn-row" style={{ marginTop: 30 }}>
            <MagneticButton href="/masterclass" className="btn btn-secondary">
              Start the masterclass
            </MagneticButton>
          </div>
        </div>
        <SylStagger>
          {SYLLABUS.map((s, i) => (
            <div key={s}>
              <i>{String(i + 1).padStart(2, "0")}</i>
              {s}
            </div>
          ))}
        </SylStagger>
      </div>
    </section>
  );
}

/* ══════════ VI. TERMINAL ══════════ */
export function TerminalSection() {
  return (
    <section className="wrap band">
      <Rail n="VI" label="The backtesting terminal" />
      <div className="split">
        <div data-rv>
          <span className="badge" style={{ marginBottom: 22 }}>Included with membership</span>
          <h2>
            One chart per pair.
            <br />
            <span className="hi">Priced by consensus.</span>
          </h2>
          <p className="lede">
            We pull gold and crypto prices from several providers and consolidate them into a single clean series per
            pair, so you are not backtesting one exchange&apos;s wicks and calling it an edge.
          </p>
          <p className="lede">Replay any period bar by bar, mark your entries, and score every trade in R.</p>
        </div>
        <div className="panel" data-rv>
          <PanelBar pair="XAUUSD" tf="1H" label="Replay · 14 Mar 2026" live="REPLAY" />
          <PlainChart seed={88} w={720} h={300} n={54} aria-hidden="true" />
          <div style={{ display: "flex", gap: 10, padding: "13px 16px", borderTop: "1px solid var(--line)", flexWrap: "wrap" }}>
            <span className="chip">1M</span>
            <span className="chip">5M</span>
            <span className="chip on">1H</span>
            <span className="chip">4H</span>
            <span className="chip">1D</span>
            <span className="chip" style={{ marginLeft: "auto" }}>Step ›</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════ VII. PARTNERS ══════════ */
export function Partners() {
  return (
    <section className="band">
      <div className="wrap">
        <Rail n="VII" label="Perks & partners" />
        <h2 data-rv>Cheaper funding, cheaper fees.</h2>
        <p className="lede" data-rv style={{ marginBottom: 38 }}>
          We partner with prop firms and exchanges so the community pays less to trade. Codes live in{" "}
          <span className="mono" style={{ color: "var(--gold-500)", fontSize: 13 }}>#perks</span>.
        </p>
      </div>
      <Marquee speed={0.6} style={{ marginBottom: 26 }}>
        {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((l, i) => (
          <div className="plogo" key={i}>{l}</div>
        ))}
      </Marquee>
      <div className="wrap">
        <div className="grid-4">
          {PERKS.map(([k, h, p]) => (
            <TiltCard className="card-glow" data-rv key={k}>
              <Kicker>{k}</Kicker>
              <h3 style={{ marginTop: 14 }}>{h}</h3>
              <p className="small" style={{ marginTop: 9 }}>{p}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════ VIII. VOICES  [SAMPLE COPY] ══════════ */
const QuoteCard = ({ q }: { q: Quote }) => (
  <div className="quote">
    <p>{q.p}</p>
    <div className="who">
      <div className="av">{q.av}</div>
      <span className="hd">{q.hd}</span>
    </div>
  </div>
);

export function Voices() {
  return (
    <section className="band">
      <div className="wrap">
        <Rail n="VIII" label="From the server" />
        <h2 data-rv style={{ marginBottom: 40 }}>What members actually say.</h2>
      </div>
      <Marquee speed={0.4} style={{ marginBottom: 16 }}>
        {QUOTES_A.map((q, i) => <QuoteCard q={q} key={i} />)}
      </Marquee>
      <Marquee speed={-0.4}>
        {QUOTES_B.map((q, i) => <QuoteCard q={q} key={i} />)}
      </Marquee>
    </section>
  );
}

/* ══════════ IX. FAQ ══════════ */
export function Faq() {
  return (
    <section className="wrap band">
      <Rail n="IX" label="Questions" />
      <div className="split top">
        <div data-rv>
          <h2>Straight answers.</h2>
          <p className="lede">
            If it is not here, ask in{" "}
            <span className="mono" style={{ color: "var(--gold-500)", fontSize: 13.5 }}>#discussion</span> — someone
            usually replies within minutes.
          </p>
        </div>
        <Accordion items={HOME_FAQ} data-rv />
      </div>
    </section>
  );
}

/* ══════════ CTA ══════════ */
export function HomeCta() {
  return (
    <section className="wrap">
      <div className="cta-band" data-rv>
        <AmbientCandles />
        <Crest w={48} h={57} style={{ margin: "0 auto 22px" }} />
        <Orn style={{ marginBottom: 22 }} />
        <h2>
          The server is free.
          <br />
          So is the masterclass.
        </h2>
        <p className="lede" style={{ margin: "20px auto 0", textAlign: "center" }}>
          Come in, take the course, join the live sessions, and decide about the indicator afterwards. That order works
          better for everyone.
        </p>
        <div className="btn-row center" style={{ marginTop: 36 }}>
          <MagneticButton href={LINKS.discordInvite} className="btn btn-primary btn-lg">
            Join the Discord
            <ArrowIcon />
          </MagneticButton>
          <MagneticButton href="/pricing" className="btn btn-secondary btn-lg">
            Indicator pricing
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
