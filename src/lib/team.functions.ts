import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type TeamMember = {
  userId: string;
  name: string | null;
  email: string | null;
  status: "Invited" | "Active";
  addedAt: string;
};

type Ctx = { supabase: { rpc: (fn: "has_role", args: { _user_id: string; _role: "admin" }) => PromiseLike<{ data: boolean | null; error: unknown }> }; userId: string };

/** Verifies the caller holds the admin role, as themselves, through the database. */
async function assertAdmin(context: Ctx) {
  const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error || data !== true) throw new Error("Forbidden");
}

async function loadAdminClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

export const listTeam = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<TeamMember[]> => {
    await assertAdmin(context as unknown as Ctx);
    const admin = await loadAdminClient();
    const { data: rows, error } = await admin
      .from("user_roles").select("user_id, created_at").eq("role", "collaborator").order("created_at");
    if (error) throw new Error("Could not load team");
    const members: TeamMember[] = [];
    for (const r of rows ?? []) {
      const { data } = await admin.auth.admin.getUserById(r.user_id);
      const u = data?.user;
      const meta = (u?.user_metadata ?? {}) as Record<string, unknown>;
      members.push({
        userId: r.user_id,
        name: typeof meta["full_name"] === "string" ? meta["full_name"] : null,
        email: u?.email ?? null,
        status: u?.last_sign_in_at ? "Active" : "Invited",
        addedAt: r.created_at,
      });
    }
    return members;
  });

// Invitations always return to the deployed PKU site, never the editor preview.
const INVITE_REDIRECT = "https://priscillakutiukaegbu.lovable.app/admin/accept-invite";

export const inviteCollaborator = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().toLowerCase().email().max(255),
  }).strict().parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as unknown as Ctx);
    const admin = await loadAdminClient();

    let userId: string | null = null;
    const { data: invited, error } = await admin.auth.admin.inviteUserByEmail(data.email, {
      data: { full_name: data.name },
      redirectTo: INVITE_REDIRECT,
    });
    if (invited?.user) userId = invited.user.id;
    else if (error && /already|registered|exists/i.test(error.message)) {
      // Existing account: never touch their credentials directly.
      for (let page = 1; page <= 20 && !userId; page++) {
        const { data: list } = await admin.auth.admin.listUsers({ page, perPage: 200 });
        const hit = list?.users.find((u) => u.email?.toLowerCase() === data.email);
        if (hit) userId = hit.id;
        if (!list || list.users.length < 200) break;
      }
    } else if (error) {
      console.error("invite failed", error.message);
      throw new Error("The invitation could not be sent. Please try again.");
    }
    if (!userId) throw new Error("The invitation could not be sent. Please try again.");
    if (userId === context.userId) throw new Error("You cannot change your own access.");

    const { data: isAdminRow } = await admin.from("user_roles").select("id").eq("user_id", userId).eq("role", "admin").maybeSingle();
    if (isAdminRow) throw new Error("This person is already an administrator.");

    // Role is fixed server-side; the browser cannot choose it.
    const { error: roleErr } = await admin.from("user_roles")
      .upsert({ user_id: userId, role: "collaborator" }, { onConflict: "user_id,role", ignoreDuplicates: true });
    if (roleErr) throw new Error("Access could not be granted. Please try again.");

    if (!invited?.user) {
      // Existing account: email a one-time link to the same set-password page.
      const { error: linkErr } = await admin.auth.resetPasswordForEmail(data.email, { redirectTo: INVITE_REDIRECT });
      if (linkErr) {
        console.error("setup link failed", linkErr.message);
        throw new Error("Access was granted, but the setup email could not be sent. Please try again.");
      }
    }
    return { ok: true, existing: !invited?.user };
  });

export const removeCollaborator = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ userId: z.string().uuid() }).strict().parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as unknown as Ctx);
    if (data.userId === context.userId) throw new Error("You cannot change your own access.");
    const admin = await loadAdminClient();
    // Removes app access only; the sign-in account itself is kept.
    const { error } = await admin.from("user_roles").delete().eq("user_id", data.userId).eq("role", "collaborator");
    if (error) throw new Error("Access could not be removed. Please try again.");
    return { ok: true };
  });
