-- ─────────────────────────────────────────────────────────────────────────────
-- Secure admin access
--
-- Before: the admin panel checked passwords in the browser against an
-- admin_users table it downloaded with the public anon key (plaintext
-- passwords included), and every visitor's browser could read leads.
--
-- After:
--   • Admins sign in with Supabase Auth; passwords never leave Supabase.
--   • Admin rights live in each auth user's app_metadata
--     ({ admin_role, admin_active }), which only the service role can set —
--     so a signed-up or tampered account can never grant itself access.
--   • Row Level Security on blogs, leads, admin_users and blog image uploads:
--       blogs        public reads published posts; admins read/write all
--       leads        anyone can submit a new lead; only admins can read/edit
--       admin_users  admins can read; changes go through the admin-users
--                    edge function (service role), never the browser
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Remove plaintext passwords; link team rows to auth users ────────────────
alter table public.admin_users drop column if exists password;
alter table public.admin_users add column if not exists auth_user_id uuid unique
  references auth.users (id) on delete set null;

-- 2. Role helpers, read from the caller's JWT ────────────────────────────────
create or replace function public.admin_role()
returns text
language sql stable
set search_path = ''
as $$
  select case
    when coalesce((auth.jwt() -> 'app_metadata' ->> 'admin_active')::boolean, false)
      then auth.jwt() -> 'app_metadata' ->> 'admin_role'
  end
$$;

create or replace function public.is_admin()
returns boolean
language sql stable
set search_path = ''
as $$ select public.admin_role() is not null $$;

create or replace function public.is_super_admin()
returns boolean
language sql stable
set search_path = ''
as $$ select public.admin_role() = 'Super Admin' $$;

-- 3. Row Level Security ───────────────────────────────────────────────────────
alter table public.blogs       enable row level security;
alter table public.leads       enable row level security;
alter table public.admin_users enable row level security;

-- Replace whatever policies these tables had (they allowed anon access)
do $$
declare p record;
begin
  for p in
    select policyname, tablename from pg_policies
    where schemaname = 'public' and tablename in ('blogs', 'leads', 'admin_users')
  loop
    execute format('drop policy %I on public.%I', p.policyname, p.tablename);
  end loop;
end $$;

-- blogs
create policy "public reads published blogs" on public.blogs
  for select to anon, authenticated using (status = 'published');
create policy "admins read all blogs" on public.blogs
  for select to authenticated using (public.is_admin());
create policy "admins create blogs" on public.blogs
  for insert to authenticated with check (public.is_admin());
create policy "admins update blogs" on public.blogs
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins delete blogs" on public.blogs
  for delete to authenticated using (public.is_admin());

-- leads: contact forms and the analyzer insert; nobody else can read them
create policy "anyone submits a new lead" on public.leads
  for insert to anon, authenticated with check (status = 'New');
create policy "admins read leads" on public.leads
  for select to authenticated using (public.is_admin());
create policy "admins update leads" on public.leads
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins delete leads" on public.leads
  for delete to authenticated using (public.is_admin());
create policy "admins create leads" on public.leads
  for insert to authenticated with check (public.is_admin());

-- admin_users: read-only for admins; writes happen in the edge function
create policy "admins read team" on public.admin_users
  for select to authenticated using (public.is_admin());

-- 4. Blog image uploads: admins only (reads stay public) ─────────────────────
drop policy if exists "anon can upload blog images" on storage.objects;
create policy "admins upload blog images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'blog-images' and public.is_admin());

-- 5. Last-login stamp for the signed-in admin (cannot touch any other column)
create or replace function public.record_admin_login()
returns void
language sql
security definer
set search_path = ''
as $$
  update public.admin_users
     set last_login = current_date
   where public.is_admin()
     and lower(email) = lower(auth.jwt() ->> 'email')
$$;
revoke execute on function public.record_admin_login() from public, anon;
grant  execute on function public.record_admin_login() to authenticated;

-- 6. One-time bootstrap of the first Super Admin ─────────────────────────────
-- After creating the auth user in the dashboard (Authentication → Users →
-- Add user), run in the SQL editor:
--   select public.bootstrap_super_admin('mqaisawan@gmail.com');
-- Only the SQL editor / service role can call it.
create or replace function public.bootstrap_super_admin(p_email text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid;
begin
  select id into v_uid from auth.users where lower(email) = lower(p_email);
  if v_uid is null then
    raise exception 'No auth user with email % — create it under Authentication → Users first', p_email;
  end if;

  update auth.users
     set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
                             || jsonb_build_object('admin_role', 'Super Admin', 'admin_active', true)
   where id = v_uid;

  update public.admin_users
     set auth_user_id = v_uid, role = 'Super Admin', status = 'Active'
   where lower(email) = lower(p_email);

  if not found then
    -- id as a quoted literal so it fits a text or numeric id column
    execute format(
      'insert into public.admin_users (id, name, email, role, status, initials, auth_user_id) values (%L, %L, %L, %L, %L, %L, %L)',
      floor(extract(epoch from now()) * 1000)::bigint, split_part(p_email, '@', 1), lower(p_email),
      'Super Admin', 'Active', upper(left(p_email, 2)), v_uid
    );
  end if;

  return 'Super Admin access granted to ' || p_email;
end
$$;
revoke execute on function public.bootstrap_super_admin(text) from public, anon, authenticated;
