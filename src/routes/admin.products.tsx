import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { checkAdminAccess } from "@/lib/admin-access";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { statusLabels, slugify } from "@/lib/content";
import {
  catalogueTypeLabels, listCatalogue, saveCatalogueItem, setCatalogueStatus, deleteCatalogueItem, formatPrice,
  validateImage, uploadCatalogueImage, removeCatalogueImage, signedImageUrl,
  type CatalogueItem, type CatalogueInput, type CatalogueStatus, type CatalogueType, type Currency,
} from "@/lib/catalogue";

export const Route = createFileRoute("/admin/products")({
  ssr: false,
  beforeLoad: async () => {
    const access = await checkAdminAccess();
    if (access.status === "signed-out") throw redirect({ to: "/admin/login" });
    if (access.status === "forbidden") throw redirect({ to: "/admin/unauthorized" });
    return { adminEmail: access.email, role: access.role };
  },
  component: ProductsPage,
});

const QK = ["admin", "catalogue"];
const selectCls = "h-9 w-full rounded-md border border-input bg-background px-3 text-sm";
const statusCls: Record<CatalogueStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  published: "bg-primary/10 text-primary",
  archived: "border border-border text-muted-foreground",
};

function errMsg(e: unknown) {
  const m = e instanceof Error ? e.message : (e as { message?: string })?.message ?? String(e);
  if (/duplicate key.*slug/i.test(m)) return "That web address is already used by another item.";
  if (/slug_check/i.test(m)) return "Web addresses can only use lowercase letters, numbers and single hyphens.";
  if (/image_url_check|external_url_check/i.test(m)) return "Links must start with https://";
  if (/price/i.test(m)) return "Please check the price and currency.";
  return m || "Something went wrong. Please try again.";
}

