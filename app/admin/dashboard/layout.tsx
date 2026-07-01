import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="lg:border-r border-b lg:border-b-0 border-border bg-white p-4 lg:p-6 flex lg:flex-col lg:gap-6 gap-3 items-center lg:items-stretch overflow-x-auto">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.png" alt="Cataluña" className="w-11 h-11 object-contain" />
          <div>
            <div className="font-display text-base">Cataluña</div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-stone">Admin</div>
          </div>
        </Link>
        <nav className="flex lg:flex-col gap-1 text-[13px] whitespace-nowrap">
          <Link href="/admin/dashboard" className="px-3 py-2 rounded hover:bg-beige">Dashboard</Link>
          <Link href="/admin/dashboard/productos" className="px-3 py-2 rounded hover:bg-beige">Productos</Link>
          <Link href="/admin/dashboard/categorias" className="px-3 py-2 rounded hover:bg-beige">Categorías</Link>
          <Link href="/admin/dashboard/pedidos" className="px-3 py-2 rounded hover:bg-beige">Pedidos</Link>
        </nav>
        <div className="lg:mt-auto flex lg:flex-col gap-3 lg:gap-2 ml-auto lg:ml-0">
          <Link href="/" className="text-xs uppercase tracking-widest text-stone hover:text-coffee whitespace-nowrap">← Tienda</Link>
          <LogoutButton />
        </div>
      </aside>
      <div>{children}</div>
    </div>
  );
}
