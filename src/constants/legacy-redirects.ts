/* ---------- OLD SITE URL REDIRECTS (301, single hop) ---------- */
// Order matters: exact rows above the slug rules.
type LegacyRedirect = { source: string; destination: string; statusCode: 301 };

const EXACT_REDIRECTS: [string, string][] = [
  // ["/old-page", "/new-page"],
  ["/contact-us", "/contact"],
  ["/about-us", "/about"],
];

// Pattern rules: old folder -> new folder, slug kept
const SLUG_RULES: [string, string][] = [
  // ["/blog-detail/", "/blogs/"],
];

export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  ...EXACT_REDIRECTS.map(([source, destination]) => ({ source, destination, statusCode: 301 as const })),
  ...SLUG_RULES.map(([from, to]) => ({ source: `${from}:slug`, destination: `${to}:slug`, statusCode: 301 as const })),
];

export function isLegacySlugPath(path: string): boolean {
  return SLUG_RULES.some(([from]) => path.startsWith(from));
}

// Final destination for a (lowercased) old path, or null
export function resolveLegacyRedirect(path: string): string | null {
  const exact = EXACT_REDIRECTS.find(([source]) => source === path);
  if (exact) return exact[1];
  const rule = SLUG_RULES.find(([from]) => path.startsWith(from));
  return rule ? rule[1] + path.slice(rule[0].length) : null;
}
