INSERT INTO public.user_roles (user_id, role)
VALUES ('e12df514-83e7-457e-a531-20e782cf7131', 'collaborator')
ON CONFLICT (user_id, role) DO NOTHING;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT (auth.uid() IS NULL OR _user_id = auth.uid())
    AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;