/* ---------- ONE SITE ADDRESS FOR SEO URLS ---------- */
// From the environment, never from the request (headers() would make every page dynamic).
const PRODUCTION_URL = "https://borewell.in";
const CONFIGURED = (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/+$/, "");

export async function getSiteUrl(): Promise<string> {
  if (CONFIGURED) return CONFIGURED;
  if (process.env.VERCEL_ENV === "production") return PRODUCTION_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return PRODUCTION_URL;
}

// Keeps only the PATH of a CMS-stored canonical and always uses this site's host
export function buildSiteUrl(siteUrl: string, stored: string | null | undefined, fallbackPath: string): string {
  let path = fallbackPath || "/";
  if (stored) {
    try {
      const url = new URL(stored, siteUrl);
      path = url.pathname + url.search;
    } catch {
      // keep the fallback path
    }
  }
  if (!path.startsWith("/")) path = `/${path}`;
  if (path !== "/") path = path.replace(/\/+$/, "");
  return `${siteUrl}${path}`;
}
