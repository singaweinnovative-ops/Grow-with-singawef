import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase-types";

const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const anonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined;

let client: SupabaseClient<Database> | undefined;

/**
 * Public, browser-safe Supabase client using the anon key. Forms submit
 * directly from here — never read/update/delete, only INSERT, which the
 * Row Level Security policies in supabase/schema.sql enforce server-side
 * regardless of what the client sends.
 */
export function getSupabaseBrowserClient() {
  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env",
    );
  }

  if (!client) {
    client = createClient<Database>(url, anonKey, { auth: { persistSession: false } });
  }
  return client;
}
