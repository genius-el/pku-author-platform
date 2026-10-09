import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type PublicCatalogueItem = {
  id: string;
  title: string;
  slug: string | null;
  short_description: string | null;
  description: string;
  external_url: string | null;
  image: string | null;
};

// Public read: publishable key, no session, RLS returns only published rows.
// Images live in a private bucket; storage RLS only signs objects of published items.
export const getPublishedCatalogue = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ type: z.enum(["digital_resource", "book"]) }).parse(d))
  .handler(async ({ data }): Promise<PublicCatalogueItem[]> => {
    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(process.env["SUPABASE_URL"]!, process.env["SUPABASE_PUBLISHABLE_KEY"]!, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });
    const { data: rows, error } = await sb
      .from("catalogue_items")
      .select("id,title,slug,short_description,description,external_url,image_url,image_path")
      .eq("item_type", data.type)
      .eq("status", "published")
      .order("created_at", { ascending: true });
    if (error) {
      console.error("[catalogue] public read failed", error.message);
      return [];
    }
    return Promise.all(
      (rows ?? []).map(async (r) => {
        let image: string | null = r.image_url && /^https:\/\//.test(r.image_url) ? r.image_url : null;
        if (r.image_path) {
          const { data: s } = await sb.storage.from("catalogue-images").createSignedUrl(r.image_path, 60 * 60 * 24);
          image = s?.signedUrl ?? image;
        }
        return {
          id: r.id, title: r.title, slug: r.slug, short_description: r.short_description,
          description: r.description, external_url: r.external_url, image,
        };
      }),
    );
  });
