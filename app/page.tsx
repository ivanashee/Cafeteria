import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories, getCategoryCounts } from '@/lib/data';
import { isSupabaseConfigured } from '@/lib/supabase/server';

export const revalidate = 60;

export default async function HomePage() {
  const configured = isSupabaseConfigured();
  const [featured, categories, counts] = await Promise.all([
    getProducts({ featured: true, inStock: true, limit: 4 }),
    getCategories(),
    getCategoryCounts(),
  ]);

  const swatches = ['#7A4A2E', '#B84A3A', '#4A5D3A', '#C9A876', '#3D2A1E', '#D9A05B'];

  return (
    <div className="cs-fade">
      {!configured && (
        <div className="bg-yellow-50 border-b border-yellow-200 text-yellow-900 text-sm">
          <div className="max-w-[1360px] mx-auto px-8 py-3 flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest uppercase bg-yellow-200 px-2 py-1 rounded">Config</span>
            <span>La app se está renderizando sin datos porque faltan las variables de entorno de Supabase en Vercel. Cargalas en <strong>Project Settings → Environment Variables</strong> y hacé redeploy.</span>
          </div>
        </div>
      )}
      {/* HERO */}
      <section className="relative h-[780px] max-h-[96vh] overflow-hidden bg-coffeeDark">
        {/* Coffee background image with Ken Burns zoom */}
        <div
          className="absolute inset-0 cs-ken-burns bg-cover bg-center"
          style={{ backgroundImage: "url('https://source.unsplash.com/1920x1080/?coffee,espresso,dark&sig=hero1')" }}
        />
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,16,12,0.72) 0%, rgba(20,16,12,0.58) 40%, rgba(20,16,12,0.85) 100%)' }} />
        {/* Warm radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(1400px 700px at 50% 45%, rgba(201, 168, 118, 0.22), transparent 60%)' }} />
        <span className="cs-corner cs-corner-hero cs-corner-tl cs-fade cs-delay-300" />
        <span className="cs-corner cs-corner-hero cs-corner-tr cs-fade cs-delay-300" />
        <span className="cs-corner cs-corner-hero cs-corner-bl cs-fade cs-delay-300" />
        <span className="cs-corner cs-corner-hero cs-corner-br cs-fade cs-delay-300" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center text-cream px-10 max-w-[960px]">
            <div className="flex items-center justify-center gap-3.5 mb-8 text-gold cs-reveal cs-delay-100">
              <span className="w-16 h-px bg-current opacity-60" />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polygon points="7,1 13,7 7,13 1,7" stroke="currentColor" strokeWidth="0.8"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/></svg>
              <span className="font-mono text-[10px] tracking-[0.36em] uppercase">Est. MMXXI</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polygon points="7,1 13,7 7,13 1,7" stroke="currentColor" strokeWidth="0.8"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/></svg>
              <span className="w-16 h-px bg-current opacity-60" />
            </div>
            <h1 className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[0.96] tracking-tight mb-7 cs-reveal cs-delay-200" style={{ textShadow: '0 4px 32px rgba(0,0,0,0.5)' }}>
              El café que <em className="italic text-gold">despierta</em><br />lo mejor de tu día
            </h1>
            <div className="flex justify-center mb-7 cs-reveal cs-delay-300"><span className="w-10 h-px bg-gold/60" /></div>
            <p className="font-story italic text-xl md:text-2xl leading-relaxed text-cream/80 max-w-[560px] mx-auto mb-11 cs-reveal cs-delay-400">
              Granos seleccionados, tostados en pequeños lotes y entregados a tu puerta en 48 horas. Del cafetal a tu taza, sin intermediarios.
            </p>
            <div className="inline-flex gap-3 flex-wrap justify-center cs-reveal cs-delay-500">
              <Link href="/catalogo" className="h-13 min-h-[52px] px-7 rounded-full bg-cream text-ink text-sm font-medium tracking-wide inline-flex items-center gap-2.5 hover:bg-gold transition">
                Explorar catálogo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
              <Link href="/historia" className="h-13 min-h-[52px] px-7 rounded-full border border-cream/25 text-cream text-sm tracking-wide inline-flex items-center hover:bg-cream/10 transition">Nuestra historia</Link>
            </div>
          </div>
        </div>
        {/* Bottom scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/50 font-mono text-[10px] tracking-[0.3em] uppercase cs-float">Desplazá para descubrir</div>
      </section>

      {/* BENEFITS */}
      <section className="border-b border-border">
        <div className="max-w-[1360px] mx-auto px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: 'i', title: 'Tueste artesanal', text: 'Lotes pequeños semanales' },
            { n: 'ii', title: 'Envío 48h', text: 'Todo el país' },
            { n: 'iii', title: 'Origen trazable', text: 'Nombre del productor' },
            { n: 'iv', title: 'Recién tostado', text: '< 72h desde tostado' },
          ].map((b, i) => (
            <div key={b.n} className="flex items-center gap-3.5 cs-reveal" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              <div className="w-10 h-10 rounded-full bg-beige grid place-items-center flex-shrink-0">
                <span className="font-display italic text-coffee">{b.n}</span>
              </div>
              <div>
                <div className="text-sm font-medium">{b.title}</div>
                <div className="text-xs text-stone mt-0.5">{b.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-[1360px] mx-auto px-8 pt-24 pb-8">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap cs-reveal">
          <div>
            <div className="font-mono text-[11px] tracking-widest uppercase text-stone mb-3">— Selección de la semana</div>
            <h2 className="font-display font-normal text-5xl tracking-tight">Destacados</h2>
          </div>
          <Link href="/catalogo" className="text-xs tracking-wide uppercase text-coffee pb-1 border-b border-coffee">Ver todos</Link>
        </div>
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <div key={p.id} className="cs-reveal" style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center border border-dashed border-border rounded-xl text-stone">
            No hay productos destacados aún. Cargá algunos desde el admin o corré <code className="font-mono">supabase/seed.sql</code>.
          </div>
        )}
      </section>

      {/* CATEGORIES */}
      <section className="max-w-[1360px] mx-auto px-8 py-24">
        <div className="mb-12 cs-reveal">
          <div className="font-mono text-[11px] tracking-widest uppercase text-stone mb-3">— Comprá por categoría</div>
          <h2 className="font-display font-normal text-5xl tracking-tight">Todo para tu ritual</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((c, i) => {
            const bgImages = [
              'https://source.unsplash.com/800x600/?coffee-beans,roasted&sig=cat1',
              'https://source.unsplash.com/800x600/?cold-brew,coffee&sig=cat2',
              'https://source.unsplash.com/800x600/?coffee-gift-box&sig=cat3',
              'https://source.unsplash.com/800x600/?coffee-mug,cup&sig=cat4',
              'https://source.unsplash.com/800x600/?coffee-machine,espresso&sig=cat5',
              'https://source.unsplash.com/800x600/?coffee-package,craft&sig=cat6',
            ];
            return (
              <Link
                key={c.id}
                href={`/catalogo?cat=${c.slug}`}
                className="cs-reveal group relative aspect-[4/3] rounded-xl overflow-hidden p-7 flex flex-col justify-between transition-transform hover:-translate-y-1"
                style={{ animationDelay: `${0.1 + i * 0.1}s`, background: swatches[i % swatches.length] }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${bgImages[i % bgImages.length]}')` }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(30,26,21,0.25) 0%, rgba(30,26,21,0.75) 100%)' }} />
                <div className="relative font-mono text-[10px] tracking-widest uppercase text-cream/80">{counts[c.slug] ?? 0} productos</div>
                <div className="relative">
                  <div className="font-display text-3xl text-cream tracking-tight mb-2" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>{c.name}</div>
                  <div className="text-[13px] text-cream/95 inline-flex items-center gap-2">Ver categoría <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="bg-coffee text-cream">
        <div className="max-w-[1360px] mx-auto px-8 py-32 grid lg:grid-cols-[1.1fr_1fr] gap-24 items-center">
          <div className="cs-reveal-left">
            <div className="font-mono text-[11px] tracking-widest uppercase text-gold mb-6">— Un buen café empieza antes</div>
            <h2 className="font-display font-light text-5xl lg:text-6xl leading-[1.04] tracking-tight mb-6">Del <em className="italic text-gold">productor</em> a tu cocina, con nombre y apellido.</h2>
            <p className="text-base leading-relaxed text-cream/72 mb-8 max-w-[520px]">Trabajamos con pequeñas fincas del norte del país. Cada bolsa lleva el nombre del productor, la finca y la altitud.</p>
            <Link href="/historia" className="inline-block px-6 py-3.5 rounded-full border border-cream/30 text-cream text-sm hover:bg-cream/10 transition">Conocé a los productores</Link>
          </div>
          <div className="cs-reveal-right aspect-[4/5] rounded-xl relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/800x1000/?coffee-farmer,coffee-plantation&sig=editorial1')" }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(30,22,17,0.2) 0%, rgba(30,22,17,0.6) 100%)' }} />
            <div className="absolute inset-5 border border-gold/40" />
            <div className="absolute inset-7 border border-gold/20" />
            <div className="absolute bottom-8 left-8 right-8 text-cream">
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold mb-2">Finca La Esperanza</div>
              <div className="font-display italic text-2xl">1.480 msnm — Sofía Núñez</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
