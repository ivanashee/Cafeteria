/**
 * Real Unsplash coffee photos. All IDs below have been verified with a HTTP 200.
 * source.unsplash.com is deprecated — do not use.
 */

const COFFEE_BAGS = [
  '1611854779393-1b2da9d400fe',
  '1447933601403-0c6688de566e',
  '1521302200778-33500795e128',
  '1495474472287-4d71bcdd2085',
  '1509042239860-f550ce710b93',
  '1461023058943-07fcbe16d735',
  '1541167760496-1628856ab772',
  '1497935586351-b67a49e012bf',
];

export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=1920&q=80';

export const CATALOG_HERO_IMAGE =
  'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=1920&q=80';

export const EDITORIAL_IMAGE =
  'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=800&q=80';

export const CATEGORY_IMAGES = [
  'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1521302200778-33500795e128?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
];

/** Deterministic real Unsplash coffee image per product seed. */
export function bagImage(seed: string | number, size = 600): string {
  const hash = typeof seed === 'number' ? seed : [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  const id = COFFEE_BAGS[Math.abs(hash) % COFFEE_BAGS.length];
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${size}&q=80`;
}
