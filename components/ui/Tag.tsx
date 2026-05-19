import { cn } from '@/lib/utils';

const TAG_COLORS: Record<string, string> = {
  'La Liga': 'bg-brand-red',
  'Champions': 'bg-blue-800',
  'UCL': 'bg-blue-800',
  'Mundial': 'bg-emerald-700',
  'Fichajes': 'bg-violet-700',
  'Selección': 'bg-amber-600',
  'Análisis': 'bg-cyan-700',
  'Copa América': 'bg-emerald-600',
  'Real Madrid': 'bg-slate-800',
  'Barça': 'bg-blue-700',
  'Atlético': 'bg-red-700',
  'CONMEBOL': 'bg-emerald-700',
};

interface TagProps {
  label: string;
  className?: string;
}

export function Tag({ label, className }: TagProps) {
  const color = TAG_COLORS[label] || 'bg-slate-700';
  return (
    <span className={cn('tag-pill', color, className)}>
      {label}
    </span>
  );
}
