import { SEO_CONFIG } from "@/constants/config";
import { serverGet } from "@/lib/server-api";
import type { CmsJson } from "@/types/common";
import type { ApiSettings, SiteContact } from "@/types/settings";

/** CMS settings (admin > Settings), loaded once in the layout. Only admin values are shown:
 *  an empty setting is null - never a made-up default. Labels and titles always stay; only
 *  the empty value (and a button that needs it) is left out. */
export async function getSiteContact(): Promise<SiteContact> {
  const json = await serverGet<CmsJson<ApiSettings>>("/settings");
  return toSiteContact(json?.data ?? null);
}

const clean = (v: string | null | undefined) => v?.trim() || null;

export function toSiteContact(s: ApiSettings | null): SiteContact {
  const hours = [
    { day: "Mon – Fri", time: clean(s?.hours_weekdays) },
    { day: "Saturday", time: clean(s?.hours_saturday) },
    { day: "Sunday", time: clean(s?.hours_sunday) },
  ];
  const phone = clean(s?.phone);
  const whatsapp = clean(s?.whatsapp);
  return {
    // The brand name, not contact data: keeps "© Borewell" and aria labels readable
    name: clean(s?.company_name) || SEO_CONFIG.SITE_NAME,
    phone,
    phoneHref: phone ? clean(s?.phone_link) : null,
    phoneHours: clean(s?.phone_hours),
    whatsapp,
    whatsappHref: whatsapp ? clean(s?.whatsapp_link) : null,
    email: clean(s?.email),
    address: clean(s?.address),
    location: clean(s?.location),
    mapUrl: clean(s?.map_url),
    hours,
  };
}
