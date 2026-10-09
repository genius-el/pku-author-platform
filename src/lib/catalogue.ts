import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type CatalogueItem = Database["public"]["Tables"]["catalogue_items"]["Row"];
export type CatalogueType = Database["public"]["Enums"]["catalogue_item_type"];
export type CatalogueStatus = Database["public"]["Enums"]["content_status"];
export type Currency = "NGN" | "USD";

export const catalogueTypeLabels: Record<CatalogueType, string> = {
  digital_resource: "Digital resource",
  book: "Book",
};

export type CatalogueInput = {
  item_type: CatalogueType;
  title: string;
  slug: string | null;
  short_description: string | null;
  description: string;
  image_url: string | null;
  image_path: string | null;
  price_amount: number | null;
  price_currency: Currency | null;
  external_url: string | null;
  status: CatalogueStatus;
};

const BUCKET = "catalogue-images";
export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
const IMAGE_TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

export function validateImage(file: File): string | null {
  if (!IMAGE_TYPES[file.type]) return "Please choose a JPG, PNG or WebP image.";
  if (file.size > IMAGE_MAX_BYTES) return "That image is larger than 5 MB. Please choose a smaller file.";
  return null;
}

// Path: catalogue/{item-id}/{random-id}.{ext} — never the original filename.
export async function uploadCatalogueImage(itemId: string, file: File) {
  const path = `catalogue/${itemId}/${crypto.randomUUID()}.${IMAGE_TYPES[file.type]}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type, upsert: false });
  if (error) {
    if (/row-level security|unauthori|403/i.test(error.message)) throw new Error("Your account is not allowed to upload images.");
    throw new Error("The image did not upload. Please try again.");
  }
  return path;
}

export async function removeCatalogueImage(path: string) {
  await supabase.storage.from(BUCKET).remove([path]); // best-effort cleanup
}

export async function signedImageUrl(path: string) {
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, 3600);
  return data?.signedUrl ?? null;
}

// Runs as the signed-in user; RLS (has_role admin) decides access.
// created_by / updated_by / timestamps are set by a database trigger.
export async function listCatalogue() {
  const { data, error } = await supabase.from("catalogue_items").select("*").order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function saveCatalogueItem(id: string, isNew: boolean, input: CatalogueInput) {
  const q = !isNew
    ? supabase.from("catalogue_items").update(input).eq("id", id).select().single()
    : supabase.from("catalogue_items").insert({ ...input, id }).select().single();
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function setCatalogueStatus(id: string, status: CatalogueStatus) {
  const { error } = await supabase.from("catalogue_items").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteCatalogueItem(id: string, imagePath?: string | null) {
  const { error, count } = await supabase.from("catalogue_items").delete({ count: "exact" }).eq("id", id);
  if (error) throw error;
  if (!count) throw new Error("Only archived items can be deleted.");
  if (imagePath) await removeCatalogueImage(imagePath);
}

export function formatPrice(amount: number | null, currency: string | null) {
  if (amount === null || !currency) return "Price not set";
  if (Number(amount) === 0) return "Free";
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(Number(amount));
}
