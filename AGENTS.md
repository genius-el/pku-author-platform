<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Auth & roles
- Staff auth uses Lovable Cloud email/password with public signup disabled; staff accounts are invited/created by an admin only. Why: internal staff system, not open registration.
- Staff roles (admin, collaborator) live only in `public.user_roles` and are checked via `public.has_role()` in RLS/server code, never on the client. Why: prevents privilege escalation.
- `/account` (customers) and `/admin` (staff) stay separate. Why: different audiences and permission models.
- Admin routes (`/admin/*`) are `ssr: false` and gate in `beforeLoad` via the `getAdminAccess` server function (has_role check). Why: session lives in the browser; the server decides access.

- CMS entries live in `public.content_entries`; admin-only writes via RLS (has_role admin), authorship/timestamps stamped by DB trigger, delete only when archived. Why: server-enforced, browser cannot spoof authors.
- Catalogue (resources + books) lives in `public.catalogue_items` with an item_type enum; price nullable (null = not set), external checkout link only, admin-only writes via RLS, authorship stamped by trigger. Why: one small table fits the current catalogue without commerce logic.
- Catalogue images live in the private `catalogue-images` bucket (public buckets are blocked by the workspace); `catalogue_items.image_path` stores `catalogue/{item-id}/{uuid}.{ext}`; admins write via storage RLS (has_role admin), public reads are signed server-side only for published items. Why: images stay portable and never leak for drafts.
- /resources and /books read published catalogue rows via the public `getPublishedCatalogue` server fn and fall back to the approved static copy when none are published. Why: pages never go empty during migration.
- Collaborators (has_role collaborator) can read all content/catalogue rows and create/edit only drafts; publish, archive, delete and roles stay admin-only via RLS; collaborator image writes are limited to draft/new items. Why: editorial help without lifecycle or security authority.
- Team management (/admin/team) uses admin-only server fns (team.functions.ts) that verify has_role admin as the caller, then use the service client server-side to invite users and add/remove only the collaborator role; user_roles stays client-write-denied. Why: browser never holds privileged keys or picks roles.

## Public illustrations
- Public editorial motifs are lightweight SVG components in the shared illustration library, with motion isolated to global CSS and reduced-motion support. Why: keeps the author site's visual language reusable without affecting content, administrative screens, or domain logic.
