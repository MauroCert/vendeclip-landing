# Site localization

The site supports VendeClip's current locales: en, en-gb, es, pt, it, fr, de, nl, pl, tr, ja. Each of the 25 public and account-preview pages has an explicit locale URL. Original URLs remain available in US English.

`src/views` contains shared page content. `src/app/[locale]` statically exports the localized routes; `src/app/(default)` preserves existing addresses. Route wrappers set the request locale before rendering or generating metadata. The build regenerates `client-keys.json` from interactive components. Only the client copy subset is sent to the browser; full page and legal translations stay in server rendering to avoid duplicating them in every page payload. Shared components use next-intl's server/client locale and message context.

`src/i18n/messages` holds committed translations. No translation service or model runs in a visitor's browser or at request time. A render-time localizer translates text children and visible/accessibility attributes while preserving state identifiers, events, classes, media URLs, and object data. Dynamic messages use numbered placeholders. Internal links keep the selected locale. The language selector preserves the page, query, and fragment.

Translations were drafted with local Argos/OpenNMT models and editorial overrides. `editorial-overrides.tsv` contains reviewed navigation, terminology, hero copy, pricing labels, and controls. Run `python3 scripts/apply-editorial-overrides.py` after updating generated dictionaries. Longer prose remains machine-assisted and should receive native-language editorial review before a production launch. Spanish is the source language for the legal documents; translation does not change their effective date or obligations.

Currency remains USD, with locale-specific number formatting. Analytics dates and numbers use Intl. Language names remain in their native forms. Original video soundtracks and text embedded in media are not translated.

Verification: `npm run build` exports every route. `node scripts/check-locales.cjs` checks dictionary coverage, placeholders, corrupted model tokens, page-language attributes, and locale-preserving links.
