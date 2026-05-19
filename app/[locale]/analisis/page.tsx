import { setRequestLocale } from 'next-intl/server';
import { NewsCard } from '@/components/home/NewsCard';
import { getArticlesAsNewsItems } from '@/lib/mdx';

export const revalidate = 600;

export async function generateMetadata() {
  return { title: 'Análisis' };
}

export default async function AnalisisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const articles = await getArticlesAsNewsItems();
  const items = articles.filter((a) => String(a.tag).toLowerCase() === 'análisis');

  return (
    <div className="container-fh py-6">
      <h1 className="mb-4 font-display text-3xl font-extrabold text-brand-navy">Análisis</h1>
      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((item) => <NewsCard key={item.id} item={item} />)
        ) : (
          <p className="text-slate-500">Sin análisis publicados.</p>
        )}
      </div>
    </div>
  );
}
