import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Risk Disclosure",
  description:
    "The risks of trading gold and crypto, the limits of backtested figures, and why nothing GLITCHERS publishes is financial advice.",
  alternates: { canonical: "/risk-disclosure" },
};

export default function RiskDisclosurePage() {
  return (
    <LegalPage
      title="Risk Disclosure"
      intro="Read this before you trade. It explains the risks of trading gold and crypto and the limits of everything we publish."
    >
      <h2>1. Trading is high risk</h2>
      <p>
        Trading gold, foreign exchange and cryptocurrency carries a high level of risk and can result in the loss of
        all of your capital. Prices can move quickly and sharply, gaps and slippage can make losses larger than you
        planned, and markets can stay against you for longer than you expect. Only trade with capital you can afford
        to lose.
      </p>

      <h2>2. Leverage and derivatives</h2>
      <p>
        Leveraged products such as CFDs, futures and perpetual contracts magnify both gains and losses. A small move
        against you can wipe out your position, and leveraged positions can be liquidated automatically. Make sure you
        understand how margin and liquidation work on any platform you use.
      </p>

      <h2>3. Crypto-specific risks</h2>
      <p>
        Cryptocurrency markets trade around the clock, can be extremely volatile, and can be affected by exchange
        outages, hacks, insolvency, regulatory action and low liquidity. Funds held on an exchange may not be protected
        in the same way as funds held with a regulated bank or broker.
      </p>

      <h2>4. Backtested figures and their limits</h2>
      <p>
        The win rates shown on this site (80% at 1R and 70% at 2R) come from in-house backtesting, not from a live
        trading record. Backtesting benefits from hindsight, does not fully account for slippage, spreads, fees or
        liquidity, and cannot reproduce the psychological cost of a losing streak. Past performance, including any win
        rates, backtested figures or published results, is not a reliable indicator of future results. The full
        methodology, including sample size, date range, pairs tested and worst drawdown, is published in our Discord
        server. Read it before you subscribe.
      </p>

      <h2>5. Public challenges and shared trades</h2>
      <p>
        Our public account challenges show our own trades on our own accounts. Results on those accounts, good or bad,
        do not predict your results. Your account size, risk per trade, entry timing, execution and fees will differ.
        If you choose to follow or copy a trade, you do so entirely at your own risk.
      </p>

      <h2>6. Tools are not guarantees</h2>
      <p>
        GTS Levels, GTS Reversals, the liquidation heatmap, orderflow confirmations and every other tool in the GTS
        Terminal are aids for reading the chart. They do not predict the future, they will mark setups that fail, and
        their data can be delayed or wrong. The terminal does not place, manage or close trades, and it knows nothing
        about your account or risk tolerance.
      </p>

      <h2>7. Not financial advice</h2>
      <p>
        Nothing on this website, in our Discord, in the masterclass, in live sessions or in the GTS Terminal is
        financial, investment or tax advice, or a recommendation to buy or sell anything. Everything we publish is
        educational, and every trading decision you make is your own. If you need advice for your circumstances,
        speak to a licensed professional.
      </p>

      <h2>8. What GLITCHERS is not</h2>
      <p>
        GLITCHERS is not a licensed broker, financial adviser or asset manager. We do not manage funds on anyone&apos;s
        behalf and never take custody of member capital.
      </p>

      <h2>9. Partners and affiliates</h2>
      <p>
        We hold commercial affiliate relationships with the prop firms and exchanges listed on this site and may earn
        a commission when you use our links or discount codes. Prop firm challenges have their own rules, fees and
        failure conditions. Read each partner&apos;s terms before you sign up.
      </p>

      <h2>10. Your responsibility</h2>
      <p>
        You are responsible for your own trading decisions, for the risk you take, and for checking that trading the
        products you choose is legal where you live. By using our Services you accept these risks. Also see our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
