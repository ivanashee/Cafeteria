import Link from 'next/link';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import Reveal from '@/components/Reveal';
import { getProducts, getCategories, getCategoryCounts } from '@/lib/data';
import { isSupabaseConfigured } from '@/lib/supabase/server';
import { HERO_IMAGE, CATEGORY_IMAGES, EDITORIAL_IMAGE } from '@/lib/images';

export const revalidate = 60;

export default async function HomePage() {
  const configured = isSupabaseConfigured();
  const [featured, extra, categories, counts] = await Promise.all([
    getProducts({ featured: true, inStock: true, limit: 12 }),
    getProducts({ inStock: true, limit: 12 }),
    getCategories(),
    getCategoryCounts(),
  ]);
  // Combine featured + rest, dedup, cap at 12 so the carousel has multiple pages
  const seen = new Set<string>();
  const carouselProducts = [...featured, ...extra].filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  }).slice(0, 12);

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
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
        {/* Lighter overlay so the coffee photo actually shows through */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,16,12,0.35) 0%, rgba(20,16,12,0.25) 45%, rgba(20,16,12,0.6) 100%)' }} />
        {/* Warm radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(1400px 700px at 50% 45%, rgba(201, 168, 118, 0.18), transparent 60%)' }} />
        <span className="cs-corner cs-corner-hero cs-corner-tl cs-fade cs-delay-300" />
        <span className="cs-corner cs-corner-hero cs-corner-tr cs-fade cs-delay-300" />
        <span className="cs-corner cs-corner-hero cs-corner-bl cs-fade cs-delay-300" />
        <span className="cs-corner cs-corner-hero cs-corner-br cs-fade cs-delay-300" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center text-cream px-10 max-w-[960px]">
            <Reveal delay={100} className="flex items-center justify-center gap-3.5 mb-8 text-gold">
              <span className="w-16 h-px bg-current opacity-60" />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polygon points="7,1 13,7 7,13 1,7" stroke="currentColor" strokeWidth="0.8"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/></svg>
              <span className="font-mono text-[10px] tracking-[0.36em] uppercase">Est. MMXXI</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polygon points="7,1 13,7 7,13 1,7" stroke="currentColor" strokeWidth="0.8"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/></svg>
              <span className="w-16 h-px bg-current opacity-60" />
            </Reveal>
            <Reveal delay={300} as="h1" className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[0.96] tracking-tight mb-7" style={{ textShadow: '0 4px 32px rgba(0,0,0,0.5)' }}>
              El café que <em className="italic text-gold">despierta</em><br />lo mejor de tu día
            </Reveal>
            <Reveal delay={500} className="flex justify-center mb-7"><span className="w-10 h-px bg-gold/60" /></Reveal>
            <Reveal delay={600} as="p" className="font-story italic text-xl md:text-2xl leading-relaxed text-cream/80 max-w-[560px] mx-auto mb-11">
              Granos seleccionados, tostados en pequeños lotes y entregados a tu puerta en 48 horas. Del cafetal a tu taza, sin intermediarios.
            </Reveal>
            <Reveal delay={800} className="inline-flex gap-3 flex-wrap justify-center">
              <Link href="/catalogo" className="h-13 min-h-[52px] px-7 rounded-full bg-cream text-ink text-sm font-medium tracking-wide inline-flex items-center gap-2.5 hover:bg-gold transition">
                Explorar catálogo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </Link>
              <Link href="/historia" className="h-13 min-h-[52px] px-7 rounded-full border border-cream/25 text-cream text-sm tracking-wide inline-flex items-center hover:bg-cream/10 transition">Nuestra historia</Link>
            </Reveal>
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
            <Reveal key={b.n} delay={i * 100} className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-beige grid place-items-center flex-shrink-0">
                <span className="font-display italic text-coffee">{b.n}</span>
              </div>
              <div>
                <div className="text-sm font-medium">{b.title}</div>
                <div className="text-xs text-stone mt-0.5">{b.text}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-[1360px] mx-auto px-8 pt-24 pb-8">
        <Reveal className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <div className="font-mono text-[11px] tracking-widest uppercase text-stone mb-3">— Selección de la semana</div>
            <h2 className="font-display font-normal text-5xl tracking-tight">Destacados</h2>
          </div>
          <Link href="/catalogo" className="text-xs tracking-wide uppercase text-coffee pb-1 border-b border-coffee">Ver todos</Link>
        </Reveal>
        {carouselProducts.length > 0 ? (
          <Reveal>
            <FeaturedCarousel products={carouselProducts} />
          </Reveal>
        ) : (
          <div className="p-16 text-center border border-dashed border-border rounded-xl text-stone">
            No hay productos destacados aún. Cargá algunos desde el admin o corré <code className="font-mono">supabase/seed.sql</code>.
          </div>
        )}
      </section>

      {/* CATEGORIES */}
      <section className="max-w-[1360px] mx-auto px-8 py-24">
        <Reveal className="mb-12">
          <div className="font-mono text-[11px] tracking-widest uppercase text-stone mb-3">— Comprá por categoría</div>
          <h2 className="font-display font-normal text-5xl tracking-tight">Todo para tu ritual</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 100}>
              <Link
                href={`/catalogo?cat=${c.slug}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden flex flex-col justify-between p-7 transition-transform hover:-translate-y-1 block h-full"
                style={{ background: swatches[i % swatches.length] }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${CATEGORY_IMAGES[i % CATEGORY_IMAGES.length]}')` }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(30,26,21,0.25) 0%, rgba(30,26,21,0.75) 100%)' }} />
                <div className="relative font-mono text-[10px] tracking-widest uppercase text-cream/80">{counts[c.slug] ?? 0} productos</div>
                <div className="relative">
                  <div className="font-display text-3xl text-cream tracking-tight mb-2" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>{c.name}</div>
                  <div className="text-[13px] text-cream/95 inline-flex items-center gap-2">Ver categoría <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="bg-coffee text-cream">
        <div className="max-w-[1360px] mx-auto px-8 py-32 grid lg:grid-cols-[1.1fr_1fr] gap-24 items-center">
          <Reveal variant="left">
            <div className="font-mono text-[11px] tracking-widest uppercase text-gold mb-6">— Un buen café empieza antes</div>
            <h2 className="font-display font-light text-5xl lg:text-6xl leading-[1.04] tracking-tight mb-6">Del <em className="italic text-gold">productor</em> a tu cocina, con nombre y apellido.</h2>
            <p className="text-base leading-relaxed text-cream/72 mb-8 max-w-[520px]">Trabajamos con pequeñas fincas del norte del país. Cada bolsa lleva el nombre del productor, la finca y la altitud.</p>
            <Link href="/historia" className="inline-block px-6 py-3.5 rounded-full border border-cream/30 text-cream text-sm hover:bg-cream/10 transition">Conocé a los productores</Link>
          </Reveal>
          <Reveal variant="right" delay={200} className="aspect-[4/5] rounded-xl relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('${EDITORIAL_IMAGE}')` }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(30,22,17,0.2) 0%, rgba(30,22,17,0.6) 100%)' }} />
            <div className="absolute inset-5 border border-gold/40" />
            <div className="absolute inset-7 border border-gold/20" />
            <div className="absolute bottom-8 left-8 right-8 text-cream">
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold mb-2">Finca La Esperanza</div>
              <div className="font-display italic text-2xl">1.480 msnm — Sofía Núñez</div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
