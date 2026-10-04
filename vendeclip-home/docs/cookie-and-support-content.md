# Cookie preferences and support content

Verified against the public VendeClip site on 2026-10-04.

## Content sources

- https://vendeclip.com/support — Spanish support content, including the contact address, troubleshooting instructions, ChatGPT photo requirements and generation-progress advice. Other languages are translations of this source.
- https://vendeclip.com/privacy — existing local policy verified against the live document; effective date remains July 20, 2026.
- https://vendeclip.com/terms — existing local terms verified against the live document; effective date remains July 20, 2026.
- The public landing page's cookie component — title, explanation, action labels, privacy labels and separate Google Ads measurement disclosure copied in the ten available languages. British English uses the English source. Additional preference-panel labels are translated locally.

## Component reference

Reviewed https://21st.dev/community/components/arunachalam0606/cookie-banner and https://21st.dev/blog/react-cookie-banner-components. The implementation uses original CSS and the site's typography and colors, inspired by the compact banner and category-control patterns. No registry package or third-party code was installed.

## Consent integration

- Preserves `vc_cookie_consent` (`1` / `0`), `vc_ads_consent_v1` (`1.<timestamp>` / `0`), the 180-day lifetime, and the existing VendeClip settings/consent events.
- Necessary cookies stay active. Analytics and ad measurement are separate choices; accepting analytics from the compact banner does not enable advertising.
- Optional choices default off, and Global Privacy Control overrides them. The panel can be reopened in the footer and on support/legal pages.
- Consent cookies are host-only, SameSite=Lax, and Secure on HTTPS. Existing choices will carry over only when served on the same production hostname; localhost is intentionally separate.
- No analytics or advertising SDK exists in this landing app, and none was added. Future integrations must gate initialization and capture through `analyticsAllowed()` / `adsAllowed()`, listen for `vendeclip:analytics-consent-changed`, and stop tracking on withdrawal. The copied disclosures describe the existing VendeClip service.
- Withdrawing consent clears known optional browser identifiers and leaves language preferences intact. Geographic billing and locale routing are unchanged.

## Validation

Desktop and 390px mobile browser checks cover persistence, independent category switches, reopening settings, Escape dismissal, withdrawal cleanup, Global Privacy Control, localized support content and overflow. TypeScript, locale validation, changed-file lint and the production build are checked separately. The full lint command has pre-existing CommonJS `require` errors in unrelated scripts.
