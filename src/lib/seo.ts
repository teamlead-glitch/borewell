import type { Metadata } from "next";
import { SeoDetails } from "@/types/common";
import { SEO_CONFIG } from "@/constants/config";
import { PAGE_SLUGS } from "@/constants/pageSlugs";
import { fetchPageBySlug } from "./page-api";
import { getSiteUrl, buildSiteUrl } from "./site-url";

export async function getDefaultShareImage(): Promise<string> {
  return `${await getSiteUrl()}${SEO_CONFIG.DEFAULT_SHARE_IMAGE}`;
}

export function seoToMetadata(seo: SeoDetails, canonical: string, image: string): Metadata {
  return {
    // absolute: the CMS title is the full title, the layout template must not add to it
    title: { absolute: seo.meta_title },
    description: seo.meta_description,
    keywords: seo.meta_keywords ?? undefined,
    alternates: { canonical },
    robots: { index: seo.is_indexed === 1, follow: seo.is_followed === 1 },
    openGraph: {
      title: seo.og_title ?? seo.meta_title,
      description: seo.og_description ?? seo.meta_description,
      images: [seo.og_image_url || image],
      url: canonical,
      type: "website",
      siteName: SEO_CONFIG.SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitter_title ?? seo.meta_title,
      description: seo.twitter_description ?? seo.meta_description,
      images: [seo.twitter_image_url || seo.og_image_url || image],
    },
  };
}

export async function generateSeoMetadata(
  slug: string,
  token?: string,
  // For fixed pages that have no SEO record in the CMS
  fallback?: { title: string; description: string; path?: string }
): Promise<Metadata> {
  const page = await fetchPageBySlug(slug, token);
  const seo = page?.seo_detail;
  const siteUrl = await getSiteUrl();
  const path = fallback?.path ?? (slug === PAGE_SLUGS.HOME ? "/" : `/${slug}`);
  const canonical = buildSiteUrl(siteUrl, seo?.canonical_url, path);
  const image = await getDefaultShareImage();

  if (!seo) {
    const title = fallback?.title ?? SEO_CONFIG.DEFAULT_TITLE;
    const description = fallback?.description ?? SEO_CONFIG.DEFAULT_DESCRIPTION;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical },
      openGraph: { title, description, url: canonical, type: "website", siteName: SEO_CONFIG.SITE_NAME, images: [image] },
      twitter: { card: "summary_large_image", title, description, images: [image] },
    };
  }
  return seoToMetadata(seo, canonical, image);
}
