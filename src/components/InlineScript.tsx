/**
 * A <script> that runs synchronously during HTML parsing on hard loads, before
 * first paint. On the client it renders as text/plain, so it never re-runs on
 * soft navigations and React doesn't warn about script tags.
 * Pattern from Next's "Preventing flash before hydration" guide.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
