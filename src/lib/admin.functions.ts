import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type StaffRole = "admin" | "collaborator";

/**
 * Server-side staff check. Verifies the bearer token, then asks the database
 * (has_role) which staff role the caller holds. Never trusts the browser.
 * Real write permissions are enforced separately by RLS.
 */
export const getAdminAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const check = async (role: StaffRole) => {
      const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: role });
      if (error) throw new Error("Could not verify access");
      return data === true;
    };
    const role: StaffRole | null = (await check("admin")) ? "admin" : (await check("collaborator")) ? "collaborator" : null;
    const email = typeof context.claims.email === "string" ? context.claims.email : null;
    return { isAdmin: role === "admin", role, email };
  });
