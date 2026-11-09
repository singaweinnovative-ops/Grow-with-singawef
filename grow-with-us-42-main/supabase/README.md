# Shared Supabase Setup

The public website and the SINGAWE management website use the same Supabase project. The public site **reads** published content from it; only enrolled SINGAWE team accounts (through the management website) can **edit** content or read form submissions. Nobody needs to touch this site's code to change what it says.

## Deployment settings

The site is deployed to Cloudflare Workers. Set these under **Cloudflare dashboard → Workers & Pages → (this worker) → Settings → Variables and Secrets**. If you deploy from Lovable instead, use its project environment settings. Never put real values in `.env.example` or anywhere else in the repo.

| Name | Kind | What it is |
| --- | --- | --- |
| `GEMINI_API_KEY` | **Secret** | Zazi chat. Create at aistudio.google.com/apikey and restrict it to the Generative Language API. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** | Lets `/api/submit` save forms and uploads after the spam checks pass, and powers the rate limiter. |
| `TURNSTILE_SECRET_KEY` | **Secret** | Cloudflare Turnstile secret key (dash.cloudflare.com → Turnstile → add widget for your domain). |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Build variable | Public. The anon key can only read published content. |
| `VITE_TURNSTILE_SITE_KEY` | Build variable | Public Turnstile site key (same widget as the secret). |
| `VITE_SITE_URL` | Build variable | The site's address, e.g. `https://singawefoundation.org`. Used for share previews and the sitemap. |
| `VITE_GA_MEASUREMENT_ID` | Build variable | Google Analytics 4 ID (`G-…`). Loaded only after a visitor accepts cookies. |
| `VITE_GOOGLE_SITE_VERIFICATION` | Build variable | Optional Search Console HTML-tag code. |

`VITE_*` values are baked in when the site is **built**, so set them where the build runs (Cloudflare build settings, or the `.env` of the machine running `npm run build`) and rebuild after changing them. Secrets are read on each request; changing one takes effect after the next deploy.

With Wrangler from the project folder: `npx wrangler secret put GEMINI_API_KEY` (and likewise for the other two secrets). It prompts for the value, so it never lands in your shell history.

### Search Console and the sitemap

1. In Google Search Console, add a **Domain** property and verify it with the DNS TXT record (recommended), or use a URL-prefix property and put the HTML-tag code in `VITE_GOOGLE_SITE_VERIFICATION`.
2. Submit `https://<your-domain>/sitemap.xml`. The sitemap is generated live from the published content, so new news, people, programmes and gallery events are included automatically. `robots.txt` points to it.

## Upgrading an existing project (do these in order)

1. Add the three secrets and the new `VITE_*` variables above.
2. Deploy this version of the website. Forms now post to `/api/submit` instead of writing to Supabase directly.
3. Run `schema.sql` in the SQL Editor. It adds the content tables and rate limiter, sets the upload bucket limits, and **removes the old "anyone can insert" access**. That is why step 2 has to come first: until then, the live site depends on that access.
4. Run the seed (below) to copy the current site content into the new tables.
5. Submit a test form on the live site and confirm it appears in `form_submissions`.

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

Run the seed after applying the schema. It copies everything currently bundled in `src/lib/site-content.ts` (opportunities, people, news, programmes and initiatives, gallery events, press, resources and all page text) into the database, **adding only rows that are missing**, so rerunning it never overwrites edits made by the team.

In PowerShell, from the project directory:

```powershell
$env:SUPABASE_URL = "https://your-project.supabase.co"
$env:SUPABASE_SERVICE_ROLE_KEY = "your-service-role-key"
bun scripts/seed-site-content.ts
Remove-Item Env:\SUPABASE_SERVICE_ROLE_KEY
```

`bun scripts/seed-site-content.ts --sync-people` additionally updates existing people from the bundled list and unpublishes anyone not on it. It can overwrite edits made in the management website, so use it only when you mean to.

Use the service-role key only in a trusted local shell or as a host secret. Never add it to `.env.example`, frontend (`VITE_`) variables, source control, or the management website's browser code.

## Content tables (for the management website)

The public site reads these with the anon key, caches them for up to a minute, and falls back to its bundled copy for anything that is missing. An edit therefore appears on the live site within about a minute, with no redeploy.

**Shared conventions**

- `is_published`: only `true` rows are public. Team members can see drafts.
- `sort_order`: ascending display order.
- Slugs and ids: lowercase letters, digits and hyphens (`my-new-story`). They become URLs (`/news/my-new-story`), so don't change them once published.
- **Images and files** are either a public URL from the `site-content` bucket (upload there first, then save the URL) or, for existing content, a bundled photo key such as `taca1`.
- **Fallback rule:** if a collection table has *no* published rows, or can't be read, the site shows its bundled copy instead of an empty page. To retire old content, publish its replacement first and then unpublish the old rows.

