/**
 * Hirophone's real catalog has no per-SKU photography (their site only shows
 * generic promo banners). Rather than fake product photos, every card gets a
 * consistent vector phone rendered in the product's accent — same silhouette
 * everywhere, so the grid reads as one system instead of stock photography.
 */
export function PhoneGlyph({
  accent,
  uid,
  className,
}: {
  accent: string;
  /** Disambiguates the gradient id when several glyphs share an accent on one page. */
  uid?: string;
  className?: string;
}) {
  const gradId = `pg-${(uid ?? accent).replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg viewBox="0 0 160 220" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="160" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor={accent} stopOpacity="0.92" />
          <stop offset="1" stopColor={accent} stopOpacity="0.62" />
        </linearGradient>
      </defs>
      <rect x="26" y="6" width="108" height="208" rx="26" fill="white" stroke="#E7E1D9" strokeWidth="2" />
      <rect x="34" y="16" width="92" height="188" rx="19" fill={`url(#${gradId})`} />
      <rect x="60" y="24" width="40" height="6" rx="3" fill="white" fillOpacity="0.85" />
      <circle cx="80" cy="192" r="5.5" fill="white" fillOpacity="0.85" />
      <rect x="46" y="46" width="68" height="118" rx="8" fill="white" fillOpacity="0.14" />
      <circle cx="112" cy="40" r="4" fill="white" fillOpacity="0.85" />
    </svg>
  );
}
