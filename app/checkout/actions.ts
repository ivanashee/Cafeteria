'use server';

import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { CartLine } from '@/lib/types';

type Payload = {
  name: string; phone: string; email?: string; address?: string; city?: string;
  delivery: 'delivery' | 'pickup' | 'express';
  payment: 'transfer' | 'card' | 'cash';
  notes?: string;
  items: CartLine[];
};

export async function submitOrder(payload: Payload) {
  if (!payload.name || !payload.phone || payload.items.length === 0) {
    return { error: 'Datos incompletos.' };
  }
  const sb = supabaseAdmin();

  // Compute subtotal server-side using current product prices to avoid client tampering.
  const ids = payload.items.map((i) => i.productId);
  const { data: products, error: pErr } = await sb.from('products').select('id, name, price, stock, active').in('id', ids);
  if (pErr || !products) return { error: 'No pudimos verificar los productos.' };

  const map = new Map(products.map((p) => [p.id, p]));
  const lines = payload.items.map((it) => {
    const p = map.get(it.productId);
    if (!p || !p.active) throw new Error(`Producto no disponible: ${it.name}`);
    if (p.stock < it.qty) throw new Error(`Stock insuficiente para ${p.name}`);
    return { product_id: it.productId, product_name: p.name, unit_price: p.price, qty: it.qty };
  });
  const subtotal = lines.reduce((a, l) => a + l.unit_price * l.qty, 0);

  // Generate order code
  const { data: codeRow } = await sb.rpc('next_order_code');
  const code = (codeRow as unknown as string) || `CS-${Date.now().toString().slice(-4)}`;

  // Insert customer (best-effort, non-blocking)
  let customerId: string | null = null;
  if (payload.email || payload.phone) {
    const { data: cust } = await sb.from('customers').insert({
      name: payload.name, phone: payload.phone, email: payload.email ?? null,
      address: payload.address ?? null, city: payload.city ?? null,
    }).select('id').single();
    customerId = cust?.id ?? null;
  }

  const { data: order, error: oErr } = await sb.from('orders').insert({
    code, customer_id: customerId,
    customer_name: payload.name, customer_phone: payload.phone, customer_email: payload.email ?? null,
    address: payload.address ?? null, city: payload.city ?? null,
    delivery: payload.delivery, payment: payload.payment, notes: payload.notes ?? null,
    subtotal, total: subtotal, status: 'pending',
  }).select('id, code').single();
  if (oErr || !order) return { error: 'No pudimos crear el pedido.' };

  const { error: iErr } = await sb.from('order_items').insert(lines.map((l) => ({ ...l, order_id: order.id })));
  if (iErr) return { error: 'No pudimos guardar los ítems del pedido.' };

  // Decrement stock
  for (const l of lines) {
    const p = map.get(l.product_id)!;
    await sb.from('products').update({ stock: Math.max(0, p.stock - l.qty) }).eq('id', l.product_id);
  }

  redirect(`/pedido/${order.code}`);
}
