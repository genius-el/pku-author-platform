import { createClient } from "npm:@supabase/supabase-js@2";
import { adminClient, corsHeaders, json, publishableKey } from "../_shared/team.ts";

const teamCorsHeaders = {
  ...corsHeaders,
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
};

type Action = "list" | "invite" | "remove";

function fail(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...teamCorsHeaders, "Content-Type": "application/json" },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function invitationRedirectUrl() {
  const configuredUrl = Deno.env.get("TEAM_INVITE_REDIRECT_URL");
  if (!configuredUrl) return null;

  try {
    const url = new URL(configuredUrl);
    if (
      url.protocol !== "https:" ||
      url.pathname !== "/admin/accept-invite" ||
      url.search ||
      url.hash ||
      url.username ||
      url.password
    ) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

async function findUserByEmail(admin: ReturnType<typeof adminClient>, email: string) {
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error("Could not check for an existing account.");
    const user = data.users.find((candidate) => candidate.email?.toLowerCase() === email);
    if (user) return user;
    if (data.users.length < 200) break;
  }
  return null;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: teamCorsHeaders });
  if (request.method !== "POST") return fail("Method not allowed.", 405);

  const authorization = request.headers.get("authorization") ?? "";
  const token = /^Bearer\s+([^\s]+)$/i.exec(authorization)?.[1];
  if (!token) return fail("Sign in as an administrator to manage collaborators.", 401);

  const url = Deno.env.get("SUPABASE_URL");
  const key = publishableKey();
  if (!url || !key) return fail("Team management is not configured in Lovable Cloud.", 503);

  // Validate the caller's token with Auth, then independently check their role
  // against the database. The browser never supplies a role or user identity.
  const callerClient = createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: callerData, error: callerError } = await callerClient.auth.getUser(token);
  if (callerError || !callerData.user)
    return fail("Your session is invalid or has expired. Please sign in again.", 401);

  let admin: ReturnType<typeof adminClient>;
  try {
    admin = adminClient();
  } catch {
    return fail("Team management is not configured in Lovable Cloud.", 503);
  }

  const { data: isAdmin, error: roleError } = await admin.rpc("has_role", {
    _user_id: callerData.user.id,
    _role: "admin",
  });
  if (roleError) return fail("Could not verify administrator access. Please try again.", 503);
  if (isAdmin !== true) return fail("Only an administrator can manage collaborators.", 403);

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!isRecord(parsed)) return fail("Invalid request.", 400);
    body = parsed;
  } catch {
    return fail("Invalid request.", 400);
  }

  const action = body.action as Action;
  if (!["list", "invite", "remove"].includes(action)) return fail("Invalid Team operation.", 400);

  if (action === "list") {
    const { data: rows, error } = await admin
      .from("user_roles")
      .select("user_id, created_at")
      .eq("role", "collaborator")
      .order("created_at");
    if (error) return fail("The collaborator list could not be loaded. Please try again.", 502);

    const members = [];
    for (const row of rows ?? []) {
      const { data, error: userError } = await admin.auth.admin.getUserById(row.user_id);
      if (userError)
        return fail("The collaborator list could not be loaded. Please try again.", 502);
      const user = data.user;
      const metadata = isRecord(user.user_metadata) ? user.user_metadata : {};
      members.push({
        userId: row.user_id,
        name: typeof metadata.full_name === "string" ? metadata.full_name : null,
        email: user.email ?? null,
        status: user.last_sign_in_at ? "Active" : "Invited",
        addedAt: row.created_at,
      });
    }
    return new Response(JSON.stringify(members), {
      headers: { ...teamCorsHeaders, "Content-Type": "application/json" },
    });
  }

  if (action === "invite") {
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (
      !name ||
      name.length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 255
    ) {
      return fail("Enter a valid name and email address.", 400);
    }

    const redirectTo = invitationRedirectUrl();
    if (!redirectTo) {
      return fail(
        "The invitation callback URL is not configured. Set TEAM_INVITE_REDIRECT_URL to the approved HTTPS /admin/accept-invite URL.",
        503,
      );
    }
    const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
      data: { full_name: name },
      redirectTo,
    });

    let userId = invited.user?.id ?? null;
    let existingAccount = false;
    if (!userId && inviteError && /already|registered|exists/i.test(inviteError.message)) {
      let user;
      try {
        user = await findUserByEmail(admin, email);
      } catch {
        return fail(
          "An account already exists, but it could not be looked up. Please try again.",
          502,
        );
      }
      if (!user)
        return fail(
          "An account already exists, but it could not be found. Please contact an administrator.",
          409,
        );
      userId = user.id;
      existingAccount = true;
    } else if (inviteError) {
      console.error("Collaborator invitation failed:", inviteError.message);
      return fail(
        "The invitation could not be sent. Check the Auth email settings and try again.",
        502,
      );
    }

    if (!userId) return fail("The invitation could not be sent. Please try again.", 502);
    if (userId === callerData.user.id) return fail("You cannot change your own access.", 409);

    const { data: adminRole, error: adminRoleCheckError } = await admin
      .from("user_roles")
      .select("id")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (adminRoleCheckError)
      return fail("Could not check the selected user's role. Please try again.", 502);
    if (adminRole) return fail("This person is already an administrator.", 409);

    const { data: collaboratorRole, error: collaboratorCheckError } = await admin
      .from("user_roles")
      .select("id")
      .eq("user_id", userId)
      .eq("role", "collaborator")
      .maybeSingle();
    if (collaboratorCheckError)
      return fail("Could not check collaborator access. Please try again.", 502);
    if (collaboratorRole) return fail("This person already has collaborator access.", 409);

    if (existingAccount) {
      const { error } = await admin.auth.resetPasswordForEmail(email, { redirectTo });
      if (error)
        return fail(
          "The account exists, but its setup email could not be sent. No collaborator access was added.",
          502,
        );
    }

    const { error: roleInsertError } = await admin
      .from("user_roles")
      .insert({ user_id: userId, role: "collaborator" });
    if (roleInsertError) {
      // A new user's invite email has already gone out at this point. Make the
      // partial state explicit so an administrator can safely retry.
      console.error("Could not record collaborator role:", roleInsertError.message);
      return fail(
        "The invitation email was sent, but collaborator access could not be recorded. Retry the invitation.",
        502,
      );
    }

    return json({ ok: true, existing: existingAccount });
  }

  const userId = typeof body.userId === "string" ? body.userId : "";
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(userId)) {
    return fail("The selected collaborator is invalid.", 400);
  }
  if (userId === callerData.user.id) return fail("You cannot change your own access.", 409);

  const { data: targetAdmin, error: targetRoleError } = await admin
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (targetRoleError)
    return fail("Could not verify the selected user's role. Please try again.", 502);
  if (targetAdmin)
    return fail("Administrator access cannot be changed from the collaborator list.", 409);

  const { data: collaborator, error: collaboratorLookupError } = await admin
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .eq("role", "collaborator")
    .maybeSingle();
  if (collaboratorLookupError)
    return fail("Could not check collaborator access. Please try again.", 502);
  if (!collaborator) return fail("This collaborator no longer has collaborator access.", 404);

  const { error: removeError } = await admin
    .from("user_roles")
    .delete()
    .eq("user_id", userId)
    .eq("role", "collaborator");
  if (removeError) return fail("Collaborator access could not be removed. Please try again.", 502);
  return json({ ok: true });
});
