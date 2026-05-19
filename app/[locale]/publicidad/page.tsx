import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata() {
  return { title: 'Publicidad' };
}

export default async function PublicidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container-fh py-10 max-w-3xl">
      <h1 className="font-display text-3xl font-extrabold text-brand-navy">Publicidad</h1>
      <p className="mt-4 text-slate-600 leading-relaxed">
        Anuncia tu marca ante millones de aficionados del fútbol español. Paquetes display, native
        y newsletter. Solicita el media kit en{' '}
        <a href="mailto:ads@futhoy.com" className="text-brand-red hover:underline">
          ads@futhoy.com
        </a>
        .
      </p>
    </div>
  );
}
