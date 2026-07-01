import Link from 'next/link';
import { FARM_IMAGE } from '@/lib/images';

export const metadata = { title: 'Nuestra historia · Coffee Store' };

export default function AboutPage() {
  return (
    <div className="cs-fade">
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FAF6F0 0%, #F1E9DC 100%)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-16 pointer-events-none">
          <svg viewBox="0 0 900 60" className="w-full h-full opacity-40">
            <line x1="0" y1="30" x2="380" y2="30" stroke="#C9A876" strokeWidth="0.5" />
            <line x1="520" y1="30" x2="900" y2="30" stroke="#C9A876" strokeWidth="0.5" />
            <polygon points="450,18 470,30 450,42 430,30" fill="none" stroke="#C9A876" strokeWidth="0.8" />
            <circle cx="450" cy="30" r="2.5" fill="#C9A876" />
            <line x1="405" y1="30" x2="425" y2="30" stroke="#C9A876" strokeWidth="0.5" />
            <line x1="475" y1="30" x2="495" y2="30" stroke="#C9A876" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 text-center">
          <div className="cs-reveal" style={{ animationDelay: '0.1s' }}>
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-stone mb-6">— Est. 2021 · Asunción, Paraguay —</div>
          </div>
          <h1 className="cs-reveal font-display text-6xl md:text-8xl leading-[0.98] tracking-tight mb-8" style={{ animationDelay: '0.25s' }}>
            Café con nombre<br /><em className="italic text-cocoaLight">y apellido.</em>
          </h1>
          <div className="cs-reveal" style={{ animationDelay: '0.45s' }}>
            <span className="cs-line inline-block w-20 text-gold" style={{ animationDelay: '0.65s' }} />
          </div>
          <p className="cs-reveal font-story italic text-2xl md:text-3xl leading-relaxed text-mud mt-8 mx-auto max-w-[640px]" style={{ animationDelay: '0.55s' }}>
            Somos una tostaduría independiente que cree en el café como oficio, no como commodity. Cada grano tiene una historia — y una firma.
          </p>
        </div>
      </section>

      {/* CHAPTER 1 */}
      <section className="bg-cream">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-28 grid lg:grid-cols-[1fr_1.1fr] gap-24 items-center">
          <div className="cs-reveal-left relative aspect-[4/5] rounded overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('${FARM_IMAGE}')`, animationDelay: '0.15s' }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(30,22,17,0.25) 0%, rgba(30,22,17,0.65) 100%)' }} />
            <div className="absolute inset-5 border border-gold/40" />
            <div className="absolute inset-7 border border-gold/20" />
            <div className="absolute bottom-8 left-8 right-8 text-center text-gold">
              <div className="font-mono text-[10px] tracking-widest uppercase">Finca La Esperanza</div>
              <div className="font-display italic text-2xl mt-2 text-cream" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>1.480 msnm</div>
            </div>
          </div>
          <div className="cs-reveal-right" style={{ animationDelay: '0.25s' }}>
            <div className="font-mono text-[11px] tracking-widest uppercase text-cocoaLight mb-5">— Capítulo I · El origen</div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tight mb-7">Tres amigos, una tostadora prestada y demasiadas ideas.</h2>
            <p className="font-story text-xl leading-relaxed text-mud mb-5">En un garaje de Villa Morra, en 2021, empezó todo. Sofía había vuelto de Colombia con un cuaderno lleno de perfiles de tueste. Marcos era barista y sabía qué le pedía la taza. Yo — Diego — venía del diseño y me encargaba de que las bolsas parecieran lo que había adentro.</p>
            <p className="font-story text-xl leading-relaxed text-mud">Los primeros lotes fueron regalos para amigos. El cuarto lote ya tenía lista de espera. El octavo pagó nuestra primera Probat de 5 kilos. Nunca planeamos ser una marca — solo queríamos tomar buen café todos los días.</p>
          </div>
        </div>
      </section>

      {/* CHAPTER 2 - TIMELINE */}
      <section className="bg-coffee text-cream relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(115deg, transparent 0 24px, rgba(184,147,90,0.04) 24px 25px)' }} />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-28 relative">
          <div className="cs-reveal text-center mb-20" style={{ animationDelay: '0.1s' }}>
            <div className="font-mono text-[11px] tracking-widest uppercase text-gold mb-4">— Capítulo II · La línea de tiempo</div>
            <h2 className="font-display font-light text-5xl md:text-6xl tracking-tight">Cinco años, <em className="italic text-gold">siete fincas.</em></h2>
          </div>
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="absolute top-[30px] left-0 right-0 h-px hidden lg:block" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,118,0.4) 20%, rgba(201,168,118,0.4) 80%, transparent)' }} />
            {[
              { year: '2021', title: 'El garaje', text: 'Primer tueste con una tostadora prestada. 12 kilos por semana.' },
              { year: '2022', title: 'Primera finca', text: 'Alianza directa con La Esperanza. Nace la trazabilidad por bolsa.' },
              { year: '2024', title: 'La tostaduría', text: 'Abrimos local propio en Asunción. Cuatro fincas socias, 200 kg semanales.' },
              { year: 'Hoy', title: 'Siete fincas', text: 'Enviamos a todo el país en 48 horas. Cada bolsa, firmada por su productor.' },
            ].map((it, i) => (
              <div key={it.year} className="cs-reveal" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
                <div className="w-3 h-3 border border-gold rotate-45 mx-auto mb-8 relative z-10 bg-coffee" />
                <div className="font-mono text-[10px] tracking-widest text-gold text-center mb-3">{it.year}</div>
                <div className="font-display italic text-2xl text-center mb-3">{it.title}</div>
                <p className="text-sm leading-relaxed text-cream/70 text-center">{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTER 3 - PROCESS */}
      <section className="bg-cream">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="cs-reveal text-center mb-16" style={{ animationDelay: '0.1s' }}>
            <div className="font-mono text-[11px] tracking-widest uppercase text-cocoaLight mb-4">— Capítulo III · El oficio</div>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight">Del grano verde <em className="italic text-cocoaLight">a tu cocina.</em></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { n: 'i', title: 'Selección', text: 'Visitamos cada finca dos veces al año. Catamos el lote antes de comprar, y firmamos precio directo — sin brokers.' },
              { n: 'ii', title: 'Tueste', text: 'Lotes pequeños de 5 a 12 kilos. Cada perfil se construye probando la taza — no siguiendo una curva de otro.' },
              { n: 'iii', title: 'Envío', text: 'Empaquetado dentro de las 72 horas posteriores al tueste. En tu puerta en menos de dos días.' },
            ].map((s, i) => (
              <div key={s.n} className="cs-reveal text-center" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
                <div className="w-18 h-18 w-[72px] h-[72px] mx-auto mb-6 border border-gold grid place-items-center relative">
                  <div className="absolute inset-1.5 border border-gold/40" />
                  <span className="font-display italic text-2xl text-cocoaLight">{s.n}</span>
                </div>
                <div className="font-display text-2xl mb-3">{s.title}</div>
                <p className="font-story text-lg leading-relaxed text-mud">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="bg-coffeeDark text-cream relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(1000px 500px at 50% 0%, rgba(201,168,118,0.18), transparent 60%)' }} />
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-36 text-center relative">
          <div className="cs-reveal" style={{ animationDelay: '0.1s' }}>
            <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-gold mb-8">— Manifiesto —</div>
          </div>
          <p className="cs-reveal font-display font-light italic text-3xl md:text-4xl leading-snug tracking-tight mb-8" style={{ animationDelay: '0.25s' }}>
            "No creemos en el café anónimo. Cada bolsa lleva el nombre de quien lo cultivó, la altitud, la variedad y la fecha de tostado. Eso es lo que hace la diferencia — y lo podés probar en la taza."
          </p>
          <div className="cs-reveal" style={{ animationDelay: '0.45s' }}>
            <span className="cs-line inline-block w-16 text-gold" style={{ animationDelay: '0.6s' }} />
            <div className="font-mono text-[10px] tracking-widest uppercase text-cream/50 mt-5">Sofía, Marcos y Diego</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <div className="cs-reveal" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-display text-4xl md:text-5xl tracking-tight mb-5">¿Probamos una taza?</h3>
            <p className="text-base text-stone mb-9">Elegí tu primer lote. Te contamos quién lo cultivó.</p>
            <Link href="/catalogo" className="inline-flex h-14 px-8 rounded-full bg-coffee text-cream text-sm uppercase tracking-widest items-center gap-3 hover:bg-cocoa">
              Ver el catálogo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
