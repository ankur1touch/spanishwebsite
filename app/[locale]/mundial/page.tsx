import { setRequestLocale } from 'next-intl/server';
import { NewsCard } from '@/components/home/NewsCard';
import { getNewsByTag } from '@/lib/rss';
import { getArticlesAsNewsItems } from '@/lib/mdx';

export const revalidate = 300;

export async function generateMetadata() {
  return { title: 'Mundial' };
}

export default async function MundialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [rss, articles] = await Promise.all([getNewsByTag('Mundial', 30), getArticlesAsNewsItems()]);
  const items = [
    ...articles.filter((a) =>
      ['mundial', 'selección', 'copa américa'].includes(String(a.tag).toLowerCase())
    ),
    ...rss,
  ];

  return (
    <div className="container-fh py-6">
      <h1 className="mb-4 font-display text-3xl font-extrabold text-brand-navy">Mundial</h1>
      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((item) => <NewsCard key={item.id} item={item} />)
        ) : (
          <p className="text-slate-500">Sin noticias por el momento.</p>
        )}
      </div>
    </div>
  );
}
