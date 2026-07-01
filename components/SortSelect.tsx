'use client';

import { useEffect, useRef, useState } from 'react';

export type SortOption = { value: string; label: string };

export default function SortSelect({
  name,
  defaultValue,
  options,
}: {
  name: string;
  defaultValue: string;
  options: SortOption[];
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <div ref={wrapRef} className="relative flex items-center">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-11 pl-4 pr-9 font-display italic text-[15px] text-coffee outline-none inline-flex items-center whitespace-nowrap"
      >
        {current.label}
      </button>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        className={`pointer-events-none absolute right-3 text-coffee/70 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      >
        <path d="M6 9l6 6 6-6" />
      </svg>

      {/* Custom dropdown menu */}
      <div
        className={`absolute left-0 top-full mt-2 z-50 min-w-full w-max origin-top rounded-2xl border border-border bg-cream shadow-[0_20px_40px_-12px_rgba(30,26,21,0.28)] overflow-hidden transition-all duration-200 ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'}`}
        role="listbox"
      >
        {/* Art-decó header line */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-2 text-stone whitespace-nowrap">
          <span className="w-3 h-px bg-current opacity-40" />
          <svg width="8" height="8" viewBox="0 0 14 14" fill="none" className="text-gold"><polygon points="7,1 13,7 7,13 1,7" stroke="currentColor" strokeWidth="1"/></svg>
          <span className="font-mono text-[9px] tracking-[0.28em] uppercase">Ordenar por</span>
          <span className="flex-1 h-px bg-current opacity-20" />
        </div>
        <ul className="py-1">
          {options.map((o) => {
            const selected = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => { setValue(o.value); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-6 whitespace-nowrap transition-colors ${selected ? 'bg-beige text-coffee' : 'text-mud hover:bg-beige/60 hover:text-coffee'}`}
                >
                  <span className="font-display italic text-[15px] whitespace-nowrap">{o.label}</span>
                  {selected ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gold"><path d="M5 12l5 5 10-11"/></svg>
                  ) : (
                    <span className="w-2 h-2 rotate-45 border border-stone/30" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
