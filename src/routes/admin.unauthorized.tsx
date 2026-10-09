import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/unauthorized")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "No access — Priscilla Kuti-Ukaegbu" },
      { name: "description", content: "This account does not have access to the admin area." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "No access — Priscilla Kuti-Ukaegbu" },
      { property: "og:description", content: "This account does not have access to the admin area." },
    ],
  }),
  component: Unauthorized,
});

function Unauthorized() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
      <div className="max-w-md text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Admin access</p>
        <h1 className="mt-3 font-display text-4xl text-foreground">This area is not open to your account.</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">You are signed in, but this account does not have permission to view the admin area. If you think this is a mistake, contact Priscilla.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button asChild variant="charcoal"><Link to="/">BACK TO THE WEBSITE</Link></Button>
          <Button variant="outline" onClick={signOut}>SIGN OUT</Button>
        </div>
      </div>
    </main>
  );
}
