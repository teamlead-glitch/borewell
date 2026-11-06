import { PageContent } from "@/types/common";
import { cmsGet } from "@/lib/cms-fetch";
import { cmsUrl } from "@/lib/server-api";
import { getRedirectSlug } from "@/lib/slug-redirect";

export type PageResult = { page: PageContent | null; redirectTo: string | null };

// GET /page/{slug}: an active admin page (Website pages / Content pages) with its SEO.
// 404 when the slug is unknown or the page is off, with { redirect: { to } } when it moved.
// Accepts the usual Laravel { status, data } and the older { page_content } shape.
export async function fetchPageResult(slug: string, token?: string): Promise<PageResult> {
  const { found, json } = await cmsGet(cmsUrl(`/page/${encodeURIComponent(slug)}`), token);
  if (!found) return { page: null, redirectTo: getRedirectSlug(json, slug) };
  const body = json as { data?: PageContent; page_content?: PageContent } | null;
  return { page: body?.data ?? body?.page_content ?? null, redirectTo: null };
}

// Never throws: fixed pages still render without the CMS content
export async function fetchPageBySlug(slug: string, token?: string): Promise<PageContent | null> {
  try {
    return (await fetchPageResult(slug, token)).page;
  } catch (error) {
    console.error("SERVER FETCH ERROR:", error);
    return null;
  }
}
