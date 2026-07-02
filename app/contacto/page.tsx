import Link from 'next/link';
import Reveal from '@/components/Reveal';
import MountainScene from '@/components/MountainScene';
import { MOUNTAINS_IMAGE } from '@/lib/images';

export const metadata = { title: 'Contacto · Cataluña' };

export default function ContactPage() {
  return (
    <div className="cs-fade">
      {/* HERO with mountain background */}
      <section className="relative h-[520px] overflow-hidden bg-coffeeDark">
        <div className="absolute inset-0 cs-ken-burns bg-cover bg-center" style={{ backgroundImage: `url('${MOUNTAINS_IMAGE}')` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,16,12,0.55) 0%, rgba(20,16,12,0.35) 45%, rgba(20,16,12,0.85) 100%)' }} />
        {/* Art-deco corners */}
        <span className="cs-corner cs-corner-hero cs-corner-tl" />
        <span className="cs-corner cs-corner-hero cs-corner-tr" />
        <span className="cs-corner cs-corner-hero cs-corner-bl" />
        <span className="cs-corner cs-corner-hero cs-corner-br" />
        <div className="absolute inset-0 grid place-items-center text-center text-cream px-8">
          <div>
            <Reveal delay={100}>
              <div className="flex items-center justify-center gap-3.5 mb-6 text-gold">
                <span className="w-14 h-px bg-current opacity-60" />
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><polygon points="7,1 13,7 7,13 1,7" stroke="currentColor" strokeWidth="0.8"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/></svg>
                <span className="font-mono text-[10px] tracking-[0.36em] uppercase">Contacto</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><polygon points="7,1 13,7 7,13 1,7" stroke="currentColor" strokeWidth="0.8"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/></svg>
                <span className="w-14 h-px bg-current opacity-60" />
              </div>
            </Reveal>
            <Reveal delay={300} as="h1" className="font-display font-light text-6xl md:text-8xl leading-[0.98] tracking-tight" style={{ textShadow: '0 4px 32px rgba(0,0,0,0.5)' }}>
              Estamos <em className="italic text-gold">cerca.</em>
            </Reveal>
            <Reveal delay={600} as="p" className="font-story italic text-xl md:text-2xl mt-6 text-cream/85 max-w-[560px] mx-auto">
              Escribinos, visitanos o llamanos. La puerta está abierta desde las 7:30.
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              t: 'WhatsApp',
              v: '+595 981 772 872',
              d: 'Respondemos entre 8:00 y 20:00. Los pedidos se despachan al día siguiente.',
              href: 'https://wa.me/595981772872',
              cta: 'Abrir WhatsApp',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M20.5 3.5A11 11 0 0 0 3.6 17.3L2 22l4.9-1.5A11 11 0 1 0 20.5 3.5Z"/></svg>
              ),
            },
            {
              t: 'Local',
              v: 'Av. Café 1234',
              d: 'Asunción, Paraguay. Estacionamiento propio, terraza abierta y cata semanal los sábados.',
              href: 'https://maps.google.com/?q=Asuncion+Paraguay',
              cta: 'Ver en el mapa',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 22s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>
              ),
            },
            {
              t: 'Email',
              v: 'hola@coffeestore.py',
              d: 'Para consultas de mayoreo, eventos corporativos y colaboraciones con la marca.',
              href: 'mailto:hola@coffeestore.py',
              cta: 'Escribir un email',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
              ),
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 120}>
              <a href={c.href} target="_blank" rel="noreferrer" className="group block h-full p-8 border border-border rounded-2xl bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-16px_rgba(30,26,21,0.25)] hover:border-coffee/40">
                <div className="w-12 h-12 rounded-full bg-beige grid place-items-center text-coffee mb-6 transition-colors group-hover:bg-coffee group-hover:text-cream">
                  {c.icon}
                </div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-stone mb-3">{c.t}</div>
                <div className="font-display text-2xl leading-tight mb-3">{c.v}</div>
                <p className="text-[13px] text-mud leading-relaxed mb-5">{c.d}</p>
                <div className="text-[11px] tracking-widest uppercase text-coffee inline-flex items-center gap-2 pb-1 border-b border-coffee transition-transform duration-300 group-hover:gap-3">
                  {c.cta}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOURS + MAP-STYLE PANEL */}
      <section className="bg-beige">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-24 grid md:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <Reveal variant="left">
            <div className="font-mono text-[11px] tracking-widest uppercase text-cocoaLight mb-4">— Horario de atención</div>
            <h2 className="font-display font-light text-5xl leading-tight tracking-tight mb-8">Cuando el café <em className="italic text-cocoaLight">está caliente.</em></h2>
            <ul className="flex flex-col gap-3.5 max-w-[380px]">
              {[
                { d: 'Lunes a Viernes', h: '7:30 — 20:00' },
                { d: 'Sábados', h: '8:00 — 20:00' },
                { d: 'Domingos', h: '9:00 — 15:00' },
                { d: 'Feriados', h: 'Cerrado' },
              ].map((row) => (
                <li key={row.d} className="flex items-baseline justify-between gap-6 pb-3 border-b border-dashed border-stone/40">
                  <span className="font-story italic text-xl text-mud">{row.d}</span>
                  <span className="font-display text-xl">{row.h}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-mud leading-relaxed max-w-[380px]">
              Todos los sábados a las 11:00 hacemos una cata pública gratuita. Traé un amigo — o dos.
            </p>
          </Reveal>

          <Reveal variant="right" delay={200} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-coffeeDark">
            <div className="absolute inset-0"><MountainScene /></div>
            {/* Frame */}
            <div className="absolute inset-5 border border-gold/30 pointer-events-none" />
            <div className="absolute inset-7 border border-gold/15 pointer-events-none" />
            {/* Caption */}
            <div className="absolute bottom-8 left-8 right-8 text-cream text-center">
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold mb-2">Norte de Paraguay</div>
              <div className="font-display italic text-2xl">Cordillera de Amambay</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <Reveal>
          <div className="font-mono text-[11px] tracking-widest uppercase text-stone mb-4">— ¿Alguna otra cosa?</div>
          <h3 className="font-display font-light text-4xl md:text-5xl tracking-tight mb-5">
            Contanos qué estás <em className="italic text-cocoaLight">buscando.</em>
          </h3>
          <p className="text-base text-stone mb-8 max-w-[520px] mx-auto">
            Para catas privadas, workshops en tu oficina o suscripciones mensuales, escribinos y armamos algo a medida.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://wa.me/595981772872" target="_blank" rel="noreferrer" className="h-13 min-h-[52px] px-7 rounded-full bg-coffee text-cream text-sm tracking-wide inline-flex items-center hover:bg-cocoa transition">
              Escribir por WhatsApp
            </a>
            <Link href="/catalogo" className="h-13 min-h-[52px] px-7 rounded-full border border-coffee/30 text-coffee text-sm tracking-wide inline-flex items-center hover:bg-coffee hover:text-cream transition">Ver el catálogo</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
