ALTER TABLE public.catalogue_items ADD COLUMN IF NOT EXISTS image_path text
  CHECK (image_path IS NULL OR image_path ~ '^catalogue/[0-9a-f-]{36}/[0-9a-f-]{36}\.(jpg|png|webp)$');

CREATE POLICY "Admins can upload catalogue images" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'catalogue-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update catalogue images" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'catalogue-images' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'catalogue-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete catalogue images" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'catalogue-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can read catalogue images" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'catalogue-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Public can read images of published catalogue items" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'catalogue-images' AND EXISTS (
    SELECT 1 FROM public.catalogue_items c WHERE c.image_path = storage.objects.name AND c.status = 'published'));