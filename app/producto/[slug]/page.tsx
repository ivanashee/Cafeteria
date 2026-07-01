import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProductBySlug, getRelatedProducts } from '@/lib/data';
import { formatPrice, bagImage } from '@/lib/format';
import AddToCartButton from '@/components/AddToCartButton';

export const revalidate = 60;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product);
  const img = product.image_url || bagImage(product.slug, 800);
  const outOfStock = product.stock <= 0;
  const gallery = product.gallery.length ? product.gallery : [img, bagImage(product.slug + '-1', 400), bagImage(product.slug + '-2', 400), bagImage(product.slug + '-3', 400)];

  return (
    <div className="max-w-[1360px] mx-auto px-8 pt-10 pb-24 cs-fade">
      <nav className="flex items-center gap-2 text-xs text-stone mb-8">
        <Link href="/" className="hover:text-coffee">Inicio</Link>
        <span>/</span>
        <Link href="/catalogo" className="hover:text-coffee">Catálogo</Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-16 items-start">
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div className="flex flex-col gap-2.5">
            {gallery.slice(0, 4).map((g, i) => (
              <div key={i} className="aspect-square rounded bg-coffeeDark bg-cover bg-center border border-border overflow-hidden" style={{ backgroundImage: `url('${g}')` }} />
            ))}
          </div>
          <div className="relative aspect-square rounded bg-coffeeDark bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('${img}')` }}>
            <span className="cs-corner cs-corner-tl" />
            <span className="cs-corner cs-corner-tr" />
            <span className="cs-corner cs-corner-bl" />
            <span className="cs-corner cs-corner-br" />
            {product.featured && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-cream/95 text-[10px] font-mono tracking-[0.24em] uppercase text-coffee z-10">Destacado</div>
            )}
          </div>
        </div>

        <div className="pt-2">
          <div className="font-mono text-[11px] tracking-widest uppercase text-stone mb-4">{product.category_name}</div>
          <h1 className="font-display text-5xl md:text-6xl leading-none tracking-tight mb-5">{product.name}</h1>
          <div className="flex items-baseline gap-4 mb-6">
            <div className="font-display text-3xl">{formatPrice(product.price)}</div>
            <div className={`text-xs font-mono tracking-widest uppercase ${outOfStock ? 'text-red-700' : 'text-emerald-700'}`}>
              {outOfStock ? 'Sin stock' : `${product.stock} en stock`}
            </div>
          </div>
          {product.long_desc && <p className="text-base leading-relaxed text-mud mb-8">{product.long_desc}</p>}

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 py-5 border-y border-border mb-8">
            {product.sku && (
              <div className="flex justify-between gap-4 text-[13px]"><span className="text-stone">SKU</span><span className="font-medium">{product.sku}</span></div>
            )}
            <div className="flex justify-between gap-4 text-[13px]"><span className="text-stone">Categoría</span><span className="font-medium">{product.category_name}</span></div>
          </div>

          {!outOfStock ? (
            <div className="flex gap-3 items-center mb-3">
              <AddToCartButton product={product} qty={1} large />
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-beige text-center">
              <div className="font-display text-xl mb-1">Sin stock por ahora</div>
              <div className="text-[13px] text-stone">Escribinos por WhatsApp para reservar el próximo lote.</div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-32">
          <div className="mb-8">
            <div className="font-mono text-[11px] tracking-widest uppercase text-stone mb-3">— También te puede gustar</div>
            <h2 className="font-display text-4xl tracking-tight">Productos relacionados</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
