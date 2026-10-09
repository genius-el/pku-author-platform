import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { checkAdminAccess } from "@/lib/admin-access";
import { AdminShell } from "@/components/admin-shell";
import { listContent, contentTypeLabels, statusLabels } from "@/lib/content";
import { listCatalogue, catalogueTypeLabels } from "@/lib/catalogue";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  beforeLoad: async () => {
    const access = await checkAdminAccess();
    if (access.status === "signed-out") throw redirect({ to: "/admin/login" });
    if (access.status === "forbidden") throw redirect({ to: "/admin/unauthorized" });
    return { adminEmail: access.email, role: access.role };
  },
  component: AdminHome,
});

const dateFmt = new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

function Section({ label, title, action, children }: { label: string; title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{label}</p>
          <h2 className="mt-1 font-display text-2xl text-foreground">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Stat({ label, value, note, muted }: { label: string; value: ReactNode; note: string; muted?: boolean }) {
  return (
    <div className={`rounded-lg border border-border p-4 ${muted ? "bg-muted/40" : "bg-card"}`}>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-2 font-display ${muted ? "text-lg text-muted-foreground" : "text-3xl text-foreground"}`}>{value}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{note}</p>
    </div>
  );
}

function Future({ title, note }: { title: string; note: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border p-4">
      <p className="text-sm font-bold text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{note}</p>
      <p className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground">Not connected yet</p>
    </div>
  );
}

const linkCls = "text-xs font-bold uppercase tracking-wider text-primary underline-offset-4 hover:underline";

function AdminHome() {
  const { adminEmail, role } = Route.useRouteContext();
  const isAdmin = role === "admin";
  const content = useQuery({ queryKey: ["admin", "content"], queryFn: listContent });
  const catalogue = useQuery({ queryKey: ["admin", "catalogue"], queryFn: listCatalogue });

  const c = content.data ?? [];
  const p = catalogue.data ?? [];
  const count = <T extends { status: string }>(rows: T[], s: string) => rows.filter((r) => r.status === s).length;
  const loading = content.isLoading || catalogue.isLoading;
  const failed = content.isError || catalogue.isError;
  const show = (n: number, q: { isLoading: boolean; isError: boolean }) => (q.isLoading ? "…" : q.isError ? "—" : n);

  // Attention: derived only from real fields — drafts waiting, and published items missing a price or checkout link.
  const incompleteProducts = p.filter((i) => i.status === "published" && (i.price_amount === null || !i.external_url));
  const attention = count(c, "draft") + count(p, "draft") + incompleteProducts.length;

  const activity = [
    ...c.map((e) => ({ id: `c-${e.id}`, kind: contentTypeLabels[e.content_type], title: e.title, status: e.status, at: e.updated_at, created: e.created_at === e.updated_at, to: "/admin/content" as const })),
    ...p.map((i) => ({ id: `p-${i.id}`, kind: catalogueTypeLabels[i.item_type], title: i.title, status: i.status, at: i.updated_at, created: i.created_at === i.updated_at, to: "/admin/products" as const })),
  ].sort((a, b) => b.at.localeCompare(a.at)).slice(0, 6);

  return (
    <AdminShell email={adminEmail} role={role}>
      <main className="mx-auto max-w-6xl space-y-10 px-5 py-10 md:px-10">
        <header>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Internal operations dashboard</p>
          <h1 className="mt-3 font-display text-4xl text-foreground">{isAdmin ? "Welcome back, Priscilla." : "Welcome back."}</h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            The private operating view for the PKU platform{isAdmin ? "" : ". You are signed in as a collaborator"}.
          </p>
          {failed && <p role="alert" className="mt-4 text-sm text-destructive">Some figures did not load. Please refresh the page.</p>}
        </header>

        <section aria-label="Snapshot" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat muted label="Orders & revenue" value="Not connected" note="Website commerce will populate this." />
          <Stat label="Published products" value={show(count(p, "published"), catalogue)} note={`${show(count(p, "draft"), catalogue)} in draft`} />
          <Stat label="Published content" value={show(count(c, "published"), content)} note={`${show(count(c, "draft"), content)} in draft`} />
          <Stat label="Needs attention" value={loading ? "…" : failed ? "—" : attention} note="Drafts waiting, plus published products missing a price or link." />
        </section>

        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-10">
            <Section label="Catalogue & content" title="What is live" action={<div className="flex gap-4"><Link to="/admin/content" className={linkCls}>View content</Link><Link to="/admin/products" className={linkCls}>Manage products</Link></div>}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
                {([["Products published", count(p, "published")], ["Products in draft", count(p, "draft")], ["Products archived", count(p, "archived")], ["Content published", count(c, "published")], ["Content in draft", count(c, "draft")], ["Content archived", count(c, "archived")]] as const).map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-2 border-b border-border pb-2">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-bold text-foreground">{loading ? "…" : v}</dd>
                  </div>
                ))}
              </dl>
              {incompleteProducts.length > 0 && (
                <div className="mt-5 rounded-lg bg-secondary/60 p-4 text-sm">
                  <p className="font-bold text-foreground">Published without a price or checkout link</p>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    {incompleteProducts.slice(0, 5).map((i) => <li key={i.id}>{i.title}</li>)}
                  </ul>
                </div>
              )}
            </Section>

            <Section label="Recent activity" title="Latest changes">
              {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : activity.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nothing has been added yet. New content and products will appear here.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {activity.map((a) => (
                    <li key={a.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 text-sm">
                      <Link to={a.to} className="min-w-0 flex-1 truncate text-foreground hover:underline">
                        <span className="text-muted-foreground">{a.kind} · </span>{a.title}
                      </Link>
                      <span className="text-xs text-muted-foreground">{a.created ? "Created" : "Updated"} · {statusLabels[a.status]} · {dateFmt.format(new Date(a.at))}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            <Section label="Sales & orders" title="Orders and revenue">
              <p className="rounded-lg border border-dashed border-border p-5 text-sm leading-6 text-muted-foreground">Order information will appear here once website commerce is set up: orders, revenue, payment status, preorders, and filtering by product, date and source. No orders are being recorded yet.</p>
            </Section>

            <Section label="Inventory & fulfilment" title="Stock and delivery">
              <p className="rounded-lg border border-dashed border-border p-5 text-sm leading-6 text-muted-foreground">Stock, preorder quantities and delivery progress will appear here after the order workflow is in place.</p>
            </Section>
          </div>

          <aside className="space-y-10">
            <Section label="Quick actions" title="Get to work">
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/admin/content" className="rounded-md border border-border px-4 py-3 text-foreground hover:bg-muted">Create or edit content</Link>
                <Link to="/admin/products" className="rounded-md border border-border px-4 py-3 text-foreground hover:bg-muted">Manage products</Link>
                {isAdmin && <Link to="/admin/team" className="rounded-md border border-border px-4 py-3 text-foreground hover:bg-muted">Manage team</Link>}
                <Link to="/" className="rounded-md border border-border px-4 py-3 text-foreground hover:bg-muted">View website</Link>
              </div>
            </Section>
            {isAdmin && (
              <Section label="Later" title="Coming areas">
                <div className="space-y-3">
                  <Future title="Customers & audience" note="Customer data will appear when commerce is connected." />
                  <Future title="Affiliates & campus partners" note="Arrives with the partnership tools." />
                  <Future title="Testimonials & impact" note="Arrives with reader stories and reviews." />
                </div>
              </Section>
            )}
          </aside>
        </div>
      </main>
    </AdminShell>
  );
}
