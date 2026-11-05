export type DetailsResult<T> = { data: T | null; redirectTo: string | null };

// Reads the new slug from a "not found" answer: { redirect: { to } }.
// `prefix` is removed when the api slug carries the route path (e.g. "blogs/").
export function getRedirectSlug(json: unknown, slug: string, prefix = ""): string | null {
  const body = json as { redirect?: { to?: string } } | null;
  let to = String(body?.redirect?.to ?? "").replace(/^\/+/, "");
  if (prefix && to.startsWith(prefix)) to = to.slice(prefix.length);
  return to && to !== slug ? to : null;
}
