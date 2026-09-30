# VendeClip homepage

A white-focused, responsive homepage built with Next.js 16 App Router, React 19, TypeScript, and custom CSS. Existing VendeClip videos and photography power the examples.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run these commands inside `vendeclip-home`.

## Validation and export

```bash
npm run lint
npm run build
```

The site is a static Next.js export in `out/`. The private review deployment is configured in `.openai/hosting.json`. It does not replace vendeclip.com. Signup, login, pricing, and deep product links lead to the existing production application.

## Editing

- `src/app/page.tsx`: hero and video gallery.
- `src/components/home-sections.tsx`: workflow, feature descriptions, presenter, FAQs, footer.
- `src/components/home-interactions.tsx`: mobile navigation, playable video dialogs, property motion demo, template selector.
- `src/components/page-motion.tsx`: progressive scroll entrances and reduced-motion lifecycle.
- `src/app/globals.css`: pure-white and neutral-charcoal design tokens, responsive layouts, and component transitions.
- `docs/FEATURE-AUDIT.md`: feature sources and availability decisions.

The concept is English only. It uses no analytics, authentication backend, database, or customer data. The review metadata is intentionally noindex until a production rollout is approved.
