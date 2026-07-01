import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream grid grid-cols-[240px_1fr]">
      <aside className="border-r border-border bg-white p-6 flex flex-col gap-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-coffee text-cream inline-grid place-items-center font-display italic">c</span>
          <div>
            <div className="font-display text-base">Coffee Store</div>
            <div className="font-mono text-[10px] tracking-widest uppercase text-stone">Admin</div>
          </div>
        </Link>
        <nav className="flex flex-col gap-1 text-[13px]">
          <Link href="/admin/dashboard" className="px-3 py-2 rounded hover:bg-beige">Dashboard</Link>
          <Link href="/admin/dashboard/productos" className="px-3 py-2 rounded hover:bg-beige">Productos</Link>
          <Link href="/admin/dashboard/categorias" className="px-3 py-2 rounded hover:bg-beige">Categorías</Link>
          <Link href="/admin/dashboard/pedidos" className="px-3 py-2 rounded hover:bg-beige">Pedidos</Link>
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <Link href="/" className="text-xs uppercase tracking-widest text-stone hover:text-coffee">← Ver tienda</Link>
          <LogoutButton />
        </div>
      </aside>
      <div>{children}</div>
    </div>
  );
}
