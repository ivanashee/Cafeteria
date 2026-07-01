import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { formatPrice } from '@/lib/format';
import { toggleActive, toggleFeatured, deleteProduct } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const sb = supabaseAdmin();
  const { data: products } = await sb.from('products').select('*, categories(name)').order('created_at', { ascending: false });

  return (
    <div className="p-10 cs-fade">
      <div className="flex items-end justify-between mb-8">
        <h1 className="font-display text-4xl tracking-tight">Productos</h1>
        <Link href="/admin/dashboard/productos/nuevo" className="h-10 px-4 rounded-full bg-coffee text-cream text-[13px] inline-flex items-center gap-2 hover:bg-cocoa">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Nuevo producto
        </Link>
      </div>
      <div className="border border-border rounded-xl bg-white overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-beige/60 text-stone">
            <tr>
              <th className="text-left px-4 py-3">Producto</th>
              <th className="text-left px-4 py-3">Categoría</th>
              <th className="text-right px-4 py-3">Precio</th>
              <th className="text-right px-4 py-3">Stock</th>
              <th className="text-center px-4 py-3">Destacado</th>
              <th className="text-center px-4 py-3">Activo</th>
              <th className="text-right px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((p: any) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-[11px] text-stone font-mono">{p.slug}</div>
                </td>
                <td className="px-4 py-3">{p.categories?.name ?? '—'}</td>
                <td className="px-4 py-3 text-right font-display">{formatPrice(p.price)}</td>
                <td className={`px-4 py-3 text-right ${p.stock < 5 ? 'text-red-700 font-medium' : ''}`}>{p.stock}</td>
                <td className="px-4 py-3 text-center">
                  <form action={toggleFeatured}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="value" value={String(!p.featured)} />
                    <button type="submit" className={`px-2 py-1 rounded text-[11px] ${p.featured ? 'bg-coffee text-cream' : 'bg-beige text-stone hover:text-coffee'}`}>
                      {p.featured ? 'Sí' : 'No'}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-center">
                  <form action={toggleActive}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="value" value={String(!p.active)} />
                    <button type="submit" className={`px-2 py-1 rounded text-[11px] ${p.active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {p.active ? 'Activo' : 'Inactivo'}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/dashboard/productos/${p.id}`} className="px-3 py-1.5 rounded border border-border text-[11px] hover:bg-beige">Editar</Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit" className="px-3 py-1.5 rounded border border-red-200 text-red-700 text-[11px] hover:bg-red-50">Borrar</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(products ?? []).length === 0 && <div className="p-10 text-center text-stone text-sm">Sin productos. Crea uno con el botón de arriba o corré <code className="font-mono">supabase/seed.sql</code>.</div>}
      </div>
    </div>
  );
}
