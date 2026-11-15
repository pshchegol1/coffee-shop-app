import { createContext } from 'react';
import type { CartItem, Product } from '../data/products';

export interface CartContextValue {
  cart: CartItem[];
  cartTotal: number;
  cartCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  /** Setting a quantity of 0 or less removes the item. */
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// null default lets useCart detect a missing <CartProvider> instead of failing silently.
export const CartContext = createContext<CartContextValue | null>(null);
