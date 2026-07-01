'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { useCartStore } from '@/lib/cart-store';

export default function AddToCartButton({ product, qty = 1, large }: { product: Product; qty?: number; large?: boolean }) {
  const add = useCartStore((s) => s.add);
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock <= 0;

  if (large) {
    return (
      <button
        disabled={outOfStock}
        onClick={() => {
          add({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            categoryName: product.category_name,
          }, qty);
          setAdded(true);
          setTimeout(() => setAdded(false), 1500);
        }}
        className="flex-1 h-13 min-h-[52px] rounded-full bg-coffee text-cream text-sm tracking-wide inline-flex items-center justify-center gap-2.5 hover:bg-cocoa disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 5h2l2.5 11h11l2-8H7"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></svg>
        {added ? '¡Agregado!' : 'Agregar al carrito'}
      </button>
    );
  }
  return (
    <button
      disabled={outOfStock}
      onClick={() => {
        add({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          categoryName: product.category_name,
        }, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
      }}
      className="h-9 px-3.5 rounded-full bg-coffee text-cream text-xs inline-flex items-center gap-1.5 hover:bg-cocoa disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
      {added ? 'Añadido' : 'Agregar'}
    </button>
  );
}
