'use client';

import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice, bagImage } from '@/lib/format';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  const img = product.image_url || bagImage(product.slug);
  const outOfStock = product.stock <= 0;
  return (
    <div className="cs-bag-slot flex flex-col gap-3.5 p-3.5 border border-border rounded-xl bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/producto/${product.slug}`} className="relative aspect-square rounded overflow-hidden bg-coffeeDark block">
        <div className="cs-bag-img" style={{ backgroundImage: `url('${img}')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-coffeeDark/35" />
        <span className="cs-corner cs-corner-tl" />
        <span className="cs-corner cs-corner-tr" />
        <span className="cs-corner cs-corner-bl" />
        <span className="cs-corner cs-corner-br" />
        {product.featured && !outOfStock && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-cream/95 text-[9px] font-mono tracking-[0.24em] uppercase text-coffee z-10">Destacado</div>
        )}
        {outOfStock && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-ink/90 text-cream text-[9px] font-mono tracking-[0.24em] uppercase z-10">Sin stock</div>
        )}
      </Link>
      <div>
        <div className="font-mono text-[10px] tracking-widest uppercase text-stone">{product.category_name}</div>
        <Link href={`/producto/${product.slug}`} className="block font-display text-xl mt-1 hover:text-cocoaLight">{product.name}</Link>
        {product.short_desc && <div className="text-[13px] text-stone mt-1.5 leading-relaxed line-clamp-2">{product.short_desc}</div>}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="text-base font-medium">{formatPrice(product.price)}</div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