| Table | Key | Fields | Shows on |
| --- | --- | --- | --- |
| `site_news` | `slug` | `date` (YYYY-MM-DD), `label`, `title`, `excerpt`, `body` (text array, one paragraph per item), `image_url` | /news, /news/{slug}, search, sitemap |
| `site_programmes` | `slug` | `family` (`Programme` or `Initiative`), `label` (e.g. "01", programmes only), `name`, `kicker`, `body`, `points` (text array), `image`, `logo`, `dossier` (JSON, see below), `brand` (JSON, see below) | Home, /programmes, /programmes/{slug}, Zazi |
| `site_gallery_events` | `id` | `title`, `theme` (one of the gallery themes), `year`, `month` (1–12), `date` (display text, e.g. "29–30 May 2026"), `overview`, `photos` (JSON array of `{ "src": "<url>", "caption": "…" }`), `video_url`, `programme_slug` (links the event to a programme page) | /gallery, /gallery/{id}, programme pages |
| `site_press` | `id` | `date`, `kind` (`Press release`, `Statement`, `Media kit`, `Report`), `title`, `summary`, `file_url` (leave empty to show `file_label`, e.g. "PDF · coming") | /news (press room) |
| `site_resources` | `id` | `title`, `category` (any text, e.g. `Guides`, `Policies`, `Reports`; the filter chips follow what you use), `description`, `file_url` (PDF, Word, Excel, PowerPoint or ZIP) | /resources, Zazi |
| `site_opportunities` | `id` | `title`, `org`, `category` (`Funding`, `Study`, `Work`, `Competition`), `opens`, `closes`, `body`, `url`, `image_url` | Home, /opportunities |
| `site_people` | `slug` | `name`, `circle`, `field`, `place`, `initials`, `photo`, `year`, `joined`, `brief`, `story` (text array), `quote`, `links` (JSON `[{label,url}]`) | /people, /people/{slug} |

**Programme page details.** The seed fills `dossier` and `brand` with each programme's current values. Edit fields in place; a field left empty keeps the built-in value.

- `dossier`: `founded`, `foundedNote`, `vision`, `mission`, `commitments` (list of text), `team` (list of `{ name, role, photo, note }`), `stats` (list of `{ value, label }`, the impact numbers), `allies` (list of `{ name, short, note, url }`, the partners strip), `walk` (list of `{ step, title, body }`).
- `brand`: `accent`, `tint`, `onAccent` (hex colours such as `#1F6F6B`; anything else is ignored), `short`, `tagline`, `cta` (`{ label, hash }`, the join button), `joinField` (`{ label, options[] }`, the programme-specific question on its join form).
- `logo`: public URL of an uploaded logo (shown in the programme nav, programme cards and gallery).

**Page text: `site_blocks`** holds one JSON document per `key`. Edit the `data` column. The seed fills every block with today's text, so the easiest way to build an editor is to load the current JSON and save it back with the same shape. For an object block you may save only the fields you are changing; the rest keep their defaults. A list block replaces the whole list.

| `key` | Shape | Used for |
| --- | --- | --- |
| `site` | object: `name`, `legal`, `meaning`, `tagline`, `email`, `phone`, `location`, `registration{…}` | Footer, contact page, every form's fallback email |
| `social` | object: `instagram`, `facebook`, `linkedin`, `whatsapp`, `tiktok` | Footer icons |
| `media` | object: `introVideoUrl`, `introPosterUrl` (null = use the bundled file) | Intro video on Home and About |
| `faqs` | list of `{ q, a }` | /faq, Get Involved, Zazi |
| `values` | list of `{ name, body, isNot }` | About |
| `principles`, `collab_creed`, `gallery_themes` | list of strings | About, Collaborate, Gallery filters |
| `lexicon` | list of `{ term, formerly, body }` | Our People |
| `our_work_pillars`, `who_we_serve_groups` | list of `{ title, body }` | Our Work, Who We Serve |
| `journey_steps`, `process_steps` | list of `{ step, title, body }` | Home, Programmes |
| `walk_stages` | list of `{ time, title, body }` | Home |
| `learning_pathways` | list of `{ id, name, ages, image, points[] }` | Home |
| `partners` | list of `{ name, short, url, note }` | Partner strip |
| `movements` | list of `{ id, name, kind, place, body, role, url }` | Collaborate |
| `footprint` | object: `since`, `province`, `areas[]`, `anchorSchool`, `anchorSupporter`, `openness` | Collaborate |
| `singaweb_schools` | list of `{ id, name, websiteUrl, photos[{src,caption,year}] }` | SINGAWEB programme page |
| `career_yum`, `taca_matric_system` | objects with link labels and URLs | TACA programme page |
| `media_contact` | object: `name`, `email`, `boilerplate` | Press room |
| `forms`, `opportunity_help_forms` | objects of `{ title, blurb }` per form | Form headings |
| `safety_commitments` | list of `{ title, body }` | /safety |
| `privacy_sections` | list of `{ title, body }` | /privacy |
| `stewards`, `guides` | lists | Reserved for leadership/guide listings |

