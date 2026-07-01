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

export { bagImage } from './images';
