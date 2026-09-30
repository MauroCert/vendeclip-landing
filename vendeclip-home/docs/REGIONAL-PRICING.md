# Regional pricing

Verified 2026-09-29 against https://vendeclip.com/en/pricing and its public bundle `1448qktf9is2t.js`, plus the VendeClip application’s `src/lib/billing/currency.ts` and `src/lib/geo/country-groups.ts`.

The public `getPlanPrice` resolver uses nine billing currencies. ARS fields exist in the public plan configuration but are **not used** by that resolver. Argentina, Mexico, Canada, Australia and other countries outside the configured regions use USD. Geographic market-page currencies are not necessarily checkout currencies (for example, Switzerland bills EUR).

Country selection is explicit because this static preview has no trusted geolocation headers. No country is inferred from the translated page. The selection is remembered locally and can be shared with `?country=FR`, and survives language changes. Before selection, price cards show a dash rather than an assumed price. The original monthly and yearly amounts are used without exchange-rate conversion.

Denmark uses the application's default DKK behavior. Production can switch Denmark to EUR via an operator-approved flag; that server deployment setting is not available to the static preview. Checkout remains authoritative for taxes, eligibility, and final pricing. This is a verified snapshot, not automatic synchronization.
