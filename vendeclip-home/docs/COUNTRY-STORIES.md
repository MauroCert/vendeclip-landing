# Localized fictional examples

The homepage and pricing page automatically show an illustrative story matching the page language. These are not actual customers or verified testimonials. Each card visibly identifies the person, quote, and AI portrait as fictional. No ratings, customer counts, business results, or review structured data are fabricated.

Locale mapping: English (US) → US, English (UK) → UK, Spanish → Spain, Portuguese → Brazil, Italian → Italy, French → France, German → Germany, Dutch → Netherlands, Polish → Poland, Turkish → Türkiye, Japanese → Japan. Every supported localization has a completed portrait. The broader 97-country persona catalog remains prepared but inactive.

There is no country selector in the story section. Billing country, query parameters, and saved pricing preferences do not affect its portrait. Pricing retains its independent country selector and regional amounts. Country names, disclosure, image alt text, headings, and sample quote themes are localized into all 11 supported UI languages.

The portrait direction was revised after user feedback: ordinary smartphone-style broker profile photos, practical clothes, recognizable everyday offices or property visits, natural texture and lighting, varied ages and compositions. Earlier polished portraits are not used.

The source prompts and built-in image-generation output paths are retained in `portrait-generation.json`. The web-ready assets are in `public/media/people/`. `node scripts/prepare-portraits.cjs` encodes the selected outputs as efficient 720px WebP files; it makes no generative changes to the portraits.

Images are loaded lazily, and transition effects honor reduced motion and the site's pause control.
