'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/cart-store';

export default function Header() {
  const count = useCartStore((s) => s.items.reduce((a, i) => a + i.qty, 0));
  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-border">
      <div className="max-w-[1360px] mx-auto px-8 py-4 grid grid-cols-[1fr_auto_1fr] items-center gap-8">
        <Link href="/" className="justify-self-start flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-coffee text-cream inline-grid place-items-center font-display italic text-lg">c</span>
          <span className="font-display text-xl font-medium tracking-tight">Coffee Store</span>
        </Link>
        <nav className="flex gap-8 text-sm text-mud">
          <Link href="/" className="py-1 border-b border-transparent hover:border-coffee">Inicio</Link>
          <Link href="/catalogo" className="py-1 border-b border-transparent hover:border-coffee">Catálogo</Link>
          <Link href="/historia" className="py-1 border-b border-transparent hover:border-coffee">Nuestra historia</Link>
          <Link href="/contacto" className="py-1 border-b border-transparent hover:border-coffee">Contacto</Link>
        </nav>
        <div className="justify-self-end flex items-center gap-2">
          <Link href="/admin" title="Admin" className="w-10 h-10 rounded-full grid place-items-center text-mud hover:bg-beige">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>
          </Link>
          <Link href="/carrito" title="Carrito" className="h-10 px-3.5 rounded-full inline-flex items-center gap-2 bg-coffee text-cream text-[13px] hover:bg-cocoa">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 5h2l2.5 11h11l2-8H7"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>
            <span>Carrito</span>
            <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-gold text-ink text-[11px] font-semibold inline-grid place-items-center">{count}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
