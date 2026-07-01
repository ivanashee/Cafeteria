import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import SortSelect from '@/components/SortSelect';
import MountainScene from '@/components/MountainScene';
import { getProducts, getCategories, getCategoryCounts } from '@/lib/data';

const SORT_OPTIONS = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'name-asc', label: 'Nombre A–Z' },
  { value: 'name-desc', label: 'Nombre Z–A' },
];

export const revalidate = 60;

type SP = { cat?: string; q?: string; sort?: string; min?: string; max?: string; stock?: string; featured?: string };

export default async function CatalogPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const sort = (sp.sort as any) ?? 'recent';
  const [products, categories, counts] = await Promise.all([
    getProducts({
      categorySlug: sp.cat,
      query: sp.q,
      sort,
      inStock: sp.stock === '1',
      featured: sp.featured === '1',
      priceMin: sp.min ? Number(sp.min) : undefined,
      priceMax: sp.max ? Number(sp.max) : undefined,
    }),
    getCategories(),
    getCategoryCounts(),
  ]);
  const totalActive = Object.values(counts).reduce((a, b) => a + b, 0);
  const buildHref = (patch: Partial<SP>) => {
    const next = { ...sp, ...patch };
    const qs = Object.entries(next).filter(([, v]) => v != null && v !== '').map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&');
    return `/catalogo${qs ? `?${qs}` : ''}`;
  };

  return (
    <div className="cs-fade">
      {/* CATALOG HERO — art-decó mountain scene */}
      <section className="relative h-[380px] overflow-hidden bg-coffeeDark">
        <div className="absolute inset-0">
          <MountainScene />
        </div>
        {/* Subtle darkening at the top and bottom for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(20,16,12,0.35) 0%, rgba(20,16,12,0) 40%, rgba(20,16,12,0) 60%, rgba(20,16,12,0.55) 100%)' }}
        />
        <span className="cs-corner cs-corner-hero cs-corner-tl" />
        <span className="cs-corner cs-corner-hero cs-corner-tr" />
        <span className="cs-corner cs-corner-hero cs-corner-bl" />
        <span className="cs-corner cs-corner-hero cs-corner-br" />
        <div className="absolute inset-0 grid place-items-center text-center text-cream px-8">
          <div>
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-gold mb-4 cs-reveal cs-delay-100">— Catálogo completo</div>
            <h1 className="font-display font-light text-5xl md:text-7xl tracking-tight cs-reveal cs-delay-200" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>Todos nuestros productos</h1>
            <p className="font-story italic text-lg md:text-xl text-cream/85 mt-4 cs-reveal cs-delay-300">{products.length} de {totalActive} productos disponibles</p>
          </div>
        </div>
      </section>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
        <div className="hidden md:flex items-center gap-3 text-stone">
          <span className="w-10 h-px bg-current opacity-40" />
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><polygon points="7,1 13,7 7,13 1,7" stroke="currentColor" strokeWidth="0.8"/></svg>
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase">Catálogo</span>
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><polygon points="7,1 13,7 7,13 1,7" stroke="currentColor" strokeWidth="0.8"/></svg>
          <span className="w-10 h-px bg-current opacity-40" />
        </div>

        <form action="/catalogo" method="get" className="group relative z-30 inline-flex items-stretch bg-cream border border-border rounded-full shadow-[0_2px_10px_-4px_rgba(30,26,21,0.12)] transition-all hover:shadow-[0_6px_18px_-8px_rgba(30,26,21,0.24)] hover:border-coffee/40">
          {Object.entries(sp).filter(([k]) => k !== 'sort').map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={String(v ?? '')} />
          ))}
          <div className="flex items-center gap-2 pl-5 pr-3">
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="text-gold"><polygon points="7,1 13,7 7,13 1,7" stroke="currentColor" strokeWidth="1"/></svg>
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-stone">Ordenar</span>
          </div>
          <span className="w-px bg-border" />
          <SortSelect name="sort" defaultValue={sort} options={SORT_OPTIONS} />
          <button
            aria-label="Aplicar orden"
            className="ml-1 my-1 mr-1 px-4 rounded-full bg-coffee text-cream text-[11px] font-mono tracking-[0.24em] uppercase inline-flex items-center gap-2 hover:bg-cocoa transition-all"
          >
            Aplicar
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </form>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-start">
        {/* FILTERS */}
        <aside className="lg:sticky lg:top-24 flex flex-col gap-6 lg:gap-8">
          <form action="/catalogo" method="get">
            {sp.cat && <input type="hidden" name="cat" value={sp.cat} />}
            <div className="relative">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B6055" strokeWidth="1.6" strokeLinecap="round" className="absolute left-3.5 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
              <input name="q" defaultValue={sp.q ?? ''} placeholder="Buscar..." className="w-full h-10 pl-10 pr-3.5 rounded-lg border border-border bg-white text-[13px] outline-none" />
            </div>
          </form>

          <div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-stone mb-3.5">Categoría</div>
            <div className="flex flex-col gap-1">
              <Link href={buildHref({ cat: undefined })} className={`text-left px-3 py-2 rounded text-[13px] flex justify-between ${!sp.cat ? 'bg-beige text-coffee' : 'hover:bg-beige'}`}>
                <span>Todas</span><span className="text-stone text-[11px]">{totalActive}</span>
              </Link>
              {categories.map((c) => (
                <Link key={c.id} href={buildHref({ cat: c.slug })} className={`text-left px-3 py-2 rounded text-[13px] flex justify-between ${sp.cat === c.slug ? 'bg-beige text-coffee' : 'hover:bg-beige'}`}>
                  <span>{c.name}</span><span className="text-stone text-[11px]">{counts[c.slug] ?? 0}</span>
                </Link>
              ))}
            </div>
          </div>

          <form action="/catalogo" method="get" className="flex flex-col gap-3.5">
            {sp.cat && <input type="hidden" name="cat" value={sp.cat} />}
            {sp.q && <input type="hidden" name="q" value={sp.q} />}
            <div className="font-mono text-[10px] tracking-widest uppercase text-stone">Precio (Gs.)</div>
            <div className="flex gap-2">
              <input name="min" defaultValue={sp.min ?? ''} type="number" placeholder="Mín" className="w-full h-9 px-2.5 rounded-md border border-border bg-white text-xs outline-none" />
              <input name="max" defaultValue={sp.max ?? ''} type="number" placeholder="Máx" className="w-full h-9 px-2.5 rounded-md border border-border bg-white text-xs outline-none" />
            </div>
            <label className="flex items-center gap-2.5 text-[13px] cursor-pointer">
              <input type="checkbox" name="stock" value="1" defaultChecked={sp.stock === '1'} />
              Solo con stock
            </label>
            <label className="flex items-center gap-2.5 text-[13px] cursor-pointer">
              <input type="checkbox" name="featured" value="1" defaultChecked={sp.featured === '1'} />
              Solo destacados
            </label>
            <button className="self-start h-9 px-4 rounded-full bg-coffee text-cream text-xs">Filtrar</button>
          </form>

          <Link href="/catalogo" className="self-start text-xs tracking-wide uppercase text-stone pb-1 border-b border-border hover:text-coffee hover:border-coffee">Limpiar filtros</Link>
        </aside>

        {/* GRID */}
        <div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={(i % 6) * 90}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="p-20 text-center border border-dashed border-border rounded-xl">
              <div className="font-display text-3xl mb-2">Sin resultados</div>
              <div className="text-stone text-sm mb-5">Probá ajustando los filtros o la búsqueda.</div>
              <Link href="/catalogo" className="inline-block px-5 py-2.5 rounded-full bg-coffee text-cream text-[13px]">Limpiar filtros</Link>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
