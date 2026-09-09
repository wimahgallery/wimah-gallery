create table if not exists faqs (
  id uuid default gen_random_uuid() primary key,
  question text not null,
  answer text not null,
  sort_order integer default 0 not null,
  visible boolean default true not null,
  created_at timestamp with time zone default now() not null
);

alter table faqs enable row level security;

create policy "Public read access" on faqs for select using (true);
create policy "Auth insert" on faqs for insert with check (auth.role() = 'authenticated');
create policy "Auth update" on faqs for update using (auth.role() = 'authenticated');
create policy "Auth delete" on faqs for delete using (auth.role() = 'authenticated');
