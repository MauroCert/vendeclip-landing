# Motion design references

The primary call-to-action adapts the expanding fill and sliding label composition from Dillion Verma / Magic UI's Interactive Hover Button, retrieved through 21st's component copy action on 2026-09-29:
https://21st.dev/@dillionverma/components/interactive-hover-button

The adaptation uses Next.js Link instead of a button for navigation, the project's existing Icon component, plain CSS instead of Tailwind, keyboard focus parity, reduced-motion support, and one accessible label.

The cinematic title, pointer-following card illumination, and nine property-marketing vignettes are custom VendeClip implementations. They use CSS animations, pause when their cards leave the viewport or the document is hidden, and support the visible Pause animation control. No additional animation library or runtime dependency was added. Illustrative previews are labeled as such.

## Site-wide integration

The root layout now mounts one PageMotion controller across all routes, including authentication pages. It observes newly mounted content after filtering or client navigation, uses restrained entrances for legal/article reading, tracks visibility for decorative previews, and retains the pause setting during client navigation. Templates and analytics use this controller instead of duplicate observers. Product, pricing, resources, examples, integrations, workflow and authentication surfaces share keyboard-aware hover/focus transitions. Pricing interval changes and caption/tone changes animate the replacement content. Existing video/audio playback controls remain independent from decorative-motion controls.
