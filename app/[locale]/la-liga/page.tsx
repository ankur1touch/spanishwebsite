import { setRequestLocale, getTranslations } from 'next-intl/server';
import { NewsCard } from '@/components/home/NewsCard';
import { StandingsTable } from '@/components/sidebar/StandingsTable';
import { TopScorersWidget } from '@/components/sidebar/TopScorersWidget';
import { getNewsByTag, getAggregatedNews } from '@/lib/rss';
import { getArticlesAsNewsItems } from '@/lib/mdx';

export const revalidate = 300;

export async function generateMetadata() {
  return { title: 'La Liga' };
}

export default async function LaLigaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [rssNews, allRss, articles] = await Promise.all([
    getNewsByTag('La Liga', 30),
    getAggregatedNews(),
    getArticlesAsNewsItems(),
  ]);

  const tagged = [
    ...articles.filter((a) => String(a.tag).toLowerCase() === 'la liga'),
    ...rssNews,
  ];

  const fallback = tagged.length ? tagged : allRss.slice(0, 20);
  const t = await getTranslations('nav');

  return (
    <div className="container-fh py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h1 className="mb-4 font-display text-3xl font-extrabold text-brand-navy">{t('laliga')}</h1>
          <div className="space-y-3">
            {fallback.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </section>
        <aside className="space-y-6">
          <StandingsTable limit={20} showLink={false} />
          <TopScorersWidget />
        </aside>
      </div>
    </div>
  );
}
