import { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { products } from './data/products';
import type { CategoryId } from './data/products';
import { filterProducts, sortProducts } from './lib/catalog';
import type { SortOption } from './lib/catalog';
import { Header } from './components/Header';
import { MobileSearchBar } from './components/MobileSearchBar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ShopView } from './views/ShopView';
import { DetailView } from './views/DetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { ConfirmationView } from './views/ConfirmationView';
import { NotFoundView } from './views/NotFoundView';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  // New pages start at the top, or at the #section in the link (e.g. /#roast-guide).
  // Back/Forward (POP) is left alone so the browser restores the previous scroll position,
  // e.g. returning to the same spot in the product grid. `key` re-runs this when the same
  // hash link is clicked again.
  useEffect(() => {
    if (navigationType === 'POP') return;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, key, navigationType]);

  const visibleProducts = useMemo(
    () => sortProducts(filterProducts(products, { query: searchQuery, category: activeCategory }), sortBy),
    [searchQuery, activeCategory, sortBy]
  );

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  // Results only render on the shop page, so searching from any other page takes you there.
  // Starting a search collapses the home page to its results, so jump back to the top.
  const handleSearchChange = (query: string) => {
    if (!searchQuery.trim() && query.trim()) window.scrollTo({ top: 0, behavior: 'instant' });
    setSearchQuery(query);
    if (pathname !== '/') navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Header
        showMobileSearch={showMobileSearch}
        setShowMobileSearch={setShowMobileSearch}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {showMobileSearch && (
        <MobileSearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      )}

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-20 lg:pb-28">
        <Routes>
          <Route
            path="/"
            element={
              <ShopView
                products={visibleProducts}
                searchQuery={searchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onClearFilters={clearFilters}
              />
            }
          />
          <Route path="/coffee/:id" element={<DetailView />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/checkout" element={<CheckoutView />} />
          <Route path="/order-confirmed" element={<ConfirmationView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
