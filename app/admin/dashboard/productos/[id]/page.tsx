import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { saveProduct } from '../actions';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = supabaseAdmin();
  const isNew = id === 'nuevo';
  const [{ data: p }, { data: categories }] = await Promise.all([
    isNew ? Promise.resolve({ data: null }) : sb.from('products').select('*').eq('id', id).maybeSingle(),
    sb.from('categories').select('*').order('sort_order'),
  ]);
  if (!isNew && !p) notFound();

  return (
    <div className="p-10 cs-fade">
      <div className="mb-8">
        <Link href="/admin/dashboard/productos" className="text-xs uppercase tracking-widest text-stone hover:text-coffee">← Productos</Link>
        <h1 className="font-display text-4xl tracking-tight mt-3">{isNew ? 'Nuevo producto' : p?.name}</h1>
      </div>
      <form action={saveProduct} className="max-w-3xl grid gap-5">
        {!isNew && <input type="hidden" name="id" value={id} />}
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Nombre" name="name" defaultValue={p?.name ?? ''} required />
          <Field label="Slug (URL)" name="slug" defaultValue={p?.slug ?? ''} required />
        </div>
        <label className="flex flex-col gap-1.5 text-[13px]">
          <span className="text-stone">Categoría *</span>
          <select required name="category_id" defaultValue={p?.category_id ?? ''} className="h-11 px-3 rounded-lg border border-border bg-white outline-none">
            <option value="">— Seleccioná —</option>
            {(categories ?? []).map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <Field label="Descripción corta" name="short_desc" defaultValue={p?.short_desc ?? ''} />
        <label className="flex flex-col gap-1.5 text-[13px]">
          <span className="text-stone">Descripción larga</span>
          <textarea name="long_desc" defaultValue={p?.long_desc ?? ''} rows={4} className="p-3 rounded-lg border border-border bg-white outline-none" />
        </label>
        <div className="grid md:grid-cols-3 gap-5">
          <Field label="Precio (Gs.)" name="price" type="number" defaultValue={p?.price ?? 0} required />
          <Field label="Stock" name="stock" type="number" defaultValue={p?.stock ?? 0} required />
          <Field label="SKU" name="sku" defaultValue={p?.sku ?? ''} />
        </div>
        <Field label="URL de imagen (opcional)" name="image_url" defaultValue={p?.image_url ?? ''} />
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-[13px]"><input type="checkbox" name="active" defaultChecked={p?.active ?? true} /> Activo</label>
          <label className="flex items-center gap-2 text-[13px]"><input type="checkbox" name="featured" defaultChecked={p?.featured ?? false} /> Destacado</label>
        </div>
        <div className="flex gap-3 mt-4">
          <button type="submit" className="h-11 px-6 rounded-full bg-coffee text-cream text-sm hover:bg-cocoa">Guardar</button>
          <Link href="/admin/dashboard/productos" className="h-11 px-6 rounded-full border border-border text-sm inline-flex items-center">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = 'text', defaultValue, required }: { label: string; name: string; type?: string; defaultValue?: any; required?: boolean }) {
  return (
    <label className="flex flex-col gap-1.5 text-[13px]">
      <span className="text-stone">{label}{required && ' *'}</span>
      <input required={required} type={type} name={name} defaultValue={defaultValue} className="h-11 px-3 rounded-lg border border-border bg-white outline-none" />
    </label>
  );
}
