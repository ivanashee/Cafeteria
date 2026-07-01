-- =====================================================================
-- Coffee Store · Schema para Supabase
-- =====================================================================
-- Ejecutar en el SQL editor de Supabase (Project → SQL Editor → New query)
-- =====================================================================

create schema if not exists coffeestore;
set search_path to coffeestore, public;

-- Extensiones útiles
create extension if not exists "pgcrypto";  -- para gen_random_uuid()

-- =====================================================================
-- 1. CATEGORIES
-- =====================================================================
create table if not exists coffeestore.categories (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  description   text,
  sort_order    integer not null default 0,
  active        boolean not null default true,
  created_at    timestamptz not null default now()
);

-- =====================================================================
-- 2. PRODUCTS
-- =====================================================================
create table if not exists coffeestore.products (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  category_id   uuid not null references coffeestore.categories(id) on delete restrict,
  short_desc    text,
  long_desc     text,
  price         integer not null check (price >= 0),        -- en guaraníes (sin decimales)
  stock         integer not null default 0 check (stock >= 0),
  featured      boolean not null default false,
  active        boolean not null default true,
  image_url     text,
  gallery       jsonb not null default '[]'::jsonb,          -- array de URLs
  sku           text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_products_category on coffeestore.products(category_id);
create index if not exists idx_products_active_featured on coffeestore.products(active, featured);
create index if not exists idx_products_slug on coffeestore.products(slug);

-- Trigger para updated_at
create or replace function coffeestore.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists trg_products_updated_at on coffeestore.products;
create trigger trg_products_updated_at
  before update on coffeestore.products
  for each row execute function coffeestore.set_updated_at();

-- =====================================================================
-- 3. CUSTOMERS
-- =====================================================================
create table if not exists coffeestore.customers (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  phone         text not null,
  email         text,
  address       text,
  city          text,
  created_at    timestamptz not null default now()
);

create index if not exists idx_customers_email on coffeestore.customers(email);
create index if not exists idx_customers_phone on coffeestore.customers(phone);

-- =====================================================================
-- 4. ORDERS
-- =====================================================================
-- Estados válidos: pending | confirmed | preparing | sent | delivered | cancelled
-- Métodos de entrega: delivery | pickup | express
-- Métodos de pago: transfer | card | cash

create table if not exists coffeestore.orders (
  id             uuid primary key default gen_random_uuid(),
  code           text unique not null,                    -- código legible tipo "CS-2841"
  customer_id    uuid references coffeestore.customers(id) on delete set null,
  customer_name  text not null,
  customer_phone text not null,
  customer_email text,
  address        text,
  city           text,
  delivery       text not null default 'delivery'
                    check (delivery in ('delivery','pickup','express')),
  payment        text not null default 'transfer'
                    check (payment in ('transfer','card','cash')),
  notes          text,
  status         text not null default 'pending'
                    check (status in ('pending','confirmed','preparing','sent','delivered','cancelled')),
  subtotal       integer not null default 0,
  total          integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists idx_orders_status on coffeestore.orders(status);
create index if not exists idx_orders_created on coffeestore.orders(created_at desc);
create index if not exists idx_orders_customer on coffeestore.orders(customer_id);

drop trigger if exists trg_orders_updated_at on coffeestore.orders;
create trigger trg_orders_updated_at
  before update on coffeestore.orders
  for each row execute function coffeestore.set_updated_at();

-- Generador secuencial del código de pedido
create sequence if not exists coffeestore.order_code_seq start with 2841;
create or replace function coffeestore.next_order_code()
returns text language sql as $$
  select 'CS-' || nextval('coffeestore.order_code_seq')::text;
$$;

-- =====================================================================
-- 5. ORDER_ITEMS
-- =====================================================================
create table if not exists coffeestore.order_items (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references coffeestore.orders(id) on delete cascade,
  product_id    uuid not null references coffeestore.products(id) on delete restrict,
  product_name  text not null,                            -- snapshot al momento del pedido
  unit_price    integer not null,                         -- snapshot
  qty           integer not null check (qty > 0),
  line_total    integer generated always as (unit_price * qty) stored
);

create index if not exists idx_order_items_order on coffeestore.order_items(order_id);
create index if not exists idx_order_items_product on coffeestore.order_items(product_id);

-- =====================================================================
-- 6. VISTAS ÚTILES
-- =====================================================================

-- Productos visibles para el storefront (activos y con stock si se desea)
create or replace view coffeestore.v_public_products as
  select
    p.id, p.slug, p.name, p.short_desc, p.long_desc, p.price, p.stock,
    p.featured, p.image_url, p.gallery, p.sku,
    c.id as category_id, c.slug as category_slug, c.name as category_name
  from coffeestore.products p
  join coffeestore.categories c on c.id = p.category_id
  where p.active = true and c.active = true;

-- Resumen de pedido con conteo de ítems
create or replace view coffeestore.v_orders_summary as
  select
    o.*,
    (select coalesce(sum(qty), 0) from coffeestore.order_items oi where oi.order_id = o.id) as items_count
  from coffeestore.orders o;

-- =====================================================================
-- 7. ROW LEVEL SECURITY (recomendado)
-- =====================================================================
-- Ajustá las policies según tu modelo de auth. Ejemplo mínimo:
--
-- alter table coffeestore.categories    enable row level security;
-- alter table coffeestore.products      enable row level security;
-- alter table coffeestore.orders        enable row level security;
-- alter table coffeestore.order_items   enable row level security;
-- alter table coffeestore.customers     enable row level security;
--
-- Lectura pública de catálogo (para anon key):
-- create policy "public read categories" on coffeestore.categories
--   for select using (active = true);
-- create policy "public read products" on coffeestore.products
--   for select using (active = true);
--
-- Escritura solo desde el servidor (service_role bypasea RLS por defecto):
-- create policy "server writes orders" on coffeestore.orders
--   for all using (auth.role() = 'service_role');
