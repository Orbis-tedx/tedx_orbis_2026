/**
 * Hand-drawn line-weight social glyphs. Deliberately not an icon pack:
 * every path is 1px stroke to match the site's rules and underlines.
 */
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function InstagramGlyph({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="5" y="5" width="22" height="22" rx="7" />
      <circle cx="16" cy="16" r="6" />
      <circle cx="22.8" cy="9.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInGlyph({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="5" y="5" width="22" height="22" rx="4" />
      <path d="M10.5 14v8" />
      <circle cx="10.5" cy="10.7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M15.4 22v-8M15.4 17.1c0-1.9 1.2-3.1 3-3.1s3 1.2 3 3.4V22" />
    </svg>
  );
}

export function FacebookGlyph({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="11" />
      <path d="M18.8 11.6h-1.6c-1.2 0-2 .8-2 2v10.6M13.4 16.6h4.6" />
    </svg>
  );
}

export function XGlyph({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="5" y="5" width="22" height="22" rx="4" />
      <path d="M11 11l10 10M21 11L11 21" />
    </svg>
  );
}
