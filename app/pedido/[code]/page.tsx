import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { formatPrice } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function OrderConfirmPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const sb = supabaseAdmin();
  const { data: order } = await sb.from('orders').select('*').eq('code', code).maybeSingle();
  if (!order) notFound();
  const { data: items } = await sb.from('order_items').select('*').eq('order_id', order.id);

  const deliveryLabels: Record<string, string> = { delivery: 'Envío a domicilio', pickup: 'Retiro en local', express: 'Envío express' };

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-24 cs-fade">
      <div className="font-mono text-[11px] tracking-widest uppercase text-stone mb-4">— Pedido {order.code}</div>
      <h1 className="font-display font-light text-5xl md:text-6xl leading-none tracking-tight mb-4">
        Gracias, {order.customer_name}.<br />Tu pedido está <em className="italic text-cocoaLight">en camino</em>.
      </h1>
      <p className="text-mud text-lg mb-10">Te vamos a contactar por WhatsApp al <span className="font-medium">{order.customer_phone}</span> para confirmar los detalles.</p>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 border border-border rounded-xl bg-white">
          <div className="text-[11px] tracking-widest uppercase text-stone mb-2.5">Total</div>
          <div className="font-display text-2xl">{formatPrice(order.total)}</div>
        </div>
        <div className="p-6 border border-border rounded-xl bg-white">
          <div className="text-[11px] tracking-widest uppercase text-stone mb-2.5">Entrega</div>
          <div className="font-display text-2xl">{deliveryLabels[order.delivery] ?? order.delivery}</div>
        </div>
      </div>

      <div className="p-6 border border-border rounded-xl bg-white mb-10">
        <div className="font-display text-xl mb-4">Ítems del pedido</div>
        {(items ?? []).map((it: any) => (
          <div key={it.id} className="flex justify-between py-3 border-b border-border last:border-b-0">
            <div>
              <div className="text-sm">{it.product_name}</div>
              <div className="text-[12px] text-stone">x{it.qty} · {formatPrice(it.unit_price)}</div>
            </div>
            <div className="font-medium">{formatPrice(it.line_total)}</div>
          </div>
        ))}
      </div>

      <Link href="/" className="inline-block px-6 py-3 rounded-full bg-coffee text-cream text-[13px] hover:bg-cocoa">Volver al inicio</Link>
    </div>
  );
}
