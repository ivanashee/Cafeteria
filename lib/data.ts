import { supabaseServer } from './supabase/server';
import type { Product, Category } from './types';

export async function getCategories(): Promise<Category[]> {
  const sb = await supabaseServer();
  const { data } = await sb.from('categories').select('*').eq('active', true).order('sort_order');
  return (data as Category[]) ?? [];
}

export async function getProducts(opts: {
  categorySlug?: string;
  featured?: boolean;
  inStock?: boolean;
  query?: string;
  sort?: 'recent' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
  priceMin?: number;
  priceMax?: number;
  limit?: number;
} = {}): Promise<Product[]> {
  const sb = await supabaseServer();
  let q = sb.from('v_public_products').select('*');
  if (opts.categorySlug) q = q.eq('category_slug', opts.categorySlug);
  if (opts.featured) q = q.eq('featured', true);
  if (opts.inStock) q = q.gt('stock', 0);
  if (opts.query) q = q.ilike('name', `%${opts.query}%`);
  if (opts.priceMin != null) q = q.gte('price', opts.priceMin);
  if (opts.priceMax != null) q = q.lte('price', opts.priceMax);
  switch (opts.sort) {
    case 'price-asc': q = q.order('price', { ascending: true }); break;
    case 'price-desc': q = q.order('price', { ascending: false }); break;
    case 'name-asc': q = q.order('name', { ascending: true }); break;
    case 'name-desc': q = q.order('name', { ascending: false }); break;
    default: q = q.order('name', { ascending: true }); break;
  }
  if (opts.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error) { console.error('getProducts', error); return []; }
  return (data as Product[]) ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const sb = await supabaseServer();
  const { data } = await sb.from('v_public_products').select('*').eq('slug', slug).maybeSingle();
  return (data as Product) ?? null;
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const sb = await supabaseServer();
  const { data } = await sb.from('v_public_products')
    .select('*')
    .eq('category_slug', product.category_slug)
    .neq('id', product.id)
    .limit(limit);
  return (data as Product[]) ?? [];
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  const sb = await supabaseServer();
  const { data } = await sb.from('v_public_products').select('category_slug');
  const counts: Record<string, number> = {};
  (data ?? []).forEach((r: any) => { counts[r.category_slug] = (counts[r.category_slug] ?? 0) + 1; });
  return counts;
}
