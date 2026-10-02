# SEO implementation and verification

The public production origin is `https://vendeclip.com`. All translations share the existing page components. No new marketing pages or deployment were created for this work.

## Implemented

- Production indexing enabled; local development and Vercel previews remain `noindex` with robots.txt blocking crawling. Sign-in, sign-up and password recovery remain `noindex, follow` in production.
- Localized homepage search titles and descriptions for all 11 locales. Public page descriptions reuse their translated visible introductions.
- Self-referencing canonical URLs without tracking parameters; reciprocal language alternates for all locales plus an English `x-default`. Explicit language URLs remain accessible independently of geolocation.
- XML sitemap with 242 canonical public URLs, language alternates and relevant image URLs. Authentication pages are excluded. No artificial last-modified dates.
- Open Graph and large Twitter cards, with a generated 1200 × 630 branded preview using an existing property photograph. The shared visual has localized metadata/alt text.
- Server-rendered Organization, WebSite and localized WebPage JSON-LD on the landing page. No invented reviews, ratings, pricing or publication dates.
- Next.js responsive image optimization restored, with AVIF/WebP negotiation and fallback support. Correct logo aspect ratio and display-size hints prevent oversized downloads.
- Translated descriptive hero image alternatives; decorative images retain empty alt text.
- Existing Markets footer link now targets the visible homepage market section instead of a missing route.
- Compact-phone hero buttons stack to prevent clipping in translated versions.

## Verification

- `npm run build`: production compilation, TypeScript and prerendering.
- `node scripts/check-locales.cjs`: dictionary completeness and interpolation placeholders.
- `node scripts/check-seo.mjs`: sitemap consistency, 35 representative rendered routes, all 11 homepages, canonical/alternate URLs, robots, one homepage H1, JSON-LD, sharing image dimensions and actual WebP optimization. Run against local development by default. For a running production build use `TEST_INDEXABLE=true`.
- Browser: all 11 locales at 390px; Italian at 320, 390, 768, 1024 and 1440px; longer translations also inspected at 320px. No page-level horizontal overflow, missing alt attributes or browser errors in those checks. Compact-phone CTA clipping discovered during inspection was corrected.
- Built production output checked for public `index, follow`, authentication `noindex, follow`, and permissive robots.txt. Local robots.txt remains restrictive by design.

These checks are not a Lighthouse score or a guarantee across every physical device/browser.

## Release checks

1. Deploy only after approval, using the Vercel project with Root Directory `vendeclip-home` and the Next.js preset.
2. Verify the live canonical origin, HTTPS redirects, robots.txt, sitemap.xml and `/api/og`. Vercel preview deployments should remain excluded from search.
3. Submit `https://vendeclip.com/sitemap.xml` in the verified Google Search Console property. Inspect representative language URLs and check indexing after deployment.
4. Run PageSpeed Insights on the deployed site and review field Core Web Vitals when enough traffic data is available. Local development timing does not establish production performance.
5. Validate deployed structured data in Google's Rich Results Test / Schema.org Validator and test previews with social sharing debuggers. Organization/WebSite markup does not promise a particular rich result.
6. Connect the existing newsletter CTA to a real subscription destination before launch: it currently targets the legacy `#newsletter-email` anchor, which this landing page does not implement. A mailing-list provider or destination is needed for a functioning signup.

## References

- [Google: localized versions and hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google: image SEO](https://developers.google.com/search/docs/appearance/google-images)
- [Google: SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## AI search and LLM discovery

Added `/llms.txt`, `/llms-full.txt`, and `/{locale}/llms.txt` for all 11 locales. These are plain-text summaries and source links, not replacement landing pages. Product descriptions, benefits, answers and resource material are generated from the same data and translation dictionaries as the public site. Prices and invented performance claims are not duplicated in the guides; pricing links point to the current localized page.

Localized HTML responses advertise their guide through an HTTP `Link` header with `rel="describedby"`. Text guides advertise the canonical HTML homepage, carry a language header, and use `noindex, follow` to avoid competing with the HTML pages in ordinary search results. Crawling and direct retrieval remain permitted on production. Preview and development robots rules continue to block crawlers.

Production robots.txt explicitly allows `OAI-SearchBot`, `Claude-SearchBot` and `PerplexityBot`, alongside the existing wildcard allowance. Existing model-training crawler policy remains unchanged. Search discovery and model training are distinct uses; an AI search allowance is not evidence of model training or a guarantee of citation.

Homepage JSON-LD now describes VendeClip as a WebApplication with its visible product features and publisher, connected to the WebPage as its main entity. This is semantic product information; no software rich-result eligibility or invented rating is claimed.

Validation: `node scripts/check-ai-discovery.mjs` checks all text endpoints, language headers, localized source links, invalid locale handling, HTTP discovery links, structured application information, and equal visible content under the three search crawler identifiers. These are simulated user-agent checks, not evidence that the providers have crawled the site. Production build and existing SEO regression checks also pass.

After deployment, inspect real crawler requests in Vercel logs and confirm any WAF configuration permits legitimate requests using the providers' published verification guidance. Do not blindly bypass the firewall based on a spoofable user-agent string. Monitor actual AI referral visits and citations; file availability alone does not establish visibility.

References:
- [OpenAI crawler roles and access](https://developers.openai.com/api/docs/bots)
- [Anthropic crawler roles](https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [llms.txt proposal and discovery conventions](https://llmstxt.org/)
- [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features): ordinary SEO remains applicable; special AI text files are not required for Google's AI features.
