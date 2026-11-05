import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/* ---------- SITEMAP ---------- */
// The API has no /sitemap yet (5 Nov 2026), so the fixed pages are listed here.
// When the CMS builds one (with content pages and is_in_sitemap), switch to the skill's
// sitemap.xml/route.ts proxy: host rewrite, last good copy, 503 when nothing is available.
// Thank-you pages are noindex and never listed.
const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/enquiry", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/register", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await getSiteUrl();
  return PAGES.map(({ path, priority }) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
