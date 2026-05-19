import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata() {
  return { title: 'Sobre nosotros' };
}

export default async function SobreNosotrosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container-fh py-10 max-w-3xl">
      <h1 className="font-display text-3xl font-extrabold text-brand-navy">Sobre nosotros</h1>
      <p className="mt-4 text-slate-600 leading-relaxed">
        FútHoy es tu portal de noticias de fútbol español: La Liga, Champions League, fichajes,
        resultados en vivo y análisis. Combinamos cobertura propia con enlaces a las mejores fuentes
        del deporte en español.
      </p>
    </div>
  );
}
