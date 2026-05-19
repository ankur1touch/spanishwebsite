import { Tag } from '@/components/ui/Tag';
import { RelativeTime } from '@/components/ui/RelativeTime';
import { ExternalLink } from 'lucide-react';
import type { NewsItem } from '@/lib/types';

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  const target = item.isInternal ? undefined : '_blank';
  const rel = item.isInternal ? undefined : 'noopener noreferrer';

  return (
    <a
      href={item.url}
      target={target}
      rel={rel}
      className="group flex gap-4 rounded-lg bg-white p-4 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-brand-surface sm:h-24 sm:w-28">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-red/10 text-brand-red">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          <div className="mb-2 flex items-center gap-2">
            {item.tag && <Tag label={String(item.tag)} />}
            {!item.isInternal && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {item.source}
              </span>
            )}
          </div>
          <h3 className="font-display text-base font-bold leading-snug text-brand-navy group-hover:text-brand-red line-clamp-2 text-balance">
            {item.title}
          </h3>
        </div>
        <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
          <RelativeTime date={item.pubDate} className="inline" />
          {!item.isInternal && (
            <>
              <span className="opacity-50">·</span>
              <ExternalLink className="h-3 w-3" />
            </>
          )}
        </p>
      </div>
    </a>
  );
}
