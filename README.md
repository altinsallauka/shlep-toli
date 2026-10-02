# Shlep Auto Bartje TOLI

Public site: https://altinsallauka.github.io/shlep-toli

React + TypeScript, Vite, i18next and Lucide. Run `npm install`, then `npm run dev`. Run `npm run build` for production and `npm run preview` to inspect it. Node 20.19+ recommended.

## Languages and SEO

Albanian is the default at `/shlep-toli/`, English at `/shlep-toli/en/`, German at `/shlep-toli/de/`. Language links navigate to real URLs, and URL language always wins. Build generates full HTML for each language and hydrates it with React; crawlers and visitors receive the same content. Do not upload only the initial Vite build: `npm run build` also runs the prerender step.

Build produces self-referencing canonical tags, reciprocal hreflang and x-default links, localized titles/descriptions, Open Graph previews, AutomotiveBusiness/WebSite/WebPage JSON-LD, sitemap.xml, robots.txt and a noindex 404 page. Local FAQs cover towing, pricing factors, location and recovery without invented prices, rankings, reviews or coverage promises. New content: src/i18n.ts. SEO origin and metadata: src/seo.ts. HTML generation: scripts/prerender.mjs. Change origin when moving to a custom domain, rebuild and redirect the old domain.

## Contact form

Primary calls and WhatsApp: +383 44 116 446. Alternate phone: +383 49 116 446.

The form validates name, phone and pickup location, then shows a request preview. Continue in WhatsApp opens https://wa.me/38344116446 with the URL-encoded message. The visitor must press Send in WhatsApp. WhatsApp Web/app handles delivery; this website does not automatically send, email, store or track requests. The separate WhatsApp button opens a direct chat. Copy request is available as a fallback. Do not claim a message was sent when only the external app opened.

## Photos and location

Owner-supplied photos plus owner-posted Google business photos. See photo-sources*.json. Bellanice, Malishevë 24000 was verified in the business Google listing on September 30, 2026. Website uses Albanian spelling Bellanicë. 24-hour availability appears on supplied business vehicles. Street address/coordinates and nationwide response times have not been invented.

Google listing: https://www.google.com/maps?cid=6100446268749439151
Facebook: https://www.facebook.com/AutoTransportuesToli/
TikTok: https://www.tiktok.com/@shlepautobartjetoli

## Accessibility and motion

Larger body text and controls, native radio service choices, keyboard-accessible lightbox and FAQ disclosure controls, focus styles and reduced-motion support. Scroll reveals never hide content before JavaScript runs. The mobile call bar hides while the contact section is visible.

## Search launch follow-up

Code does not guarantee rankings or indexing. Owner/account access is still needed to:
1. Add the public website URL to the verified Google Business Profile; keep its primary phone and business details consistent.
2. Verify the exact URL-prefix property in Google Search Console (supply its verification meta tag/file for installation), then submit /sitemap.xml and inspect the three language URLs.
3. Keep the profile accurate, add fresh genuine work photos, and invite honest customer reviews without incentives.
4. Monitor search queries and indexing in Search Console before deciding on further local content. Do not create doorway pages for cities without meaningful, verified service information.

References: https://developers.google.com/search/docs/specialty/international/localized-versions
https://developers.google.com/search/docs/appearance/structured-data/local-business
https://support.google.com/business/answer/7091

## GitHub Pages

Publish from the `main` branch, `/docs` folder. Run `npm ci` and `npm run build`, the build automatically refreshes `docs/` and its `.nojekyll` file. Commit source and docs together. This repository can be managed through GitHub in the browser without changing the laptop’s work Git credentials.