function ProductsPage() {
  const { adminEmail, role } = Route.useRouteContext();
  const isAdmin = role === "admin";
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({ queryKey: QK, queryFn: listCatalogue });
  const [editing, setEditing] = useState<CatalogueItem | "new" | null>(null);
  const [filter, setFilter] = useState<CatalogueStatus | "all">("all");
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const done = (text: string) => { setNotice({ kind: "ok", text }); qc.invalidateQueries({ queryKey: QK }); };
  const fail = (e: unknown) => setNotice({ kind: "err", text: errMsg(e) });

  const statusMut = useMutation({
    mutationFn: ({ id, status }: { id: string; status: CatalogueStatus }) => setCatalogueStatus(id, status),
    onSuccess: (_, v) => done(`Moved to ${statusLabels[v.status].toLowerCase()}.`),
    onError: fail,
  });
  const deleteMut = useMutation({ mutationFn: (r: CatalogueItem) => deleteCatalogueItem(r.id, r.image_path), onSuccess: () => done("Item deleted."), onError: fail });

  const rows = (data ?? []).filter((r) => filter === "all" || r.status === filter);

  return (
    <AdminShell email={adminEmail} role={role}>
      <main className="max-w-5xl px-5 py-10 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Products</p>
            <h1 className="mt-3 font-display text-4xl text-foreground">Resources and books</h1>
          </div>
          {!editing && <Button onClick={() => { setNotice(null); setEditing("new"); }}>NEW ITEM</Button>}
        </div>

        {notice && (
          <p role="status" className={`mt-6 rounded-md border px-4 py-3 text-sm ${notice.kind === "ok" ? "border-primary/30 text-foreground" : "border-destructive/40 text-destructive"}`}>
            {notice.text}
          </p>
        )}

        {editing ? (
          <Editor isAdmin={isAdmin} item={editing === "new" ? null : editing} onCancel={() => setEditing(null)}
            onSaved={(msg) => { setEditing(null); done(msg); }} />
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

            {isLoading && <p className="mt-8 text-sm text-muted-foreground">Loading items…</p>}
            {error && <p className="mt-8 text-sm text-destructive">Could not load the catalogue. {errMsg(error)}</p>}
            {!isLoading && !error && rows.length === 0 && (
              <p className="mt-8 rounded-md border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                {filter === "all" ? "No items yet. Add the first one when you are ready." : `No ${statusLabels[filter].toLowerCase()} items.`}
              </p>
            )}

            <ul className="mt-6 divide-y divide-border border-y border-border">
              {rows.map((r) => (
                <li key={r.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`rounded-full px-2 py-0.5 font-bold uppercase tracking-wider ${statusCls[r.status]}`}>{statusLabels[r.status]}</span>
                      <span className="text-muted-foreground">{catalogueTypeLabels[r.item_type]}</span>
                      <span className="text-muted-foreground">· {formatPrice(r.price_amount, r.price_currency)}</span>
                    </div>
                    <p className="mt-1 truncate font-display text-lg text-foreground">{r.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Updated {new Date(r.updated_at).toLocaleString()}
                      {r.slug && ` · /${r.slug}`}
                      {r.external_url ? " · Checkout link set" : " · No checkout link"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(isAdmin || r.status === "draft") ? <Button size="sm" variant="outline" onClick={() => { setNotice(null); setEditing(r); }}>Edit</Button> : <span className="self-center text-xs text-muted-foreground">Only an admin can change this</span>}
                    {isAdmin && r.status !== "published" && <Button size="sm" variant="outline" disabled={statusMut.isPending} onClick={() => statusMut.mutate({ id: r.id, status: "published" })}>Publish</Button>}
                    {isAdmin && r.status === "published" && <Button size="sm" variant="outline" disabled={statusMut.isPending} onClick={() => statusMut.mutate({ id: r.id, status: "draft" })}>Unpublish</Button>}
                    {isAdmin && r.status !== "archived" && <Button size="sm" variant="outline" disabled={statusMut.isPending} onClick={() => statusMut.mutate({ id: r.id, status: "archived" })}>Archive</Button>}
                    {isAdmin && r.status === "archived" && (
                      <Button size="sm" variant="destructive" disabled={deleteMut.isPending}
                        onClick={() => { if (confirm(`Delete "${r.title}" permanently? This cannot be undone.`)) deleteMut.mutate(r); }}>
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

function Editor({ isAdmin, item, onCancel, onSaved }: { isAdmin: boolean; item: CatalogueItem | null; onCancel: () => void; onSaved: (msg: string) => void }) {
  const [itemId] = useState(() => item?.id ?? crypto.randomUUID());
  const [title, setTitle] = useState(item?.title ?? "");
  const [type, setType] = useState<CatalogueType>(item?.item_type ?? "digital_resource");
  const [slug, setSlug] = useState(item?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!item?.slug);
  const [shortDesc, setShortDesc] = useState(item?.short_description ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [price, setPrice] = useState(item?.price_amount != null ? String(item.price_amount) : "");
  const [currency, setCurrency] = useState<Currency>((item?.price_currency as Currency) ?? "NGN");
  const [externalUrl, setExternalUrl] = useState(item?.external_url ?? "");
  const [status, setStatus] = useState<CatalogueStatus>(item?.status ?? "draft");
  const [error, setError] = useState<string | null>(null);
  // Image: existing stored path, a newly picked file, or a pending removal.
  const oldPath = item?.image_path ?? null;
  const [file, setFile] = useState<File | null>(null);
  const [removed, setRemoved] = useState(false);
  const [imgError, setImgError] = useState<string | null>(null);
  const existingPreview = useQuery({
    queryKey: ["admin", "catalogue-img", oldPath],
    queryFn: () => signedImageUrl(oldPath!),
    enabled: !!oldPath,
  });
  const [filePreview, setFilePreview] = useState<string | null>(null);
  useEffect(() => {
    if (!file) { setFilePreview(null); return; }
    const u = URL.createObjectURL(file);
    setFilePreview(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);
  const legacyUrl = !oldPath && !removed ? item?.image_url ?? null : null;
  const preview = filePreview ?? (removed ? null : existingPreview.data ?? legacyUrl);

  const mut = useMutation({
    mutationFn: async (input: Omit<CatalogueInput, "image_path" | "image_url">) => {
      let path = removed ? null : oldPath;
      let uploaded: string | null = null;
      if (file) { uploaded = await uploadCatalogueImage(itemId, file); path = uploaded; }
      try {
        await saveCatalogueItem(itemId, !item, {
          ...input,
          image_path: path,
          image_url: removed || file ? null : item?.image_url ?? null,
        });
      } catch (e) {
        if (uploaded) await removeCatalogueImage(uploaded); // don't leave an orphan
        throw e;
      }
      if (oldPath && oldPath !== path) await removeCatalogueImage(oldPath);
    },
    onSuccess: () => onSaved(item ? "Changes saved." : "Item created."),
    onError: (e) => setError(errMsg(e)),
  });

  function pick(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    const v = validateImage(f);
    if (v) { setImgError(v); return; }
    setImgError(null);
    setFile(f);
    setRemoved(false);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) return setError("Please add a title.");
    const p = price.trim();
    const amount = p === "" ? null : Number(p);
    if (amount !== null && (!Number.isFinite(amount) || amount < 0)) return setError("Price must be a number of 0 or more, or left empty.");
    if (externalUrl.trim() && !/^https:\/\//.test(externalUrl.trim())) return setError("Links must start with https://");
    mut.mutate({
      item_type: type,
      title: title.trim(),
      slug: slug.trim() || null,
      short_description: shortDesc.trim() || null,
      description,
      price_amount: amount,
      price_currency: amount === null ? null : currency,
      external_url: externalUrl.trim() || null,
      status,
    });
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
      <h2 className="font-display text-2xl text-foreground">{item ? "Edit item" : "New item"}</h2>
      <div className="space-y-2">
        <Label htmlFor="p-title">Title</Label>
        <Input id="p-title" value={title} maxLength={200} required
          onChange={(e) => { setTitle(e.target.value); if (!slugTouched) setSlug(slugify(e.target.value)); }} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="p-type">Type</Label>
          <select id="p-type" className={selectCls} value={type} onChange={(e) => setType(e.target.value as CatalogueType)}>
            {Object.entries(catalogueTypeLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="p-status">Status</Label>
          <select id="p-status" className={selectCls} disabled={!isAdmin} value={status} onChange={(e) => setStatus(e.target.value as CatalogueStatus)}>
            {Object.entries(statusLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          {!isAdmin && <p className="text-xs text-muted-foreground">Saved as a draft. An admin publishes it.</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="p-slug">Web address name</Label>
        <Input id="p-slug" value={slug} maxLength={80} onChange={(e) => { setSlugTouched(true); setSlug(slugify(e.target.value)); }} />
        <p className="text-xs text-muted-foreground">Lowercase words joined by hyphens. Optional.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="p-short">Short description</Label>
        <Textarea id="p-short" rows={2} maxLength={500} value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="p-desc">Description</Label>
        <Textarea id="p-desc" rows={8} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="grid gap-5 sm:grid-cols-[1fr_8rem]">
        <div className="space-y-2">
          <Label htmlFor="p-price">Price</Label>
          <Input id="p-price" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
          <p className="text-xs text-muted-foreground">Leave empty until the price is confirmed. Enter 0 only if the item is genuinely free.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="p-cur">Currency</Label>
          <select id="p-cur" className={selectCls} value={currency} onChange={(e) => setCurrency(e.target.value as Currency)}>
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="p-url">Checkout / delivery link</Label>
        <Input id="p-url" type="url" placeholder="https://" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} />
        <p className="text-xs text-muted-foreground">For example, the Selar page for this resource. Leave empty until the link is confirmed.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="p-img">Image</Label>
        {preview ? (
          <img src={preview} alt="" className="h-40 w-auto max-w-full rounded-md border border-border object-contain" />
        ) : (
          <p className="text-xs text-muted-foreground">No image. The public page will use its usual design.</p>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex h-8 cursor-pointer items-center rounded-md border border-input px-3 text-sm focus-within:ring-2 focus-within:ring-ring">
            {preview ? "Replace image" : "Choose image"}
            <input id="p-img" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={pick} disabled={mut.isPending} />
          </label>
          {preview && (
            <Button type="button" size="sm" variant="outline" disabled={mut.isPending}
              onClick={() => { setFile(null); setRemoved(true); setImgError(null); }}>Remove image</Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">JPG, PNG or WebP, up to 5 MB. Changes apply when you save.</p>
        {imgError && <p role="alert" className="text-sm text-destructive">{imgError}</p>}
      </div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-3">
        <Button type="submit" disabled={mut.isPending}>{mut.isPending ? "Saving…" : item ? "SAVE CHANGES" : "CREATE ITEM"}</Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={mut.isPending}>Cancel</Button>
      </div>
    </form>
  );
}
