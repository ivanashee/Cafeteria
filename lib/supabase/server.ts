import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const SCHEMA = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || 'coffeestore';

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function supabaseServer() {
  if (!isSupabaseConfigured()) return null;
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      db: { schema: SCHEMA },
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(list: { name: string; value: string; options?: any }[]) {
          try { list.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {}
        },
      },
    }
  );
}
