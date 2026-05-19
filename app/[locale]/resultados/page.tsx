import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getLiveMatches } from '@/lib/football-api';
import type { LiveMatch } from '@/lib/types';

export const revalidate = 60;

export async function generateMetadata() {
  return { title: 'Resultados en vivo' };
}

function statusBadge(status: LiveMatch['status']) {
  if (status === 'IN_PLAY' || status === 'LIVE')
    return <span className="rounded bg-brand-red px-2 py-0.5 text-xs font-bold text-white animate-pulse-live">EN VIVO</span>;
  if (status === 'FINISHED' || status === 'FT')
    return <span className="rounded bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-700">FT</span>;
  if (status === 'HT' || status === 'PAUSED')
    return <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">HT</span>;
  return <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">Próx.</span>;
}

export default async function ResultadosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const matches = await getLiveMatches();
  const t = await getTranslations('sidebar');

  const byCompetition = matches.reduce((acc, m) => {
    (acc[m.competition] ??= []).push(m);
    return acc;
  }, {} as Record<string, LiveMatch[]>);

  return (
    <div className="container-fh py-6">
      <h1 className="mb-6 font-display text-3xl font-extrabold text-brand-navy">{t('liveScores')}</h1>

      {Object.keys(byCompetition).length === 0 && (
        <p className="rounded-lg bg-white p-6 text-center text-slate-500 shadow-card">
          No hay partidos programados hoy.
        </p>
      )}

      {Object.entries(byCompetition).map(([comp, list]) => (
        <section key={comp} className="mb-8">
          <h2 className="mb-3 font-display text-lg font-bold uppercase tracking-wide text-slate-600">
            {comp}
          </h2>
          <div className="overflow-hidden rounded-lg bg-white shadow-card">
            <ul className="divide-y divide-brand-border">
              {list.map((m) => (
                <li key={m.id} className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-3 px-4 py-3">
                  <div className="w-16">{statusBadge(m.status)}</div>
                  <span className="text-right font-semibold text-brand-navy truncate">{m.homeTeam}</span>
                  <span className="font-display text-lg font-extrabold tabular-nums text-brand-navy">
                    {m.homeScore ?? '–'} <span className="opacity-30">–</span> {m.awayScore ?? '–'}
                  </span>
                  <span className="font-semibold text-brand-navy truncate">{m.awayTeam}</span>
                  <span className="text-xs text-slate-400 tabular-nums">
                    {new Date(m.utcDate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
