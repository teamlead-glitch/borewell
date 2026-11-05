import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { CMS_TAG } from "@/lib/cms-fetch";

/* ---------- CLEAR THE CMS CACHE AFTER A SAVE ---------- */
//   POST /api/revalidate   Header: x-revalidate-secret: <REVALIDATE_SECRET>
//   Body (optional): { "tag": "cms:/services" } -> one endpoint; {} -> everything
// The admin should call this after saving services, settings, pages or SEO.
export async function POST(request: NextRequest) {
  const secret = (process.env.REVALIDATE_SECRET ?? "").trim();
  const given = (request.headers.get("x-revalidate-secret") || "").trim();
  if (!secret || given !== secret) {
    // Lengths only, never the values
    console.warn(`[revalidate] rejected: secret ${secret ? `set (${secret.length})` : "NOT SET"}, given ${given.length}`);
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let tag = CMS_TAG;
  try {
    const body = await request.json();
    if (typeof body?.tag === "string" && body.tag.startsWith("cms")) tag = body.tag.slice(0, 250);
  } catch {
    // no body -> clear everything
  }

  // Called from outside a Server Action (a webhook), so expire at once
  revalidateTag(tag, { expire: 0 });
  revalidatePath("/", "layout"); // rebuild cached pages on their next visit
  return NextResponse.json({ ok: true, revalidated: tag, at: new Date().toISOString() });
}
