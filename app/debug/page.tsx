import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

async function probe(schema: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { schema, error: 'URL or ANON key missing', categories: null, products: null };
  try {
    const sb = createClient(url, key, { db: { schema } });
    const cats = await sb.from('categories').select('id, slug, name').limit(20);
    const prods = await sb.from('products').select('id, slug, name, active').limit(5);
    const view = await sb.from('v_public_products').select('id, name').limit(5);
    return {
      schema,
      categories: cats.error ? `❌ ${cats.error.message}` : `✅ ${cats.data?.length ?? 0} rows`,
      products: prods.error ? `❌ ${prods.error.message}` : `✅ ${prods.data?.length ?? 0} rows`,
      view: view.error ? `❌ ${view.error.message}` : `✅ ${view.data?.length ?? 0} rows`,
      cats_data: cats.data,
    };
  } catch (e: any) {
    return { schema, error: e.message, categories: null, products: null };
  }
}

export default async function DebugPage() {
  const envs = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ set' : '❌ MISSING',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ set' : '❌ MISSING',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ set' : '❌ MISSING',
    NEXT_PUBLIC_SUPABASE_SCHEMA: process.env.NEXT_PUBLIC_SUPABASE_SCHEMA ?? '(unset, falls back to "coffeestore")',
  };

  const configuredSchema = process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || 'coffeestore';

  // Probe both the configured schema and cafeteria explicitly.
  const results = await Promise.all([
    probe(configuredSchema),
    configuredSchema === 'cafeteria' ? Promise.resolve(null) : probe('cafeteria'),
    configuredSchema === 'public' ? Promise.resolve(null) : probe('public'),
  ]);

  return (
    <div className="max-w-3xl mx-auto px-8 py-16 font-mono text-sm">
      <h1 className="text-2xl font-bold mb-6">🔧 Supabase debug</h1>

      <section className="mb-8 p-4 border border-border rounded-lg bg-white">
        <div className="font-bold mb-2">Environment variables (as seen at runtime):</div>
        <pre className="whitespace-pre-wrap">{JSON.stringify(envs, null, 2)}</pre>
      </section>

      <section className="mb-8 p-4 border border-border rounded-lg bg-white">
        <div className="font-bold mb-2">Live query results per schema:</div>
        {results.filter(Boolean).map((r, i) => (
          <div key={i} className="mb-4 pb-4 border-b border-border last:border-b-0">
            <div className="font-bold text-coffee">schema: {r!.schema}</div>
            <pre className="whitespace-pre-wrap mt-2">{JSON.stringify(r, null, 2)}</pre>
          </div>
        ))}
      </section>

      <section className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg text-yellow-900">
        <div className="font-bold mb-2">Cómo interpretar:</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>Si en <code>NEXT_PUBLIC_SUPABASE_SCHEMA</code> no aparece <code>cafeteria</code> → falta la env var en Vercel (o no redeployeaste).</li>
          <li>Si todas las queries devuelven <code>❌ relation ... does not exist</code> → el schema no está expuesto en Supabase → API Settings → Exposed schemas.</li>
          <li>Si <code>categories</code> tiene rows pero <code>products</code> no → el seed de productos no corrió (o falló).</li>
          <li>Si todo dice <code>✅</code> con 0 rows → el seed no se ejecutó. Corré el bloque INSERT.</li>
          <li>Si dice <code>permission denied</code> → falta permiso <code>select</code> a <code>anon</code> en esas tablas.</li>
        </ul>
      </section>
    </div>
  );
}
