export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  active: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category_id: string;
  category_slug: string;
  category_name: string;
  short_desc: string | null;
  long_desc: string | null;
  price: number;
  stock: number;
  featured: boolean;
  image_url: string | null;
  gallery: string[];
  sku: string | null;
};

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
  categoryName: string;
};

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'sent' | 'delivered' | 'cancelled';
export type DeliveryMethod = 'delivery' | 'pickup' | 'express';
export type PaymentMethod = 'transfer' | 'card' | 'cash';

export type Order = {
  id: string;
  code: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  address: string | null;
  city: string | null;
  delivery: DeliveryMethod;
  payment: PaymentMethod;
  notes: string | null;
  status: OrderStatus;
  subtotal: number;
  total: number;
  items_count?: number;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  unit_price: number;
  qty: number;
  line_total: number;
};
