import type { ApiService, Service } from "@/types/service";

// Design photos used while a service has no image in the admin (keeps every card visual)
const FALLBACK_IMAGES = [
  "/images/irrigation.jpg",
  "/images/hero-rig.jpg",
  "/images/svc-flushing.jpg",
  "/images/svc-pump.jpg",
  "/images/svc-survey.jpg",
  "/images/svc-recharge.jpg",
];

/** API record -> what the cards need. Pure, so server pages and client forms share it. */
export function toServices(items: ApiService[]): Service[] {
  return items.map((s, i) => ({
    id: s.id,
    name: s.name,
    short: s.short_description?.trim() || "",
    // Admin descriptions may hold bullet lines after a blank line; cards show the first paragraph
    description: (s.description || s.short_description || "").split(/\n\s*\n/)[0].trim(),
    image: s.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
    verifiedOnly: Boolean(s.is_verified_only),
  }));
}

/** Home "bento": the verified-only service is the big card; the rest follow in API order */
export function splitFeatured(services: Service[]) {
  const featured = services.find((s) => s.verifiedOnly) ?? services[0];
  return { featured, regular: services.filter((s) => s !== featured) };
}

export const enquiryHref = (serviceId?: number) => (serviceId ? `/enquiry?service=${serviceId}` : "/enquiry");
