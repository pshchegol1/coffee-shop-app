import type { ReactNode } from 'react';
import { useCart } from '../hooks/useCart';
import { FREE_SHIPPING_THRESHOLD, formatPrice, getOrderTotal, getShipping } from '../lib/pricing';

/** Order totals card. Pass the view's action buttons as children. */
export function OrderSummary({ showItems = false, showFreeShippingHint = false, children }: {
  /** List each cart line (name × qty, line total) above the totals. */
  showItems?: boolean;
  /** Show "Add $X more for free shipping!" while shipping isn't free. */
  showFreeShippingHint?: boolean;
  children?: ReactNode;
}) {
  const { cart, cartTotal } = useCart();
  const shipping = getShipping(cartTotal);

  return (
    <div className="bg-surface rounded-xl border border-line p-6 sticky top-24">
      <h3 className="font-bold text-ink text-lg mb-4">Order Summary</h3>

      {showItems && (
        <div className="space-y-3 mb-4">
          {cart.map(item => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-ink-muted truncate mr-2">
                {item.product.name} × {item.quantity}
              </span>
              <span className="font-medium text-ink shrink-0">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className={`space-y-3 text-sm ${showItems ? 'border-t border-line pt-3' : ''}`}>
        <div className="flex justify-between text-ink-subtle">
          <span>Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between text-ink-subtle">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        {showFreeShippingHint && shipping > 0 && (
          <p className="text-xs text-accent bg-amber-50 dark:bg-amber-500/10 p-2 rounded-lg">
            Add {formatPrice(FREE_SHIPPING_THRESHOLD - cartTotal)} more for free shipping!
          </p>
        )}
        <div className="border-t border-line pt-3 flex justify-between font-bold text-ink text-base">
          <span>Total</span>
          <span>{formatPrice(getOrderTotal(cartTotal))}</span>
        </div>
      </div>

      {children}
    </div>
  );
}
