# Deployment (Vercel)

## How changes go live
Pull request into `main` -> Vercel builds a preview -> check it on desktop and phone -> the owner
merges -> production deploys from `main`. Roll back with Vercel "Instant Rollback" to the previous
production deployment (never promote a branch build).

## Build command
`npm run build` runs `next build --webpack` on purpose. Some hosts (e.g. the Hostinger staging
server, GLIBC < 2.29) can't load Next's native compiler; Turbopack needs it, Webpack does not.
For the same reason the config is `next.config.mjs` (plain JS) and Tailwind runs through
`postcss.config.mjs`. `npm run build:turbopack` is the faster build for machines that support it;
`next dev` still uses Turbopack.

## Environment variables (Vercel: Production + Preview)

| Name | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URI` | all | Laravel API base, e.g. `https://admin.borewell.in/api` |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://borewell.in` - canonical, sitemap, robots |
| `NEXT_PUBLIC_GTM_ID` | all | GTM container; leave empty until it exists (no GTM is rendered) |
| `CMS_API_KEY` | server only | Sent as `X-Frontend-Key`; must equal the API's key |
| `CMS_REVALIDATE_SECONDS` | optional | API cache time, default 300 |
| `REVALIDATE_SECRET` | server only | Shared secret for `POST /api/revalidate` |

## After an admin save
The admin should call:

```
POST https://borewell.in/api/revalidate
x-revalidate-secret: <REVALIDATE_SECRET>
{ "tag": "cms:/services" }      // or {} to clear everything
```

Without it, changes appear within `CMS_REVALIDATE_SECONDS` (5 minutes).

## Before launch
- Replace the placeholder map picker (`src/components/forms/MapPicker.tsx`) with Google Maps:
  the API measures road distance to providers from the pinned coordinates.
- Fill Settings in the admin (phone, WhatsApp, email, address, hours); `src/constants/site.ts`
  holds demo fallbacks only.
- Add `GET /page/{slug}` to the API (SEO records + content pages such as privacy policy and terms).
  Until then fixed pages use their fallback titles and `/privacy-policy`, `/terms` answer 404.
- Set the Vercel project alias redirect in `next.config.mjs` (`TODO`).
- Review the `[csp]` logs, then switch `Content-Security-Policy-Report-Only` to `Content-Security-Policy`.
- Allow the production site origin in the API's CORS settings.
