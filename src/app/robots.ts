import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

// Staging (*.vercel.app) is kept out of Google by the X-Robots-Tag header in next.config.ts
export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = await getSiteUrl();
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/enquiry/thank-you", "/register/thank-you"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
