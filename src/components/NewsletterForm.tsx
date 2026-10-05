"use client";

import { MagneticButton } from "@/components/MagneticButton";
import { useToast } from "@/components/Toast";

/** Footer signup. Not wired to a provider yet - same behaviour as the HTML. */
export function NewsletterForm() {
  const toast = useToast();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.currentTarget.reset();
        toast("Subscribed. One email a week.");
      }}
    >
      <input className="input" type="email" placeholder="you@email.com" aria-label="Email" required />
      <MagneticButton type="submit" className="btn btn-primary">
        Subscribe
      </MagneticButton>
    </form>
  );
}
