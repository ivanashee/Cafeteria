-- =====================================================================
-- Coffee Store · Datos demo (categorías + 12 productos)
-- =====================================================================
-- Ejecutar DESPUÉS de schema.sql
-- =====================================================================

set search_path to coffeestore, public;

-- --------------------------------------------------------------------
-- CATEGORÍAS
-- --------------------------------------------------------------------
insert into coffeestore.categories (slug, name, description, sort_order) values
  ('cafe',       'Café en grano y molido', 'Nuestros blends y orígenes únicos.',    1),
  ('bebidas',    'Bebidas listas',         'Cold brew y listos para servir.',       2),
  ('combos',     'Combos',                 'Packs armados para regalar o ahorrar.', 3),
  ('accesorios', 'Accesorios',             'Tazas, termos y más.',                  4),
  ('equipos',    'Equipamiento',           'Prensas, cafeteras y filtros.',         5),
  ('regalos',    'Regalos',                'Boxes y sets de regalo.',               6)
on conflict (slug) do nothing;

-- --------------------------------------------------------------------
-- PRODUCTOS (12)
-- --------------------------------------------------------------------
with cats as (
  select id, slug from coffeestore.categories
)
insert into coffeestore.products
  (slug, name, category_id, short_desc, long_desc, price, stock, featured, sku)
select v.slug, v.name, c.id, v.short_desc, v.long_desc, v.price, v.stock, v.featured, v.sku
from (values
  ('cafe-premium-250',       'Café Premium 250g',              'cafe',       'Blend de altura, tueste medio.',
   'Blend seleccionado de tres fincas del norte, tueste medio-oscuro con notas a chocolate amargo y caramelo. Ideal para espresso o V60.',
   85000,  24, true,  'CS-0001'),
  ('cafe-molido-intenso-500','Café Molido Intenso 500g',       'cafe',       'Cuerpo intenso, tueste oscuro.',
   'Molienda media para cafetera de filtro. Notas robustas de tabaco y cacao. Bolsa con válvula desgasificadora.',
   120000, 18, true,  'CS-0002'),
  ('pack-degustacion',       'Pack Degustación Coffee Store',  'combos',     '4 orígenes, 100g cada uno.',
   'Cuatro bolsas de 100g de nuestros orígenes destacados: Caazapá, Itapúa, Concepción y Amambay. Con librito de cata incluido.',
   180000,  8, true,  'CS-0003'),
  ('cold-brew-500',          'Cold Brew 500ml',                'bebidas',    'Extracción en frío, 18 horas.',
   'Cold brew de extracción larga, botella de vidrio 500ml. Suave, sin amargor, con notas dulces naturales. Mantener refrigerado.',
   45000,  32, true,  'CS-0004'),
  ('combo-desayuno-clasico', 'Combo Desayuno Clásico',         'combos',     'Café + medialunas + granola.',
   'Café molido 250g, seis medialunas artesanales y granola casera 300g. Para armar el desayuno perfecto de fin de semana.',
   95000,  14, false, 'CS-0005'),
  ('taza-coffee-store',      'Taza Coffee Store',              'accesorios', 'Cerámica esmaltada 300ml.',
   'Taza de cerámica artesanal esmaltada en color arena, capacidad 300ml. Apta para lavavajillas y microondas.',
   55000,  40, false, 'CS-0006'),
  ('termo-cafe-350',         'Termo Café 350ml',               'accesorios', 'Acero inoxidable, 12h de calor.',
   'Termo de acero inoxidable doble pared 350ml. Mantiene el calor hasta 12 horas y el frío hasta 24. Tapa con bloqueo antiderrame.',
   165000, 12, true,  'CS-0007'),
  ('prensa-francesa',        'Prensa Francesa',                'equipos',    'Vidrio borosilicato 600ml.',
   'Prensa francesa clásica con jarra de vidrio borosilicato resistente y estructura de acero inoxidable. Rinde 4 tazas.',
   220000,  6, false, 'CS-0008'),
  ('cafetera-moka',          'Cafetera Moka',                  'equipos',    'Aluminio, 6 tazas.',
   'Cafetera Moka italiana clásica de 6 tazas. Aluminio pulido, mango ergonómico resistente al calor. Apta para cocina a gas y eléctrica.',
   285000,  4, true,  'CS-0009'),
  ('filtros-papel',          'Filtros de Papel',               'equipos',    'Pack x100, sin blanquear.',
   'Filtros de papel sin blanquear para métodos V60 y Chemex. Pack de 100 unidades, tamaño 02.',
   25000,   0, false, 'CS-0010'),
  ('box-regalo-cafetero',    'Box Regalo Cafetero',            'regalos',    'Caja de madera, todo incluido.',
   'Caja de madera con café premium 250g, taza artesanal, prensa francesa pequeña y libro de recetas. El regalo perfecto para amantes del café.',
   350000,  5, true,  'CS-0011'),
  ('combo-oficina',          'Combo Oficina',                  'combos',     'Suministro mensual para 8 personas.',
   'Kit mensual para oficinas: 2kg de café molido, 200 filtros, 8 tazas y guía de preparación. Suscripción mensual disponible.',
   420000,  3, false, 'CS-0012')
) as v(slug, name, cat_slug, short_desc, long_desc, price, stock, featured, sku)
join cats c on c.slug = v.cat_slug
on conflict (slug) do nothing;

-- --------------------------------------------------------------------
-- PEDIDOS DE EJEMPLO (opcional)
-- --------------------------------------------------------------------
-- Descomentá si querés poblar el panel admin con pedidos de muestra.
--
-- insert into coffeestore.orders
--   (code, customer_name, customer_phone, customer_email, address, city,
--    delivery, payment, status, subtotal, total)
-- values
--   ('CS-2841', 'Ana Villalba',  '+595 981 234 567', 'ana@example.com',   'Av. España 234',    'Asunción',           'delivery','transfer','preparing',265000,265000),
--   ('CS-2840', 'Juan Martínez', '+595 982 445 112', 'juan.m@example.com','Palma 1150',        'Asunción',           'pickup',  'cash',    'confirmed',180000,180000),
--   ('CS-2839', 'María Cáceres', '+595 983 771 022', 'maria.c@example.com','Mcal. López 3040', 'Fernando de la Mora','delivery','card',    'delivered',505000,505000);
