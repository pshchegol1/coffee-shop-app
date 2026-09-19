import { useState, useMemo } from 'react';
import { products, categories, Product, CartItem } from './data/products';
import {
  Search, ShoppingBag, X, Plus, Minus, Trash2,
  Coffee, ArrowLeft, Check, Star, MapPin, Filter, Download
} from 'lucide-react';
import { downloadProject } from './utils/downloadProject';

type View = 'shop' | 'detail' | 'cart' | 'checkout' | 'confirmation';

export default function App() {
  const [view, setView] = useState<View>('shop');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.notes.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setCart([]);
    setView('confirmation');
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setView('cart')}
        onLogoClick={() => { setView('shop'); setSelectedProduct(null); }}
        showMobileSearch={showMobileSearch}
        setShowMobileSearch={setShowMobileSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="lg:hidden px-4 py-3 bg-cream-50 border-b border-cream-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
            <input
              type="text"
              placeholder="Search coffees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-cream-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-espresso-400"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'shop' && (
          <ShopView
            products={filteredProducts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
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
            product={selectedProduct}
            onBack={() => { setView('shop'); setSelectedProduct(null); }}
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
            onContinueShopping={() => setView('shop')}
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
          <ConfirmationView onBackToShop={() => setView('shop')} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-espresso-800 text-cream-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Coffee className="w-6 h-6 text-cream-400" />
                <span className="text-xl font-bold text-cream-50">Ember & Bloom</span>
              </div>
              <p className="text-sm text-cream-300 leading-relaxed">
                Curating the world's finest specialty coffees, roasted to perfection and delivered fresh to your door.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-cream-50 mb-3">Our Promise</h4>
              <ul className="space-y-2 text-sm text-cream-300">
                <li>✓ Ethically sourced beans</li>
                <li>✓ Roasted within 48 hours</li>
                <li>✓ Free shipping over $50</li>
                <li>✓ Satisfaction guaranteed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-cream-50 mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-cream-300">
                <li>hello@emberandbloom.co</li>
                <li>Mon–Fri: 8am–6pm</li>
                <li>Brooklyn, New York</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-espresso-600 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-cream-400">
              © 2026 Ember & Bloom Coffee Co. All rights reserved.
            </p>
            <button
              onClick={downloadProject}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-accent text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-all active:scale-95 shadow-lg shadow-amber-accent/20"
            >
              <Download className="w-4 h-4" />
              Download Project
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ==================== HEADER ==================== */
function Header({ cartCount, onCartClick, onLogoClick, showMobileSearch, setShowMobileSearch, searchQuery, setSearchQuery }: {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  showMobileSearch: boolean;
  setShowMobileSearch: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}) {
  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button onClick={onLogoClick} className="flex items-center gap-2 group">
            <Coffee className="w-7 h-7 text-espresso-700 group-hover:text-amber-accent transition-colors" />
            <span className="text-xl lg:text-2xl font-bold text-espresso-800 tracking-tight">
              Ember <span className="text-amber-accent">&</span> Bloom
            </span>
          </button>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
              <input
                type="text"
                placeholder="Search origins, flavors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-cream-50 border border-cream-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-espresso-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="lg:hidden p-2 rounded-full hover:bg-cream-100 transition-colors"
            >
              <Search className="w-5 h-5 text-espresso-700" />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full hover:bg-cream-100 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-espresso-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ==================== SHOP VIEW ==================== */
function ShopView({ products, searchQuery, setSearchQuery, activeCategory, setActiveCategory, onProductClick, onAddToCart, showMobileFilters, setShowMobileFilters }: {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  onProductClick: (p: Product) => void;
  onAddToCart: (p: Product, qty?: number) => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (v: boolean) => void;
}) {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-10 lg:mb-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso-800 mb-4">
          Exceptional Coffee,
          <br />
          <span className="text-amber-accent">Delivered Fresh</span>
        </h1>
        <p className="text-warm-gray max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
          Hand-selected beans from the world's finest growing regions, roasted in small batches
          to bring out their unique character.
        </p>
      </div>

      {/* Download Banner */}
      <div className="bg-gradient-to-r from-espresso-700 to-espresso-800 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 bg-amber-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Download className="w-6 h-6 text-amber-accent" />
          </div>
          <div>
            <h3 className="text-cream-50 font-bold text-lg">Download This Project</h3>
            <p className="text-cream-300 text-sm">Get the full source code as a ZIP file — ready to run locally</p>
          </div>
        </div>
        <button
          onClick={downloadProject}
          className="flex items-center gap-2 px-6 py-3 bg-amber-accent text-white rounded-lg font-medium hover:bg-amber-600 transition-all active:scale-95 whitespace-nowrap shadow-md"
        >
          <Download className="w-4 h-4" />
          Download ZIP
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="sm:hidden flex items-center gap-2 px-4 py-2 bg-cream-100 rounded-full text-sm font-medium text-espresso-700"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          <div className={`${showMobileFilters ? 'flex' : 'hidden'} sm:flex flex-wrap gap-2`}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setShowMobileFilters(false); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-espresso-700 text-cream-50 shadow-md'
                    : 'bg-cream-100 text-espresso-600 hover:bg-cream-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-warm-gray">
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
          <Coffee className="w-16 h-16 text-cream-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-espresso-700 mb-2">No coffees found</h3>
          <p className="text-warm-gray">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

/* ==================== PRODUCT CARD ==================== */
function ProductCard({ product, onClick, onAddToCart }: {
  product: Product;
  onClick: () => void;
  onAddToCart: () => void;
}) {
  const categoryColors = {
    light: 'bg-amber-100 text-amber-800',
    medium: 'bg-orange-100 text-orange-800',
    dark: 'bg-espresso-200 text-espresso-700',
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-cream-200 card-hover group">
      {/* Product Image Area */}
      <button onClick={onClick} className="block w-full">
        <div className="aspect-[4/3] bg-gradient-to-br from-cream-100 to-cream-200 flex items-center justify-center relative overflow-hidden">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{product.emoji}</span>
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[product.category]}`}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)} Roast
            </span>
          </div>
          <div className="absolute bottom-3 right-3 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < product.roastLevel ? 'bg-espresso-600' : 'bg-cream-300'
                }`}
              />
            ))}
          </div>
        </div>
      </button>

      {/* Product Info */}
      <div className="p-5">
        <button onClick={onClick} className="block w-full text-left">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-espresso-800 text-lg leading-tight group-hover:text-amber-accent transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-sm text-warm-gray mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{product.origin}</span>
            <span className="mx-1">·</span>
            <span>{product.weight}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.notes.slice(0, 3).map(note => (
              <span key={note} className="px-2 py-0.5 bg-cream-50 text-espresso-500 text-xs rounded-full border border-cream-200">
                {note}
              </span>
            ))}
          </div>
        </button>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-espresso-800">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
            className="flex items-center gap-2 px-4 py-2 bg-espresso-700 text-cream-50 rounded-lg text-sm font-medium hover:bg-espresso-600 transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==================== DETAIL VIEW ==================== */
function DetailView({ product, onBack, onAddToCart }: {
  product: Product;
  onBack: () => void;
  onAddToCart: (qty: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="animate-in fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-espresso-600 hover:text-espresso-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-cream-100 to-cream-200 rounded-2xl flex items-center justify-center">
          <span className="text-9xl">{product.emoji}</span>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-cream-100 text-espresso-600 rounded-full text-sm font-medium">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)} Roast
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i < product.roastLevel ? 'bg-espresso-600' : 'bg-cream-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-espresso-800 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 text-warm-gray mb-4">
            <MapPin className="w-4 h-4" />
            <span>{product.origin}</span>
            <span>·</span>
            <span>{product.weight}</span>
          </div>

          <p className="text-espresso-600 leading-relaxed mb-6 text-base lg:text-lg">
            {product.description}
          </p>

          {/* Flavor Notes */}
          <div className="mb-6">
            <h3 className="font-semibold text-espresso-700 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" /> Flavor Notes
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.notes.map(note => (
                <span key={note} className="px-3 py-1.5 bg-cream-50 border border-cream-200 rounded-full text-sm text-espresso-600">
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Price & Add to Cart */}
          <div className="mt-auto border-t border-cream-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-espresso-800">${product.price.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-cream-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-cream-50 transition-colors rounded-l-lg"
                >
                  <Minus className="w-4 h-4 text-espresso-600" />
                </button>
                <span className="px-4 py-3 font-semibold text-espresso-800 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-cream-50 transition-colors rounded-r-lg"
                >
                  <Plus className="w-4 h-4 text-espresso-600" />
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all active:scale-95 ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-espresso-700 text-cream-50 hover:bg-espresso-600'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart — ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== CART VIEW ==================== */
function CartView({ cart, cartTotal, onUpdateQuantity, onRemove, onCheckout, onContinueShopping }: {
  cart: CartItem[];
  cartTotal: number;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}) {
  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-20 h-20 text-cream-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-espresso-800 mb-3">Your cart is empty</h2>
        <p className="text-warm-gray mb-8">Discover our curated selection of specialty coffees</p>
        <button onClick={onContinueShopping} className="btn-primary">
          Browse Coffees
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-espresso-800 mb-8">Your Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className="bg-white rounded-xl border border-cream-200 p-4 sm:p-6 flex gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-cream-100 to-cream-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-3xl sm:text-4xl">{item.product.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-espresso-800 truncate">{item.product.name}</h3>
                <p className="text-sm text-warm-gray">{item.product.origin} · {item.product.weight}</p>
                <p className="font-semibold text-espresso-700 mt-1">${item.product.price.toFixed(2)}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-cream-200 rounded-lg">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-cream-50 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5 text-espresso-600" />
                    </button>
                    <span className="px-3 py-2 text-sm font-semibold text-espresso-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-cream-50 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-espresso-600" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemove(item.product.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <p className="font-bold text-espresso-800 text-lg">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-cream-200 p-6 sticky top-24">
            <h3 className="font-bold text-espresso-800 text-lg mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-warm-gray">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-warm-gray">
                <span>Shipping</span>
                <span>{cartTotal >= 50 ? 'Free' : '$5.99'}</span>
              </div>
              {cartTotal < 50 && (
                <p className="text-xs text-amber-accent bg-amber-50 p-2 rounded-lg">
                  Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="border-t border-cream-200 pt-3 flex justify-between font-bold text-espresso-800 text-base">
                <span>Total</span>
                <span>${(cartTotal + (cartTotal >= 50 ? 0 : 5.99)).toFixed(2)}</span>
              </div>
            </div>
            <button onClick={onCheckout} className="btn-primary w-full mt-6">
              Proceed to Checkout
            </button>
            <button onClick={onContinueShopping} className="btn-secondary w-full mt-3">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== CHECKOUT VIEW ==================== */
function CheckoutView({ cart, cartTotal, onBack, onConfirm }: {
  cart: CartItem[];
  cartTotal: number;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const shipping = cartTotal >= 50 ? 0 : 5.99;
  const total = cartTotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-espresso-600 hover:text-espresso-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to cart
      </button>

      <h2 className="text-2xl lg:text-3xl font-bold text-espresso-800 mb-8">Checkout</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Contact */}
          <div className="bg-white rounded-xl border border-cream-200 p-6">
            <h3 className="font-bold text-espresso-800 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-espresso-600 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-cream-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-espresso-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-cream-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-espresso-400"
                />
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-xl border border-cream-200 p-6">
            <h3 className="font-bold text-espresso-800 mb-4">Shipping Address</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-espresso-600 mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="123 Coffee Lane"
                  className="w-full px-4 py-3 border border-cream-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-espresso-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-espresso-600 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="Brooklyn"
                    className="w-full px-4 py-3 border border-cream-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-espresso-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-espresso-600 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => updateField('zip', e.target.value)}
                    placeholder="11201"
                    className="w-full px-4 py-3 border border-cream-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-espresso-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl border border-cream-200 p-6">
            <h3 className="font-bold text-espresso-800 mb-4">Payment (Simulated)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-espresso-600 mb-1">Card Number</label>
                <input
                  type="text"
                  required
                  value={formData.cardNumber}
                  onChange={(e) => updateField('cardNumber', e.target.value)}
                  placeholder="4242 4242 4242 4242"
                  className="w-full px-4 py-3 border border-cream-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-espresso-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-espresso-600 mb-1">Expiry</label>
                  <input
                    type="text"
                    required
                    value={formData.expiry}
                    onChange={(e) => updateField('expiry', e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-cream-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-espresso-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-espresso-600 mb-1">CVV</label>
                  <input
                    type="text"
                    required
                    value={formData.cvv}
                    onChange={(e) => updateField('cvv', e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-3 border border-cream-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-espresso-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-cream-200 p-6 sticky top-24">
            <h3 className="font-bold text-espresso-800 text-lg mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-espresso-600 truncate mr-2">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-espresso-800 flex-shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-cream-200 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-warm-gray">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-warm-gray">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-cream-200 pt-2 flex justify-between font-bold text-espresso-800 text-base">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full mt-6">
              Place Order — ${total.toFixed(2)}
            </button>
            <p className="text-xs text-center text-warm-gray mt-3">
              🔒 This is a simulated checkout
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ==================== CONFIRMATION VIEW ==================== */
function ConfirmationView({ onBackToShop }: { onBackToShop: () => void }) {
  return (
    <div className="text-center py-16 max-w-lg mx-auto">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-espresso-800 mb-4">Order Confirmed!</h2>
      <p className="text-warm-gray text-lg mb-2">
        Thank you for your order. Your specialty coffees are being prepared with care.
      </p>
      <p className="text-warm-gray mb-8">
        A confirmation email has been sent (simulated). Your beans will be roasted fresh and shipped within 24 hours.
      </p>
      <div className="bg-cream-50 border border-cream-200 rounded-xl p-6 mb-8">
        <p className="text-sm text-espresso-600">
          <span className="font-semibold">Order #EB-{Math.floor(Math.random() * 90000 + 10000)}</span>
          <br />
          Estimated delivery: 3–5 business days
        </p>
      </div>
      <button onClick={onBackToShop} className="btn-primary">
        Continue Shopping
      </button>
    </div>
  );
}
