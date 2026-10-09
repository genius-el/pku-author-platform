CREATE POLICY "Collaborators can read all content" ON public.content_entries FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'collaborator'));
CREATE POLICY "Collaborators can create draft content" ON public.content_entries FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'collaborator') AND status = 'draft');
CREATE POLICY "Collaborators can edit draft content" ON public.content_entries FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'collaborator') AND status = 'draft')
  WITH CHECK (public.has_role(auth.uid(), 'collaborator') AND status = 'draft');

CREATE POLICY "Collaborators can read all catalogue items" ON public.catalogue_items FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'collaborator'));
CREATE POLICY "Collaborators can create draft catalogue items" ON public.catalogue_items FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'collaborator') AND status = 'draft');
CREATE POLICY "Collaborators can edit draft catalogue items" ON public.catalogue_items FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'collaborator') AND status = 'draft')
  WITH CHECK (public.has_role(auth.uid(), 'collaborator') AND status = 'draft');

CREATE POLICY "Collaborators can read catalogue images" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'catalogue-images' AND public.has_role(auth.uid(), 'collaborator'));
CREATE POLICY "Collaborators can upload images for draft items" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'catalogue-images' AND public.has_role(auth.uid(), 'collaborator')
    AND split_part(name, '/', 1) = 'catalogue'
    AND NOT EXISTS (SELECT 1 FROM public.catalogue_items c WHERE c.id::text = split_part(name, '/', 2) AND c.status <> 'draft'));
CREATE POLICY "Collaborators can delete images of draft items" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'catalogue-images' AND public.has_role(auth.uid(), 'collaborator')
    AND split_part(name, '/', 1) = 'catalogue'
    AND NOT EXISTS (SELECT 1 FROM public.catalogue_items c WHERE c.id::text = split_part(name, '/', 2) AND c.status <> 'draft'));