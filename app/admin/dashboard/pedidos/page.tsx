import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { formatPrice, formatDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

const STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: 'Pendiente', cls: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmado', cls: 'bg-blue-100 text-blue-800' },
  preparing: { label: 'Preparando', cls: 'bg-indigo-100 text-indigo-800' },
  sent: { label: 'Enviado', cls: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Entregado', cls: 'bg-emerald-100 text-emerald-800' },
  cancelled: { label: 'Cancelado', cls: 'bg-red-100 text-red-800' },
};

export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const sp = await searchParams;
  const sb = supabaseAdmin();
  let q = sb.from('v_orders_summary').select('*').order('created_at', { ascending: false });
  if (sp.status) q = q.eq('status', sp.status);
  const { data: orders } = await q;

  return (
    <div className="p-4 sm:p-6 lg:p-10 cs-fade">
      <h1 className="font-display text-4xl tracking-tight mb-8">Pedidos</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        <Link href="/admin/dashboard/pedidos" className={`px-3 py-1.5 rounded-full text-[12px] border ${!sp.status ? 'bg-coffee text-cream border-coffee' : 'border-border hover:bg-beige'}`}>Todos</Link>
        {Object.entries(STATUS).map(([k, v]) => (
          <Link key={k} href={`/admin/dashboard/pedidos?status=${k}`} className={`px-3 py-1.5 rounded-full text-[12px] border ${sp.status === k ? 'bg-coffee text-cream border-coffee' : 'border-border hover:bg-beige'}`}>{v.label}</Link>
        ))}
      </div>

      <div className="border border-border rounded-xl bg-white overflow-x-auto">
        <table className="w-full min-w-[780px] text-[13px]">
          <thead className="bg-beige/60 text-stone">
            <tr>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Cliente</th>
              <th className="text-left px-4 py-3">Fecha</th>
              <th className="text-center px-4 py-3">Ítems</th>
              <th className="text-right px-4 py-3">Total</th>
              <th className="text-center px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {(orders ?? []).map((o: any) => (
              <tr key={o.id} className="border-t border-border hover:bg-beige/30">
                <td className="px-4 py-3"><Link href={`/admin/dashboard/pedidos/${o.id}`} className="font-mono font-medium hover:text-coffee">{o.code}</Link></td>
                <td className="px-4 py-3">
                  <div>{o.customer_name}</div>
                  <div className="text-[11px] text-stone">{o.customer_phone}</div>
                </td>
                <td className="px-4 py-3 text-stone">{formatDate(o.created_at)}</td>
                <td className="px-4 py-3 text-center">{o.items_count}</td>
                <td className="px-4 py-3 text-right font-display">{formatPrice(o.total)}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded text-[11px] ${STATUS[o.status]?.cls ?? 'bg-stone-100'}`}>{STATUS[o.status]?.label ?? o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(orders ?? []).length === 0 && <div className="p-10 text-center text-stone text-sm">Sin pedidos aún.</div>}
      </div>
    </div>
  );
}
