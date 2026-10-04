# VendeClip — Open Scene

The open frame represents property photography becoming a visual story. A coral corner emerging from the frame adds movement; teal and mint connect it to the existing cream, editorial website.

## Assets

- `vendeclip-logo.svg`: primary horizontal logo, transparent background, outlined Soft Studio wordmark (Avenir Next Demi Bold with custom l/i details).
- `vendeclip-logo-light.svg`: cream wordmark and luminous mint symbol for dark backgrounds.
- `vendeclip-symbol.svg`: standalone transparent symbol for light backgrounds.
- `vendeclip-symbol-light.svg`: brighter mint/coral symbol for dark backgrounds.
- `vendeclip-app-icon-dark.svg` / `.png`: dark teal app tile with the high-contrast symbol.
- `vendeclip-app-icon.svg` / `.png`: cream-backed app icon.
- `vendeclip-logo.png`: compatibility export used by social sharing metadata and structured data.
- Browser and Apple icons are generated into `src/app/`.

## Color

Deep teal `#205d51`, deep edge `#103f38`, sea-glass `#50bca5`, mint `#a3e3ce`, coral `#de795f`, apricot `#efa27d`, cream `#faf9f5`, wordmark `#20352f`.

Use brighter mint and coral for artwork and small accents. Keep text and primary controls dark enough to read on cream. Preserve the open center and the space separating the coral corner from the frame. Keep a minimum clear space of one quarter of the symbol's width around standalone use. The cream tile supports legibility in browser tabs with either light or dark chrome.

## Regeneration

From `vendeclip-home`, run `node scripts/brand/generate.cjs`. The generator uses the existing Sharp dependency and checked-in wordmark outlines; no font installation or macOS dependency is needed to regenerate the assets.

To regenerate the wordmark outlines on macOS, run:

```sh
swift -module-cache-path /tmp/vendeclip-swift-cache scripts/brand/outline-wordmark.swift scripts/brand/wordmark.json
```

The concept was explored with the built-in image generation tool and reconstructed as SVG for crisp rendering and reusable exports. The color study is saved at `outputs/rebrand/open-scene-color-study.png` in the repository root. Production SVG geometry, typography and exports are maintained by the generator, not by the raster concept.

## Dark backgrounds

Use the `-light` logo or symbol on deep teal, charcoal, and dark photography. Both the lettering and the symbol change: dark teal surfaces become luminous sea-glass and mint, while the corner stays warm coral. Do not place the standard dark-shaded symbol directly on dark green. Use the dedicated `-dark` app tile when a dark square is needed. Keep gradients and the open center; do not apply a blanket white CSS filter.

The selected wordmark spells **VendeClip**, with capital V and C. It retains option A’s rounded character, curved l foot and angled i dot. The website body fonts are unchanged.
