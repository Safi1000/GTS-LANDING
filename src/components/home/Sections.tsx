import { Accordion } from "@/components/Accordion";
import { AnatomyChart } from "@/components/AnatomyChart";
import { AnatomyScrub } from "@/components/AnatomyScrub";
import { AmbientCandles } from "@/components/charts/AmbientCandles";
import { Counter } from "@/components/Counter";
import { Crest } from "@/components/Crest";
import { MagneticButton } from "@/components/MagneticButton";
import { ReplayPanel } from "@/components/ReplayPanel";
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

/* ══════════ TRUST ══════════ */
export function Trust() {
  return (
    <section className="wrap" style={{ marginTop: -30, position: "relative", zIndex: 5 }}>
      <div className="strip frame" data-rv>
        <div><Counter as="b" to={80} suffix="%" /><span>Win rate at 1R</span></div>
        <div><Counter as="b" to={70} suffix="%" /><span>Win rate at 2R</span></div>
        <div><b>12</b><span>Masterclass modules</span></div>
        <div><Counter as="b" to={2} /><span>Public account challenges</span></div>
      </div>
    </section>
  );
}

/* ══════════ I. ANATOMY OF A SETUP (pinned scrub) ══════════ */
const ANAT_STEPS = [
  ["01 · LEVELS", "GTS Levels map the zones", "The terminal draws levels straight from orderflow, where real buying and selling took place."],
  ["02 · TAP", "Price taps the level", "Price sells back into the zone, right where buyers stepped in last time."],
  ["03 · REVERSAL", "A GTS Reversal prints", "An arrow prints under the candle that rejects the level. That candle is the trigger."],
  ["04 · ENTRY", "Entry, stop, two targets", "Entry on the reversal candle, stop below the level with room to breathe, targets at 1R and 2R."],
];

export function Anatomy() {
  return (
    <AnatomyScrub className="wrap band anatomy">
      <Rail n="I" label="Anatomy of a setup" />
      {/* flat grid: heading on top, steps beside the chart (the chart matches the steps' height) */}
      <div className="anat-grid">
        <h2 className="anat-h" data-rv>
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
        <div className="panel">
          <PanelBar pair="XAUUSD" tf="15M" label="GTS Levels · GTS Reversals" />
          <AnatomyChart label="Gold chart: price taps a GTS Level, a GTS Reversal prints, with entry, stop and two targets" />
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
  ["II", "Take the masterclass", "The complete method, from risk and market structure to the Glitch Models.", "Free"],
  ["III", "Add the terminal", "Once you know the method, the terminal that marks it saves you the screen time.", "From $39/mo"],
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

/* ══════════ IV. THE GTS TERMINAL ══════════ */
export function TerminalSection() {
  return (
    <section className="wrap band">
      <Rail n="IV" label="The GTS Terminal" />
      <div className="split top">
        <div data-rv>
          <h2>
            It marks the setup.
            <br />
            <span className="hi">You bring the context.</span>
          </h2>
          <p className="lede">
            Our own charting terminal, built in-house for gold and crypto. GTS Levels, GTS Reversals, a liquidation
            heatmap and orderflow confirmations on one chart, a journal that tracks every trade for you, and the
            method behind it taught free in the masterclass.
          </p>
          <p className="lede">
            It is not a bot. It will not save bad risk management. It marks the level and gets out of your way.
          </p>
          <div className="chips" style={{ marginTop: 26 }}>
            <span className="chip">GTS Levels</span>
            <span className="chip">GTS Reversals</span>
            <span className="chip">Liquidation heatmap</span>
            <span className="chip">Orderflow confirmations</span>
          </div>
          <div className="btn-row" style={{ marginTop: 30 }}>
            <MagneticButton href="/terminal" className="btn btn-primary">
              Explore the terminal
              <ArrowIcon />
            </MagneticButton>
            <MagneticButton href="/pricing" className="btn btn-secondary">
              See pricing
            </MagneticButton>
          </div>
        </div>
        <div data-rv>
          <div className="figs frame">
            <div className="fig"><b><Counter to={80} suffix="%" /></b><span>Win rate · 1R</span></div>
            <div className="fig"><b><Counter to={70} suffix="%" /></b><span>Win rate · 2R</span></div>
            <div className="fig"><b>4</b><span>Tools</span></div>
            <div className="fig"><b>2</b><span>Markets</span></div>
          </div>
          <p className="note">
            <b>On those numbers.</b> They come from our own backtests. The pairs tested, the date range, the sample
            size and the worst losing streak are all posted in the server — read them before you subscribe, not
            after.
          </p>
          <p className="note">
            <b>Access.</b> Pay by card or crypto, open a ticket in our Discord with your invoice ID, and we give your
            Google email access to the terminal.
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
            Not a funnel with the good parts removed. The curriculum runs from risk management and market structure
            through liquidity and supply and demand to the Glitch Models, then a full gold backtest that puts it all
            together.
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

/* ══════════ VI. REPLAY & BACKTESTING (part of the terminal) ══════════ */
export function ReplaySection() {
  return (
    <section className="wrap band">
      <Rail n="VI" label="Replay & backtesting" />
      <div className="split">
        <div data-rv>
          <span className="badge" style={{ marginBottom: 22 }}>Included in the GTS Terminal</span>
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
        <ReplayPanel />
      </div>
    </section>
  );
}

/* ══════════ VII. PARTNERS ══════════ */
export function Partners() {
  return (
    <section className="band" id="perks">
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
        <div className="grid-3">
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
    <section className="wrap band" id="faq">
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
          Come in, take the course, join the live sessions, and decide about the terminal afterwards. That order works
          better for everyone.
        </p>
        <div className="btn-row center" style={{ marginTop: 36 }}>
          <MagneticButton href={LINKS.discordInvite} className="btn btn-primary btn-lg">
            Join the Discord
            <ArrowIcon />
          </MagneticButton>
          <MagneticButton href="/pricing" className="btn btn-secondary btn-lg">
            Terminal pricing
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
