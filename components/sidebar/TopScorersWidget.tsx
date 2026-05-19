import { getTranslations } from 'next-intl/server';
import { getTopScorers } from '@/lib/football-api';

const INITIAL_COLORS = ['bg-brand-red', 'bg-blue-700', 'bg-emerald-700', 'bg-amber-600', 'bg-violet-700'];

function initials(name: string): string {
  const parts = name.split(/[\s.]+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export async function TopScorersWidget() {
  const [scorers, t] = await Promise.all([getTopScorers(), getTranslations('sidebar')]);
  const top = scorers.slice(0, 5);
  const maxGoals = Math.max(...top.map((s) => s.goals), 1);

  return (
    <div className="rounded-lg bg-white p-4 shadow-card">
      <h3 className="mb-3 font-display text-base font-extrabold text-brand-navy">
        {t('topScorers')}
      </h3>
      <ul className="space-y-3">
        {top.map((s, idx) => (
          <li key={`${s.name}-${idx}`} className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white ${
                INITIAL_COLORS[idx % INITIAL_COLORS.length]
              }`}
            >
              {initials(s.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-brand-navy">{s.name}</p>
              <p className="truncate text-xs text-slate-500">
                {s.team} · {s.goals} goles
              </p>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded bg-brand-surface">
                <div
                  className="h-full rounded bg-brand-red"
                  style={{ width: `${(s.goals / maxGoals) * 100}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
