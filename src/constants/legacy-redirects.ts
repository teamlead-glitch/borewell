/* ---------- OLD SITE URL REDIRECTS (301, single hop) ---------- */
// The redirect rows live in legacy-redirects-data.mjs (also read by next.config.mjs);
// add or change rows there. This file adds the helpers the proxy uses.
import { EXACT_REDIRECTS, LEGACY_REDIRECTS, SLUG_RULES } from "./legacy-redirects-data.mjs";

export { LEGACY_REDIRECTS };

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
