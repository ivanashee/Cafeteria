const LOCALE = process.env.NEXT_PUBLIC_CURRENCY_LOCALE || 'es-PY';
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || 'PYG';

export function formatPrice(value: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
}

/** Deterministic unsplash coffee bag image per product id/slug. */
export function bagImage(seed: string | number, size = 600): string {
  const queries = [
    'coffee-bag,packaging',
    'coffee-beans-bag',
    'coffee-roast,bag',
    'specialty-coffee',
    'arabica-coffee',
    'coffee-package,craft',
  ];
  const hash = typeof seed === 'number' ? seed : [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  const q = queries[hash % queries.length];
  return `https://source.unsplash.com/${size}x${size}/?${q}&sig=${(hash % 100) + 1}`;
}
