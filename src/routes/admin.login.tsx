import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { checkAdminAccess } from "@/lib/admin-access";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  beforeLoad: async () => {
    const access = await checkAdminAccess();
    if (access.status === "staff") throw redirect({ to: "/admin" });
  },
  head: () => ({
    meta: [
      { title: "Admin sign in — Priscilla Kuti-Ukaegbu" },
      { name: "description", content: "Staff sign in for the Priscilla Kuti-Ukaegbu admin area." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin sign in — Priscilla Kuti-Ukaegbu" },
      { property: "og:description", content: "Staff sign in." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("Enter a valid email address.");
    if (!password) return setError("Enter your password.");
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (authError) {
      setLoading(false);
      setPassword("");
      return setError("That email and password combination did not work. Please try again.");
    }
    const access = await checkAdminAccess();
    setLoading(false);
    navigate({ to: access.status === "staff" ? "/admin" : "/admin/unauthorized", replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-display text-xl text-foreground">Priscilla Kuti-Ukaegbu</Link>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-primary">Admin access</p>
        <h1 className="mt-3 font-display text-4xl text-foreground">Sign in</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">For Priscilla and invited team members only.</p>
        <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" required />
          </div>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button type="submit" variant="charcoal" className="h-11 w-full" disabled={loading}>
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </Button>
        </form>
      </div>
    </main>
  );
}
