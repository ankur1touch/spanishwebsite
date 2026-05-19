import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Logo } from './Logo';

export function Footer() {
  const t = useTranslations('footer');
  const tSite = useTranslations('site');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-brand-border bg-white">
      <div className="container-fh py-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <Logo size="md" variant="dark" />
            <p className="text-sm text-slate-500">{tSite('tagline')}</p>
          </div>
          <nav>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
              <li>
                <Link href="/sobre-nosotros" className="hover:text-brand-red">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-brand-red">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-brand-red">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <a href="/rss.xml" className="hover:text-brand-red">
                  {t('rss')}
                </a>
              </li>
              <li>
                <Link href="/publicidad" className="hover:text-brand-red">
                  {t('ads')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-6 border-t border-brand-border pt-4 text-xs text-slate-500">
          © {year} FútHoy · {t('rights')}
        </div>
      </div>
    </footer>
  );
}
