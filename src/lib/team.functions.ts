import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type TeamMember = {
  userId: string;
  name: string | null;
  email: string | null;
  status: "Invited" | "Active";
  addedAt: string;
};

type TeamError = { error?: string };

async function invokeTeamFunction<T>(body: Record<string, unknown>): Promise<T> {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  const authorization = getRequest()?.headers.get("authorization") ?? "";
  if (!url || !key) throw new Error("Team management is not configured for this deployment.");
  if (!/^Bearer\s+\S+$/i.test(authorization))
    throw new Error("Sign in as an administrator to manage collaborators.");

  let response: Response;
  try {
    response = await fetch(`${url.replace(/\/$/, "")}/functions/v1/team-management`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: authorization,
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("The Team service could not be reached. Check your connection and try again.");
  }

  const result = (await response.json().catch(() => null)) as (T & TeamError) | null;
  if (!response.ok) {
    throw new Error(
      result && typeof result.error === "string"
        ? result.error
        : "The Team service is temporarily unavailable. Please try again.",
    );
  }
  if (result === null)
    throw new Error("The Team service returned an invalid response. Please try again.");
  return result;
}

export const listTeam = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async (): Promise<TeamMember[]> => invokeTeamFunction<TeamMember[]>({ action: "list" }));

export const inviteCollaborator = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        name: z.string().trim().min(1).max(100),
        email: z.string().trim().toLowerCase().email().max(255),
      })
      .strict()
      .parse(d),
  )
  .handler(async ({ data }) =>
    invokeTeamFunction<{ ok: true; existing: boolean }>({
      action: "invite",
      name: data.name,
      email: data.email,
    }),
  );

export const removeCollaborator = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ userId: z.string().uuid() }).strict().parse(d))
  .handler(async ({ data }) =>
    invokeTeamFunction<{ ok: true }>({ action: "remove", userId: data.userId }),
  );
