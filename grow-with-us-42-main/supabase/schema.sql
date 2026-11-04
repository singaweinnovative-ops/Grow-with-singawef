-- Run once in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query -> Run).
-- Safe to re-run: every statement is idempotent.

create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  form_type text not null,
  name text,
  email text,
  phone text,
  source text,
  payload jsonb not null default '{}'::jsonb
);

create index if not exists form_submissions_form_type_idx
  on public.form_submissions (form_type);
create index if not exists form_submissions_created_at_idx
  on public.form_submissions (created_at desc);

-- Forms submit directly from the browser using the public anon key, so
-- Row Level Security is what actually protects this table. The anon role
-- may INSERT only -- it can never SELECT, UPDATE or DELETE, so a
-- submission is write-only the moment it leaves the browser. Read
-- submissions via the Supabase dashboard's Table Editor (or SQL Editor),
-- which both run as a superuser and bypass RLS entirely.
alter table public.form_submissions enable row level security;

drop policy if exists "Allow public inserts" on public.form_submissions;
create policy "Allow public inserts"
  on public.form_submissions
  for insert
  to anon
  with check (true);

-- Private bucket for ID copies / CVs collected by the Journeyer & Guide
-- application forms (IntakeForm). Keep `public` false -- these are
-- identity documents, some belonging to minors.
insert into storage.buckets (id, name, public)
values ('form-uploads', 'form-uploads', false)
on conflict (id) do nothing;

-- The anon role may INSERT (upload) only -- never SELECT, so uploaded
-- files can't be listed, downloaded or enumerated by anyone holding the
-- public anon key. Only the Supabase dashboard (superuser) can read them.
drop policy if exists "Allow public uploads to form-uploads" on storage.objects;
create policy "Allow public uploads to form-uploads"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'form-uploads');

-- Team membership is managed by trusted administrators in Supabase. Users
-- cannot grant themselves membership from either website.
create table if not exists public.singawe_team_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.singawe_team_members enable row level security;
revoke all on public.singawe_team_members from anon, authenticated;
grant select on public.singawe_team_members to authenticated;

drop policy if exists "Team members can view their own membership" on public.singawe_team_members;
create policy "Team members can view their own membership"
  on public.singawe_team_members
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create or replace function public.is_singawe_team_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.singawe_team_members
    where user_id = (select auth.uid())
      and active = true
  );
$$;

revoke all on function public.is_singawe_team_member() from public, anon;
grant execute on function public.is_singawe_team_member() to authenticated;

-- Team-only access to the inbox; public visitors retain INSERT-only access.
alter table public.form_submissions
  add column if not exists status text not null default 'new',
  add column if not exists assigned_to uuid references auth.users(id) on delete set null,
  add column if not exists internal_notes text;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'form_submissions_status_check'
      and conrelid = 'public.form_submissions'::regclass
  ) then
    alter table public.form_submissions
      add constraint form_submissions_status_check
      check (status in ('new', 'in_progress', 'responded', 'archived'));
  end if;
end;
$$;

revoke all on public.form_submissions from anon, authenticated;
grant insert on public.form_submissions to anon;
grant select on public.form_submissions to authenticated;
grant update (status, assigned_to, internal_notes) on public.form_submissions to authenticated;

drop policy if exists "SINGAWE team can read submissions" on public.form_submissions;
create policy "SINGAWE team can read submissions"
  on public.form_submissions
  for select
  to authenticated
  using (public.is_singawe_team_member());

drop policy if exists "SINGAWE team can update submissions" on public.form_submissions;
create policy "SINGAWE team can update submissions"
  on public.form_submissions
  for update
  to authenticated
  using (public.is_singawe_team_member())
  with check (public.is_singawe_team_member());

drop policy if exists "SINGAWE team can read form uploads" on storage.objects;
create policy "SINGAWE team can read form uploads"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'form-uploads' and public.is_singawe_team_member());

