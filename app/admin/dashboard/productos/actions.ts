'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function toggleActive(formData: FormData) {
  const id = String(formData.get('id') || '');
  const value = formData.get('value') === 'true';
  await supabaseAdmin().from('products').update({ active: value }).eq('id', id);
  revalidatePath('/admin/dashboard/productos');
  revalidatePath('/catalogo');
}

export async function toggleFeatured(formData: FormData) {
  const id = String(formData.get('id') || '');
  const value = formData.get('value') === 'true';
  await supabaseAdmin().from('products').update({ featured: value }).eq('id', id);
  revalidatePath('/admin/dashboard/productos');
  revalidatePath('/');
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get('id') || '');
  await supabaseAdmin().from('products').delete().eq('id', id);
  revalidatePath('/admin/dashboard/productos');
}

export async function saveProduct(formData: FormData) {
  const id = String(formData.get('id') || '') || null;
  const payload = {
    slug: String(formData.get('slug') || ''),
    name: String(formData.get('name') || ''),
    category_id: String(formData.get('category_id') || ''),
    short_desc: String(formData.get('short_desc') || '') || null,
    long_desc: String(formData.get('long_desc') || '') || null,
    price: Number(formData.get('price') || 0),
    stock: Number(formData.get('stock') || 0),
    featured: formData.get('featured') === 'on',
    active: formData.get('active') === 'on',
    sku: String(formData.get('sku') || '') || null,
    image_url: String(formData.get('image_url') || '') || null,
  };
  const sb = supabaseAdmin();
  if (id) await sb.from('products').update(payload).eq('id', id);
  else await sb.from('products').insert(payload);
  revalidatePath('/admin/dashboard/productos');
  revalidatePath('/catalogo');
  redirect('/admin/dashboard/productos');
}
