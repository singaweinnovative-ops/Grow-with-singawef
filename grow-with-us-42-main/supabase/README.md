# Shared Supabase Setup

The public website and SINGAWE management website use the same Supabase project. This schema lets the public site read published opportunities and people, while only explicitly enrolled SINGAWE team accounts can edit content or access form submissions.

## First-Time Setup

1. In the shared Supabase project, run `schema.sql` in the SQL Editor. It is safe to rerun.
2. Ensure each team member has an account in Supabase Auth through the management website's existing invitation flow.
3. Enroll each approved account as a team editor from the SQL Editor. Replace the email with the exact invited account email:

```sql
insert into public.singawe_team_members (user_id, active)
select id, true
from auth.users
where lower(email) = lower('team-member@example.org')
on conflict (user_id) do update
set active = true;
```

To remove edit and submission access, deactivate that user's membership:

```sql
update public.singawe_team_members
set active = false
where user_id = (
  select id from auth.users where lower(email) = lower('team-member@example.org')
);
```

An authenticated account without an active `singawe_team_members` row cannot write content, read submissions, or access private form uploads. Membership changes are intentionally not available to regular users through either website.

## Seed Existing Content

Run the seed after applying the schema. It adds current opportunities and people only when their IDs/slugs are missing, so rerunning it will not overwrite edits made by the team. This also adds the newer people profiles extracted from `src/assets/Our People`.

In PowerShell, from the project directory:

```powershell
$env:SUPABASE_URL = "https://your-project.supabase.co"
$env:SUPABASE_SERVICE_ROLE_KEY = "your-service-role-key"
bun scripts/seed-site-content.ts
Remove-Item Env:\SUPABASE_SERVICE_ROLE_KEY
```

If the database already has earlier seeded people and you want to apply the PDF profile updates, run `bun scripts/seed-site-content.ts --sync-people`. This updates matching records, adds new profiles and unpublishes profiles outside the approved PDF list plus Kwanele. It can overwrite edits made in the management website; use it only when intended. The updated schema also renames Champion circles to Companion and unpublishes profiles outside the approved list.

Use the service-role key only in a trusted local shell for this seed operation. Never add it to `.env`, frontend variables, source control, or the management website's browser bundle. The public website uses only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## Management Website Contract

- Manage opportunity records in `public.site_opportunities` using `id` as the stable key. Set `is_published` to control public visibility and `sort_order` to control display order. Optional opportunity images use public URLs from the `site-content` storage bucket.
- Manage people records in `public.site_people` using `slug` as the stable key. Store `story` as an array of paragraphs and `photo` as either an existing bundled photo key or a public `site-content` URL.
- Review submissions in `public.form_submissions`. Team accounts can read them and update only `status`, `assigned_to`, and `internal_notes`; submitted names, contact details, and payloads remain unchanged through the Data API.
- CV and ID uploads remain in the private `form-uploads` bucket. Only active team members can read those objects. Keep access limited to staff who need it.
- The database policies are the security boundary. Do not rely on hiding management controls in the user interface, and do not use the service-role key in the management website's client code.

The management website must sign in with Supabase Auth and use the same project URL. Its authenticated user's UUID must have an active team-membership row before its edits and inbox access will succeed.