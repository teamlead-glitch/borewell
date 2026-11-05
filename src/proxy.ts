import { NextRequest, NextResponse } from "next/server";
import { isLegacySlugPath, resolveLegacyRedirect } from "@/constants/legacy-redirects";

/* ---------- 410 GONE FOR OLD SPAM / JUNK URLS ---------- */
const GONE_PATTERNS: RegExp[] = [
  // e.g. /^\/(static\/uploads\/v|media\/mp4)\/.*/i,
];

const gone = () =>
  new NextResponse("410 Gone - this page has been permanently removed.", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex", "Cache-Control": "public, max-age=86400" },
  });

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (GONE_PATTERNS.some((p) => p.test(pathname))) return gone();
  if (/\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next(); // files pass through

  // CMS preview link (?token=...) -> /api/preview (draft mode), then back to the clean URL
  const previewToken = request.nextUrl.searchParams.get("token");
  if (previewToken) {
    const rest = new URLSearchParams(request.nextUrl.searchParams);
    rest.delete("token");
    const query = rest.toString();
    const url = request.nextUrl.clone();
    url.pathname = "/api/preview";
    url.search = "";
    url.searchParams.set("token", previewToken);
    url.searchParams.set("path", `${pathname.toLowerCase()}${query ? `?${query}` : ""}`);
    return NextResponse.redirect(url, 307);
  }

  const lowerPath = pathname.toLowerCase();

  // Old URLs (and old URLs with capitals) go to the final page in ONE 301
  const legacy = resolveLegacyRedirect(lowerPath);
  if (legacy && (pathname !== lowerPath || isLegacySlugPath(lowerPath))) {
    const url = request.nextUrl.clone();
    url.pathname = legacy;
    return NextResponse.redirect(url, 301);
  }

  if (pathname === lowerPath) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = legacy ?? lowerPath;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
