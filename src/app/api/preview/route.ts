import { NextRequest } from "next/server";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { PREVIEW_COOKIE } from "@/lib/preview-token";

export const dynamic = "force-dynamic";
const MAX_AGE_SECONDS = 60 * 60;

// Only same-site paths, never "//other.site" or a full URL
function safePath(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) return "/";
  return raw.slice(0, 500);
}

export async function GET(request: NextRequest) {
  const token = (request.nextUrl.searchParams.get("token") || "").trim();
  const path = safePath(request.nextUrl.searchParams.get("path"));
  if (token && token.length <= 500) {
    (await draftMode()).enable();
    (await cookies()).set(PREVIEW_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE_SECONDS,
    });
  }
  redirect(path);
}
