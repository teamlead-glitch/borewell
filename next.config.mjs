// Plain JavaScript (not next.config.ts) on purpose: hosts without Next's native compiler
// (e.g. older Linux, GLIBC < 2.29) can't compile a TypeScript config. Types via JSDoc.
import { LEGACY_REDIRECTS } from "./src/constants/legacy-redirects-data.mjs";

const isDev = process.env.NODE_ENV !== "production";

// Origin of the CMS api (browser calls: forms, taluk / panchayat lists, fallbacks)
const API_ORIGIN = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URI || "http://borewell-admin-and-api.test/api").origin;
  } catch {
    return "";
  }
})();

// Content-Security-Policy: one entry per directive, every third party listed with a reason.
// Sent as REPORT-ONLY for now: read the "[csp]" logs on Vercel, then rename the header
// below to Content-Security-Policy to enforce it.
const CSP = [
  "default-src 'self'",
  // Next.js inline bootstrap + GTM; React dev tools need eval in development only.
  // Google Maps (enquiry / registration pin): script + its library chunks
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://*.googletagmanager.com https://*.google-analytics.com https://*.googleapis.com https://*.gstatic.com https://*.google.com`,
  // CMS api (forms, location lists) + analytics beacons + Google Maps data
  `connect-src 'self' ${API_ORIGIN} https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.googleapis.com https://*.google.com https://*.gstatic.com data: blob:`,
  // Service photos are served by the CMS; local Laragon serves them over http. Map tiles are https
  `img-src 'self' data: blob: https:${isDev ? " http:" : ""}`,
  // Google Maps adds inline styles and the Roboto stylesheet
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  // Google Maps renders vector maps in a worker
  "worker-src 'self' blob:",
  // GTM preview + the Contact page Google Maps embed (admin > Settings > Google Maps Link)
  "frame-src 'self' https://www.googletagmanager.com https://www.google.com https://maps.google.com https://www.google.co.in",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "report-uri /api/csp-report",
].join("; ");

const NOINDEX = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

/** @type {import("next").NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Previous caching model on purpose: CMS data is cached with unstable_cache + ISR (see
  // src/lib/cms-fetch.ts), so Cache Components (cacheComponents) stays off.
  // Tailwind runs through PostCSS (postcss.config.mjs) for both Turbopack and Webpack.
  async redirects() {
    return [
      // TODO when the Vercel project exists: production alias -> real domain (API calls left alone)
      // { source: "/:path((?!api/).*)", has: [{ type: "host", value: "{project}\\.vercel\\.app" }], destination: "https://borewell.in/:path", statusCode: 301 },
      ...LEGACY_REDIRECTS,
    ];
  },
  async headers() {
    return [
      // Staging out of search results (the live domain never matches)
      { source: "/:path*", has: [{ type: "host", value: ".*\\.vercel\\.app" }], headers: NOINDEX },
      // Utility pages never indexed
      ...["/enquiry/thank-you", "/register/thank-you"].map((source) => ({ source, headers: NOINDEX })),
      // Static photos: a day in the browser, a week at the edge (rename a file when replacing it)
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // geolocation=(self): "Use my location" on the enquiry / register map
          { key: "Permissions-Policy", value: "camera=(), microphone=(), usb=(), browsing-topics=(), geolocation=(self)" },
          { key: "Content-Security-Policy-Report-Only", value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
