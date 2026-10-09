import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { siteAssets } from "@/components/site-assets";
import type { StaffRole } from "@/lib/admin-access";

function Brand({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Link to="/" aria-label="Priscilla Kuti-Ukaegbu home" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-charcoal">
        <img src={siteAssets.logo} alt="" className="h-6 w-6 object-contain" />
      </Link>
      <span className="font-display text-lg text-foreground">PKU Admin</span>
    </div>
  );
}

const futureSections = ["Orders", "Fulfilment", "Customers", "Affiliates", "Commissions", "Reader Outcomes", "Analytics", "Settings"];

const activeLinks = [
  { label: "Overview", to: "/admin" },
  { label: "Content", to: "/admin/content" },
  { label: "Products", to: "/admin/products" },
] as const;

export function AdminShell({ email, role, children }: { email: string | null; role: StaffRole; children: ReactNode }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  const nav = (
    <nav aria-label="Admin" className="space-y-1 text-sm">
      {[...activeLinks, ...(role === "admin" ? [{ label: "Team", to: "/admin/team" } as const] : [])].map((l) => (
        <Link
          key={l.to}
          to={l.to}
          activeOptions={{ exact: true }}
          onClick={() => setOpen(false)}
          className="block rounded-md px-3 py-2 text-foreground hover:bg-muted"
          activeProps={{ className: "bg-primary/10 font-bold", "aria-current": "page" }}
        >
          {l.label}
        </Link>
      ))}
      {role === "admin" && futureSections.map((s) => (
        <span key={s} aria-disabled="true" className="flex items-center justify-between px-3 py-2 text-muted-foreground">
          {s}<span className="text-[10px] uppercase tracking-wider">Soon</span>
        </span>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background md:grid md:grid-cols-[15rem_1fr]">
      <aside className="hidden border-r border-border p-5 md:block">
        <Brand className="mb-6" />
        {nav}
      </aside>
      <div className="min-w-0">
        <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <button className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Brand className="md:hidden" />
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">View website</Link>
            {email && <span className="hidden text-sm text-muted-foreground sm:inline">{email}{role === "collaborator" ? " · Collaborator" : ""}</span>}
            <Button size="sm" variant="outline" onClick={signOut}>SIGN OUT</Button>
          </div>
        </header>
        {open && <div className="border-b border-border p-5 md:hidden">{nav}</div>}
        {children}
      </div>
    </div>
  );
}
