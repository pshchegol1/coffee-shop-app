import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { products } from '../data/products';
import type { CartItem, Product } from '../data/products';
import { CartContext } from './cartContext';
import type { CartContextValue } from './cartContext';

const STORAGE_KEY = 'ember-bloom:cart';

/**
 * Only ids and quantities are stored; products are looked up in the catalog on load,
 * so names and prices are always current and discontinued products drop out.
 */
function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.flatMap((entry: { id?: unknown; quantity?: unknown }) => {
      const product = products.find(p => p.id === entry?.id);
      const quantity = entry?.quantity;
      return product && typeof quantity === 'number' && Number.isInteger(quantity) && quantity > 0
        ? [{ product, quantity }]
        : [];
    });
  } catch {
    return [];
  }
}

// Storage can be unavailable (private mode, blocked site data); the cart then just isn't saved.
function loadCart(): CartItem[] {
  try {
    return parseStoredCart(localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.map(i => ({ id: i.product.id, quantity: i.quantity }))));
  } catch {
    // Ignore: quota exceeded or storage blocked.
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadCart);

  useEffect(() => saveCart(cart), [cart]);

  // Keep other open tabs in sync. setItem with an unchanged value fires no event, so tabs don't ping-pong.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setCart(parseStoredCart(e.newValue));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Stable callbacks (setCart never changes), so the context value only changes when the cart does.
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
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
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart(prev =>
      quantity <= 0
        ? prev.filter(item => item.product.id !== productId)
        : prev.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo<CartContextValue>(
    () => ({ cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, clearCart }),
    [cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
