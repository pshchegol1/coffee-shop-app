import { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { products } from './data/products';
import type { CategoryId } from './data/products';
import { Header } from './components/Header';
import { MobileSearchBar } from './components/MobileSearchBar';
import { Footer } from './components/Footer';
import { ShopView } from './views/ShopView';
import { DetailView } from './views/DetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { ConfirmationView } from './views/ConfirmationView';
import { NotFoundView } from './views/NotFoundView';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  // New pages start at the top. Back/Forward (POP) is left alone so the browser restores
  // the previous scroll position, e.g. returning to the same spot in the product grid.
  useEffect(() => {
    if (navigationType !== 'POP') window.scrollTo({ top: 0 });
  }, [pathname, navigationType]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter(p => {
      const matchesSearch = !query ||
        p.name.toLowerCase().includes(query) ||
        p.origin.toLowerCase().includes(query) ||
        p.notes.some(n => n.toLowerCase().includes(query));
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Results only render on the shop page, so searching from any other page takes you there.
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (pathname !== '/') navigate('/');
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Header
        showMobileSearch={showMobileSearch}
        setShowMobileSearch={setShowMobileSearch}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {showMobileSearch && (
        <MobileSearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <ShopView
                products={filteredProducts}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                showMobileFilters={showMobileFilters}
                setShowMobileFilters={setShowMobileFilters}
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
    </div>
  );
}
