import Link from 'next/link';

export const metadata = {
  title: 'Política de privacidad · Coffee Store',
  description: 'Cómo tratamos tus datos personales en Coffee Store.',
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: '1. Quiénes somos',
    body: [
      'Coffee Store es una tostaduría independiente con sede en Asunción, Paraguay. En este documento describimos qué datos personales recolectamos cuando visitás nuestro sitio o hacés un pedido, con qué finalidad, cuánto tiempo los conservamos y qué derechos tenés sobre ellos.',
    ],
  },
  {
    title: '2. Qué datos recolectamos',
    body: [
      'Datos que nos das al hacer un pedido: nombre completo, número de WhatsApp, correo electrónico, dirección de entrega y ciudad. En el caso de pagos con tarjeta, procesamos la transacción a través de un proveedor externo — nunca almacenamos números de tarjeta ni CVV.',
      'Datos técnicos que se generan automáticamente al navegar: dirección IP aproximada, tipo de dispositivo, navegador, páginas visitadas y hora. Los usamos solo con fines de rendimiento y seguridad.',
    ],
  },
  {
    title: '3. Para qué los usamos',
    body: [
      'Preparar, despachar y hacer seguimiento de tus pedidos.',
      'Contactarte por WhatsApp o correo si necesitamos confirmar algún dato o avisarte que tu pedido está en camino.',
      'Cumplir con obligaciones fiscales y de facturación establecidas por la ley paraguaya.',
      'Mejorar la experiencia del sitio (identificar errores, entender qué productos interesan).',
    ],
  },
  {
    title: '4. Con quién los compartimos',
    body: [
      'No vendemos ni cedemos tus datos a terceros con fines comerciales. Los compartimos únicamente con:',
      'Empresas de courier para el envío del pedido (solo nombre, dirección y teléfono).',
      'Proveedores de infraestructura tecnológica que operan bajo estándares de seguridad (Supabase para base de datos, Vercel para hosting).',
      'Autoridades competentes cuando una ley u orden judicial lo exija.',
    ],
  },
  {
    title: '5. Cuánto tiempo los guardamos',
    body: [
      'Datos de pedidos: mientras esté vigente la relación comercial y hasta 5 años después, por obligación tributaria.',
      'Datos técnicos de navegación: hasta 12 meses.',
      'Cuentas administrativas del panel: mientras el usuario mantenga el acceso activo.',
    ],
  },
  {
    title: '6. Cookies',
    body: [
      'Usamos únicamente cookies estrictamente necesarias para el funcionamiento del carrito de compras y de la sesión de administrador. No usamos cookies de terceros con fines publicitarios.',
    ],
  },
  {
    title: '7. Tus derechos',
    body: [
      'Tenés derecho a acceder, rectificar, eliminar u oponerte al tratamiento de tus datos personales en cualquier momento. Para ejercerlos, escribinos a hola@coffeestore.py o por WhatsApp al +595 981 772 872 con el asunto "Datos personales". Respondemos en un plazo máximo de 15 días hábiles.',
    ],
  },
  {
    title: '8. Seguridad',
    body: [
      'La información se transmite a través de conexiones cifradas (HTTPS) y se almacena en servidores protegidos por controles de acceso. Aún así, ningún sistema es 100% infalible — si detectás un problema, avisanos por email.',
    ],
  },
  {
    title: '9. Cambios en esta política',
    body: [
      'Podemos actualizar este documento si cambian nuestras prácticas o la normativa aplicable. La versión vigente siempre estará publicada en esta misma URL, con la fecha de última actualización arriba.',
    ],
  },
  {
    title: '10. Contacto',
    body: [
      'Cualquier consulta sobre privacidad podés dirigirla a: hola@coffeestore.py · WhatsApp +595 981 772 872 · Av. Café 1234, Asunción, Paraguay.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-[820px] mx-auto px-4 sm:px-6 lg:px-8 py-24 cs-fade">
      <div className="font-mono text-[11px] tracking-widest uppercase text-stone mb-4">— Documento legal</div>
      <h1 className="font-display font-light text-5xl md:text-6xl leading-none tracking-tight mb-4">Política de <em className="italic text-cocoaLight">privacidad</em></h1>
      <p className="text-sm text-stone mb-12">Última actualización: 1 de julio de 2026</p>

      <div className="prose max-w-none">
        {SECTIONS.map((s) => (
          <section key={s.title} className="mb-10">
            <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-4">{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="text-base md:text-[17px] leading-relaxed text-mud mb-3">{p}</p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-3 justify-between items-center text-sm">
        <div className="text-stone">© {new Date().getFullYear()} Coffee Store</div>
        <div className="flex gap-4">
          <Link href="/contacto" className="text-coffee border-b border-coffee/40 hover:border-coffee">Contacto</Link>
          <Link href="/" className="text-coffee border-b border-coffee/40 hover:border-coffee">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}
