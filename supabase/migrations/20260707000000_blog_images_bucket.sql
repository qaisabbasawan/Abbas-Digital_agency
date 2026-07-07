-- Public bucket for blog featured images, uploaded from the admin panel
-- (converted to WebP client-side, max 5 MB per file).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-images', 'blog-images', true, 5242880, array['image/webp'])
on conflict (id) do nothing;

-- The admin panel authenticates app-side and talks to Supabase with the
-- anon key (same trust model as the blogs table), so anon needs insert.
create policy "anon can upload blog images"
  on storage.objects for insert to anon
  with check (bucket_id = 'blog-images');

create policy "public read blog images"
  on storage.objects for select to anon
  using (bucket_id = 'blog-images');
