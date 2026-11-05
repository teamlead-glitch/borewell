// Kept apart from preview.ts so code that cannot import next/headers (cms-fetch, routes)
// can still use the cookie name and the URL helper.
export const PREVIEW_COOKIE = "bw_preview_token";

export function withPreviewToken(url: string, token?: string): string {
  if (!token) return url;
  return `${url}${url.includes("?") ? "&" : "?"}token=${encodeURIComponent(token)}`;
}
