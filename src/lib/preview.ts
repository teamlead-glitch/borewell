import { cookies, draftMode } from "next/headers";
import { PREVIEW_COOKIE } from "./preview-token";

export { PREVIEW_COOKIE, withPreviewToken } from "./preview-token";

/* ---------- CMS PREVIEW (?token=...) ---------- */
// proxy.ts sends /any-page?token=... to /api/preview, which turns on draft mode, keeps the
// token in a short-lived cookie and returns to the clean URL. The token is read ONLY in
// draft mode, so normal visits never touch cookies and stay in the page cache.
export async function getPreviewToken(): Promise<string | undefined> {
  const draft = await draftMode();
  if (!draft.isEnabled) return undefined;
  return (await cookies()).get(PREVIEW_COOKIE)?.value || undefined;
}
