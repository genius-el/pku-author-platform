# Refinement Pass 3 Plan

## Goal
Refine the existing public writing, resources, contact, reader stories, partnerships, footer, shared states, and supplied metadata while preserving the current routes, frontend-only limitations, and established PKU design system.

## Page refinements
- Rework `/writing` as **Good Mornings With Kuku** with the exact hero, archive introduction, and inactive newsletter signup copy; keep the archive intentionally empty and do not invent articles.
- Rework `/resources` as **The Digital Vault** with the exact three supplied resource entries and full-store callout; keep all actions visibly unavailable until their destinations or delivery systems exist.
- Refine `/contact` around the exact introduction, six enquiry categories, accessible existing fields, and supplied submit/success wording without claiming a message was delivered.
- Refine `/reader-outcomes` and `/reader-outcomes/submit` into the supplied Reader Stories introduction and story-submission experience, preserving the no-approved-stories state and inactive submission.
- Refine `/partners` and `/partners/register` into the supplied partnership introduction and accessible proposal form, keeping submission inactive.

## Shared public experience
- Replace the footer with the exact PKU statement, seven supplied links, and inactive Good Mornings With Kuku email field/button; remove unverified social placeholders.
- Update existing cart, checkout, order-confirmation, error, 404, and empty-search presentations with supplied microcopy where an equivalent state already exists; do not add payment-failure or search routes that do not exist.
- Audit existing public CTAs and replace generic labels only where the client supplied an exact corresponding action.

## Metadata
- Apply the exact supplied titles and descriptions to Home, About, Work With Me, Dear Bank Alert, Writing, Resources, and Contact.
- Preserve valid existing metadata on routes without client-supplied replacements.

## Technical details
- Reuse TanStack routes, shared buttons, semantic colour tokens, and existing layout/state components.
- Keep forms and commerce controls disabled where no live service exists, while preserving accessible labels and honest status messaging.
- Keep each content route’s existing canonical, Open Graph, and Twitter metadata through the shared route-head helper.

## Verification
- Check exact wording, punctuation, emojis, headings, CTA labels, and absence of invented content.
- Verify desktop and mobile rendering for all five refined experiences plus footer, cart, checkout, confirmation, 404, and error states.
- Confirm navigation, keyboard-visible controls, heading hierarchy, no horizontal overflow, clean console/runtime signals, and a successful preview build.
