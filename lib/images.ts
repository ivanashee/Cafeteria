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
  cafe:           unsplash('1611854779393-1b2da9d400fe'), // roasted coffee bags
  bebidas:        unsplash('1461023058943-07fcbe16d735'), // iced coffee
  combos:         unsplash('1447933601403-0c6688de566e'), // multiple coffee bags
  'menu-del-dia': unsplash('1546069901-ba9599a7e63c'),    // plated meal (menu of the day)
  desayuno:       unsplash('1509440159596-0249088772ff'), // breakfast / pastries
  regalos:        unsplash('1509042239860-f550ce710b93'), // coffee gift scene
};

/** Deterministic fallback list for unknown category slugs. */
export const CATEGORY_IMAGES = Object.values(CATEGORY_IMAGE_BY_SLUG);

export function categoryImage(slug: string, index = 0): string {
  return CATEGORY_IMAGE_BY_SLUG[slug] ?? CATEGORY_IMAGES[index % CATEGORY_IMAGES.length];
}

/**
 * Map from product slug → image. Values can be:
 *   - a local URL (starts with '/') for user-uploaded photos in /public/img/
 *   - an Unsplash photo ID (bare number-hash) for the fallback CDN images
 */
const PER_SLUG: Record<string, string> = {
  // Café
  'blend-esperanza':   '/img/cafe en grano y molido 1.jpeg',
  'finca-monte-rosa':  '/img/cafe grano y molio 2.jpeg',
  'descafeinado':      '1587049352846-4a222e784d38', // coffee bag on wood (no local)
  // Bebidas
  'cold-brew-1l':      '/img/cold brew 1l.webp',
  'cold-brew-lata':    '/img/cold brew 330 ml.jpg',
  // Combos
  'combo-degustacion': '1610889556528-9a770e32642f',
  'combo-oficina':     '1522992319-0365e5f11656',
  // Regalos
  'box-regalo-inicio': '1524350876685-274059332603',
  // Menú del día
  'lasana-de-pollo':   '1574894709920-11b28e7367e3',
  'vori-vori-de-pollo':'/img/vori vori.webp',
  'chop-suey-de-carne':'/img/chop suey.jpg',
  // Desayuno
  'cookies':           '1499636136210-6f4ee915583e', // no local
  'croissants':        '/img/croissants.jpg',
  'facturas':          '/img/facturas.jpeg',
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

/** True when the value is a local `/img/...` path rather than an Unsplash ID. */
function isLocalUrl(value: string) {
  return value.startsWith('/') || value.startsWith('http');
}

/**
 * Image chosen by (slug, category). Returns a local URL if we uploaded a photo
 * for that product, otherwise falls back to an Unsplash CDN URL. Deterministic
 * so SSR/CSR match.
 */
export function productImage(slug: string, categorySlug?: string | null, size = 600): string {
  const value =
    PER_SLUG[slug] ||
    (categorySlug ? PER_CATEGORY[categorySlug] : undefined) ||
    FALLBACK[[...slug].reduce((a, c) => a + c.charCodeAt(0), 0) % FALLBACK.length];
  if (isLocalUrl(value)) return encodeURI(value); // encode spaces in filenames
  return unsplash(value, size);
}

/** Back-compat alias — kept because other files still import `bagImage`. */
export function bagImage(seed: string | number, size = 600): string {
  if (typeof seed === 'string') return productImage(seed, undefined, size);
  return unsplash(FALLBACK[Math.abs(seed) % FALLBACK.length], size);
}
