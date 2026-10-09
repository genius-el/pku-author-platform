import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/accept-invite")({
  ssr: false,
  component: AcceptInvite,
});

function AcceptInvite() {
  const navigate = useNavigate();
  const [ready, setReady] = useState<"wait" | "yes" | "no">("wait");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { if (s) setReady("yes"); });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady("yes");
      else setTimeout(() => setReady((r) => (r === "wait" ? "no" : r)), 3000);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (password.length < 8) return setErr("Use at least 8 characters.");
    if (password !== confirm) return setErr("The passwords do not match.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return setErr(/weak|pwned|leaked/i.test(error.message) ? "Please choose a stronger password." : "Your password could not be saved. Please try again.");
    navigate({ to: "/admin", replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl text-foreground">Welcome to the team.</h1>
        {ready === "wait" && <p className="mt-3 text-sm text-muted-foreground">Checking your invitation…</p>}
        {ready === "no" && <p className="mt-3 text-sm text-muted-foreground">This invitation link is invalid or has expired. Please ask for a new invitation.</p>}
        {ready === "yes" && (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground">Choose a password to finish setting up your account.</p>
            <div className="space-y-1.5"><Label htmlFor="pw">Password</Label><Input id="pw" type="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <div className="space-y-1.5"><Label htmlFor="pw2">Confirm password</Label><Input id="pw2" type="password" autoComplete="new-password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} /></div>
            {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
            <Button type="submit" className="w-full" disabled={busy}>{busy ? "SAVING…" : "SET PASSWORD"}</Button>
          </form>
        )}
      </div>
    </main>
  );
}
