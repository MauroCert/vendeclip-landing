# VendeClip landing website

Next.js 16, React 19 and TypeScript, with 11 translated languages and automatic language routing.

## Local preview

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Use `npm run build` and `npm start` to check a production build. Do not publish through Sites.

## Language and pricing

Unprefixed URLs redirect using a saved manual language preference, then the detected country's supported default language, then the browser's Accept-Language list, then English. Explicit locale paths remain unchanged. For example, a first-time visitor detected in Italy is redirected from `/` to `/it`, even with an English browser. Without supported country detection, `/pricing` redirects to `/es/pricing` for a Spanish browser. Regional tags such as es-AR and pt-BR map to their supported language; en-GB has its own localization.

Pricing reads Vercel's `x-vercel-ip-country` header on the server. No billing-country selector or stored country override is used. With no country header, pricing defaults to USD, matching the billing resolver. For a local regional preview, run `DEV_PRICING_COUNTRY=FR npm run dev`; this override is ignored in production. Final checkout determines billing country and taxes.

## Vercel

Connect the GitHub repository with Root Directory `vendeclip-home` and the Next.js preset. Use the default output directory, not `out`. After the integration is connected, pushes to main trigger production deployments. Review locally before pushing.

## Editing

- `src/proxy.ts`: automatic locale redirects.
- `src/i18n/`: locale detection and translated copy.
- `src/views/`: page content.
- `src/components/`: reusable sections and interactions.
- `src/lib/regional-pricing.ts`: verified regional price table.

Signup/login remain design previews. Metadata remains noindex until production launch is approved.

### Country-aware language and brokerages

Vercel's `x-vercel-ip-country` header selects relevant confirmed brokerage brands and billing currency on each request. Language priority is explicit URL, saved `vendeclip-language` preference, supported country default, browser language fallback, then English. Country does not override an explicit language choice. Multilingual countries without an unambiguous default fall back to browser preference or English.

Confirmed brand relevance: Compass (US); Berkshire Hathaway HomeServices (US, CA, MX, ES, PT, DE); SAFTI (FR); RE/MAX (general international fallback). Missing country shows the complete confirmed brand set. These are workplace affiliations, not claims of corporate partnerships or customer counts in specific countries.

For local country previews set `DEV_VISITOR_COUNTRY=FR` before starting the dev server. This overrides only missing/invalid geolocation in development and also controls pricing. `DEV_PRICING_COUNTRY` remains a backward-compatible fallback. Neither override is used in production. Country query parameters do not control geolocation.

The homepage presenter demo now includes 11 generated market portraits in `public/media/presenters/`. `src/lib/presenter-image.ts` selects by detected country, then page locale, then English. Spanish-speaking markets share the Spanish variant; Brazil and Portugal share the Portuguese variant. Countries without a dedicated mapping use the page-language variant. These images illustrate the AI presenter workflow. The original presenter asset is preserved.
