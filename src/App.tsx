import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { withShopParams } from './lib/catalog';
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

/** Marks navigations made by typing in the search box (see the sync effect below). */
const FROM_SEARCH_BOX = { fromSearchBox: true };

export default function App() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const location = useLocation();
  const { pathname, search, hash, key } = location;
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  // The search query lives in the URL (?q=…) on the shop page. The search box keeps its own copy
  // because router updates run as transitions, and an input controlled by transition state can drop
  // keystrokes. The copy is refreshed from the URL whenever something other than typing changes it:
  // Back/Forward, "Clear filters", or a link such as "Shop" that leads to an unfiltered page.
  const urlQuery = pathname === '/' ? new URLSearchParams(search).get('q') ?? '' : '';
  const [searchInput, setSearchInput] = useState(urlQuery);
  const typedHere = (location.state as typeof FROM_SEARCH_BOX | null)?.fromSearchBox === true;
  useEffect(() => {
    if (navigationType !== 'POP' && typedHere) return;
    setSearchInput(urlQuery);
  }, [key, urlQuery, navigationType, typedHere]);

  // New pages start at the top, or at the #section in the link (e.g. /#roast-guide).
  // Back/Forward (POP) is left alone so the browser restores the previous scroll position,
  // e.g. returning to the same spot in the product grid. `key` re-runs this when the same
  // hash link is clicked again. Changing search or filters on the same page keeps your place.
  const previous = useRef({ pathname, search });
  useEffect(() => {
    const prev = previous.current;
    previous.current = { pathname, search };
    if (navigationType === 'POP') return;
    if (prev.pathname === pathname && prev.search !== search && !hash) return;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, search, hash, key, navigationType]);

  // Results only render on the shop page, so searching from any other page takes you there.
  // Starting a search collapses the home page to its results, so jump back to the top.
  const handleSearchChange = (query: string) => {
    const onShop = pathname === '/';
    const startingSearch = !searchInput.trim() && query.trim().length > 0;
    setSearchInput(query);
    if (startingSearch) window.scrollTo({ top: 0, behavior: 'instant' });

    // Keep the shop's other filters; coming from another page starts fresh.
    const params = withShopParams(new URLSearchParams(onShop ? search : ''), { q: query.trim() ? query : null });
    const qs = params.toString();
    navigate(
      { pathname: '/', search: qs ? `?${qs}` : '' },
      // One history entry per search, so Back leaves the search instead of undoing it a letter at a time.
      { replace: onShop && !startingSearch, state: FROM_SEARCH_BOX }
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Header
        showMobileSearch={showMobileSearch}
        setShowMobileSearch={setShowMobileSearch}
        searchQuery={searchInput}
        onSearchChange={handleSearchChange}
      />

      {showMobileSearch && (
        <MobileSearchBar searchQuery={searchInput} onSearchChange={handleSearchChange} />
      )}

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-20 lg:pb-28">
        <Routes>
          <Route path="/" element={<ShopView />} />
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
