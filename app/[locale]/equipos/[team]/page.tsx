import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NewsCard } from '@/components/home/NewsCard';
import { getAggregatedNews } from '@/lib/rss';
import { getArticlesAsNewsItems } from '@/lib/mdx';

export const revalidate = 300;

const TEAMS: Record<string, { name: string; keywords: string[] }> = {
  'real-madrid': { name: 'Real Madrid', keywords: ['real madrid', 'madridista', 'bernabéu', 'bernabeu'] },
  'barcelona': { name: 'FC Barcelona', keywords: ['barcelona', 'barça', 'barca', 'culé', 'cule', 'camp nou', 'montjuïc'] },
  'atletico': { name: 'Atlético de Madrid', keywords: ['atlético', 'atletico', 'colchonero', 'simeone'] },
};

export function generateStaticParams() {
  return Object.keys(TEAMS).flatMap((team) => [
    { locale: 'es', team },
    { locale: 'en', team },
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ team: string }> }) {
  const { team } = await params;
  const t = TEAMS[team];
  if (!t) return {};
  return { title: t.name };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string; team: string }> }) {
  const { locale, team } = await params;
  setRequestLocale(locale);

  const config = TEAMS[team];
  if (!config) notFound();

  const [rss, articles] = await Promise.all([getAggregatedNews(), getArticlesAsNewsItems()]);

  const allItems = [...articles, ...rss];
  const items = allItems.filter((item) => {
    const haystack = `${item.title} ${item.excerpt ?? ''} ${item.tag ?? ''}`.toLowerCase();
    return config.keywords.some((k) => haystack.includes(k));
  });

  return (
    <div className="container-fh py-6">
      <h1 className="mb-4 font-display text-3xl font-extrabold text-brand-navy">{config.name}</h1>
      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((item) => <NewsCard key={item.id} item={item} />)
        ) : (
          <p className="text-slate-500">Sin noticias para {config.name} por el momento.</p>
        )}
      </div>
    </div>
  );
}
