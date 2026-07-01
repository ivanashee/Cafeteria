'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';

export default function FeaturedCarousel({ products }: { products: Product[] }) {
  const [perPage, setPerPage] = useState(4);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setPerPage(1);
      else if (w < 1024) setPerPage(2);
      else setPerPage(4);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const pages = Math.max(1, Math.ceil(products.length / perPage));
  const clampedPage = Math.min(page, pages - 1);
  useEffect(() => { if (page > pages - 1) setPage(pages - 1); }, [page, pages]);

  const canPrev = clampedPage > 0;
  const canNext = clampedPage < pages - 1;

  const prev = () => canPrev && setPage(clampedPage - 1);
  const next = () => canNext && setPage(clampedPage + 1);

  if (products.length === 0) return null;

  return (
    <div className="relative">
      {/* Arrow controls */}
      <div className="flex items-center justify-end gap-2 mb-4">
        <button
          onClick={prev}
          disabled={!canPrev}
          aria-label="Anteriores"
          className="w-11 h-11 rounded-full border border-border grid place-items-center bg-cream transition-all duration-300 hover:bg-coffee hover:text-cream hover:border-coffee disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-cream disabled:hover:text-ink disabled:hover:border-border"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
        </button>
        <button
          onClick={next}
          disabled={!canNext}
          aria-label="Siguientes"
          className="w-11 h-11 rounded-full border border-border grid place-items-center bg-cream transition-all duration-300 hover:bg-coffee hover:text-cream hover:border-coffee disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-cream disabled:hover:text-ink disabled:hover:border-border"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </div>

      {/* Track (viewport) */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
          style={{ transform: `translateX(-${clampedPage * 100}%)` }}
        >
          {Array.from({ length: pages }).map((_, pi) => (
            <div key={pi} className="w-full shrink-0 grid gap-6" style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }}>
              {products.slice(pi * perPage, pi * perPage + perPage).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Page dots */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Página ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === clampedPage ? 'w-10 bg-coffee' : 'w-4 bg-border hover:bg-stone'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
