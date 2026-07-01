'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartLine } from './types';

type State = {
  items: CartLine[];
  add: (line: Omit<CartLine, 'qty'>, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
};

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      items: [],
      add: (line, qty = 1) => {
        const items = [...get().items];
        const idx = items.findIndex((i) => i.productId === line.productId);
        if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + qty };
        else items.push({ ...line, qty });
        set({ items });
      },
      remove: (id) => set({ items: get().items.filter((i) => i.productId !== id) }),
      setQty: (id, qty) => set({
        items: get().items.map((i) => (i.productId === id ? { ...i, qty: Math.max(1, qty) } : i)),
      }),
      clear: () => set({ items: [] }),
    }),
    { name: 'cs-cart' }
  )
);
