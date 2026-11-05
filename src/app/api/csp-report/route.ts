import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const MAX_BODY = 10_000;

type CspReport = Record<string, string | undefined>;

// CSP violation reports -> runtime logs with the prefix "[csp]"
export async function POST(req: Request) {
  try {
    const data = JSON.parse((await req.text()).slice(0, MAX_BODY)) as unknown;
    const reports: CspReport[] = Array.isArray(data)
      ? data.map((r: { body?: CspReport }) => r?.body ?? (r as CspReport))
      : [((data as { "csp-report"?: CspReport })?.["csp-report"] ?? data) as CspReport];
    for (const r of reports) {
      console.warn(
        "[csp]",
        JSON.stringify({
          page: r?.documentURL ?? r?.["document-uri"],
          directive: r?.effectiveDirective ?? r?.["effective-directive"] ?? r?.["violated-directive"],
          blocked: r?.blockedURL ?? r?.["blocked-uri"],
        })
      );
    }
  } catch {
    // ignore malformed reports
  }
  return new NextResponse(null, { status: 204 });
}
