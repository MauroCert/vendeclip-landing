# Public redesign preview

Updated 9 September 2026. Scope: public website and account-entry screens, with no `/app` routes or changes to the original application.

## Connected routes

- Homepage, product overview, and ten product pages: AI video, templates, music, voiceover, presenter, branding, captions, website, leads, analytics.
- Pricing with monthly/yearly USD examples; integrations; video examples; complete workflow.
- Resources and three complete editorial guides.
- Sign in, sign up, and forgot password.
- Privacy and terms, retaining the original Spanish legal content and effective dates from the existing app. Only the presentation component and navigation changed.

## Sources and boundaries

Feature content was checked against the original app's marketing pages, product components, listing importer, studio flows, plan configuration, and authentication forms. Product-specific interactions include real video/audio playback, template filters, sample caption copying, script-tone selection, brand-color previews, and billing interval selection.

Pricing values in USD come from the original `src/lib/plans.ts`: Essential $39/month or $374/year; Growth $99/month or $950/year; Pro $179/month or $1718/year. The live pricing page was consulted on 9 September 2026; it currently localizes prices by region. The preview identifies its USD examples and links to live pricing for current regional terms. No checkout or billing mutation was added.

Authentication is an explicitly labeled design preview. Required-field, email, checkbox, and password-length validation run in the browser; show/hide password and switching between entry screens work. Submission clears the fields and offers a link to the existing live authentication page. No credentials are submitted, saved, logged, or placed in URL parameters. Google selection also leads to the preview handoff, rather than impersonating a completed OAuth sign-in. Reset-password preview does not send email.

Property activity and lead cards are labeled as sample data. Script and caption examples are illustrative, not live generation. Social integrations distinguish native sharing, guided uploads, and shareable property links; no connected-account status is implied.

Additional imagery was reused unchanged from the user's existing VendeClip assets. Music previews are 20-second excerpts of Coastal Light, Quiet Luxury, and Modern Move from the existing music library. Original VendeClip logos and icons are retained.

English marketing navigation links to the original Spanish legal documents in the redesigned layout, matching the existing app's legal-language behavior. Help-center, live account handoff, and regional pricing links intentionally leave the preview. No translations, account backend, private workspace, or administrative routes were added.
