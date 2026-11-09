-- Run once in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query -> Run).
-- Safe to re-run: every statement is idempotent.
--
-- ORDER MATTERS when upgrading an existing project: deploy the website
-- version that submits forms through /api/submit FIRST (with
-- SUPABASE_SERVICE_ROLE_KEY set on the host), THEN run this file. It removes
-- the old "anyone can insert" access that earlier site versions relied on.

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

-- Forms are submitted to the website's own /api/submit endpoint, which
-- checks Cloudflare Turnstile, rate-limits, validates uploads and only then
-- inserts using the service-role key. The public anon key can no longer
-- write here at all, so bots can't skip the spam checks by calling Supabase
-- directly.
alter table public.form_submissions enable row level security;

drop policy if exists "Allow public inserts" on public.form_submissions;

-- Private bucket for ID copies / CVs collected by the Journeyer & Guide
-- application forms (IntakeForm). Keep `public` false -- these are
-- identity documents, some belonging to minors.
-- Limits match src/lib/upload-rules.ts: 5 MB; PDF, images or Word only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'form-uploads', 'form-uploads', false, 5242880,
  array[
    'application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- Uploads now go through /api/submit (service role), so the anon role has
-- no access to this bucket at all.
drop policy if exists "Allow public uploads to form-uploads" on storage.objects;

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

-- Content media (photos, press and resource PDFs, the intro video) is public
-- to display, but only approved team accounts can upload, replace, or remove
-- it. 50 MB per file is the Supabase free-plan ceiling.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-content', 'site-content', true, 52428800,
  array[
    'image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif',
    'application/pdf', 'application/zip', 'video/mp4', 'video/webm',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ]
)
on conflict (id) do update
set public = true,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

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

-- ---------------------------------------------------------------------------
-- Editable page content, managed from the management website.
-- The public site reads published rows with the anon key and falls back to
-- its bundled copy for anything missing, so it never shows a blank page.
-- Field guide: supabase/README.md -> "Content tables".
-- ---------------------------------------------------------------------------

-- Page text and small settings, one JSON document per key: "site",
-- "social", "faqs", "values", "walk_stages", "partners", "media", ...
create table if not exists public.site_blocks (
  key text primary key check (key ~ '^[a-z][a-z0-9_]*$'),
  data jsonb not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_news (
  slug text primary key check (slug ~ '^[a-z0-9][a-z0-9-]*$'),
  date date not null,
  label text not null,
  title text not null,
  excerpt text not null,
  body text[] not null default '{}',
  image_url text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_programmes (
  slug text primary key check (slug ~ '^[a-z0-9][a-z0-9-]*$'),
  family text not null check (family in ('Programme', 'Initiative')),
  label text,
  name text not null,
  kicker text not null,
  body text not null,
  points text[] not null default '{}',
  image text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_gallery_events (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]*$'),
  title text not null,
  theme text not null,
  year integer not null check (year between 2000 and 2100),
  month integer not null check (month between 1 and 12),
  date text not null,
  overview text not null,
  photos jsonb not null default '[]'::jsonb check (jsonb_typeof(photos) = 'array'),
  has_video boolean not null default false,
  video_url text,
  programme_slug text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_press (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]*$'),
  date date not null,
  kind text not null check (kind in ('Press release', 'Statement', 'Media kit', 'Report')),
  title text not null,
  summary text not null,
  file_url text,
  file_label text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_resources (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]*$'),
  title text not null,
  category text not null,
  description text not null,
  file_url text not null,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Columns added after the first release (safe to rerun).
alter table public.site_programmes
  add column if not exists logo text,
  add column if not exists dossier jsonb check (dossier is null or jsonb_typeof(dossier) = 'object'),
  add column if not exists brand jsonb check (brand is null or jsonb_typeof(brand) = 'object');
-- Resource categories are free text ("Guides", "Policies", "Reports", ...).
alter table public.site_resources drop constraint if exists site_resources_category_check;

-- Same access model as opportunities and people: anyone reads published
-- rows; only active team members read drafts and write.
do $$
declare
  t text;
begin
  foreach t in array array['site_news', 'site_programmes', 'site_gallery_events', 'site_press', 'site_resources']
  loop
    execute format('create index if not exists %I on public.%I (is_published, sort_order)', t || '_published_order_idx', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on public.%I from anon, authenticated', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);

    execute format('drop policy if exists "Public can read published rows" on public.%I', t);
    execute format('create policy "Public can read published rows" on public.%I for select to anon, authenticated using (is_published = true)', t);
    execute format('drop policy if exists "SINGAWE team can read all rows" on public.%I', t);
    execute format('create policy "SINGAWE team can read all rows" on public.%I for select to authenticated using (public.is_singawe_team_member())', t);
    execute format('drop policy if exists "SINGAWE team can manage rows" on public.%I', t);
    execute format('create policy "SINGAWE team can manage rows" on public.%I for all to authenticated using (public.is_singawe_team_member()) with check (public.is_singawe_team_member())', t);

    execute format('drop trigger if exists %I on public.%I', 'set_' || t || '_updated_at', t);
    execute format('create trigger %I before update on public.%I for each row execute function public.set_site_content_updated_at()', 'set_' || t || '_updated_at', t);
  end loop;
end;
$$;

-- Blocks have no draft state: every row is live, so anyone may read them.
alter table public.site_blocks enable row level security;
revoke all on public.site_blocks from anon, authenticated;
grant select on public.site_blocks to anon, authenticated;
grant insert, update, delete on public.site_blocks to authenticated;

drop policy if exists "Public can read site blocks" on public.site_blocks;
create policy "Public can read site blocks"
  on public.site_blocks
  for select
  to anon, authenticated
  using (true);

drop policy if exists "SINGAWE team can manage site blocks" on public.site_blocks;
create policy "SINGAWE team can manage site blocks"
  on public.site_blocks
  for all
  to authenticated
  using (public.is_singawe_team_member())
  with check (public.is_singawe_team_member());

drop trigger if exists set_site_blocks_updated_at on public.site_blocks;
create trigger set_site_blocks_updated_at
  before update on public.site_blocks
  for each row execute function public.set_site_content_updated_at();

-- ---------------------------------------------------------------------------
-- Rate limiting for /api/zazi and /api/submit, shared by every server
-- instance. Keys are "<scope>:<sha256 of IP>" -- raw IPs are never stored.
-- Only the service role (the website's server) may call it.
-- ---------------------------------------------------------------------------
create table if not exists public.rate_limits (
  key text not null,
  window_start timestamptz not null,
  count integer not null default 0,
  primary key (key, window_start)
);

create index if not exists rate_limits_window_start_idx on public.rate_limits (window_start);

alter table public.rate_limits enable row level security;
revoke all on public.rate_limits from anon, authenticated;

create or replace function public.consume_rate_limit(
  p_key text,
  p_limit integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_window timestamptz :=
    to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);
  v_count integer;
begin
  insert into public.rate_limits as r (key, window_start, count)
  values (p_key, v_window, 1)
  on conflict (key, window_start) do update set count = r.count + 1
  returning r.count into v_count;

  -- Occasional cleanup keeps the table tiny without a cron job.
  if random() < 0.01 then
    delete from public.rate_limits where window_start < now() - interval '2 days';
  end if;

  return v_count <= p_limit;
end;
$$;

revoke all on function public.consume_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_rate_limit(text, integer, integer) to service_role;
