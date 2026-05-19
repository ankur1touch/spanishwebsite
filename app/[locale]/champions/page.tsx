import { setRequestLocale, getTranslations } from 'next-intl/server';
import { NewsCard } from '@/components/home/NewsCard';
import { LiveScoresWidget } from '@/components/sidebar/LiveScoresWidget';
import { getNewsByTag } from '@/lib/rss';
import { getArticlesAsNewsItems } from '@/lib/mdx';

export const revalidate = 300;

export async function generateMetadata() {
  return { title: 'Champions League' };
}

export default async function ChampionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [rssNews, articles] = await Promise.all([
    getNewsByTag('Champions', 30),
    getArticlesAsNewsItems(),
  ]);

  const items = [
    ...articles.filter((a) => String(a.tag).toLowerCase() === 'champions'),
    ...rssNews,
  ];

  const t = await getTranslations('nav');

  return (
    <div className="container-fh py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h1 className="mb-4 font-display text-3xl font-extrabold text-brand-navy">{t('champions')} League</h1>
          {items.length > 0 ? (
            <div className="space-y-3">
              {items.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-slate-500">Sin noticias por el momento.</p>
          )}
        </section>
        <aside className="space-y-6">
          <LiveScoresWidget />
        </aside>
      </div>
    </div>
  );
}
