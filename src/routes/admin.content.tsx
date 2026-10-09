import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { checkAdminAccess } from "@/lib/admin-access";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  contentTypeLabels, statusLabels, listContent, saveContent, setContentStatus, deleteContent, slugify,
  type ContentEntry, type ContentInput, type ContentStatus, type ContentType,
} from "@/lib/content";

export const Route = createFileRoute("/admin/content")({
  ssr: false,
  beforeLoad: async () => {
    const access = await checkAdminAccess();
    if (access.status === "signed-out") throw redirect({ to: "/admin/login" });
    if (access.status === "forbidden") throw redirect({ to: "/admin/unauthorized" });
    return { adminEmail: access.email, role: access.role };
  },
  component: ContentPage,
});

const QK = ["admin", "content"];
const selectCls = "h-9 w-full rounded-md border border-input bg-background px-3 text-sm";
const statusCls: Record<ContentStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  published: "bg-primary/10 text-primary",
  archived: "border border-border text-muted-foreground",
};

function errMsg(e: unknown) {
  const m = e instanceof Error ? e.message : String(e);
  if (/duplicate key.*slug/i.test(m)) return "That slug is already used by another entry.";
  if (/slug_check/i.test(m)) return "Slugs can only use lowercase letters, numbers and single hyphens.";
  return m || "Something went wrong. Please try again.";
}