### Adding a resource document (no code)

1. Upload the file to the `site-content` bucket, e.g. under `resources/annual-report-2026.pdf` (management site upload screen, or Supabase → Storage). Use a new file name for each new version.
2. Copy its public URL.
3. Add a row to `site_resources`: an `id` such as `annual-report-2026`, `title`, `category`, `description`, `file_url` = the URL, `is_published` = true, and a `sort_order`.

It appears on /resources (and in search and Zazi's answers) within about a minute. PDFs get a **View** button that opens them on the page; other formats get **Download** only. Press releases work the same way through `site_press.file_url`.

### What still needs a code change

Only page structure and design: page layouts and headings, the background photos built into page designs, form questions, the navigation menu, the opportunity categories (Funding, Study, Work, Competition) and people circles (each has its own form or filter), and the built-in fallback copy in `src/lib/site-content.ts`. Everything that changes over time (news, programmes and their teams, stats and partners, gallery, people, opportunities, resources, press, contact details, FAQs, policies, partners and the intro video) is edited in Supabase.

## Storage buckets

| Bucket | Public | Limits | Purpose |
| --- | --- | --- | --- |
| `site-content` | yes | 50 MB per file; images, PDF, Word/Excel/PowerPoint, ZIP, MP4/WebM | Everything the management site publishes: photos, logos, press releases, resources, video |
| `form-uploads` | **no** | 5 MB per file; PDF, JPG/PNG/WEBP/HEIC, DOC/DOCX | ID copies and CVs from application forms. Only active team members can read. |

The limits are enforced by Supabase itself, by `/api/submit` (which also checks each file's real contents, not just its name), and in the browser for instant feedback (`src/lib/upload-rules.ts`).

### Video and large media

Cloudflare rejects any single file over **25 MiB** in the site bundle, so large media must not be added to `src/assets`. Compress it, then upload it to `site-content`:

```powershell
# ~16 MB for a 7-minute 540p video; plays smoothly on mobile data
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 30 -vf scale=960:-2 -c:a aac -b:a 64k -movflags +faststart intro.mp4
bun scripts/upload-media.ts intro.mp4 video/intro-2026.mp4 --set-intro-video
```

`--set-intro-video` points the homepage and About page at the new file (the `media` block). `--set-intro-poster` does the same for the poster image. Gallery events take a `video_url` directly. Upload a new path rather than overwriting an old one: files are cached by browsers for a year.

## Spam protection and rate limits

- Every form includes a hidden honeypot field and a Cloudflare Turnstile check, which is invisible for most visitors. `/api/submit` verifies both before saving anything.
- `/api/submit`: 8 submissions per 10 minutes per visitor. `/api/zazi`: 15 messages per 10 minutes and 80 per day per visitor.
- Limits are counted in `public.rate_limits` (shared across all server instances). Visitor IPs are stored only as SHA-256 hashes, and old rows clean themselves up.
- If `TURNSTILE_SECRET_KEY` is missing, the Turnstile check is skipped and a warning is logged. Set it in production.

## Management Website Contract

- Manage opportunity records in `public.site_opportunities` using `id` as the stable key, people in `public.site_people` using `slug`, and the content tables above. Set `is_published` to control visibility and `sort_order` to control order.
- Review submissions in `public.form_submissions`. Team accounts can read them and update only `status`, `assigned_to` and `internal_notes`; submitted names, contact details and payloads stay unchanged through the Data API. Uploaded files are referenced in `payload.idCopy` / `payload.cv` as `{ path, name, size, type }`; create a short-lived signed URL to view one.
- CV and ID uploads stay in the private `form-uploads` bucket. Only active team members can read those objects. Keep access limited to staff who need it.
- The database policies are the security boundary. Do not rely on hiding management controls in the user interface, and do not use the service-role key in the management website's client code.

The management website must sign in with Supabase Auth and use the same project URL. Its authenticated user's UUID must have an active team-membership row before its edits and inbox access will succeed.
