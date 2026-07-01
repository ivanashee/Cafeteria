import { supabaseAdmin } from '@/lib/supabase/admin';
import { formatPrice, formatDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const sb = supabaseAdmin();
  const [{ count: pCount }, { count: oCount }, { data: recentOrders }, { data: lowStock }, { data: totalRow }] = await Promise.all([
    sb.from('products').select('*', { count: 'exact', head: true }),
    sb.from('orders').select('*', { count: 'exact', head: true }),
    sb.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
    sb.from('products').select('id, name, stock').lt('stock', 10).order('stock').limit(5),
    sb.from('orders').select('total').gte('created_at', new Date(Date.now() - 30 * 864e5).toISOString()),
  ]);
  const revenue = (totalRow ?? []).reduce((a: number, r: any) => a + (r.total ?? 0), 0);

  const metrics = [
    { label: 'Productos activos', value: pCount ?? 0 },
    { label: 'Pedidos totales', value: oCount ?? 0 },
    { label: 'Facturación 30d', value: formatPrice(revenue) },
    { label: 'Bajo stock', value: (lowStock ?? []).length },
  ];

  return (
    <div className="p-10 cs-fade">
      <h1 className="font-display text-4xl tracking-tight mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {metrics.map((m) => (
          <div key={m.label} className="p-6 rounded-xl border border-border bg-white">
            <div className="text-[11px] tracking-widest uppercase text-stone mb-2">{m.label}</div>
            <div className="font-display text-3xl tracking-tight">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-white">
          <div className="font-display text-xl mb-4">Pedidos recientes</div>
          {(recentOrders ?? []).map((o: any) => (
            <div key={o.id} className="flex justify-between py-3 border-b border-border last:border-b-0 text-[13px]">
              <div>
                <div className="font-medium">{o.code} · {o.customer_name}</div>
                <div className="text-stone text-[12px]">{formatDate(o.created_at)} · {o.status}</div>
              </div>
              <div className="font-display">{formatPrice(o.total)}</div>
            </div>
          ))}
          {(recentOrders ?? []).length === 0 && <div className="text-stone text-sm">Sin pedidos aún.</div>}
        </div>
        <div className="p-6 rounded-xl border border-border bg-white">
          <div className="font-display text-xl mb-4">Bajo stock</div>
          {(lowStock ?? []).map((p: any) => (
            <div key={p.id} className="flex justify-between py-3 border-b border-border last:border-b-0 text-[13px]">
              <div>{p.name}</div>
              <div className={p.stock <= 3 ? 'text-red-700 font-medium' : 'text-stone'}>{p.stock} u.</div>
            </div>
          ))}
          {(lowStock ?? []).length === 0 && <div className="text-stone text-sm">Todos los productos con stock saludable.</div>}
        </div>
      </div>
    </div>
  );
}
