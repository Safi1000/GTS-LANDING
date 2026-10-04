"use client";

import { useEffect, useState } from "react";

/** ms until the next Thursday 20:00 UTC — same maths as the HTML. */
function untilNextSession(now: Date) {
  const t = new Date(now);
  t.setUTCHours(20, 0, 0, 0);
  const d = (4 - t.getUTCDay() + 7) % 7 || (now > t ? 7 : 0);
  t.setUTCDate(t.getUTCDate() + d);
  let ms = t.getTime() - now.getTime();
  if (ms < 0) ms += 6048e5;
  return ms;
}

const fmt = (ms: number) =>
  `${Math.floor(ms / 864e5)}d ${String(Math.floor(ms / 36e5) % 24).padStart(2, "0")}h ${String(
    Math.floor(ms / 6e4) % 60,
  ).padStart(2, "0")}m`;

/**
 * Countdown to the weekly live session. Time-dependent, so the server (and
 * first client render) emit the placeholder from the HTML, and the real
 * value is computed after mount. No hydration mismatch, nothing suppressed.
 */
export function Countdown() {
  const [text, setText] = useState("--d --h --m");
  useEffect(() => {
    const tick = () => setText(fmt(untilNextSession(new Date())));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="mono" style={{ fontSize: 32, marginTop: 16, letterSpacing: "-.035em" }}>
      {text}
    </div>
  );
}
