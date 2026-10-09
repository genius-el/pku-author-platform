INSERT INTO public.user_roles (user_id, role)
VALUES ('e7853047-822a-48ae-891a-21b8c18d16d5', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;