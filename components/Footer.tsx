import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-coffeeDark text-cream/70 mt-24">
      <div className="max-w-[1360px] mx-auto px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-8 h-8 rounded-full bg-gold text-coffeeDark inline-grid place-items-center font-display italic text-lg font-medium">c</span>
              <span className="font-display text-[22px] text-cream font-medium">Coffee Store</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-[320px]">Café de especialidad tostado en Asunción, entregado a tu puerta.</p>
          </div>
          <div>
            <div className="text-[11px] tracking-widest uppercase text-cream/50 mb-4">Tienda</div>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/catalogo" className="hover:text-cream">Catálogo completo</Link>
              <Link href="/catalogo?featured=1" className="hover:text-cream">Destacados</Link>
              <Link href="/historia" className="hover:text-cream">Nuestra historia</Link>
            </div>
          </div>
          <div>
            <div className="text-[11px] tracking-widest uppercase text-cream/50 mb-4">Ayuda</div>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/contacto" className="hover:text-cream">Contacto</Link>
            </div>
          </div>
          <div>
            <div className="text-[11px] tracking-widest uppercase text-cream/50 mb-4">Contacto</div>
            <div className="flex flex-col gap-2.5 text-sm">
              <div>WhatsApp: <span className="text-cream">+595 981 772 872</span></div>
              <div>Av. Café 1234, Asunción</div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-cream/10 flex flex-wrap justify-between items-center gap-4 text-xs text-cream/50">
          <div>© {new Date().getFullYear()} Coffee Store · Hecho con espresso doble en Asunción</div>
          <div className="flex items-center gap-2">
            <span>Desarrollado por</span>
            <span className="font-display italic text-gold text-sm tracking-wide">neura</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
