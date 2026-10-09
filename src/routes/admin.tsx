import { createFileRoute, Link, Outlet, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

function AdminError({ reset }: { reset: () => void }) {
  const router = useRouter();
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="max-w-sm text-center">
        <h1 className="font-display text-3xl text-foreground">This page did not load.</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Please try again. If it keeps happening, sign in again.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Button onClick={() => { reset(); router.invalidate(); }}>TRY AGAIN</Button>
          <Button asChild variant="outline"><Link to="/admin/login">SIGN IN</Link></Button>
        </div>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — Priscilla Kuti-Ukaegbu" },
      { name: "description", content: "Private staff area for Priscilla Kuti-Ukaegbu." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin — Priscilla Kuti-Ukaegbu" },
      { property: "og:description", content: "Private staff area." },
    ],
  }),
  errorComponent: AdminError,
  pendingComponent: () => <div className="min-h-screen bg-background" />,
  component: () => <Outlet />,
});
