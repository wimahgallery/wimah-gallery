create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  couple_name text not null,
  event_name text not null,
  event_date date not null,
  location text not null,
  images_source text,
  image_url text,
  image_file_id text,
  sort_order integer default 0 not null,
  visible boolean default true not null,
  created_at timestamp with time zone default now() not null
);

alter table events enable row level security;

create policy "Public read events" on events for select using (true);
create policy "Auth insert events" on events for insert with check (auth.role() = 'authenticated');
create policy "Auth update events" on events for update using (auth.role() = 'authenticated');
create policy "Auth delete events" on events for delete using (auth.role() = 'authenticated');
