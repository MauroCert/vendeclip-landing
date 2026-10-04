# Navigation refresh

Reference: [Navbar with Dropdowns by Shadcnblocks.com on 21st.dev](https://21st.dev/@shadcnblockscom/components/shadcnblocks-com-navbar1), reviewed October 4, 2026. Also reviewed 21st's modern navbar collection and floating navigation patterns.

The navigation uses the reference's grouped dropdown / mobile drawer structure, with original VendeClip styling and existing icons, typefaces and property imagery. No 21st registry package or new dependency was installed.

- Floating, rounded header with pill navigation and active-page states.
- Product panel groups every existing product under creation/personalization or publishing/growth, alongside a visual overview link.
- Resources panel includes guides, examples, integrations, help and support.
- Mobile uses a native modal dialog with a product accordion, account links and the existing language selector.
- Disclosure buttons support Enter/Space, ArrowDown to focus links, and Escape to close and restore focus. Clicking outside or following a link dismisses the panel. The mobile dialog traps focus, locks background scrolling, closes before the home auth dialog opens, and restores scrolling when dismissed.
- Motion respects the visitor's reduced-motion preference. Existing locale links and country-based billing logic are preserved.

Validated in the local browser at desktop and 390px mobile widths, including German content, localized product links, active states, support navigation and the mobile sign-in flow.
