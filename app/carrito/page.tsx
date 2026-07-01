'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice, bagImage } from '@/lib/format';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-14 cs-fade">
      <div className="mb-10">
        <div className="font-mono text-[11px] tracking-widest uppercase text-stone mb-3">— Tu selección</div>
        <h1 className="font-display text-5xl md:text-6xl tracking-tight">Carrito</h1>
      </div>

      {items.length === 0 ? (
        <div className="p-24 text-center border border-dashed border-border rounded-xl">
          <div className="font-display text-4xl mb-2">Tu carrito está vacío</div>
          <div className="text-stone text-sm mb-6">Descubrí nuestros cafés y accesorios.</div>
          <Link href="/catalogo" className="inline-block px-6 py-3 rounded-full bg-coffee text-cream text-[13px]">Ir al catálogo</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
          <div className="border border-border rounded-xl bg-white overflow-hidden">
            {items.map((it) => (
              <div key={it.productId} className="grid grid-cols-[96px_1fr_auto] gap-5 p-5 border-b border-border last:border-b-0 items-center">
                <div className="aspect-square rounded bg-coffeeDark bg-cover bg-center" style={{ backgroundImage: `url('${bagImage(it.slug, 200)}')` }} />
                <div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-stone">{it.categoryName}</div>
                  <Link href={`/producto/${it.slug}`} className="font-display text-xl mt-1 block hover:text-cocoaLight">{it.name}</Link>
                  <div className="text-[13px] text-stone mt-1">{formatPrice(it.price)} c/u</div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="font-display text-xl font-medium">{formatPrice(it.price * it.qty)}</div>
                  <div className="inline-flex items-center gap-1 border border-border rounded-full p-1">
                    <button onClick={() => setQty(it.productId, it.qty - 1)} className="w-7 h-7 rounded-full hover:bg-beige">−</button>
                    <span className="min-w-[28px] text-center text-[13px]">{it.qty}</span>
                    <button onClick={() => setQty(it.productId, it.qty + 1)} className="w-7 h-7 rounded-full hover:bg-beige">+</button>
                  </div>
                  <button onClick={() => remove(it.productId)} className="text-[11px] tracking-widest uppercase text-stone hover:text-red-700">Eliminar</button>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky top-24 p-6 border border-border rounded-xl bg-beige">
            <div className="font-display text-2xl mb-5">Resumen</div>
            <div className="flex justify-between py-2.5 text-sm">
              <span className="text-stone">Subtotal ({items.reduce((a, i) => a + i.qty, 0)} ítems)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between py-2.5 text-sm">
              <span className="text-stone">Envío</span>
              <span>A calcular</span>
            </div>
            <div className="flex justify-between py-2.5 font-display text-xl border-t border-border mt-3 pt-4">
              <span>Total</span><span>{formatPrice(subtotal)}</span>
            </div>
            <Link href="/checkout" className="block mt-5 text-center w-full h-12 leading-[48px] rounded-full bg-coffee text-cream text-sm tracking-wide hover:bg-cocoa">Finalizar pedido</Link>
            <Link href="/catalogo" className="block mt-3 text-center text-xs uppercase tracking-widest text-stone hover:text-coffee">Seguir comprando</Link>
          </div>
        </div>
      )}
    </div>
  );
}
