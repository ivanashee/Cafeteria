import { createClient } from '@supabase/supabase-js';

const SCHEMA = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || 'coffeestore';

export function isAdminConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** Server-only client using service_role. NEVER import from client components. */
export function supabaseAdmin() {
  if (!isAdminConfigured()) throw new Error('Supabase admin not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: SCHEMA }, auth: { persistSession: false } }
  );
}
