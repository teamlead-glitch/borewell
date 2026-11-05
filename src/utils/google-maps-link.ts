/*
  The admin's "Google Maps Link" setting (map_url) may hold any of:
  - an embed link:  https://www.google.com/maps/embed?pb=...  or  https://www.google.com/maps?q=...&output=embed
  - the whole <iframe ...> code from Google Maps "Share > Embed a map"
  - a normal link:  https://www.google.com/maps/search/?api=1&query=...  or  https://www.google.com/maps?q=...
  - a short share link: https://maps.app.goo.gl/...  (can't be embedded)
  From it we derive the iframe source for the Contact page map and a normal link for the
  "Get directions" / "Open in Google Maps" buttons. Only Google Maps is ever embedded.
*/

const MAPS_HOSTS = new Set(["www.google.com", "google.com", "maps.google.com", "www.google.co.in", "google.co.in"]);

/** The link itself, or the src="" of pasted <iframe> code */
function extractUrl(raw: string): URL | null {
  const src = /<iframe[^>]*\ssrc=["']([^"']+)["']/i.exec(raw)?.[1] ?? raw;
  try {
    const url = new URL(src.trim().replace(/&amp;/g, "&"));
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

const isGoogleMaps = (url: URL) => MAPS_HOSTS.has(url.hostname) && (url.pathname === "/maps" || url.pathname.startsWith("/maps/"));

/** The place a normal Google Maps link points at (?q= or ?query=), if any */
const placeOf = (url: URL) => url.searchParams.get("q") || url.searchParams.get("query");

/** iframe src for the Contact page map, or null (the map art is shown instead) */
export function toMapEmbedUrl(raw: string | null): string | null {
  const url = raw ? extractUrl(raw) : null;
  if (!url || !isGoogleMaps(url)) return null;
  if (url.pathname.startsWith("/maps/embed") || url.searchParams.get("output") === "embed") return url.toString();
  const place = placeOf(url);
  return place ? `https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed` : null;
}

/** Link for "Get directions" / "Open in Google Maps": a normal Maps page, never the bare embed */
export function toMapLink(raw: string | null, address: string | null): string | null {
  const url = raw ? extractUrl(raw) : null;
  if (!url) return null;
  if (!isGoogleMaps(url)) return url.toString(); // e.g. a maps.app.goo.gl share link
  if (url.pathname.startsWith("/maps/embed") || url.searchParams.get("output") === "embed") {
    // Embed links can't be opened as a page: search the place (or the office address) instead
    const place = placeOf(url) || address;
    return place ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}` : null;
  }
  return url.toString();
}
