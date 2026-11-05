import { unstable_cache } from "next/cache";
import { withPreviewToken } from "@/lib/preview-token";
import { cmsHeaders } from "@/lib/cms-headers";

/* ---------- CMS API FETCH (shared cache + retry + last good copy) ---------- */
//  - Answers are kept in the shared data cache for CMS_REVALIDATE_SECONDS; after that the
//    old copy is served while a fresh one is fetched in the background.
//  - Only 404 / 410 mean "not found". Any other 4xx/5xx is the CMS failing.
//  - Failed calls are retried, capped by TOTAL_BUDGET_MS so a stuck CMS never hangs a page.
//  - Nothing to serve -> CmsUnavailableError -> the page answers 5xx (never a fake 404).
//  - POST /api/revalidate clears the cache after a CMS save.

const REVALIDATE_SECONDS = Number(process.env.CMS_REVALIDATE_SECONDS) || 300;
const RETRY_DELAYS_MS = [500, 1500];
const MAX_RETRY_AFTER_MS = 3000;
const TIMEOUT_MS = 6000;
const TOTAL_BUDGET_MS = 14000;
const MAX_ENTRIES = 500;

// Cache tags: "cms" clears everything; "cms:/services" clears one endpoint
export const CMS_TAG = "cms";
export function cmsTag(url: string): string {
  try {
    return `cms:${new URL(url).pathname.replace(/^\/api/, "")}`.slice(0, 250);
  } catch {
    return CMS_TAG;
  }
}

export class CmsUnavailableError extends Error {
  constructor(url: string, cause: unknown) {
    super(`CMS api unavailable: ${url}`);
    this.name = "CmsUnavailableError";
    this.cause = cause;
  }
}

export type CmsResult = { found: boolean; json: unknown };

// Safety net inside one server: last good answer per url + calls in flight
const store = globalThis as typeof globalThis & {
  __cmsLastGood?: Map<string, unknown>;
  __cmsInflight?: Map<string, Promise<CmsResult>>;
};
const lastGood = (store.__cmsLastGood ??= new Map());
const inflight = (store.__cmsInflight ??= new Map());

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const isNotFoundStatus = (status: number) => status === 404 || status === 410;
export const isDynamicSignal = (e: unknown) => (e as { digest?: string })?.digest === "DYNAMIC_SERVER_USAGE";

function rememberGood(url: string, json: unknown) {
  lastGood.delete(url);
  lastGood.set(url, json);
  if (lastGood.size > MAX_ENTRIES) lastGood.delete(lastGood.keys().next().value as string);
}

async function load(url: string): Promise<CmsResult> {
  let lastError: unknown;
  const deadline = Date.now() + TOTAL_BUDGET_MS;

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt++) {
    const timeLeft = deadline - Date.now();
    if (attempt > 0 && timeLeft < 1500) break;
    try {
      const res = await fetch(url, {
        cache: "no-store",
        headers: cmsHeaders(),
        signal: AbortSignal.timeout(Math.min(TIMEOUT_MS, Math.max(timeLeft, 1000))),
      });
      if (res.ok) return { found: true, json: await res.json() };
      if (isNotFoundStatus(res.status)) return { found: false, json: await res.json().catch(() => null) };
      if (res.status >= 400 && res.status < 500) {
        const body = (await res.json().catch(() => null)) as { redirect?: { to?: string } } | null;
        if (body?.redirect?.to) return { found: false, json: body }; // slug moved
      }
      lastError = `status ${res.status}`;
      if (res.status === 429 && attempt < RETRY_DELAYS_MS.length) {
        const retryAfter = Number(res.headers.get("retry-after")) * 1000;
        await sleep(Math.min(retryAfter > 0 ? retryAfter : RETRY_DELAYS_MS[attempt], MAX_RETRY_AFTER_MS));
        continue;
      }
    } catch (error) {
      if (isDynamicSignal(error)) throw error;
      lastError = error;
    }
    console.error(`CMS FETCH FAILED (attempt ${attempt + 1}) ${url}:`, lastError);
    if (attempt < RETRY_DELAYS_MS.length && deadline - Date.now() > RETRY_DELAYS_MS[attempt] + 1500) {
      await sleep(RETRY_DELAYS_MS[attempt]);
    }
  }
  throw new CmsUnavailableError(url, lastError);
}

function loadCached(url: string): Promise<CmsResult> {
  return unstable_cache(() => load(url), ["cms-get", url], {
    revalidate: REVALIDATE_SECONDS,
    tags: [CMS_TAG, cmsTag(url)],
  })();
}

// Bot probes on catch-all routes (/meta.json, /sw.js, /x/null) never reach the CMS
function isJunkSlug(url: string): boolean {
  try {
    const last = decodeURIComponent(new URL(url).pathname.split("/").pop() ?? "");
    return last.includes(".") || last === "null" || last === "undefined";
  } catch {
    return false;
  }
}

export async function cmsGet(url: string, token?: string): Promise<CmsResult> {
  if (isJunkSlug(url)) return { found: false, json: null };
  if (token) return load(withPreviewToken(url, token)); // preview: never cached

  let pending = inflight.get(url);
  if (!pending) {
    pending = (async () => {
      try {
        const result = await loadCached(url);
        if (result.found) rememberGood(url, result.json);
        return result;
      } catch (error) {
        if (isDynamicSignal(error)) throw error;
        const saved = lastGood.get(url);
        if (saved !== undefined) return { found: true, json: saved };
        throw error instanceof CmsUnavailableError ? error : new CmsUnavailableError(url, error);
      }
    })().finally(() => inflight.delete(url));
    inflight.set(url, pending);
  }
  return pending;
}
