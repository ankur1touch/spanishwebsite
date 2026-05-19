import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata() {
  return { title: 'Contacto' };
}

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container-fh py-10 max-w-3xl">
      <h1 className="font-display text-3xl font-extrabold text-brand-navy">Contacto</h1>
      <p className="mt-4 text-slate-600 leading-relaxed">
        Escríbenos a{' '}
        <a href="mailto:contacto@futhoy.com" className="font-semibold text-brand-red hover:underline">
          contacto@futhoy.com
        </a>{' '}
        para colaboraciones, correcciones o publicidad.
      </p>
    </div>
  );
}
