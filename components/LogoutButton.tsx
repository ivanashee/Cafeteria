'use client';

import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        const sb = supabaseBrowser();
        await sb.auth.signOut();
        router.push('/admin');
        router.refresh();
      }}
      className="text-xs uppercase tracking-widest text-stone hover:text-red-700 text-left"
    >
      Cerrar sesión
    </button>
  );
}
