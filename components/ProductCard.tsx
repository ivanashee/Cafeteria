'use client';

import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/format';
import { productImage } from '@/lib/images';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  const img = product.image_url || productImage(product.slug, product.category_slug);
  const outOfStock = product.stock <= 0;
  return (
    <div className="cs-bag-slot group relative flex flex-col gap-3.5 p-3.5 border border-border rounded-xl bg-white transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_48px_-16px_rgba(30,26,21,0.28)] hover:border-coffee/40 hover:bg-cream/60">
      {/* Gold glow that appears on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(400px 200px at 50% 0%, rgba(201,168,118,0.22), transparent 70%)' }} />

      <Link href={`/producto/${product.slug}`} className="relative aspect-square rounded overflow-hidden bg-coffeeDark block">
        {/* image */}
        <div
          className="cs-bag-img transition-transform duration-[900ms] ease-out group-hover:scale-110"
          style={{ backgroundImage: `url('${img}')` }}
        />
        {/* base overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-coffeeDark/35" />
        {/* golden shimmer that sweeps across on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: 'linear-gradient(120deg, transparent 30%, rgba(255,240,210,0.15) 50%, transparent 70%)' }}
        />
        {/* corner accents animate inward on hover */}
        <span className="cs-corner cs-corner-tl transition-all duration-500 ease-out group-hover:!top-2.5 group-hover:!left-2.5" />
        <span className="cs-corner cs-corner-tr transition-all duration-500 ease-out group-hover:!top-2.5 group-hover:!right-2.5" />
        <span className="cs-corner cs-corner-bl transition-all duration-500 ease-out group-hover:!bottom-2.5 group-hover:!left-2.5" />
        <span className="cs-corner cs-corner-br transition-all duration-500 ease-out group-hover:!bottom-2.5 group-hover:!right-2.5" />
        {product.featured && !outOfStock && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-cream/95 text-[9px] font-mono tracking-[0.24em] uppercase text-coffee z-10 transition-transform duration-500 group-hover:-translate-y-0.5">Destacado</div>
        )}
        {outOfStock && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-ink/90 text-cream text-[9px] font-mono tracking-[0.24em] uppercase z-10">Sin stock</div>
        )}
        {/* "Ver detalle" chip revealed from bottom on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cream/95 text-coffee text-[10px] font-mono tracking-[0.2em] uppercase">
            Ver detalle
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </div>
      </Link>

      <div className="relative">
        <div className="font-mono text-[10px] tracking-widest uppercase text-stone transition-colors duration-300 group-hover:text-cocoaLight">{product.category_name}</div>
        <Link href={`/producto/${product.slug}`} className="block font-display text-xl mt-1 transition-colors duration-300 group-hover:text-cocoaLight">{product.name}</Link>
        {product.short_desc && <div className="text-[13px] text-stone mt-1.5 leading-relaxed line-clamp-2">{product.short_desc}</div>}
      </div>

      <div className="relative flex items-center justify-between mt-auto">
        <div className="text-base font-medium transition-transform duration-300 group-hover:scale-105 group-hover:text-coffee origin-left">{formatPrice(product.price)}</div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
