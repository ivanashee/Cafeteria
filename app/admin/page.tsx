'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setBusy(true);
    const sb = supabaseBrowser();
    const { error } = await sb.auth.signInWithPassword({ email, password: pass });
    if (error) { setErr(error.message); setBusy(false); return; }
    router.push('/admin/dashboard');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-coffeeDark grid place-items-center p-8 cs-fade">
      <form onSubmit={onSubmit} className="w-full max-w-[400px] p-10 bg-cream rounded-2xl">
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.png" alt="Coffee Store" className="w-16 h-16 mx-auto mb-4 object-contain" />
          <div className="font-mono text-[10px] tracking-widest uppercase text-stone mb-2">Panel administrativo</div>
          <div className="font-display text-3xl">Coffee Store</div>
        </div>
        <label className="flex flex-col gap-1.5 mb-3.5">
          <span className="text-[11px] tracking-widest uppercase text-stone">Email</span>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 px-3.5 rounded-lg border border-border bg-white text-sm outline-none" />
        </label>
        <label className="flex flex-col gap-1.5 mb-5">
          <span className="text-[11px] tracking-widest uppercase text-stone">Contraseña</span>
          <input required type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="h-11 px-3.5 rounded-lg border border-border bg-white text-sm outline-none" />
        </label>
        {err && <div className="mb-3 text-[13px] text-red-700">{err}</div>}
        <button disabled={busy} type="submit" className="w-full h-12 rounded-full bg-coffee text-cream text-sm tracking-wide hover:bg-cocoa disabled:opacity-60">
          {busy ? 'Ingresando…' : 'Ingresar'}
        </button>
        <Link href="/" className="block w-full text-center py-3.5 mt-2 text-xs uppercase tracking-widest text-stone hover:text-coffee">← Volver a la tienda</Link>
      </form>
    </div>
  );
}
