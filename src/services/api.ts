import { API_CONFIG } from "@/constants/config";
import type { ApiResponse, CmsJson } from "@/types/common";

type Params = Record<string, string | number | undefined | null>;

const NETWORK_ERROR = "Our server couldn't be reached. Check your connection and try again.";

function buildUrl(path: string, params?: Params) {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") query.set(k, String(v));
  });
  const qs = query.toString();
  return `${API_CONFIG.BASE_URL}${path}${qs ? `?${qs}` : ""}`;
}

// Laravel answers { status, message, data, errors }; unwrap `data` for the caller
async function handle<T>(res: Response): Promise<ApiResponse<T>> {
  const body = (await res.json().catch(() => null)) as CmsJson<T> | null;
  if (!res.ok || body?.status === false) {
    const firstError = Object.values(body?.errors ?? {}).flat()[0];
    return {
      success: false,
      error: body?.message || firstError || (res.status === 429 ? "Too many attempts from this connection. Wait a minute, then try again." : "Something went wrong on our side. Try again in a minute."),
      errors: body?.errors,
    };
  }
  return { success: true, data: body?.data as T };
}

/** Browser calls to the CMS api -> { success, data, error }. Never throws. */
export const api = {
  get: async <T>(path: string, params?: Params): Promise<ApiResponse<T>> => {
    try {
      return await handle<T>(await fetch(buildUrl(path, params), { headers: { Accept: "application/json" } }));
    } catch {
      return { success: false, error: NETWORK_ERROR };
    }
  },

  post: async <T>(path: string, body: unknown): Promise<ApiResponse<T>> => {
    try {
      const res = await fetch(buildUrl(path), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });
      return await handle<T>(res);
    } catch {
      return { success: false, error: NETWORK_ERROR };
    }
  },
};
