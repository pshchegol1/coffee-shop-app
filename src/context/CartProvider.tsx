import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '../data/products';
import { CartContext } from './cartContext';
import type { CartContextValue } from './cartContext';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

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
