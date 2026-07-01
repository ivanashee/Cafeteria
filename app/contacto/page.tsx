export const metadata = { title: 'Contacto · Coffee Store' };

export default function ContactPage() {
  return (
    <div className="max-w-[900px] mx-auto px-8 py-24 cs-fade">
      <div className="font-mono text-[11px] tracking-widest uppercase text-stone mb-4">— Contacto</div>
      <h1 className="font-display font-light text-6xl md:text-7xl leading-none tracking-tight mb-12">Estamos cerca.</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <div className="text-[11px] tracking-widest uppercase text-stone mb-2.5">WhatsApp</div>
          <div className="font-display text-2xl">+595 981 772 872</div>
        </div>
        <div>
          <div className="text-[11px] tracking-widest uppercase text-stone mb-2.5">Local</div>
          <div className="font-display text-2xl">Av. Café 1234<br />Asunción, PY</div>
        </div>
        <div>
          <div className="text-[11px] tracking-widest uppercase text-stone mb-2.5">Horario</div>
          <div className="font-display text-2xl">Lun–Sáb<br />7:30 a 20:00</div>
        </div>
      </div>
    </div>
  );
}
