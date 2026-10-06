create table if not exists pricing_packages (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('file_only', 'limited_print', 'unlimited_print', 'mingle_booth')),
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

alter table pricing_packages drop constraint if exists pricing_packages_type_check;
alter table pricing_packages add constraint pricing_packages_type_check
  check (type in ('file_only', 'limited_print', 'unlimited_print', 'mingle_booth'));

alter table pricing_packages enable row level security;

drop policy if exists "Public read packages" on pricing_packages;
create policy "Public read packages" on pricing_packages for select using (true);
drop policy if exists "Auth insert packages" on pricing_packages;
create policy "Auth insert packages" on pricing_packages for insert with check (auth.role() = 'authenticated');
drop policy if exists "Auth update packages" on pricing_packages;
create policy "Auth update packages" on pricing_packages for update using (auth.role() = 'authenticated');
drop policy if exists "Auth delete packages" on pricing_packages;
create policy "Auth delete packages" on pricing_packages for delete using (auth.role() = 'authenticated');
