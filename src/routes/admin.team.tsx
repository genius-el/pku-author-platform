import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { checkAdminAccess } from "@/lib/admin-access";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { listTeam, inviteCollaborator, removeCollaborator, type TeamMember } from "@/lib/team.functions";

export const Route = createFileRoute("/admin/team")({
  ssr: false,
  beforeLoad: async () => {
    const access = await checkAdminAccess();
    if (access.status === "signed-out") throw redirect({ to: "/admin/login" });
    if (access.status !== "staff" || access.role !== "admin") throw redirect({ to: "/admin/unauthorized" });
    return { adminEmail: access.email, role: access.role };
  },
  component: TeamPage,
});

const QK = ["admin", "team"];
const msg = (e: unknown) => (e instanceof Error && e.message ? e.message : "Something went wrong. Please try again.");

function TeamPage() {
  const { adminEmail, role } = Route.useRouteContext();
  const qc = useQueryClient();
  const fetchTeam = useServerFn(listTeam);
  const invite = useServerFn(inviteCollaborator);
  const remove = useServerFn(removeCollaborator);
  const { data, isLoading, error } = useQuery({ queryKey: QK, queryFn: () => fetchTeam() });
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const inviteMut = useMutation({
    mutationFn: () => invite({ data: { name, email } }),
    onSuccess: (r) => {
      setNotice({ kind: "ok", text: r.existing ? `${email} already had an account. Collaborator access is on and a setup email has been sent.` : `Invitation sent to ${email}.` });
      setName(""); setEmail(""); setAdding(false);
      qc.invalidateQueries({ queryKey: QK });
    },
    onError: (e) => setNotice({ kind: "err", text: msg(e) }),
  });
  const removeMut = useMutation({
    mutationFn: (m: TeamMember) => remove({ data: { userId: m.userId } }),
    onSuccess: () => { setNotice({ kind: "ok", text: "Access removed." }); qc.invalidateQueries({ queryKey: QK }); },
    onError: (e) => setNotice({ kind: "err", text: msg(e) }),
  });

  function submit(e: FormEvent) { e.preventDefault(); setNotice(null); inviteMut.mutate(); }

  return (
    <AdminShell email={adminEmail} role={role}>
      <main className="max-w-4xl px-5 py-10 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Team</p>
            <h1 className="mt-3 font-display text-4xl text-foreground">Team</h1>
            <p className="mt-2 text-sm text-muted-foreground">Manage the people who help you run the platform.</p>
          </div>
          {!adding && <Button onClick={() => { setAdding(true); setNotice(null); }}>+ ADD COLLABORATOR</Button>}
        </div>

        {notice && (
          <p role={notice.kind === "err" ? "alert" : "status"} className={`mt-6 rounded-md border px-4 py-3 text-sm ${notice.kind === "err" ? "border-destructive/40 text-destructive" : "border-primary/30 text-foreground"}`}>
            {notice.text}
          </p>
        )}

        {adding && (
          <form onSubmit={submit} className="mt-6 space-y-4 rounded-lg border border-border p-5">
            <h2 className="font-display text-xl text-foreground">Add collaborator</h2>
            <div className="space-y-1.5"><Label htmlFor="tm-name">Name</Label><Input id="tm-name" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div className="space-y-1.5"><Label htmlFor="tm-email">Email</Label><Input id="tm-email" type="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Role</Label><p className="text-sm text-foreground">Collaborator</p></div>
            <div className="flex gap-2">
              <Button type="submit" disabled={inviteMut.isPending}>{inviteMut.isPending ? "SENDING…" : "SEND INVITATION"}</Button>
              <Button type="button" variant="outline" onClick={() => setAdding(false)}>CANCEL</Button>
            </div>
          </form>
        )}

        <section className="mt-8">
          {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {error && <p role="alert" className="text-sm text-destructive">The team list could not be loaded.</p>}
          {data && data.length === 0 && <p className="text-sm text-muted-foreground">No collaborators yet.</p>}
          {data && data.length > 0 && (
            <ul className="divide-y divide-border rounded-lg border border-border">
              {data.map((m) => (
                <li key={m.userId} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-foreground">{m.name ?? m.email ?? "Unnamed"}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {m.name && m.email ? `${m.email} · ` : ""}Collaborator · {m.status} · Added {new Date(m.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" disabled={removeMut.isPending}
                    onClick={() => { if (confirm(`Remove collaborator access for ${m.email ?? "this person"}? Their sign-in account is kept.`)) removeMut.mutate(m); }}>
                    REMOVE ACCESS
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </AdminShell>
  );
}
