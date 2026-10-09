CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE public.content_type AS ENUM ('article', 'essay', 'book_excerpt', 'announcement');

CREATE TABLE public.content_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type public.content_type NOT NULL,
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 200),
  slug text UNIQUE CHECK (slug IS NULL OR slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  excerpt text CHECK (excerpt IS NULL OR char_length(excerpt) <= 500),
  body text NOT NULL DEFAULT '',
  status public.content_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX content_entries_status_type_idx ON public.content_entries (status, content_type, published_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_entries TO authenticated;
GRANT SELECT ON public.content_entries TO anon;
GRANT ALL ON public.content_entries TO service_role;

ALTER TABLE public.content_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published content"
ON public.content_entries FOR SELECT TO anon, authenticated
USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());

CREATE POLICY "Admins can read all content"
ON public.content_entries FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create content"
ON public.content_entries FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update content"
ON public.content_entries FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete archived content"
ON public.content_entries FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin') AND status = 'archived');

-- Server-side stamping: authorship and timestamps come from the session, never the browser.
CREATE OR REPLACE FUNCTION public.stamp_content_entry()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_by := auth.uid();
    NEW.created_at := now();
  ELSE
    NEW.created_by := OLD.created_by;
    NEW.created_at := OLD.created_at;
  END IF;
  NEW.updated_by := auth.uid();
  NEW.updated_at := now();
  IF NEW.status = 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at := now();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER stamp_content_entry
BEFORE INSERT OR UPDATE ON public.content_entries
FOR EACH ROW EXECUTE FUNCTION public.stamp_content_entry();