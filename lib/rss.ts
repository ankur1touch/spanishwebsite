import Parser from 'rss-parser';
import { cache } from 'react';
import type { NewsItem, NewsTag } from './types';
import { slugify } from './utils';
import { createTimedCache } from './memory-cache';

const RSS_CACHE_TTL_MS = 5 * 60 * 1000;
const rssTimedCache = createTimedCache<NewsItem[]>(RSS_CACHE_TTL_MS);

interface FeedSource {
  name: string;
  url: string;
  homepage: string;
  defaultTag: NewsTag | string;
}

const FEED_SOURCES: FeedSource[] = [
  {
    name: 'MARCA',
    url: 'https://e00-marca.uecdn.es/rss/futbol/primera-division.xml',
    homepage: 'https://www.marca.com',
    defaultTag: 'La Liga',
  },
  {
    name: 'AS',
    url: 'https://as.com/rss/futbol/primera.xml',
    homepage: 'https://as.com',
    defaultTag: 'La Liga',
  },
  {
    name: 'Mundo Deportivo',
    url: 'https://www.mundodeportivo.com/rss/futbol.xml',
    homepage: 'https://www.mundodeportivo.com',
    defaultTag: 'La Liga',
  },
  {
    name: 'Olé',
    url: 'https://www.ole.com.ar/rss/futbol-internacional/',
    homepage: 'https://www.ole.com.ar',
    defaultTag: 'Champions',
  },
];

type CustomFeed = { items: CustomItem[] };
type CustomItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
  content?: string;
  enclosure?: { url?: string };
  'media:content'?: { $?: { url?: string } } | Array<{ $?: { url?: string } }>;
  'media:thumbnail'?: { $?: { url?: string } } | Array<{ $?: { url?: string } }>;
  guid?: string;
  categories?: string[];
};

const parser: Parser<CustomFeed, CustomItem> = new Parser({
  timeout: 8000,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (compatible; FutHoyBot/1.0; +https://futhoy.com)',
  },
  customFields: {
    item: [
      ['media:content', 'media:content'],
      ['media:thumbnail', 'media:thumbnail'],
      ['enclosure', 'enclosure'],
    ],
  },
});

function extractImage(item: CustomItem): string | undefined {
  if (item.enclosure?.url) return item.enclosure.url;

  const mc = item['media:content'];
  if (Array.isArray(mc) && mc[0]?.$?.url) return mc[0].$.url;
  if (mc && !Array.isArray(mc) && mc.$?.url) return mc.$.url;

  const mt = item['media:thumbnail'];
  if (Array.isArray(mt) && mt[0]?.$?.url) return mt[0].$.url;
  if (mt && !Array.isArray(mt) && mt.$?.url) return mt.$.url;

  const html = item.content || '';
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];

  return undefined;
}

function detectTag(item: CustomItem, defaultTag: string): string {
  const text = `${item.title ?? ''} ${item.contentSnippet ?? ''} ${(item.categories ?? []).join(' ')}`.toLowerCase();

  if (/champions|liga de campeones|uefa/.test(text)) return 'Champions';
  if (/fichaje|traspaso|transfer|renueva|firma/.test(text)) return 'Fichajes';
  if (/mundial|world cup|copa del mundo/.test(text)) return 'Mundial';
  if (/copa am[ée]rica|conmebol/.test(text)) return 'Copa América';
  if (/selecci[óo]n|la roja/.test(text)) return 'Selección';
  if (/real madrid|madridista/.test(text)) return 'Real Madrid';
  if (/bar[çc]a|barcelona/.test(text)) return 'Barça';
  if (/atl[ée]tico/.test(text)) return 'Atlético';
  return defaultTag;
}

async function fetchFeed(source: FeedSource): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(source.url);
    return (feed.items || []).slice(0, 20).map((item, idx): NewsItem => {
      const title = item.title?.trim() || 'Sin título';
      const link = item.link || source.homepage;
      const pubDate = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();
      return {
        id: item.guid || `${source.name}-${idx}-${slugify(title)}`,
        title,
        excerpt: item.contentSnippet?.slice(0, 240),
        url: link,
        image: extractImage(item),
        source: source.name,
        sourceUrl: source.homepage,
        pubDate,
        tag: detectTag(item, source.defaultTag),
        isInternal: false,
      };
    });
  } catch (err) {
    console.error(`[rss] Failed ${source.name}:`, (err as Error).message);
    return [];
  }
}

async function fetchAllFeedsRaw(): Promise<NewsItem[]> {
  const results = await Promise.all(FEED_SOURCES.map(fetchFeed));
  const all = results.flat();

  const seen = new Set<string>();
  const deduped = all.filter((item) => {
    const key = slugify(item.title).slice(0, 50);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  deduped.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return deduped;
}

/** Per-request dedupe + in-memory TTL cache (5 min). */
export const getAggregatedNews = cache(async (): Promise<NewsItem[]> => {
  return rssTimedCache(fetchAllFeedsRaw);
});

export async function getBreakingNews(limit = 6): Promise<NewsItem[]> {
  const news = await getAggregatedNews();
  return news.slice(0, limit);
}

export async function getNewsByTag(tag: string, limit = 20): Promise<NewsItem[]> {
  const news = await getAggregatedNews();
  const lower = tag.toLowerCase();
  return news.filter((n) => String(n.tag ?? '').toLowerCase() === lower).slice(0, limit);
}

export async function getLatestNews(limit = 12): Promise<NewsItem[]> {
  const news = await getAggregatedNews();
  return news.slice(0, limit);
}
