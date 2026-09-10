create table if not exists pricing_packages (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('file_only', 'limited_print', 'unlimited_print')),
  hours integer not null,
  price integer not null,
  discount integer default 0 not null,
  discounted_price integer generated always as (case when discount > 0 then price - (price * discount / 100) else price end) stored,
  print_count_limit integer,
  sort_order integer default 0 not null,
  visible boolean default true not null,
  favorite boolean default false not null,
  created_at timestamp with time zone default now() not null
);

alter table pricing_packages enable row level security;

create policy "Public read packages" on pricing_packages for select using (true);
create policy "Auth insert packages" on pricing_packages for insert with check (auth.role() = 'authenticated');
create policy "Auth update packages" on pricing_packages for update using (auth.role() = 'authenticated');
create policy "Auth delete packages" on pricing_packages for delete using (auth.role() = 'authenticated');
