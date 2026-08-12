import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://placeholder.supabase.co"

const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  "placeholder"

const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  ""

// Public client using the publishable key (safe for client-side use)
export const supabase = createClient(supabaseUrl, supabasePublishableKey)

// Server-side client using the secret key (use only in API routes / server components)
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey)
