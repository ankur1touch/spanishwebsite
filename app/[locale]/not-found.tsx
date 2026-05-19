import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <div className="container-fh py-16 text-center">
      <p className="font-display text-7xl font-extrabold text-brand-red">404</p>
      <h1 className="mt-4 font-display text-3xl font-extrabold text-brand-navy">
        Página no encontrada
      </h1>
      <p className="mt-2 text-slate-600">La página que buscas no existe o ha sido movida.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-brand-red px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-red-dark"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
