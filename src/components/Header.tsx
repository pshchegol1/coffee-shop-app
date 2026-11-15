import { Coffee, Moon, Search, ShoppingBag, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function Header({ cartCount, onCartClick, onLogoClick, showMobileSearch, setShowMobileSearch, searchQuery, onSearchChange }: {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  showMobileSearch: boolean;
  setShowMobileSearch: (v: boolean) => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const themeLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header className="sticky top-0 z-50 bg-canvas/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button onClick={onLogoClick} className="flex items-center gap-2 group" aria-label="Ember & Bloom — home">
            <Coffee className="w-7 h-7 text-ink-soft group-hover:text-accent transition-colors" aria-hidden="true" />
            <span className="text-xl lg:text-2xl font-bold text-ink tracking-tight">
              Ember <span className="text-accent">&</span> Bloom
            </span>
          </button>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle" aria-hidden="true" />
              <input
                type="search"
                aria-label="Search coffees"
                placeholder="Search origins, flavors..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-tint-50 border border-line rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              aria-label={showMobileSearch ? 'Hide search' : 'Show search'}
              aria-expanded={showMobileSearch}
              className="lg:hidden p-2 rounded-full hover:bg-tint-100 transition-colors"
            >
              <Search className="w-5 h-5 text-ink-soft" aria-hidden="true" />
            </button>
            <button
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
              className="p-2 rounded-full hover:bg-tint-100 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-ink-soft" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5 text-ink-soft" aria-hidden="true" />
              )}
            </button>
            <button
              onClick={onCartClick}
              aria-label={cartCount > 0 ? `Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}` : 'Cart'}
              className="relative p-2 rounded-full hover:bg-tint-100 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-ink-soft" aria-hidden="true" />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-accent text-white dark:text-espresso-900 text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
