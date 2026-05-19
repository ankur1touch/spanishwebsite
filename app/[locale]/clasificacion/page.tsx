import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getStandings } from '@/lib/football-api';

export const revalidate = 600;

export async function generateMetadata() {
  return { title: 'Clasificación La Liga' };
}

export default async function ClasificacionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const rows = await getStandings();
  const t = await getTranslations('table');
  const tSide = await getTranslations('sidebar');

  return (
    <div className="container-fh py-6">
      <h1 className="mb-6 font-display text-3xl font-extrabold text-brand-navy">
        {tSide('standings')}
      </h1>
      <div className="overflow-x-auto rounded-lg bg-white shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-brand-surface">
            <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-slate-600">
              <th className="px-3 py-3">{t('position')}</th>
              <th className="px-3 py-3">{t('team')}</th>
              <th className="px-3 py-3 text-center">{t('played')}</th>
              <th className="px-3 py-3 text-center">{t('won')}</th>
              <th className="px-3 py-3 text-center">{t('draw')}</th>
              <th className="px-3 py-3 text-center">{t('lost')}</th>
              <th className="px-3 py-3 text-center">{t('goalDiff')}</th>
              <th className="px-3 py-3 text-center font-extrabold text-brand-navy">{t('points')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {rows.map((row) => (
              <tr key={row.position} className="hover:bg-brand-surface">
                <td className="px-3 py-2.5 font-bold tabular-nums text-brand-navy">{row.position}</td>
                <td className="px-3 py-2.5 font-semibold text-brand-navy">{row.team}</td>
                <td className="px-3 py-2.5 text-center tabular-nums">{row.played}</td>
                <td className="px-3 py-2.5 text-center tabular-nums">{row.won}</td>
                <td className="px-3 py-2.5 text-center tabular-nums">{row.draw}</td>
                <td className="px-3 py-2.5 text-center tabular-nums">{row.lost}</td>
                <td className="px-3 py-2.5 text-center tabular-nums">
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>
                <td className="px-3 py-2.5 text-center font-extrabold tabular-nums text-brand-navy">
                  {row.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
