import { createClient } from '@supabase/supabase-js';

const SCHEMA = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || 'coffeestore';

/** Server-only client using service_role. NEVER import from client components. */
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: SCHEMA }, auth: { persistSession: false } }
  );
}
