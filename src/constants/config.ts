// CMS api (server and browser). The fallback is the local Laragon API so `npm run dev`
// works out of the box; production sets NEXT_PUBLIC_API_URI in Vercel.
export const API_CONFIG = {
  BASE_URL: (process.env.NEXT_PUBLIC_API_URI || "http://borewell-admin-and-api.test/api").replace(/\/+$/, ""),
};

export const SEO_CONFIG = {
  // Site-wide OG/Twitter image used when a page has no image of its own
  DEFAULT_SHARE_IMAGE: "/images/hero-rig.jpg",
  SITE_NAME: "Borewell",
  DEFAULT_TITLE: "Borewell — Trusted borewell services across Kerala",
  DEFAULT_DESCRIPTION:
    "Send one enquiry. Our team inspects your site, compares quotes from verified borewell companies near you, and you choose who drills.",
};

// Google Tag Manager container - every tracking tag lives inside GTM.
// Empty until the client's container exists: the layout then renders no GTM at all.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
