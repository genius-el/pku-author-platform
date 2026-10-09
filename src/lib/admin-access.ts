import { supabase } from "@/integrations/supabase/client";
import { getAdminAccess, type StaffRole } from "./admin.functions";

export type { StaffRole };
export type AdminAccess =
  | { status: "signed-out" }
  | { status: "forbidden" }
  | { status: "staff"; role: StaffRole; email: string | null };

/** Client helper used by admin route guards; the real decision happens on the server. */
export async function checkAdminAccess(): Promise<AdminAccess> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return { status: "signed-out" };
  try {
    const res = await getAdminAccess();
    return res.role ? { status: "staff", role: res.role, email: res.email } : { status: "forbidden" };
  } catch {
    return { status: "signed-out" };
  }
}
