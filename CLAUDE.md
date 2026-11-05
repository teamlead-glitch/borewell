@AGENTS.md

# Borewell website - rules for Claude Code and developers

This repo is the Next.js front end of borewell.in (public website only).
Content and data come from the Laravel admin + API in `borewell-admin-and-api`
(local: http://borewell-admin-and-api.test/api). Services, contact settings and districts are
edited in the admin, not in this code. The admin panel is part of the Laravel app, not this repo.

`../design` is the client-approved static design (phase 1). It is the visual reference only:
match it, never import from it.

## Structure (nextjs-cms-frontend skill)
- `src/lib/cms-fetch.ts` - every server read of the API: shared cache (5 min), retries, last good copy, 5xx (never a fake 404) when the API is down
- `src/lib/catalog.ts`, `site-settings.ts`, `page-api.ts`, `seo.ts` - server data helpers
- `src/services/*` - browser calls (form submits, taluk / panchayat lists) -> `{ success, data, error }`
- `src/components/<section>/` - one folder per page section; `ui/` primitives; `common/` shared blocks; `forms/` form kit + wizard
- `src/constants/` - copy, nav, fallbacks, slugs; no magic values in components
- Server page fetches + slims data, client components get `initialX` props and fetch in the browser only as a fallback

## How every change goes live
1. Create a branch from main (e.g. fix/short-topic). One topic per branch.
2. `npx tsc --noEmit`, `npx eslint .` and `npm run build` must pass.
3. Push and open a pull request into main; describe what changed and why.
4. Check the Vercel preview on desktop and phone.
5. The owner merges. Merging into main deploys the live site.

## Never
- Never push directly to main or deploy production from another branch.
- Never use Vercel "Redeploy" / "Promote to Production" on a non-main build.
- Never add secrets to the code - use Vercel environment variables.
- Never hard-code tracking scripts - all tags go through Google Tag Manager (NEXT_PUBLIC_GTM_ID).
- Never call headers(), cookies() or read searchParams in a page's normal path (kills the page cache).

## Design rules (approved design + frontend-design pass)
- Palette and type are fixed: tokens in `src/app/globals.css` (@theme). Plus Jakarta Sans only.
- One orchestrated motion: the "How it works" steps (`ui/Reveal`). Don't add fade-ins to other sections.
- One name per action: "Send enquiry", "Register your company" / "Send registration".
- Errors say what happened and what to do; they don't apologise.
- Keyboard focus ring, skip link and reduced motion are handled globally - keep them working.

## SEO rules that must not break
- vercel.app hosts stay noindex; the live domain stays indexable; thank-you pages are noindex.
- Canonical, og:url, sitemap and robots come from NEXT_PUBLIC_SITE_URL.
- Old-site 301 redirects (`src/constants/legacy-redirects.ts`) stay single-hop.
- Pages never return 404 or 500 just because the API is slow; the last good copy is served.
