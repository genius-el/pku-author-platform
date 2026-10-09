import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type ContentEntry = Database["public"]["Tables"]["content_entries"]["Row"];
export type ContentStatus = Database["public"]["Enums"]["content_status"];
export type ContentType = Database["public"]["Enums"]["content_type"];

export const contentTypeLabels: Record<ContentType, string> = {
  article: "Article",
  essay: "Essay",
  book_excerpt: "Book excerpt",
  announcement: "Announcement",
};

export const statusLabels: Record<ContentStatus, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

export type ContentInput = {
  content_type: ContentType;
  title: string;
  slug: string | null;
  excerpt: string | null;
  body: string;
  status: ContentStatus;
  published_at: string | null;
};

// All calls run as the signed-in user; RLS (has_role admin) decides access.
// created_by / updated_by / timestamps are set by a database trigger.
export async function listContent() {
  const { data, error } = await supabase.from("content_entries").select("*").order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function saveContent(id: string | null, input: ContentInput) {
  const q = id
    ? supabase.from("content_entries").update(input).eq("id", id).select().single()
    : supabase.from("content_entries").insert(input).select().single();
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function setContentStatus(id: string, status: ContentStatus) {
  const { error } = await supabase.from("content_entries").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteContent(id: string) {
  const { error, count } = await supabase.from("content_entries").delete({ count: "exact" }).eq("id", id);
  if (error) throw error;
  if (!count) throw new Error("Only archived entries can be deleted.");
}

export function slugify(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
