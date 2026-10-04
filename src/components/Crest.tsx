import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * The GTS crest. Source: /public/crest.png — currently 45×53, opaque RGB
 * (no alpha), pending a hi-res transparent re-export from the client.
 * Display size comes from `w`/`h` (and any class sizing), exactly as in the HTML.
 */
export function Crest({
  w,
  h,
  alt = "",
  className,
  style,
  priority,
}: {
  w: number;
  h: number;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  return (
    <Image
      src="/crest.png"
      width={w}
      height={h}
      alt={alt}
      className={className}
      style={{ width: w, height: h, ...style }}
      priority={priority}
    />
  );
}
