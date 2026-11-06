import type { ApiService, Service } from "@/types/service";
import { NO_IMAGE } from "@/constants/config";

/** API record -> what the cards need. Pure, so server pages and client forms share it. */
export function toServices(items: ApiService[]): Service[] {
  return items.map((s) => ({
    id: s.id,
    name: s.name,
    short: s.short_description?.trim() || "",
    // Admin descriptions may hold bullet lines after a blank line; cards show the first paragraph
    description: (s.description || s.short_description || "").split(/\n\s*\n/)[0].trim(),
    image: s.image_url || NO_IMAGE,
    providerSelectable: !s.is_verified_only,
  }));
}

/** Home "bento": the first service (admin sort order) is the big card; the rest follow */
export function splitFeatured(services: Service[]) {
  const [featured, ...regular] = services;
  return { featured, regular };
}

/** Services a provider can offer on registration: team-only ones are left out */
export const providerServices = (services: Service[] | null) => services?.filter((s) => s.providerSelectable) ?? null;

export const enquiryHref = (serviceId?: number) => (serviceId ? `/enquiry?service=${serviceId}` : "/enquiry");
