# Client Feedback and Public Website Alignment

## Goal
Align the existing public website with the client’s latest confirmed decisions while preserving the current editorial design, routes, reusable components, navigation, doodles, and frontend-only scope.

## Changes

### 1. Confirmed public information
- Update Dear Bank Alert with the October 29, 2026 launch event, October 30, 2026 public sales, October preorder timing with the exact date still TBD, physical and ebook launch intention, Nigeria-wide paid delivery, no pickup, and TBD price/fulfilment timing.
- Distinguish the optional one-month PKU Pro preorder bonus from the separate Your First Five Alerts pre-preorder campaign.
- Describe the digital toolkit only as practical worksheets, templates, and exercises that help readers implement the book.
- Update private Strategy & Advisory to $120, 90 minutes, online by default, open for booking, the intended future booking sequence, and the confirmed rescheduling/cancellation terms.
- Update PKU Pro with its October launch, three confirmed prices, recurring monthly option, wider WhatsApp Business ecosystem, confirmed member experience, and four monthly live touchpoints.
- Keep How Much For Your Nikes? in development with date and format TBD, and keep speaking/partnership language within the confirmed areas.

### 2. External-service positioning without integrations
- Present the Digital Vault as the PKU catalogue and discovery layer, with Selar handling checkout and delivery once the supplied product links are connected; keep prices and links unclaimed until supplied.
- Present Good Mornings With Kuku as the public writing identity and Substack as the current publishing/newsletter engine; point appropriate writing CTAs to the exact supplied Substack URL.
- Keep contact, Reader Stories, checkout, moderation, delivery, authentication, and admin experiences visibly unconnected and frontend-only.

### 3. Footer and public copy cleanup
- Add clickable footer icons only for Instagram, YouTube, LinkedIn, Substack, and TikTok using the exact supplied URLs, with accessible names and external-link behavior.
- Remove all emoji characters from public copy without replacing them with icons or removing the existing editorial doodles.
- Audit for outdated dates, prices, product/platform descriptions, invented contact details or links, generic CTA labels, accidental third-person biography, and unsupported claims.

### 4. Shared Start Here layout correction
- Keep the existing shared pathway data and component for both the homepage and Start Here page.
- Remove staggered card transforms and use a true two-column desktop grid whose paired cards stretch to the same natural row height: 01/02, 03/04, 05/06.
- Keep the mobile order 01 through 06 in one column, with comfortable content-driven height, coherent CTA placement, and no overflow.

### 5. Verification
- Check all major public pages at 320, 375, 390, 430, and wide desktop widths for card alignment, navigation, footer/social links, typography, forms, CTA wrapping, clipped content, and horizontal overflow.
- Verify the supplied external links, scan rendered/source copy for emojis and conflicting wording, inspect browser errors, and confirm the preview build is clean.
- Stop after this public alignment pass; do not begin authentication or role-based access control.

## Technical notes
- Reuse TanStack routes, existing data structures, shared Button components, semantic design tokens, and editorial mark components.
- External services remain ordinary outbound links only; no Paystack, Selar API, Substack API, database, authentication, CMS, or delivery logic will be added.
- Unavailable actions remain clearly described as not yet connected and will not imply successful payment, booking, signup, or submission.
