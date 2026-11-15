import { Link } from 'react-router-dom';
import { Coffee, Moon, Search, ShoppingBag, Sun, Truck } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useCart } from '../hooks/useCart';
import { FREE_SHIPPING_THRESHOLD } from '../lib/pricing';

const NAV_LINKS = [
  { to: '/#shop', label: 'Shop' },
  { to: '/#roast-guide', label: 'Roast Guide' },
  { to: '/#story', label: 'Our Story' },
];

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`flex items-center justify-center w-9 h-9 rounded-xl ${
          inverted ? 'bg-cream-400 text-espresso-900' : 'bg-primary text-on-primary'
        }`}
      >
        <Coffee className="w-5 h-5" aria-hidden="true" />
      </span>
      <span
        className={`font-display text-xl lg:text-[1.375rem] font-semibold tracking-tight ${
          inverted ? 'text-cream-50' : 'text-ink'
        }`}
      >
        Ember <span className="italic font-normal text-accent">&amp;</span> Bloom
      </span>
    </span>
  );
}

function AnnouncementBar() {
  return (
    <div className="bg-espresso-900 text-cream-100 text-xs sm:text-[0.8125rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-center gap-2">
        <Truck className="w-3.5 h-3.5 text-cream-400 shrink-0" aria-hidden="true" />
        <p className="truncate">
          Free shipping on orders over ${FREE_SHIPPING_THRESHOLD}
          <span className="hidden sm:inline"> · Every bag roasted within 48 hours of shipping</span>
        </p>
      </div>
    </div>
  );
}

export function Header({ showMobileSearch, setShowMobileSearch, searchQuery, onSearchChange }: {
  showMobileSearch: boolean;
  setShowMobileSearch: (v: boolean) => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
}) {
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const isDark = theme === 'dark';
  const themeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const iconButton = 'p-2.5 rounded-full text-ink-soft hover:bg-tint-100 transition-colors';

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 bg-canvas/80 backdrop-blur-xl border-b border-line/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 h-16 lg:h-[4.5rem]">
            <Link to="/" aria-label="Ember & Bloom — home" className="shrink-0">
              <Logo />
            </Link>

            <nav aria-label="Main" className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3.5 py-2 rounded-full text-sm font-medium text-ink-muted hover:text-ink hover:bg-tint-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              {/* Desktop search */}
              <div className="relative hidden lg:block w-64 xl:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle pointer-events-none" aria-hidden="true" />
                <input
                  type="search"
                  aria-label="Search coffees"
                  placeholder="Search origins, flavors…"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-tint-50 border border-line rounded-full text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-focus focus:bg-surface transition-all"
                />
              </div>

              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                aria-label={showMobileSearch ? 'Hide search' : 'Show search'}
                aria-expanded={showMobileSearch}
                className={`lg:hidden ${iconButton}`}
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>
              <button onClick={toggleTheme} aria-label={themeLabel} title={themeLabel} className={iconButton}>
                {isDark ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
              </button>
              <Link
                to="/cart"
                aria-label={cartCount > 0 ? `Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}` : 'Cart'}
                className="relative flex items-center gap-2 pl-3 pr-3.5 py-2.5 sm:py-2 rounded-full bg-primary text-on-primary hover:bg-primary-hover transition-colors"
              >
                <ShoppingBag className="w-[1.125rem] h-[1.125rem]" aria-hidden="true" />
                <span className="hidden sm:inline text-sm font-semibold">Cart</span>
                {cartCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="min-w-5 h-5 px-1.5 bg-accent text-white dark:text-espresso-900 text-[0.6875rem] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
