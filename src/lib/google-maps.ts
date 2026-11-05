import { MAPS_CONFIG } from "@/constants/config";

/*
  Loads the Google Maps JavaScript API once per page, only when a map is shown.
  Rejects when the script can't load or Google refuses the key (gm_authFailure), so the
  caller can fall back to the placeholder map.
*/

declare global {
  interface Window {
    __bwMapsReady?: () => void;
    gm_authFailure?: () => void;
  }
}

let loading: Promise<void> | null = null;
let authFailed = false;
const authListeners = new Set<() => void>();

/** Called when Google rejects the key, even after the script has loaded */
export function onMapsAuthFailure(listener: () => void) {
  if (authFailed) listener();
  authListeners.add(listener);
  return () => authListeners.delete(listener);
}

export function loadGoogleMaps(): Promise<void> {
  if (!MAPS_CONFIG.API_KEY) return Promise.reject(new Error("No Google Maps key"));
  if (authFailed) return Promise.reject(new Error("Google Maps key refused"));
  // `google` only exists once the script has loaded (the types assume it always does)
  if (typeof window !== "undefined" && typeof (window as { google?: { maps?: { importLibrary?: unknown } } }).google?.maps?.importLibrary === "function") {
    return Promise.resolve();
  }
  if (loading) return loading;

  loading = new Promise<void>((resolve, reject) => {
    window.gm_authFailure = () => {
      authFailed = true;
      authListeners.forEach((l) => l());
      reject(new Error("Google Maps key refused"));
    };
    window.__bwMapsReady = () => resolve();

    const params = new URLSearchParams({ key: MAPS_CONFIG.API_KEY, v: "weekly", loading: "async", callback: "__bwMapsReady", region: "IN" });
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
    script.async = true;
    script.onerror = () => {
      loading = null; // allow a retry on the next map
      reject(new Error("Google Maps script failed to load"));
    };
    document.head.appendChild(script);
  });
  return loading;
}