function ContentPage() {
  const { adminEmail, role } = Route.useRouteContext();
  const isAdmin = role === "admin";
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({ queryKey: QK, queryFn: listContent });
  const [editing, setEditing] = useState<ContentEntry | "new" | null>(null);
  const [filter, setFilter] = useState<ContentStatus | "all">("all");
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const done = (text: string) => { setNotice({ kind: "ok", text }); qc.invalidateQueries({ queryKey: QK }); };
  const fail = (e: unknown) => setNotice({ kind: "err", text: errMsg(e) });

  const statusMut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContentStatus }) => setContentStatus(id, status),
    onSuccess: (_, v) => done(`Moved to ${statusLabels[v.status].toLowerCase()}.`),
    onError: fail,
  });
  const deleteMut = useMutation({
    mutationFn: deleteContent,
    onSuccess: () => done("Entry deleted."),
    onError: fail,
  });

  const rows = (data ?? []).filter((r) => filter === "all" || r.status === filter);

  return (
    <AdminShell email={adminEmail} role={role}>
      <main className="max-w-5xl px-5 py-10 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Content</p>
            <h1 className="mt-3 font-display text-4xl text-foreground">Website content</h1>
          </div>
          {!editing && <Button onClick={() => { setNotice(null); setEditing("new"); }}>NEW ENTRY</Button>}
        </div>

        {notice && (
          <p role="status" className={`mt-6 rounded-md border px-4 py-3 text-sm ${notice.kind === "ok" ? "border-primary/30 text-foreground" : "border-destructive/40 text-destructive"}`}>
            {notice.text}
          </p>
        )}

        {editing ? (
          <Editor isAdmin={isAdmin}
            entry={editing === "new" ? null : editing}
            onCancel={() => setEditing(null)}
            onSaved={(msg) => { setEditing(null); done(msg); }}
          />
        ) : (
          <section className="mt-8">
            <div role="tablist" aria-label="Filter by status" className="flex flex-wrap gap-2 text-sm">
              {(["all", "draft", "published", "archived"] as const).map((s) => (
                <button key={s} role="tab" aria-selected={filter === s} onClick={() => setFilter(s)}
                  className={`rounded-full px-3 py-1 ${filter === s ? "bg-foreground text-background" : "border border-border text-muted-foreground"}`}>
                  {s === "all" ? "All" : statusLabels[s]}
                </button>
              ))}
            </div>

            {isLoading && <p className="mt-8 text-sm text-muted-foreground">Loading entries…</p>}
            {error && <p className="mt-8 text-sm text-destructive">Could not load content. {errMsg(error)}</p>}
            {!isLoading && !error && rows.length === 0 && (
              <p className="mt-8 rounded-md border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                {filter === "all" ? "No entries yet. Create the first one when you are ready." : `No ${statusLabels[filter].toLowerCase()} entries.`}
              </p>
            )}

            <ul className="mt-6 divide-y divide-border border-y border-border">
              {rows.map((r) => (
                <li key={r.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`rounded-full px-2 py-0.5 font-bold uppercase tracking-wider ${statusCls[r.status]}`}>{statusLabels[r.status]}</span>
                      <span className="text-muted-foreground">{contentTypeLabels[r.content_type]}</span>
                    </div>
                    <p className="mt-1 truncate font-display text-lg text-foreground">{r.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Updated {new Date(r.updated_at).toLocaleString()}
                      {r.published_at && ` · Publish date ${new Date(r.published_at).toLocaleDateString()}`}
                      {r.slug && ` · /${r.slug}`}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(isAdmin || r.status === "draft") ? <Button size="sm" variant="outline" onClick={() => { setNotice(null); setEditing(r); }}>Edit</Button> : <span className="self-center text-xs text-muted-foreground">Only an admin can change this</span>}
                    {isAdmin && r.status !== "published" && <Button size="sm" variant="outline" disabled={statusMut.isPending} onClick={() => statusMut.mutate({ id: r.id, status: "published" })}>Publish</Button>}
                    {isAdmin && r.status === "published" && <Button size="sm" variant="outline" disabled={statusMut.isPending} onClick={() => statusMut.mutate({ id: r.id, status: "draft" })}>Unpublish</Button>}
                    {isAdmin && r.status !== "archived" && <Button size="sm" variant="outline" disabled={statusMut.isPending} onClick={() => statusMut.mutate({ id: r.id, status: "archived" })}>Archive</Button>}
                    {isAdmin && r.status === "archived" && (
                      <Button size="sm" variant="destructive" disabled={deleteMut.isPending}
                        onClick={() => { if (confirm(`Delete "${r.title}" permanently? This cannot be undone.`)) deleteMut.mutate(r.id); }}>
                        Delete
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </AdminShell>
  );
}

function toLocalInput(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function Editor({ isAdmin, entry, onCancel, onSaved }: { isAdmin: boolean; entry: ContentEntry | null; onCancel: () => void; onSaved: (msg: string) => void }) {
  const [title, setTitle] = useState(entry?.title ?? "");
  const [type, setType] = useState<ContentType>(entry?.content_type ?? "article");
  const [slug, setSlug] = useState(entry?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!entry?.slug);
  const [excerpt, setExcerpt] = useState(entry?.excerpt ?? "");
  const [body, setBody] = useState(entry?.body ?? "");
  const [status, setStatus] = useState<ContentStatus>(entry?.status ?? "draft");
  const [publishedAt, setPublishedAt] = useState(toLocalInput(entry?.published_at ?? null));
  const [error, setError] = useState<string | null>(null);

  const mut = useMutation({
    mutationFn: (input: ContentInput) => saveContent(entry?.id ?? null, input),
    onSuccess: () => onSaved(entry ? "Changes saved." : "Entry created."),
    onError: (e) => setError(errMsg(e)),
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) return setError("Please add a title.");
    mut.mutate({
      content_type: type,
      title: title.trim(),
      slug: slug.trim() || null,
      excerpt: excerpt.trim() || null,
      body,
      status,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : null,
    });
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
      <h2 className="font-display text-2xl text-foreground">{entry ? "Edit entry" : "New entry"}</h2>
      <div className="space-y-2">
        <Label htmlFor="c-title">Title</Label>
        <Input id="c-title" value={title} maxLength={200} required
          onChange={(e) => { setTitle(e.target.value); if (!slugTouched) setSlug(slugify(e.target.value)); }} />
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="c-type">Content type</Label>
          <select id="c-type" className={selectCls} value={type} onChange={(e) => setType(e.target.value as ContentType)}>
            {Object.entries(contentTypeLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-status">Status</Label>
          <select id="c-status" className={selectCls} disabled={!isAdmin} value={status} onChange={(e) => setStatus(e.target.value as ContentStatus)}>
            {Object.entries(statusLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          {!isAdmin && <p className="text-xs text-muted-foreground">Saved as a draft. An admin publishes it.</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-date">Publish date</Label>
          <Input id="c-date" type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="c-slug">Slug</Label>
        <Input id="c-slug" value={slug} maxLength={80} onChange={(e) => { setSlugTouched(true); setSlug(slugify(e.target.value)); }} />
        <p className="text-xs text-muted-foreground">Lowercase words joined by hyphens. Leave empty if the entry does not need its own address.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="c-excerpt">Short description</Label>
        <Textarea id="c-excerpt" rows={2} maxLength={500} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="c-body">Body</Label>
        <Textarea id="c-body" rows={16} value={body} onChange={(e) => setBody(e.target.value)} className="font-mono text-sm leading-6" />
      </div>
      <p className="text-xs text-muted-foreground">Published entries with no publish date get today's date automatically. A future date keeps the entry hidden from visitors until then.</p>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-3">
        <Button type="submit" disabled={mut.isPending}>{mut.isPending ? "Saving…" : entry ? "SAVE CHANGES" : "CREATE ENTRY"}</Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={mut.isPending}>Cancel</Button>
      </div>
    </form>
  );
}
