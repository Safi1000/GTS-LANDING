/* Inline SVG icons, copied from gts-site-v2.html. */

export const ArrowIcon = () => (
  <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const CopyIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

export const CheckIcon = ({ color, weight = 2.5 }: { color: string; weight?: number }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={weight}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const DashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6E656B" strokeWidth={2}>
    <path d="M5 12h14" />
  </svg>
);

export const PlayIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="#231703">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3-5.8 7.3H2.9l7.5-8.6L2.5 2h6.6l4.5 6.7L18.9 2z" />
  </svg>
);

export const YouTubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="M10 9l5 3-5 3z" fill="currentColor" />
  </svg>
);

export const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

export const DiscordIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <circle cx="9" cy="12" r="1.2" fill="currentColor" />
    <circle cx="15" cy="12" r="1.2" fill="currentColor" />
    <path d="M7.5 6.5A14 14 0 0112 6c1.6 0 3.1.2 4.5.5 1.8 2 2.9 4.6 3 7.4-1.4 1.3-3.1 2.2-5 2.6M6.4 14.9c-.9-.4-1.7-1-2.4-1.6.1-2.8 1.2-5.4 3-7.4M6.4 14.9c1.7 1 3.6 1.6 5.6 1.6" />
  </svg>
);
