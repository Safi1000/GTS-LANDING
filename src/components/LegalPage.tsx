import Link from "next/link";
import type { ReactNode } from "react";

/** Shared frame for the legal pages: page header, last-updated line, readable prose. */
export const LEGAL_UPDATED = "5 October 2026";

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <>
      <header className="wrap phero">
        <div className="eyebrow">Legal</div>
        <h1 className="d-lg" style={{ marginTop: 18 }}>{title}</h1>
        <p className="lede" style={{ marginInline: "auto" }}>{intro}</p>
        <p className="small mono" style={{ marginTop: 18, color: "var(--faint)" }}>Last updated {LEGAL_UPDATED}</p>
      </header>
      <section className="wrap band-t">
        <article className="legal">
          {children}
          <p className="legal-also">
            Also see: <Link href="/terms">Terms of Service</Link> · <Link href="/privacy">Privacy Policy</Link> ·{" "}
            <Link href="/refund-policy">Refund Policy</Link> · <Link href="/risk-disclosure">Risk Disclosure</Link>
          </p>
        </article>
      </section>
    </>
  );
}
