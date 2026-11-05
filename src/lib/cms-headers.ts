// Headers for server-side calls to the CMS API.
// CMS_API_KEY (server env, NOT NEXT_PUBLIC) matches the key on the CMS, which lets the
// website skip the CMS rate limit / firewall rules. It is never sent from the browser.
export function cmsHeaders(): Record<string, string> {
  const headers: Record<string, string> = { Accept: "application/json" };
  const key = process.env.CMS_API_KEY;
  if (key) headers["X-Frontend-Key"] = key;
  return headers;
}
