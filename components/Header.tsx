'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';

export default function Header() {
  const count = useCartStore((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close menu/search when the user navigates.
  useEffect(() => { setOpen(false); setSearchOpen(false); }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Focus the search input when the overlay opens; close on Escape.
  useEffect(() => {
    if (!searchOpen) return;
    const t = setTimeout(() => searchInputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { clearTimeout(t); document.removeEventListener('keydown', onKey); };
  }, [searchOpen]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/catalogo?q=${encodeURIComponent(q)}` : '/catalogo');
    setSearchOpen(false);
    setQuery('');
  }

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/historia', label: 'Nuestra historia' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <>
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-border">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4 grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-3 lg:gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 lg:gap-2.5 lg:justify-self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.png" alt="Cataluña Café & Bistró" className="w-12 h-12 lg:w-14 lg:h-14 object-contain" />
          <span className="font-display font-medium tracking-tight leading-tight flex flex-col">
            <span className="text-lg lg:text-xl">Cataluña</span>
            <span className="text-[10px] lg:text-[11px] font-mono tracking-[0.28em] uppercase text-stone">Café &amp; Bistró</span>
          </span>
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
          <button
            aria-label="Buscar"
            onClick={() => setSearchOpen(true)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full grid place-items-center text-mud hover:bg-beige hover:text-coffee transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          </button>
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

    </header>

    {/* Search overlay */}
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${searchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-hidden={!searchOpen}
    >
      {/* backdrop */}
      <div
        onClick={() => setSearchOpen(false)}
        className="absolute inset-0 bg-coffeeDark/50 backdrop-blur-sm"
      />
      {/* panel */}
      <div className={`relative bg-cream border-b border-border shadow-[0_10px_30px_-12px_rgba(30,26,21,0.25)] transition-transform duration-300 ${searchOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <form onSubmit={submitSearch} className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6B4A32" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar café, bebidas, desayuno…"
            className="flex-1 bg-transparent font-display italic text-2xl md:text-3xl text-coffee placeholder:text-stone/60 outline-none"
          />
          <span className="hidden sm:inline font-mono text-[10px] tracking-[0.28em] uppercase text-stone">Enter ↵</span>
          <button
            type="button"
            aria-label="Cerrar búsqueda"
            onClick={() => setSearchOpen(false)}
            className="w-10 h-10 rounded-full grid place-items-center text-mud hover:bg-beige"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
          </button>
        </form>
      </div>
    </div>

    {/* Mobile drawer — rendered as a sibling of <header> so the header's
        `backdrop-blur` stacking context can't trap our `fixed` position. */}
    <div
      className={`lg:hidden fixed inset-0 z-50 bg-cream transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
      aria-hidden={!open}
      style={{ paddingTop: '57px' }}
    >
      {/* Close button (top-right, on top of the drawer contents) */}
      <button
        aria-label="Cerrar menú"
        onClick={() => setOpen(false)}
        className="absolute top-2 right-4 w-10 h-10 rounded-full grid place-items-center text-coffee hover:bg-beige"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
      </button>
      <nav className="flex flex-col p-6 gap-1 h-full">
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
        <Link href="/privacidad" className="mt-6 py-2 text-center text-xs text-stone hover:text-coffee">
          Política de privacidad
        </Link>
      </nav>
    </div>
    </>
  );
}
