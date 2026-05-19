import { Logo } from './Logo';
import { Nav } from './Nav';
import { MobileNav } from './MobileNav';
import { LocaleSwitcher } from './LocaleSwitcher';
import { SearchButton } from './SearchButton';

export function Header() {
  return (
    <header className="sticky top-0 z-40 shadow-md">
      <div className="bg-brand-red text-white">
        <div className="container-fh flex h-14 items-center justify-between gap-4">
          <Logo size="md" variant="light" />
          <div className="flex items-center gap-3">
            <SearchButton />
            <LocaleSwitcher />
            <MobileNav />
          </div>
        </div>
      </div>
      <Nav />
    </header>
  );
}
