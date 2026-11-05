/* ---------- OLD SITE URL REDIRECTS (301, single hop) ---------- */
// Plain JavaScript so next.config.mjs can read it without a TypeScript build step (some
// hosts can't compile TypeScript config files). legacy-redirects.ts adds the helpers.
// Order matters: exact rows above the slug rules.

/** @type {[string, string][]} old path -> new path */
export const EXACT_REDIRECTS = [
  // ["/old-page", "/new-page"],
  ["/contact-us", "/contact"],
  ["/about-us", "/about"],
];

/** @type {[string, string][]} Pattern rules: old folder -> new folder, slug kept */
export const SLUG_RULES = [
  // ["/blog-detail/", "/blogs/"],
];

/** @type {{ source: string; destination: string; statusCode: 301 }[]} */
export const LEGACY_REDIRECTS = [
  ...EXACT_REDIRECTS.map(([source, destination]) => ({ source, destination, statusCode: /** @type {301} */ (301) })),
  ...SLUG_RULES.map(([from, to]) => ({ source: `${from}:slug`, destination: `${to}:slug`, statusCode: /** @type {301} */ (301) })),
];
