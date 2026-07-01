import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

async function saveCategory(formData: FormData) {
  'use server';
  const id = String(formData.get('id') || '') || null;
  const payload = {
    slug: String(formData.get('slug') || ''),
    name: String(formData.get('name') || ''),
    description: String(formData.get('description') || '') || null,
    sort_order: Number(formData.get('sort_order') || 0),
    active: formData.get('active') === 'on',
  };
  const sb = supabaseAdmin();
  if (id) await sb.from('categories').update(payload).eq('id', id);
  else await sb.from('categories').insert(payload);
  revalidatePath('/admin/dashboard/categorias');
  revalidatePath('/');
}

async function deleteCategory(formData: FormData) {
  'use server';
  const id = String(formData.get('id') || '');
  await supabaseAdmin().from('categories').delete().eq('id', id);
  revalidatePath('/admin/dashboard/categorias');
}

export default async function CategoriesPage() {
  const sb = supabaseAdmin();
  const { data: categories } = await sb.from('categories').select('*').order('sort_order');

  return (
    <div className="p-10 cs-fade">
      <h1 className="font-display text-4xl tracking-tight mb-8">Categorías</h1>

      <form action={saveCategory} className="p-6 rounded-xl border border-border bg-white mb-8 grid md:grid-cols-5 gap-3 items-end">
        <label className="flex flex-col gap-1.5 text-[13px] md:col-span-1">
          <span className="text-stone">Nombre</span>
          <input required name="name" className="h-10 px-3 rounded-lg border border-border bg-white outline-none" />
        </label>
        <label className="flex flex-col gap-1.5 text-[13px]">
          <span className="text-stone">Slug</span>
          <input required name="slug" className="h-10 px-3 rounded-lg border border-border bg-white outline-none" />
        </label>
        <label className="flex flex-col gap-1.5 text-[13px] md:col-span-2">
          <span className="text-stone">Descripción</span>
          <input name="description" className="h-10 px-3 rounded-lg border border-border bg-white outline-none" />
        </label>
        <label className="flex flex-col gap-1.5 text-[13px]">
          <span className="text-stone">Orden</span>
          <input type="number" name="sort_order" defaultValue={0} className="h-10 px-3 rounded-lg border border-border bg-white outline-none" />
        </label>
        <label className="flex items-center gap-2 text-[13px]"><input type="checkbox" name="active" defaultChecked /> Activa</label>
        <button className="h-10 px-4 rounded-full bg-coffee text-cream text-[13px]">Agregar</button>
      </form>

      <div className="border border-border rounded-xl bg-white overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-beige/60 text-stone">
            <tr>
              <th className="text-left px-4 py-3">Nombre</th>
              <th className="text-left px-4 py-3">Slug</th>
              <th className="text-left px-4 py-3">Descripción</th>
              <th className="text-center px-4 py-3">Orden</th>
              <th className="text-center px-4 py-3">Activa</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(categories ?? []).map((c: any) => (
              <tr key={c.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 font-mono text-[11px]">{c.slug}</td>
                <td className="px-4 py-3 text-stone">{c.description ?? '—'}</td>
                <td className="px-4 py-3 text-center">{c.sort_order}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded text-[11px] ${c.active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>{c.active ? 'Sí' : 'No'}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteCategory}>
                    <input type="hidden" name="id" value={c.id} />
                    <button className="px-3 py-1.5 rounded border border-red-200 text-red-700 text-[11px] hover:bg-red-50">Borrar</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
