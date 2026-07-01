'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';

export default function Header() {
  const count = useCartStore((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer when the user navigates.
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/historia', label: 'Nuestra historia' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-border">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4 grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-3 lg:gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 lg:gap-2.5 lg:justify-self-start">
          <span className="w-8 h-8 rounded-full bg-coffee text-cream inline-grid place-items-center font-display italic text-lg">c</span>
          <span className="font-display text-lg lg:text-xl font-medium tracking-tight">Coffee Store</span>
        </Link>

        {/* Desktop nav (hidden on mobile) */}
        <nav className="hidden lg:flex gap-8 text-sm text-mud">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`py-1 border-b transition-colors ${pathname === l.href ? 'border-coffee text-coffee' : 'border-transparent hover:border-coffee'}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 justify-self-end">
          <Link href="/admin" title="Admin" className="hidden sm:grid w-10 h-10 rounded-full place-items-center text-mud hover:bg-beige">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>
          </Link>
          <Link href="/carrito" title="Carrito" className="h-9 sm:h-10 px-3 sm:px-3.5 rounded-full inline-flex items-center gap-1.5 sm:gap-2 bg-coffee text-cream text-xs sm:text-[13px] hover:bg-cocoa">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 5h2l2.5 11h11l2-8H7"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>
            <span className="hidden sm:inline">Carrito</span>
            <span className="min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-5 px-1 sm:px-1.5 rounded-full bg-gold text-ink text-[10px] sm:text-[11px] font-semibold inline-grid place-items-center">{count}</span>
          </Link>
          <button
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-full grid place-items-center text-coffee hover:bg-beige"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[57px] bottom-0 bg-cream transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col p-6 gap-1">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-baseline justify-between py-4 border-b border-border transition-colors ${pathname === l.href ? 'text-coffee' : 'text-ink hover:text-coffee'}`}
            >
              <span className="font-display text-3xl">{l.label}</span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-stone">0{i + 1}</span>
            </Link>
          ))}
          <Link href="/admin" className="mt-6 py-3 px-4 rounded-full border border-border text-center text-[13px] text-mud hover:bg-beige">
            Panel administrativo
          </Link>
          <Link href="/privacidad" className="mt-2 py-2 text-center text-xs text-stone hover:text-coffee">
            Política de privacidad
          </Link>
        </nav>
      </div>
    </header>
  );
}
