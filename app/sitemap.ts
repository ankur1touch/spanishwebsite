import type { MetadataRoute } from 'next';
import { getAllArticleSlugs } from '@/lib/mdx';

const STATIC_PATHS = ['', '/la-liga', '/champions', '/mundial', '/transfers', '/resultados', '/clasificacion', '/analisis', '/equipos/real-madrid', '/equipos/barcelona', '/equipos/atletico'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://futhoy.com';
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'hourly',
    priority: path === '' ? 1 : 0.7,
  }));

  const slugs = await getAllArticleSlugs();
  const articleEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/noticias/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
