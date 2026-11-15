import { useState, useMemo, useEffect } from 'react';
import { products } from './data/products';
import type { Product, CategoryId } from './data/products';
import { useCart } from './hooks/useCart';
import { Header } from './components/Header';
import { MobileSearchBar } from './components/MobileSearchBar';
import { Footer } from './components/Footer';
import { ShopView } from './views/ShopView';
import { DetailView } from './views/DetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { ConfirmationView } from './views/ConfirmationView';

type View = 'shop' | 'detail' | 'cart' | 'checkout' | 'confirmation';

export default function App() {
  const [view, setView] = useState<View>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Each view is a new "page": start it at the top instead of the previous scroll position.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

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

  const goToShop = () => {
    setView('shop');
    setSelectedProduct(null);
  };

  // Results only render in the shop view, so searching from any other view takes you there.
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (view !== 'shop') goToShop();
  };

  const handleCheckout = () => {
    clearCart();
    setView('confirmation');
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Header
        cartCount={cartCount}
        onCartClick={() => setView('cart')}
        onLogoClick={goToShop}
        showMobileSearch={showMobileSearch}
        setShowMobileSearch={setShowMobileSearch}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {showMobileSearch && (
        <MobileSearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'shop' && (
          <ShopView
            products={filteredProducts}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onProductClick={(p) => { setSelectedProduct(p); setView('detail'); }}
            onAddToCart={addToCart}
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
          />
        )}
        {view === 'detail' && selectedProduct && (
          <DetailView
            key={selectedProduct.id}
            product={selectedProduct}
            onBack={goToShop}
            onAddToCart={(qty) => { addToCart(selectedProduct, qty); }}
          />
        )}
        {view === 'cart' && (
          <CartView
            cart={cart}
            cartTotal={cartTotal}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onCheckout={() => setView('checkout')}
            onContinueShopping={goToShop}
          />
        )}
        {view === 'checkout' && (
          <CheckoutView
            cart={cart}
            cartTotal={cartTotal}
            onBack={() => setView('cart')}
            onConfirm={handleCheckout}
          />
        )}
        {view === 'confirmation' && (
          <ConfirmationView onBackToShop={goToShop} />
        )}
      </main>

      <Footer />
    </div>
  );
}
