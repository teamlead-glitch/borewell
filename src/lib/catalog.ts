import { cmsGet } from "@/lib/cms-fetch";
import { cmsUrl, serverGet } from "@/lib/server-api";
import { toServices } from "@/utils/services";
import type { CmsJson } from "@/types/common";
import type { ApiService, Service } from "@/types/service";
import type { District } from "@/types/location";

/* ---------- SERVICES + DISTRICTS (masters from the API) ---------- */

/** For pages where services are the main content (/services): a CMS outage throws
 *  CmsUnavailableError -> error.tsx (5xx), never an empty page that Google would index. */
export async function getServicesOrThrow(): Promise<Service[]> {
  const { json } = await cmsGet(cmsUrl("/services"));
  return toServices((json as CmsJson<ApiService[]> | null)?.data ?? []);
}

/** For pages where services are one block among others: null when the CMS is down,
 *  so the block can be hidden (or fetched in the browser by client components). */
export async function getServices(): Promise<Service[] | null> {
  const json = await serverGet<CmsJson<ApiService[]>>("/services");
  return json?.data ? toServices(json.data) : null;
}

export async function getDistricts(): Promise<District[] | null> {
  const json = await serverGet<CmsJson<District[]>>("/districts");
  return json?.data ?? null;
}
