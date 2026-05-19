'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { key: 'laliga', href: '/la-liga' },
  { key: 'champions', href: '/champions' },
  { key: 'mundial', href: '/mundial' },
  { key: 'transfers', href: '/transfers' },
  { key: 'realMadrid', href: '/equipos/real-madrid' },
  { key: 'barca', href: '/equipos/barcelona' },
  { key: 'resultados', href: '/resultados' },
  { key: 'analisis', href: '/analisis' },
] as const;

export function Nav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block bg-brand-red">
      <div className="container-fh">
        <ul className="flex items-center gap-1 text-sm font-semibold text-white/90">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className={cn(
                    'inline-flex items-center px-4 py-3 transition-colors hover:bg-brand-red-dark hover:text-white',
                    isActive && 'bg-brand-red-dark text-white shadow-inner'
                  )}
                >
                  {t(link.key)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export { NAV_LINKS };
