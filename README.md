# Coffee Store

Prototipo visual completo de una tienda de cafetería online (Coffee Store) + esquema SQL listo para Supabase.

## Qué contiene este proyecto

- **`Coffee Store.dc.html`** — prototipo interactivo de alta fidelidad con **todas las pantallas** navegables:
  - Home
  - Catálogo (búsqueda, filtros por categoría/precio/stock/destacados, orden)
  - Detalle de producto (galería, cantidad, agregar al carrito, comprar por WhatsApp, relacionados)
  - Carrito (con persistencia en `localStorage`)
  - Checkout (todos los campos requeridos)
  - Confirmación de pedido + generación de mensaje de WhatsApp
  - Panel admin: login, dashboard, gestión de productos, categorías, pedidos y cambio de estado
- **`supabase/schema.sql`** — creación de schema `coffeestore` con las tablas `categories`, `products`, `customers`, `orders`, `order_items`, índices, triggers y vistas.
- **`supabase/seed.sql`** — 12 productos demo + 6 categorías listos para cargar.
- **`.env.example`** — variables de entorno para Next.js + Supabase + WhatsApp.

## Cómo probar el prototipo

Abrí `Coffee Store.dc.html` directamente en el navegador (o en la vista previa de la app). Todas las pantallas están navegables desde el header, el ícono de admin (👤 arriba a la derecha) lleva al login, y el carrito se persiste entre recargas.

Datos de acceso admin (demo): cualquier email + cualquier contraseña.

## Cómo llevarlo a producción con Next.js + Supabase

Este prototipo está pensado como **referencia visual y de UX** para que un dev (o Claude Code) construya la app real. Los pasos:

### 1. Crear el proyecto Next.js

```bash
npx create-next-app@latest coffee-store --typescript --tailwind --app --eslint
cd coffee-store
npm install @supabase/supabase-js @supabase/ssr
```

### 2. Configurar Supabase

1. Creá un proyecto en [supabase.com](https://supabase.com).
2. En el editor SQL, ejecutá primero `supabase/schema.sql` y luego `supabase/seed.sql`.
3. En **Project Settings → API → Exposed schemas**, agregá `coffeestore` a la lista.
4. Copiá `.env.example` a `.env.local` y completá con los valores del proyecto.

### 3. Cliente de Supabase (`lib/supabase.ts`)

```ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { db: { schema: process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || 'coffeestore' } }
);
```

### 4. Cargar productos (server component)

```ts
// app/catalogo/page.tsx
import { supabase } from '@/lib/supabase';

export default async function CatalogPage() {
  const { data: products } = await supabase
    .from('v_public_products')      // vista definida en schema.sql
    .select('*')
    .order('created_at', { ascending: false });

  // ... render usando la UI del prototipo como referencia
}
```

### 5. Crear pedido (route handler)

```ts
// app/api/orders/route.ts
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const body = await req.json();
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,           // bypasea RLS
    { db: { schema: 'coffeestore' } }
  );

  const { data: codeRow } = await admin.rpc('next_order_code');
  const { data: order, error } = await admin
    .from('orders')
    .insert({ code: codeRow, ...body.customer, subtotal: body.subtotal, total: body.total })
    .select().single();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  await admin.from('order_items').insert(
    body.items.map((it: any) => ({
      order_id: order.id,
      product_id: it.id,
      product_name: it.name,
      unit_price: it.price,
      qty: it.qty,
    }))
  );
  return Response.json({ order });
}
```

### 6. Panel admin

- Usá Supabase Auth (email + password) y validá `session.user.email === process.env.ADMIN_EMAIL` en un middleware o server component.
- El cambio de estado del pedido es un `UPDATE` simple sobre `orders.status`.

### 7. Correr localmente

```bash
npm run dev
```

Abrí <http://localhost:3000>.

## Reglas de negocio implementadas en el prototipo

- Los productos **inactivos** no aparecen en el storefront (vista `v_public_products`).
- Los productos **sin stock** muestran badge "Sin stock" y **no permiten agregarse al carrito**.
- El **carrito persiste** en `localStorage` entre recargas.
- El botón "Comprar por WhatsApp" abre un mensaje pre-armado hacia **+595 981 772 872**.
- Estados de pedido: `pending` → `confirmed` → `preparing` → `sent` → `delivered` (o `cancelled` en cualquier momento).

## Estructura de archivos

```
.
├── Coffee Store.dc.html      # Prototipo visual navegable
├── README.md                 # Este archivo
├── .env.example              # Variables de entorno de referencia
└── supabase/
    ├── schema.sql            # DDL: tablas, índices, triggers, vistas
    └── seed.sql              # 12 productos + 6 categorías demo
```

## Notas de diseño

- Paleta: crema `#FAF6F0`, papel `#F1E9DC`, café oscuro `#2C1F16`, tinta `#1E1A15`, dorado sutil `#C9A876`.
- Tipografía: **Fraunces** (display serif) + **Inter** (UI) + **JetBrains Mono** (etiquetas y datos).
- Placeholders monocromos con etiqueta para todas las imágenes de producto — reemplazables por fotos reales en `products.image_url` / `products.gallery`.
