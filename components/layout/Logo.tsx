import { Link } from '@/i18n/navigation';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ variant = 'light', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-brand-navy';

  return (
    <Link href="/" className={`flex items-center gap-2 font-display font-extrabold ${sizeClasses[size]} ${textColor}`}>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-yellow shadow-sm">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="#FCD34D" stroke="#0F172A" strokeWidth="1.5" />
          <path d="M12 6.5 L14.5 8.5 L13.5 11.5 L10.5 11.5 L9.5 8.5 Z" fill="#0F172A" />
          <path d="M8 10 L5.5 11.5 L6.5 14.5 L9 13 Z" fill="#0F172A" />
          <path d="M16 10 L18.5 11.5 L17.5 14.5 L15 13 Z" fill="#0F172A" />
          <path d="M10.5 13 L13.5 13 L14.5 16 L9.5 16 Z" fill="#0F172A" />
        </svg>
      </span>
      <span className="tracking-tight">FútHoy</span>
    </Link>
  );
}
