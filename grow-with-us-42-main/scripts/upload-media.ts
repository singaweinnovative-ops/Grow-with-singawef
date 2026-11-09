/**
 * Uploads a media file to the public `site-content` Supabase bucket and
 * prints its public URL — for files too large to ship inside the website
 * deploy (Cloudflare rejects any single static file over 25 MiB), or media
 * the team should be able to swap without a code change.
 *
 *   bun scripts/upload-media.ts <local-file> [bucket-path] [--set-intro-video | --set-intro-poster]
 *
 * Examples:
 *   bun scripts/upload-media.ts "C:\Videos\intro.mp4" video/intro-2026.mp4 --set-intro-video
 *   bun scripts/upload-media.ts press\charter.pdf press/charter-2026.pdf
 *
 * --set-intro-video / --set-intro-poster also point the homepage and About
 * page at the uploaded file (site_blocks key "media"); the site picks it up
 * within a minute, no redeploy needed.
 *
 * Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the shell (never in
 * .env or the repo). The management website can do the same through its
 * own upload screen.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, statSync } from "node:fs";
import { basename, extname } from "node:path";
import type { Database } from "../src/lib/supabase-types.ts";

const MAX_BYTES = 50 * 1024 * 1024; // matches the bucket limit in supabase/schema.sql
const TYPES: Record<string, string> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const [file, destArg] = args.filter((a) => !a.startsWith("--"));

const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
const serviceRoleKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];

if (!file) {
  console.error(
    "Usage: bun scripts/upload-media.ts <local-file> [bucket-path] [--set-intro-video|--set-intro-poster]",
  );
  process.exit(1);
}
if (!url || !serviceRoleKey) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in this shell first.");
  process.exit(1);
}

const contentType = TYPES[extname(file).toLowerCase()];
if (!contentType) {
  console.error(`Unsupported file type ${extname(file)}. Allowed: ${Object.keys(TYPES).join(" ")}`);
  process.exit(1);
}
const size = statSync(file).size;
if (size > MAX_BYTES) {
  console.error(
    `File is ${(size / 1e6).toFixed(1)} MB; the limit is 50 MB. Compress it first (see supabase/README.md).`,
  );
  process.exit(1);
}

const dest = destArg ?? `uploads/${Date.now()}-${basename(file).replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;

const supabase = createClient<Database>(url, serviceRoleKey, { auth: { persistSession: false } });

const { error } = await supabase.storage.from("site-content").upload(dest, readFileSync(file), {
  contentType,
  // Uploaded paths are treated as immutable — upload a new path to replace a file.
  cacheControl: "31536000",
  upsert: false,
});
if (error) {
  console.error(`Upload failed: ${error.message}`);
  process.exit(1);
}

const publicUrl = supabase.storage.from("site-content").getPublicUrl(dest).data.publicUrl;
console.log(`Uploaded ${(size / 1e6).toFixed(1)} MB → ${publicUrl}`);

const field = flags.has("--set-intro-video")
  ? "introVideoUrl"
  : flags.has("--set-intro-poster")
    ? "introPosterUrl"
    : null;
if (field) {
  const { data: existing } = await supabase
    .from("site_blocks")
    .select("data")
    .eq("key", "media")
    .maybeSingle();
  const current = (existing?.data ?? {}) as Record<string, unknown>;
  const { error: blockError } = await supabase
    .from("site_blocks")
    .upsert({ key: "media", data: { ...current, [field]: publicUrl } }, { onConflict: "key" });
  if (blockError) {
    console.error(`Uploaded, but updating the media block failed: ${blockError.message}`);
    process.exit(1);
  }
  console.log(`site_blocks.media.${field} now points at the uploaded file.`);
}
