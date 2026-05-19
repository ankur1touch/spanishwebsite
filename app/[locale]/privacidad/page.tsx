import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata() {
  return { title: 'Política de privacidad' };
}

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container-fh py-10 max-w-3xl prose prose-slate">
      <h1 className="font-display text-3xl font-extrabold text-brand-navy">Política de privacidad</h1>
      <p className="mt-4 text-slate-600 leading-relaxed">
        FútHoy respeta tu privacidad. No vendemos datos personales. Las cookies analíticas, si se
        activan, se usarán solo para mejorar el contenido. Para ejercer tus derechos ARCO/GDPR,
        contacta con{' '}
        <a href="mailto:privacidad@futhoy.com" className="text-brand-red hover:underline">
          privacidad@futhoy.com
        </a>
        .
      </p>
    </div>
  );
}
