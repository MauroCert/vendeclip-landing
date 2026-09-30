# Analytics refinement and generated imagery

9 September 2026. Scope: `/product/analytics` only. The homepage, Templates refinement, and signed-in `/app` remain unchanged.

## Experience

The dedicated Analytics page replaces the generic product layout. Three photo-led sample property selectors lead to detailed reporting. Controls select a property, a 7- or 30-day period, and page views, video plays, or contact actions. The graph has numbered grid lines, full month/day ticks, a current-period line, optional previous-period comparison, exact values on hover/touch/keyboard inspection, peak activity, daily averages, and an accessible daily data table. Rate calculations and breakdowns derive from the same event dataset as the chart.

Dates and all activity are explicitly illustrative, ending September 8, 2026. Event counts may include repeat activity and are not presented as unique people. Contact actions equal WhatsApp clicks plus inquiry submissions; completion rate equals completions divided by video starts. The prior-period controls are a design-preview treatment, not a claim of a newly connected backend. No live analytics, account data, or tracking integration was added.

Supported event types and rates were checked against the original VendeClip app:

- `src/lib/analytics/public-page-events.ts`
- `src/components/analytics/project-analytics-details.tsx`
- `src/components/analytics/interactive-events-chart.tsx`

White surfaces and the original shared logo and icons are preserved. Chart color is limited to functional series and indicators. Reduced-motion preferences disable line drawing, bar growth, and entrance motion. Content remains visible without animation. Charts have a keyboard-accessible day slider and a data-table alternative.

Validation includes the production export, TypeScript, ESLint, internal links/media/label references, and arithmetic/date invariants across three properties, 60 days, six period pairs, and 18 metric/axis combinations. No browser visual or interaction testing was requested or performed.

## Generated assets

Mode: built-in `image_gen`; two distinct calls, generated in parallel by an asset-only agent. One output per brief, no variants or retries. Both images were inspected before integration. The images portray fictional properties; no real listing address or owner is claimed.

Final site assets, 1536 × 1024 pixels:

- [Coastal house](../public/media/analytics/olive-house.webp) — 358,614 bytes.
- [City apartment](../public/media/analytics/city-terrace.webp) — 280,462 bytes.

The generated PNGs were encoded as WebP for delivery without changing their composition. The third property selector uses the existing `/media/lake-house.webp` asset. Large photo sections reuse the new images with derived sample completion/contact values to replace paragraph-heavy feature sections.

### Coastal house — final prompt

```text
Use case: photorealistic-natural
Asset type: fictional property photograph for a clean white real estate SaaS Analytics marketing page.
Primary request: Photorealistic architectural editorial photograph of a premium contemporary coastal house with white plaster, pale stone, a pool reflecting olive trees, and warm wood shutters. Lived-in but meticulously composed.
Composition/framing: Landscape 3:2 composition; house centered; intimate eye-level architectural framing. Usable full image for both a listing-card thumbnail and a wide property feature image.
Lighting/mood: Soft afternoon daylight, serene and natural rather than a glossy 3D-render appearance.
Color palette: Retain natural photographic color.
Materials/textures: Real textured plaster, pale stone, warm wood, natural foliage and reflective water.
Constraints: Professional architectural magazine photography of a fictional property.
Avoid: People, cars, text, watermark, signage, logos, screens, UI, charts, CGI appearance.
```

### City apartment — final prompt

```text
Use case: photorealistic-natural
Asset type: fictional property photograph for a clean white real estate SaaS Analytics marketing page.
Primary request: Photorealistic editorial photograph of an airy city apartment, with an open living room leading through tall glass doors to a planted terrace with a believable Buenos Aires-style low-rise city outlook. White walls, warm wood, calm linen furniture, and morning light across the floor.
Style/medium: Architectural magazine photography with natural color and believable materials.
Composition/framing: Landscape 3:2 composition with depth from living space through terrace. This is a city apartment, distinctly different from a coastal house.
Lighting/mood: Airy, calm natural morning light.
Constraints: Professional photograph of a fictional property.
Avoid: People, charts, screens, UI, text, logos, watermark, CGI appearance.
```
