import { CONTACT_DEFAULTS } from "@/constants/site";
import { serverGet } from "@/lib/server-api";
import type { CmsJson } from "@/types/common";
import type { ApiSettings, SiteContact } from "@/types/settings";

/** CMS settings, loaded once in the layout. Each empty value falls back to CONTACT_DEFAULTS,
 *  so the header/footer never show blanks while the admin Settings are being filled in. */
export async function getSiteContact(): Promise<SiteContact> {
  const json = await serverGet<CmsJson<ApiSettings>>("/settings");
  return toSiteContact(json?.data ?? null);
}

export function toSiteContact(s: ApiSettings | null): SiteContact {
  const d = CONTACT_DEFAULTS;
  if (!s) return d;
  const hours = [
    { day: "Mon – Fri", time: s.hours_weekdays },
    { day: "Saturday", time: s.hours_saturday },
    { day: "Sunday", time: s.hours_sunday },
  ];
  const hasHours = hours.some((h) => h.time);
  return {
    name: s.company_name || d.name,
    phone: s.phone || d.phone,
    phoneHref: s.phone_link || d.phoneHref,
    phoneHours: s.phone_hours || d.phoneHours,
    whatsapp: s.whatsapp || d.whatsapp,
    whatsappHref: s.whatsapp_link || d.whatsappHref,
    email: s.email || d.email,
    address: s.address || d.address,
    location: s.location || d.location,
    mapUrl: s.map_url || d.mapUrl,
    hours: hasHours ? hours.map((h) => ({ day: h.day, time: h.time || "Closed" })) : d.hours,
  };
}
