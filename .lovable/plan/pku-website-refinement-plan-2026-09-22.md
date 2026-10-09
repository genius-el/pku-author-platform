# PKU Website Refinement Plan

## Goal
Refine the existing author platform around Priscilla Kuti-Ukaegbu’s first-person voice and the central message “Build your future. On purpose.” while preserving the current TanStack, Tailwind, shared layout, route, and future-facing structures.

## Public foundation
- Update the canonical public name everywhere from “Priscilla M. Ukaegbu” to “Priscilla Kuti-Ukaegbu,” including visible labels, metadata, accessibility text, and structured data.
- Rebalance existing colour tokens and section treatments toward white/soft off-white, hot pink, charcoal, and pale blush; keep cream and supporting colours as restrained accents.
- Retain the current Caslon/Comfortaa fallback setup, buttons, page shells, assets, and reusable section components.
- Remove third-person and corporate-sounding copy from the updated public experience, and ensure the word “becoming” is absent from public copy.

## Navigation and shared layout
- Replace the primary navigation with Home, Start Here, About, Work With Me, Books, Resources, Writing, and Contact.
- Make Start Here the clear desktop and mobile primary action.
- Keep Dear Bank Alert discoverable without letting its promotion compete with Start Here.
- Preserve useful secondary and future routes in the footer, while refining visible brand and footer copy into first person.

## New pages
- Add `/start-here` using the supplied headline, intro, six pathways, exact CTA labels, and closing recommendation.
- Add `/work-with-me` with the supplied private strategy, PKU Pro, speaking/teaching, and contact sections.
- Show the confirmed $120 private session price without inventing duration, availability, booking, or payment details.
- Route non-functional actions to controlled existing destinations or clear placeholder states; do not simulate unavailable services.
- Add unique page metadata for both new routes.

## Homepage refinement
Rework the existing homepage in this order, reusing shared components where practical:
1. Editorial portrait-led hero with the supplied identity, central headline, concise first-person supporting copy, Start Here, and Good Mornings With Kuku actions.
2. First-person “Hi. I’m Kuku. 🤍” introduction.
3. Six-path Start Here routing section with selective visual hierarchy.
4. Prominent Dear Bank Alert section using the approved book mockup and supplied income-building direction.
5. Distinct Work With Me preview linking to `/work-with-me`.
6. Good Mornings With Kuku writing section linking to the existing writing route.
7. Calm closing statement and Start Here action.

## Reusable implementation
- Add shared pathway data and compact reusable pathway cards so the homepage and Start Here page stay consistent.
- Refine existing section heading and author introduction patterns rather than creating a parallel design system.
- Use restrained line/spark/arrow details from existing iconography for editorial personality; no new illustration system or generated imagery.
- Keep all current routes and deferred commerce, account, partner, reader-outcome, legal, and writing structures intact.

## Quality checks
- Verify every content route has distinct required metadata after the name update.
- Check the home, Start Here, Work With Me, writing, About, and Dear Bank Alert pages at mobile and desktop widths.
- Test desktop/mobile navigation, all new route links, CTA wrapping, card stacking, portrait and book cropping, focus states, and horizontal overflow.
- Scan public copy for the old name, third-person defaults, the prohibited word, unsupported claims, and placeholders that read as confirmed facts.
- Confirm the latest build, browser console, and key navigation flows are clean.
