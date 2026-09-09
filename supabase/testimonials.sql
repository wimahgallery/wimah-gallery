create table if not exists testimonials (
  id uuid default gen_random_uuid() primary key,
  message text not null,
  username text not null,
  role text not null,
  image_url text,
  image_file_id text,
  visible boolean default true not null,
  created_at timestamp with time zone default now() not null
);

alter table testimonials enable row level security;

create policy "Public read access" on testimonials
  for select using (true);

create policy "Authenticated insert" on testimonials
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated update" on testimonials
  for update using (auth.role() = 'authenticated');

create policy "Authenticated delete" on testimonials
  for delete using (auth.role() = 'authenticated');
