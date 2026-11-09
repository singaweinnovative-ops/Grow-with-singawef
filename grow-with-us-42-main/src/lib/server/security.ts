/**
 * Server-only helpers for the /api/* routes. Secrets are read from the
 * host's server environment at request time (Cloudflare: Worker secrets;
 * locally: .env). Nothing here is VITE_-prefixed, so none of it can end up
 * in the browser bundle.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase-types";

function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
}

/* ---------------------------- Supabase admin ---------------------------- */

let admin: SupabaseClient<Database> | undefined;

/**
 * Service-role client. Bypasses Row Level Security, so it is only ever
 * used inside server route handlers after the request has passed the spam
 * and validation checks. Returns undefined when not configured.
 */
export function getSupabaseAdmin(): SupabaseClient<Database> | undefined {
  if (admin) return admin;
  const url = env("SUPABASE_URL") ?? (import.meta.env["VITE_SUPABASE_URL"] as string | undefined);
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return undefined;
  admin = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return admin;
}

/* ------------------------------- Requests ------------------------------- */

export function getClientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

/**
 * Rejects cross-site POSTs from other websites' pages. Browsers always send
 * Origin on a fetch POST; tools that omit it are still rate-limited.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export function json(body: unknown, status = 200, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers,
    },
  });
}

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/* ------------------------------ Rate limits ----------------------------- */

const memoryHits = new Map<string, number[]>();

function memoryLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (memoryHits.get(key) ?? []).filter((t) => now - t < windowMs);
  hits.push(now);
  memoryHits.set(key, hits);
  if (memoryHits.size > 5000) {
    // Keep the per-worker map small; the database limit is the durable one.
    for (const [k, v] of memoryHits) if (v.every((t) => now - t >= windowMs)) memoryHits.delete(k);
  }
  return hits.length <= limit;
}

/**
 * Returns true when this caller is still within `limit` requests per
 * `windowSeconds`. Checked twice: in this worker's memory (instant, but
 * per-instance) and in Postgres via consume_rate_limit() (shared by every
 * instance). IP addresses are hashed before they are stored.
 */
export async function withinRateLimit(
  scope: string,
  request: Request,
  limit: number,
  windowSeconds: number,
): Promise<boolean> {
  const key = `${scope}:${await sha256(getClientIp(request))}`;
  if (!memoryLimit(key, limit, windowSeconds * 1000)) return false;

  const client = getSupabaseAdmin();
  if (!client) return true;
  try {
    const { data, error } = await client.rpc("consume_rate_limit", {
      p_key: key,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    });
    if (error) throw error;
    return data !== false;
  } catch (err) {
    // Fail open on a database hiccup — the in-memory limit still applies.
    console.warn("[rate-limit] database check failed:", err instanceof Error ? err.message : err);
    return true;
  }
}

/* ------------------------------- Turnstile ------------------------------ */

let warnedNoTurnstile = false;

/**
 * Verifies a Cloudflare Turnstile token. When TURNSTILE_SECRET_KEY is not
 * set the check is skipped (with a log warning) so the forms keep working
 * on a fresh deployment — set it in production.
 */
export async function verifyTurnstile(token: unknown, request: Request): Promise<boolean> {
  const secret = env("TURNSTILE_SECRET_KEY");
  if (!secret) {
    if (!warnedNoTurnstile) {
      console.warn("[turnstile] TURNSTILE_SECRET_KEY is not set — spam check skipped.");
      warnedNoTurnstile = true;
    }
    return true;
  }
  if (typeof token !== "string" || !token) return false;

  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  const ip = getClientIp(request);
  if (ip !== "unknown") body.set("remoteip", ip);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}
