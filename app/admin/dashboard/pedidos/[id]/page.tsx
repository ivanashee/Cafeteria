import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { formatPrice, formatDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

async function updateStatus(formData: FormData) {
  'use server';
  const id = String(formData.get('id') || '');
  const status = String(formData.get('status') || '');
  await supabaseAdmin().from('orders').update({ status }).eq('id', id);
  revalidatePath(`/admin/dashboard/pedidos/${id}`);
  revalidatePath('/admin/dashboard/pedidos');
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = supabaseAdmin();
  const { data: order } = await sb.from('orders').select('*').eq('id', id).maybeSingle();
  if (!order) notFound();
  const { data: items } = await sb.from('order_items').select('*').eq('order_id', order.id);

  const deliveryLabels: Record<string, string> = { delivery: 'Envío a domicilio', pickup: 'Retiro en local', express: 'Envío express' };
  const paymentLabels: Record<string, string> = { transfer: 'Transferencia', card: 'Tarjeta', cash: 'Efectivo' };
  const statuses = ['pending', 'confirmed', 'preparing', 'sent', 'delivered', 'cancelled'];

  return (
    <div className="p-10 cs-fade">
      <div className="mb-6">
        <Link href="/admin/dashboard/pedidos" className="text-xs uppercase tracking-widest text-stone hover:text-coffee">← Pedidos</Link>
        <div className="flex items-baseline gap-4 mt-3">
          <h1 className="font-display text-4xl tracking-tight">{order.code}</h1>
          <span className="text-stone text-sm">{formatDate(order.created_at)}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-8 items-start">
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-xl border border-border bg-white">
            <div className="font-display text-xl mb-4">Ítems</div>
            {(items ?? []).map((it: any) => (
              <div key={it.id} className="flex justify-between py-3 border-b border-border last:border-b-0 text-[13px]">
                <div>
                  <div className="font-medium">{it.product_name}</div>
                  <div className="text-[11px] text-stone">x{it.qty} · {formatPrice(it.unit_price)}</div>
                </div>
                <div className="font-medium">{formatPrice(it.line_total)}</div>
              </div>
            ))}
            <div className="flex justify-between font-display text-xl mt-4 pt-4 border-t border-border">
              <span>Total</span><span>{formatPrice(order.total)}</span>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-white grid md:grid-cols-2 gap-4 text-[13px]">
            <Info label="Cliente" value={order.customer_name} />
            <Info label="Teléfono" value={order.customer_phone} />
            <Info label="Email" value={order.customer_email ?? '—'} />
            <Info label="Dirección" value={order.address ?? '—'} />
            <Info label="Ciudad" value={order.city ?? '—'} />
            <Info label="Entrega" value={deliveryLabels[order.delivery] ?? order.delivery} />
            <Info label="Pago" value={paymentLabels[order.payment] ?? order.payment} />
            {order.notes && <Info label="Notas" value={order.notes} />}
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-white sticky top-6">
          <div className="font-display text-xl mb-4">Estado</div>
          <form action={updateStatus} className="flex flex-col gap-3">
            <input type="hidden" name="id" value={order.id} />
            <select name="status" defaultValue={order.status} className="h-10 px-3 rounded-lg border border-border bg-white text-sm outline-none">
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button className="h-10 rounded-full bg-coffee text-cream text-sm hover:bg-cocoa">Actualizar</button>
          </form>
          <a href={`https://wa.me/${order.customer_phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="mt-3 block text-center h-10 leading-[40px] rounded-full border border-border text-[13px] hover:bg-beige">Abrir WhatsApp</a>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-widest uppercase text-stone mb-1">{label}</div>
      <div>{value}</div>
    </div>
  );
}
