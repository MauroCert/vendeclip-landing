# Homepage content audit

Reviewed 8 September 2026 against `/Users/maurojavierlopez/Documents/vendeclip` and https://vendeclip.com/en.

## Features represented

| Homepage content                                         | Existing implementation                                                               |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Import a listing / upload photos                         | `src/lib/listing-import/`, studio project creation                                    |
| AI video motion and effects                              | `src/lib/ai-clips/`, `src/lib/video/clip-vfx-catalog.ts`                              |
| Video templates                                          | `src/components/landing/TemplatesShowcase.tsx`, `public/vendeclip/template-previews/` |
| Presenter, avatar, personal image and voice              | `src/lib/avatar/`, `src/lib/presenter/`, `src/lib/voiceover/`                         |
| Scripts, narration, captions, music                      | `src/lib/ai/property-script-generator.ts`, `src/lib/voiceover/`, `src/lib/music/`     |
| Brand kit                                                | `src/app/(core)/app/settings/brand/`, `src/lib/video/brand-systems.ts`                |
| AI photo editing / virtual staging / renovation concepts | `src/lib/ai-photo-edits/prompts.ts`                                                   |
| Property flyers                                          | `src/components/flyers/`                                                              |
| Website and property pages                               | `src/app/(core)/app/website/`, `src/lib/public-pages/`                                |
| Leads / WhatsApp / analytics                             | `src/app/(core)/app/leads/`, `src/app/(core)/app/analytics/`                          |
| Team workspaces                                          | `src/components/settings/team-settings-form.tsx`, `src/lib/workspaces/`               |
| Portrait, square, landscape exports                      | `src/lib/video/aspect-ratios.ts`                                                      |

## Availability and copy decisions

- Free plan has two lifetime videos, watermark and usage restrictions. The homepage says “Start for free,” and refers to current pricing for limits.
- Presenter and voice tools vary by plan. The presenter section and FAQ state this.
- Direct publishing, social scheduling and Meta advertising routes call `requireAdminPublishingApi()`. The FAQ describes these as enabled-account features; the main workflow promises exports and sharing, not unrestricted one-click social publishing.
- No invented customer counts, revenue lifts, testimonials, brokerage endorsements, or analytics results.
- Photo edits are described as staging and renovation _ideas_. The demo displays existing sample property assets rather than claiming a current real listing.
- Primary conversion links go to the existing `/sign-up`; log in goes to `/sign-in`. Pricing, help, and deeper product links point to existing VendeClip pages.
- This is an English homepage concept. Other production languages and the signed-in application remain separate.

## Media and design

- Property photographs and clips are copied from `public/vendeclip/clean-landing/`; the landscape clips are compressed to 1280px H.264 with fast-start metadata.
- Four playable template previews and their posters come from `public/vendeclip/template-previews/`.
- The presenter example comes from `public/vendeclip/presenter/presenter-exterior.webp`.
- Manrope is locally hosted with its SIL Open Font License.
- 21st.dev’s Modern Minimal theme was reviewed as a reference. Components and styles in this project are original implementations, not copied 21st.dev code.

- Header and footer use the original `vendeclip_logo_horizontal_color.png` unchanged. Browser and Apple icons are copied unchanged from the app’s `icon.svg`, `favicon.ico`, and `apple-icon.png`. No brand marks are recreated.
- All page and component surfaces use pure white. Interface text, borders, icons, shadows, and controls use neutral charcoal and greys; color is retained in the original brand assets and property media.
- Motion includes staggered hero and section entrances, card lifts, button highlights, an animated listing-to-video studio, and short decorative workflow/presenter animations.
- Scroll entrances are progressively enhanced with IntersectionObserver and the Web Animations API. Content stays visible without JavaScript. Reduced-motion preferences disable the animations, including when the preference changes during the session.

## Review behavior

- Native video dialogs support Escape, focus containment, controls, and backdrop dismissal.
- The ambient hero video is muted and honors reduced-motion preferences; playback stops when outside the viewport.
- The listing-to-video studio walks through importing a URL, collecting several photos and a description, creating individual clips, choosing music/voice and an optional avatar, and assembling a final video. The stage rail supports manual exploration, pause, and replay. Small clip previews pause when the final export plays; all playback pauses off-screen and in hidden tabs. Reduced-motion users see the finished state with manual playback and can explore the stages without animation.
- The final player uses the existing `clean-landing/nordelta-lagoon-demo.mp4` export, compressed to 720×1280 and preserving its audio. The imported-photo illustrations are still frames from that same example, and the small clips are excerpts. They illustrate the workflow, not a live URL import or the original source photos. Avatar and audio track graphics illustrate available choices; they do not imply that this existing export was re-rendered with new selections.
- Workflow navigation exposes the current step, and template choices expose pressed states. The workflow is labeled as an illustration using sample imagery and an actual VendeClip export.
- FAQ disclosures and mobile navigation work without external UI dependencies.
- Review deployment is private and carries `noindex, nofollow`. Remove this directive and add the production canonical URL when the homepage is approved for public rollout.
