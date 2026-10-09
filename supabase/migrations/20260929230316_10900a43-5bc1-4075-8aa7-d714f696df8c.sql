CREATE TYPE public.catalogue_item_type AS ENUM ('digital_resource', 'book');

CREATE TABLE public.catalogue_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_type public.catalogue_item_type NOT NULL,
  title text NOT NULL CHECK (length(btrim(title)) BETWEEN 1 AND 200),
  slug text UNIQUE CHECK (slug IS NULL OR slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  short_description text CHECK (short_description IS NULL OR length(short_description) <= 500),
  description text NOT NULL DEFAULT '',
  image_url text CHECK (image_url IS NULL OR image_url ~ '^https://'),
  price_amount numeric(12,2) CHECK (price_amount IS NULL OR price_amount >= 0),
  price_currency text CHECK (price_currency IS NULL OR price_currency IN ('NGN','USD')),
  external_url text CHECK (external_url IS NULL OR external_url ~ '^https://'),
  status public.content_status NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  CONSTRAINT catalogue_price_pair CHECK ((price_amount IS NULL) = (price_currency IS NULL))
);

GRANT SELECT ON public.catalogue_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.catalogue_items TO authenticated;
GRANT ALL ON public.catalogue_items TO service_role;

ALTER TABLE public.catalogue_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published catalogue items" ON public.catalogue_items
  FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Admins can read all catalogue items" ON public.catalogue_items
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can create catalogue items" ON public.catalogue_items
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update catalogue items" ON public.catalogue_items
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete archived catalogue items" ON public.catalogue_items
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin') AND status = 'archived');

CREATE OR REPLACE FUNCTION public.stamp_catalogue_item()
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
  RETURN NEW;
END;
$$;

CREATE TRIGGER stamp_catalogue_item BEFORE INSERT OR UPDATE ON public.catalogue_items
  FOR EACH ROW EXECUTE FUNCTION public.stamp_catalogue_item();