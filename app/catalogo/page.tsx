import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories, getCategoryCounts } from '@/lib/data';

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
    <div className="max-w-[1360px] mx-auto px-8 py-14 cs-fade">
      <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
        <div>
          <div className="font-mono text-[11px] tracking-widest uppercase text-stone mb-3">— Catálogo completo</div>
          <h1 className="font-display text-5xl md:text-6xl tracking-tight">Todos nuestros productos</h1>
          <p className="text-sm text-stone mt-3">{products.length} de {totalActive} productos</p>
        </div>
        <form action="/catalogo" method="get" className="flex gap-2 items-center">
          {Object.entries(sp).filter(([k]) => k !== 'sort').map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={String(v ?? '')} />
          ))}
          <span className="text-xs tracking-wide uppercase text-stone">Ordenar</span>
          <select name="sort" defaultValue={sort} className="h-10 pl-4 pr-8 rounded-full border border-border bg-cream text-[13px]">
            <option value="recent">Más recientes</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name-asc">Nombre A–Z</option>
            <option value="name-desc">Nombre Z–A</option>
          </select>
          <button className="h-10 px-4 rounded-full bg-coffee text-cream text-xs">Aplicar</button>
        </form>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-12 items-start">
        {/* FILTERS */}
        <aside className="sticky top-24 flex flex-col gap-8">
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
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
  );
}