-- Public website content. Anonymous users can only read published rows;
-- authenticated users can write only when their auth user is team-approved.
create table if not exists public.site_opportunities (
  id text primary key,
  title text not null,
  org text not null,
  category text not null check (category in ('Funding', 'Study', 'Work', 'Competition')),
  opens date,
  closes date,
  body text not null,
  url text not null,
  image_url text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists site_opportunities_published_order_idx
  on public.site_opportunities (is_published, sort_order);

update public.site_opportunities
set is_published = false
where id = 'career-yum' and is_published = true;

create table if not exists public.site_people (
  slug text primary key,
  name text not null,
  circle text not null check (circle in ('Journeyer', 'Guide', 'Torchbearer', 'Steward', 'Visionary', 'Companion', 'Team', 'Community')),
  field text not null,
  place text not null,
  initials text not null,
  photo text,
  year integer,
  joined text,
  brief text not null,
  story text[] not null default '{}',
  quote text,
  links jsonb not null default '[]'::jsonb,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists site_people_published_order_idx
  on public.site_people (is_published, sort_order);

alter table public.site_people alter column year drop not null;
alter table public.site_people alter column joined drop not null;
alter table public.site_people add column if not exists links jsonb not null default '[]'::jsonb;
alter table public.site_people drop constraint if exists site_people_circle_check;
update public.site_people set circle = 'Companion' where circle = 'Champion';
alter table public.site_people
  add constraint site_people_circle_check
  check (circle in ('Journeyer', 'Guide', 'Torchbearer', 'Steward', 'Visionary', 'Companion', 'Team', 'Community'));

update public.site_people
set is_published = false
where slug not in (
  'kwanele-mazibuko', 'nokwanda-ngubane', 'nwabisa-maqakamba',
  'olwethu-mswane', 'charlene-makwara', 'ict-mandisa-biyela',
  'amahle-dunge', 'amanda-kunene', 'azania-zwane', 'buhlebendalo-mazibuko',
  'masixole-mabhoza', 'ntokozo-mazibuko', 'phumelele-kubheka',
  'vhulenda-nefolovhodwe', 'thandolenkosi-hadebe'
);

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_site_opportunities_updated_at on public.site_opportunities;
create trigger set_site_opportunities_updated_at
  before update on public.site_opportunities
  for each row execute function public.set_site_content_updated_at();

drop trigger if exists set_site_people_updated_at on public.site_people;
create trigger set_site_people_updated_at
  before update on public.site_people
  for each row execute function public.set_site_content_updated_at();

alter table public.site_opportunities enable row level security;
alter table public.site_people enable row level security;

revoke all on public.site_opportunities, public.site_people from anon, authenticated;
grant select on public.site_opportunities, public.site_people to anon, authenticated;
grant insert, update, delete on public.site_opportunities, public.site_people to authenticated;

drop policy if exists "Public can read published opportunities" on public.site_opportunities;
create policy "Public can read published opportunities"
  on public.site_opportunities
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "SINGAWE team can read all opportunities" on public.site_opportunities;
create policy "SINGAWE team can read all opportunities"
  on public.site_opportunities
  for select
  to authenticated
  using (public.is_singawe_team_member());

drop policy if exists "SINGAWE team can manage opportunities" on public.site_opportunities;
create policy "SINGAWE team can manage opportunities"
  on public.site_opportunities
  for all
  to authenticated
  using (public.is_singawe_team_member())
  with check (public.is_singawe_team_member());

drop policy if exists "Public can read published people" on public.site_people;
create policy "Public can read published people"
  on public.site_people
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "SINGAWE team can read all people" on public.site_people;
create policy "SINGAWE team can read all people"
  on public.site_people
  for select
  to authenticated
  using (public.is_singawe_team_member());

drop policy if exists "SINGAWE team can manage people" on public.site_people;
create policy "SINGAWE team can manage people"
  on public.site_people
  for all
  to authenticated
  using (public.is_singawe_team_member())
  with check (public.is_singawe_team_member());

-- Content images are public to display, but only approved team accounts can
-- upload, replace, or remove them.
insert into storage.buckets (id, name, public)
values ('site-content', 'site-content', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read site content images" on storage.objects;
create policy "Public can read site content images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'site-content');

drop policy if exists "SINGAWE team can upload site content images" on storage.objects;
create policy "SINGAWE team can upload site content images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'site-content' and public.is_singawe_team_member());

drop policy if exists "SINGAWE team can update site content images" on storage.objects;
create policy "SINGAWE team can update site content images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'site-content' and public.is_singawe_team_member())
  with check (bucket_id = 'site-content' and public.is_singawe_team_member());

drop policy if exists "SINGAWE team can delete site content images" on storage.objects;
create policy "SINGAWE team can delete site content images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'site-content' and public.is_singawe_team_member());
