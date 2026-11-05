import { API_CONFIG } from "@/constants/config";
import { cmsGet, isDynamicSignal } from "@/lib/cms-fetch";

type Params = Record<string, string | number | undefined | null>;

export function cmsUrl(path: string, params?: Params): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") query.set(key, String(val));
  });
  const qs = query.toString();
  return `${API_CONFIG.BASE_URL}${path}${qs ? `?${qs}` : ""}`;
}

/** Server-side GET for CMS lists/blocks. Same cache/retry as pages; null when nothing can be
 *  served, so the component can hide the block or fall back to fetching in the browser. */
export async function serverGet<T = unknown>(path: string, params?: Params): Promise<T | null> {
  try {
    const { found, json } = await cmsGet(cmsUrl(path, params));
    return found ? (json as T) : null;
  } catch (error) {
    if (isDynamicSignal(error)) throw error;
    console.error(`SERVER LIST FETCH ${path} ERROR:`, error);
    return null;
  }
}
