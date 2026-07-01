# Cataluña

Tienda de café de especialidad, construida con Next.js 15 + Supabase.

## Stack

- **Next.js 15** (App Router, Server Components, Server Actions)
- **Supabase** (Postgres + Auth)
- **Tailwind CSS** (diseño art-decó minimalista)
- **Zustand** (carrito con persistencia en localStorage)
- **TypeScript**

## Setup local

1. Instalar Node 20+ (`brew install node`)
2. Instalar dependencias: `npm install`
3. Copiar `.env.example` a `.env.local` y completar con tus keys de Supabase
4. Correr los SQL en Supabase:
   - `supabase/schema.sql` (crea tablas, vistas, secuencia de códigos)
   - `supabase/seed.sql` (12 productos + 6 categorías demo)
5. Crear un usuario admin en Supabase → Authentication → Users
6. `npm run dev` → http://localhost:3000

## Deploy

En Vercel:
1. Importar el repo de GitHub
2. Framework: **Next.js** (autodetectado)
3. Environment Variables: pegá las 4 vars de `.env.example`
4. Deploy

## Rutas

**Público:**
- `/` — home con destacados y categorías
- `/catalogo` — filtros por categoría, precio, stock, búsqueda
- `/producto/[slug]` — detalle + relacionados
- `/carrito` — carrito persistente
- `/checkout` — formulario + crea pedido en Supabase
- `/pedido/[code]` — confirmación
- `/historia` — 6 capítulos con transiciones art-decó
- `/contacto` — datos de contacto

**Admin** (requiere login):
- `/admin` — login
- `/admin/dashboard` — métricas y resumen
- `/admin/dashboard/productos` — CRUD + toggle activo/destacado
- `/admin/dashboard/categorias` — CRUD
- `/admin/dashboard/pedidos` — lista + filtros por estado
- `/admin/dashboard/pedidos/[id]` — detalle + cambiar estado

## Estructura

```
app/                    # rutas Next.js
  admin/                # panel admin (protegido por middleware)
  catalogo/, carrito/, checkout/, pedido/[code]/
  historia/, contacto/
components/             # Header, Footer, ProductCard, AddToCartButton
lib/
  supabase/             # client (browser), server (RSC), admin (service_role)
  cart-store.ts         # zustand + persist
  data.ts, format.ts, types.ts
supabase/               # schema.sql + seed.sql
mockup/                 # HTML original del design canvas (para referencia)
middleware.ts           # protege /admin/**
```

## Notas

- El carrito vive en localStorage. Los pedidos se persisten en Supabase.
- El descuento de stock se hace al crear el pedido (server action).
- Las imágenes del catálogo usan `source.unsplash.com` como fallback si el producto no tiene `image_url` seteada.
