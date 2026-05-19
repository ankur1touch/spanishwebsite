'use client';

import { useEffect, useState } from 'react';
import { formatAbsoluteTimeEs, formatRelativeTimeEs } from '@/lib/dates';
import { cn } from '@/lib/utils';

interface RelativeTimeProps {
  date: string | Date;
  className?: string;
  /** Show relative phrasing (hace X min) after mount; until then uses absolute date. */
  relative?: boolean;
}

export function RelativeTime({ date, className, relative = true }: RelativeTimeProps) {
  const iso = typeof date === 'string' ? date : date.toISOString();
  const [label, setLabel] = useState(() => formatAbsoluteTimeEs(date));

  useEffect(() => {
    if (!relative) return;
    const update = () => setLabel(formatRelativeTimeEs(date));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [iso, relative, date]);

  return (
    <time dateTime={iso} className={cn(className)} suppressHydrationWarning>
      {label}
    </time>
  );
}
