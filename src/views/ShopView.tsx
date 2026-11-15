import { ChevronDown, Coffee, X } from 'lucide-react';
import { categories, products as allProducts } from '../data/products';
import type { CategoryId, Product } from '../data/products';
import { SORT_OPTIONS } from '../lib/catalog';
import type { SortOption } from '../lib/catalog';
import { ProductCard } from '../components/ProductCard';
import { Hero } from '../components/home/Hero';
import { Perks } from '../components/home/Perks';
import { RoastGuide } from '../components/home/RoastGuide';
import { Story } from '../components/home/Story';
import { Newsletter } from '../components/home/Newsletter';

const countFor = (id: CategoryId) =>
  id === 'all' ? allProducts.length : allProducts.filter(p => p.category === id).length;

export function ShopView({
  products, searchQuery, activeCategory, setActiveCategory, sortBy, setSortBy, onClearFilters,
}: {
  products: Product[];
  searchQuery: string;
  activeCategory: CategoryId;
  setActiveCategory: (v: CategoryId) => void;
  sortBy: SortOption;
  setSortBy: (v: SortOption) => void;
  onClearFilters: () => void;
}) {
  const trimmedQuery = searchQuery.trim();
  // While searching, the page collapses to just the results so they're right under the search box.
  const isSearching = trimmedQuery.length > 0;

  // Only shown when nothing matches, which needs a search or a roast filter to be active.
  const categoryLabel = categories.find(c => c.id === activeCategory)?.label;
  const inCategory = activeCategory !== 'all' ? ` in ${categoryLabel}` : '';
  const emptyMessage = trimmedQuery
    ? `Nothing matches “${trimmedQuery}”${inCategory}.`
    : `Nothing${inCategory} right now.`;

  const shopRoast = (category: Product['category']) => {
    setActiveCategory(category);
    document.getElementById('shop')?.scrollIntoView();
  };

  return (
    <div className="space-y-20 lg:space-y-28">
      {!isSearching && (
        <div className="space-y-5">
          <Hero />
          <Perks />
        </div>
      )}

      <section id="shop" className="scroll-mt-24" aria-labelledby="shop-title">
        {/* Heading + sort */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-6">
          <div>
            {isSearching ? (
              <>
                <p className="eyebrow">Search</p>
                <h2 id="shop-title" className="mt-3 text-3xl sm:text-4xl font-medium text-ink">
                  Results for “{trimmedQuery}”
                </h2>
              </>
            ) : (
              <>
                <p className="eyebrow">The collection</p>
                <h2 id="shop-title" className="mt-3 text-3xl sm:text-4xl font-medium text-ink">
                  Single-origin coffees
                </h2>
              </>
            )}
            <p className="mt-2 text-sm text-ink-subtle" aria-live="polite">
              {products.length} {products.length === 1 ? 'coffee' : 'coffees'}
              {inCategory && <> {inCategory.trim()}</>}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-sm text-ink-subtle whitespace-nowrap">Sort by</label>
            <div className="relative">
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-surface border border-line rounded-full pl-4 pr-10 py-2.5 text-sm font-medium text-ink cursor-pointer hover:border-ink-subtle focus:outline-none focus:ring-2 focus:ring-focus transition-colors"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Category chips — scroll sideways on small screens */}
        <div className="-mx-4 sm:mx-0 mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar px-4 sm:px-0 pb-1">
          {categories.map(cat => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={active}
                className={`shrink-0 flex items-center gap-2 pl-4 pr-3 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  active
                    ? 'bg-primary border-primary text-on-primary shadow-md'
                    : 'bg-surface border-line text-ink-muted hover:border-ink-subtle hover:text-ink'
                }`}
              >
                {cat.label}
                <span
                  className={`min-w-6 px-1.5 py-0.5 rounded-full text-[0.6875rem] font-semibold ${
                    active ? 'bg-white/15 dark:bg-black/15' : 'bg-tint-100 text-ink-subtle'
                  }`}
                >
                  {countFor(cat.id)}
                </span>
              </button>
            );
          })}
          {isSearching && (
            <button
              onClick={onClearFilters}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-accent hover:bg-tint-100 transition-colors"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              Clear search
            </button>
          )}
        </div>

        {/* Product grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 rounded-3xl border border-dashed border-line bg-surface">
            <span className="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-tint-100">
              <Coffee className="w-8 h-8 text-accent" aria-hidden="true" />
            </span>
            <h3 className="text-2xl font-medium text-ink mb-2">No coffees found</h3>
            <p className="text-ink-subtle mb-6">{emptyMessage} Try a different search or clear your filters.</p>
            <button onClick={onClearFilters} className="btn-secondary">
              Clear filters
            </button>
          </div>
        )}
      </section>

      {!isSearching && (
        <>
          <RoastGuide onSelect={shopRoast} />
          <Story />
          <Newsletter />
        </>
      )}
    </div>
  );
}
