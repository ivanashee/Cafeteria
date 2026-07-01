/**
 * Real Unsplash coffee photos. All IDs below have been verified with a HTTP 200.
 * source.unsplash.com is deprecated — do not use.
 */

function unsplash(id: string, size = 600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${size}&q=80`;
}

export const HERO_IMAGE = unsplash('1442550528053-c431ecb55509', 1920);
export const CATALOG_HERO_IMAGE = unsplash('1497515114629-f71d768fd07c', 1920);
export const EDITORIAL_IMAGE = unsplash('1512568400610-62da28bc8a13', 800);
export const FARM_IMAGE = unsplash('1497935586351-b67a49e012bf', 800);
export const MOUNTAINS_IMAGE = unsplash('1464822759023-fed622ff2c3b', 1920);

/**
 * Category images — keyed by category slug so ordering changes in the DB
 * don't rotate the wrong picture into the wrong category (that's how we ended
 * up with a YouTube screenshot under "Accesorios").
 */
export const CATEGORY_IMAGE_BY_SLUG: Record<string, string> = {
  cafe:       unsplash('1611854779393-1b2da9d400fe'), // roasted coffee bags
  bebidas:    unsplash('1461023058943-07fcbe16d735'), // iced coffee
  combos:     unsplash('1447933601403-0c6688de566e'), // multiple coffee bags
  accesorios: unsplash('1523983388277-336a66bf9bcd'), // ceramic mug (safe accessories shot)
  equipos:    unsplash('1495474472287-4d71bcdd2085'), // brewing / cups
  regalos:    unsplash('1509042239860-f550ce710b93'), // coffee gift scene
};

/** Deterministic fallback list for unknown category slugs. */
export const CATEGORY_IMAGES = Object.values(CATEGORY_IMAGE_BY_SLUG);

export function categoryImage(slug: string, index = 0): string {
  return CATEGORY_IMAGE_BY_SLUG[slug] ?? CATEGORY_IMAGES[index % CATEGORY_IMAGES.length];
}

/** Map from product slug → specific Unsplash photo ID relevant to that item. */
const PER_SLUG: Record<string, string> = {
  'blend-esperanza':   '1611854779393-1b2da9d400fe', // roasted coffee bag
  'finca-monte-rosa':  '1447933601403-0c6688de566e', // artisan coffee bags
  'descafeinado':      '1587049352846-4a222e784d38', // coffee bag on wood
  'cold-brew-1l':      '1517701604599-bb29b565090c', // coffee bottle
  'cold-brew-lata':    '1544787219-7f47ccb76574',    // canned drink coffee
  'combo-degustacion': '1610889556528-9a770e32642f', // several coffee bags
  'combo-oficina':     '1522992319-0365e5f11656',    // large coffee bag
  'taza-ceramica':     '1495474472287-4d71bcdd2085', // ceramic mug with coffee
  'termo-acero':       '1516685018646-549198525c1b', // thermos / travel mug
  'v60-hario':         '1516315720917-231ef9acce48', // pour over v60
  'prensa-francesa':   '1445116572660-236099ec97a0', // french press
  'box-regalo-inicio': '1524350876685-274059332603', // coffee gift box
};

/** Category-slug fallback when we don't have a per-product mapping. */
const PER_CATEGORY: Record<string, string> = {
  cafe:       '1611854779393-1b2da9d400fe', // roasted coffee bag
  bebidas:    '1517701604599-bb29b565090c', // coffee bottle
  combos:     '1610889556528-9a770e32642f', // several bags together
  accesorios: '1495474472287-4d71bcdd2085', // ceramic mug
  equipos:    '1516315720917-231ef9acce48', // pour over
  regalos:    '1524350876685-274059332603', // gift box
};

/** Legacy grab-bag for unknown slugs+categories. */
const FALLBACK = [
  '1611854779393-1b2da9d400fe',
  '1447933601403-0c6688de566e',
  '1521302200778-33500795e128',
  '1509042239860-f550ce710b93',
];

/**
 * Real Unsplash coffee image chosen by (slug, category) — most specific wins.
 * Keeps deterministic output so SSR/CSR match.
 */
export function productImage(slug: string, categorySlug?: string | null, size = 600): string {
  const id =
    PER_SLUG[slug] ||
    (categorySlug ? PER_CATEGORY[categorySlug] : undefined) ||
    FALLBACK[[...slug].reduce((a, c) => a + c.charCodeAt(0), 0) % FALLBACK.length];
  return unsplash(id, size);
}

/** Back-compat alias — kept because other files still import `bagImage`. */
export function bagImage(seed: string | number, size = 600): string {
  if (typeof seed === 'string') return productImage(seed, undefined, size);
  const id = FALLBACK[Math.abs(seed) % FALLBACK.length];
  return unsplash(id, size);
}
