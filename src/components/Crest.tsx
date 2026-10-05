import Image from "next/image";
import type { CSSProperties } from "react";

/** The GTS logo file (1024×1024, square, maroon background baked in). */
export const LOGO_SRC = "/gts-logo/GTS_Logo_2.webp";

/**
 * The static GTS logo (nav, footer, preloader, page headers, 404, CTA band).
 * The animated hero logo is separate (components/gts-logo). Square, so one
 * `size` sets both sides; next/image serves a small optimised copy per size.
 */
export function Crest({
  size,
  alt = "",
  className,
  style,
  eager,
}: {
  size: number;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  /** above-the-fold use (nav, page headers, preloader) */
  eager?: boolean;
}) {
  return (
    <Image
      src={LOGO_SRC}
      width={size}
      height={size}
      alt={alt}
      className={className}
      style={{ width: size, height: size, ...style }}
      loading={eager ? "eager" : undefined}
    />
  );
}
