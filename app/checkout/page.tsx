'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice, bagImage } from '@/lib/format';
import { submitOrder } from './actions';

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center cs-fade">
        <div className="font-display text-4xl mb-3">Nada para pagar</div>
        <div className="text-stone">Tu carrito está vacío.</div>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null); setBusy(true);
    const f = new FormData(e.currentTarget);
    try {
      const res = await submitOrder({
        name: String(f.get('name') || ''),
        phone: String(f.get('phone') || ''),
        email: String(f.get('email') || '') || undefined,
        address: String(f.get('address') || '') || undefined,
        city: String(f.get('city') || '') || undefined,
        delivery: (f.get('delivery') as any) || 'delivery',
        payment: (f.get('payment') as any) || 'transfer',
        notes: String(f.get('notes') || '') || undefined,
        items,
      });
      if (res && (res as any).error) {
        setError((res as any).error);
        setBusy(false);
        return;
      }
      clear();
    } catch (err: any) {
      setError(err?.message ?? 'Error desconocido');
      setBusy(false);
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 cs-fade">
      <div className="mb-10">
        <div className="font-mono text-[11px] tracking-widest uppercase text-stone mb-3">— Casi listo</div>
        <h1 className="font-display text-5xl tracking-tight">Finalizar pedido</h1>
      </div>
      <form onSubmit={onSubmit} className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
        <div className="flex flex-col gap-6">
          <fieldset className="p-6 border border-border rounded-xl bg-white">
            <legend className="font-display text-xl px-2">1. Tus datos</legend>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <label className="flex flex-col gap-1.5 text-[13px]"><span className="text-stone">Nombre completo *</span><input required name="name" className="h-11 px-3 rounded-lg border border-border bg-white outline-none" /></label>
              <label className="flex flex-col gap-1.5 text-[13px]"><span className="text-stone">Teléfono / WhatsApp *</span><input required name="phone" className="h-11 px-3 rounded-lg border border-border bg-white outline-none" /></label>
              <label className="flex flex-col gap-1.5 text-[13px] md:col-span-2"><span className="text-stone">Email</span><input type="email" name="email" className="h-11 px-3 rounded-lg border border-border bg-white outline-none" /></label>
            </div>
          </fieldset>

          <fieldset className="p-6 border border-border rounded-xl bg-white">
            <legend className="font-display text-xl px-2">2. Entrega</legend>
            <div className="grid md:grid-cols-3 gap-3 mt-2 mb-4">
              {[
                { v: 'delivery', label: 'Delivery', desc: 'A tu puerta 48h' },
                { v: 'express', label: 'Express', desc: 'Mismo día en Asunción' },
                { v: 'pickup', label: 'Retiro en local', desc: 'Av. Café 1234' },
              ].map((o, i) => (
                <label key={o.v} className="flex flex-col gap-1 p-4 border border-border rounded-lg cursor-pointer has-[:checked]:border-coffee has-[:checked]:bg-beige">
                  <input type="radio" name="delivery" value={o.v} defaultChecked={i === 0} className="sr-only" />
                  <span className="font-medium text-sm">{o.label}</span>
                  <span className="text-xs text-stone">{o.desc}</span>
                </label>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5 text-[13px]"><span className="text-stone">Dirección</span><input name="address" className="h-11 px-3 rounded-lg border border-border bg-white outline-none" /></label>
              <label className="flex flex-col gap-1.5 text-[13px]"><span className="text-stone">Ciudad</span><input name="city" className="h-11 px-3 rounded-lg border border-border bg-white outline-none" /></label>
              <label className="flex flex-col gap-1.5 text-[13px] md:col-span-2"><span className="text-stone">Notas (opcional)</span><textarea name="notes" rows={2} className="p-3 rounded-lg border border-border bg-white outline-none" /></label>
            </div>
          </fieldset>

          <fieldset className="p-6 border border-border rounded-xl bg-white">
            <legend className="font-display text-xl px-2">3. Pago</legend>
            <div className="grid md:grid-cols-3 gap-3 mt-2">
              {[
                { v: 'transfer', label: 'Transferencia' },
                { v: 'card', label: 'Tarjeta' },
                { v: 'cash', label: 'Efectivo al entregar' },
              ].map((o, i) => (
                <label key={o.v} className="flex items-center gap-2 p-4 border border-border rounded-lg cursor-pointer has-[:checked]:border-coffee has-[:checked]:bg-beige">
                  <input type="radio" name="payment" value={o.v} defaultChecked={i === 0} className="sr-only" />
                  <span className="font-medium text-sm">{o.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="sticky top-24 p-6 border border-border rounded-xl bg-beige">
          <div className="font-display text-xl mb-5">Tu pedido</div>
          <div className="flex flex-col gap-3 mb-5">
            {items.map((it) => (
              <div key={it.productId} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-cover bg-center bg-coffeeDark" style={{ backgroundImage: `url('${bagImage(it.slug, 100)}')` }} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] truncate">{it.name}</div>
                  <div className="text-[11px] text-stone">x{it.qty} · {formatPrice(it.price)}</div>
                </div>
                <div className="text-[13px] font-medium">{formatPrice(it.price * it.qty)}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-display text-xl border-t border-border pt-4">
            <span>Total</span><span>{formatPrice(subtotal)}</span>
          </div>
          {error && <div className="mt-4 p-3 rounded bg-red-100 text-red-800 text-[13px]">{error}</div>}
          <button disabled={busy} type="submit" className="mt-5 block w-full h-12 rounded-full bg-coffee text-cream text-sm tracking-wide hover:bg-cocoa disabled:opacity-60">
            {busy ? 'Enviando…' : 'Confirmar pedido'}
          </button>
        </div>
      </form>
    </div>
  );
}
