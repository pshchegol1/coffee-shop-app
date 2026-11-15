import { Coffee, Filter } from 'lucide-react';
import { categories } from '../data/products';
import type { CategoryId, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function ShopView({ products, activeCategory, setActiveCategory, onProductClick, onAddToCart, showMobileFilters, setShowMobileFilters }: {
  products: Product[];
  activeCategory: CategoryId;
  setActiveCategory: (v: CategoryId) => void;
  onProductClick: (p: Product) => void;
  onAddToCart: (p: Product, qty?: number) => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (v: boolean) => void;
}) {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-10 lg:mb-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mb-4">
          Exceptional Coffee,
          <br />
          <span className="text-accent">Delivered Fresh</span>
        </h1>
        <p className="text-ink-subtle max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
          Hand-selected beans from the world's finest growing regions, roasted in small batches
          to bring out their unique character.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            aria-expanded={showMobileFilters}
            className="sm:hidden flex items-center gap-2 px-4 py-2 bg-tint-100 rounded-full text-sm font-medium text-ink-soft"
          >
            <Filter className="w-4 h-4" aria-hidden="true" />
            Filters
          </button>

          <div className={`${showMobileFilters ? 'flex' : 'hidden'} sm:flex flex-wrap gap-2`}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setShowMobileFilters(false); }}
                aria-pressed={activeCategory === cat.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'bg-tint-100 text-ink-muted hover:bg-tint-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-ink-subtle" aria-live="polite">
          {products.length} {products.length === 1 ? 'coffee' : 'coffees'} found
        </p>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Coffee className="w-16 h-16 text-tint-300 mx-auto mb-4" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-ink-soft mb-2">No coffees found</h3>
          <p className="text-ink-subtle">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
