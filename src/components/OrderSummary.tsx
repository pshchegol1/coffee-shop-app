import type { ReactNode } from 'react';
import { Truck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { productImageUrl } from '../lib/images';
import { FREE_SHIPPING_THRESHOLD, formatPrice, getOrderTotal, getShipping } from '../lib/pricing';

/** Order totals card. Pass the view's action buttons as children. */
export function OrderSummary({ showItems = false, showFreeShippingHint = false, children }: {
  /** List each cart line (thumbnail, name × qty, line total) above the totals. */
  showItems?: boolean;
  /** Show a progress bar towards free shipping. */
  showFreeShippingHint?: boolean;
  children?: ReactNode;
}) {
  const { cart, cartTotal } = useCart();
  const shipping = getShipping(cartTotal);
  const progress = Math.min(cartTotal / FREE_SHIPPING_THRESHOLD, 1);

  return (
    <div className="bg-surface rounded-3xl border border-line p-6 sm:p-7 lg:sticky lg:top-28">
      <h2 className="text-xl font-medium text-ink mb-5">Order summary</h2>

      {showFreeShippingHint && (
        <div className="mb-6 rounded-2xl bg-tint-50 border border-line p-4">
          <p className="flex items-center gap-2 text-sm text-ink-soft">
            <Truck className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
            {shipping > 0 ? (
              <span>
                You're <span className="font-semibold">{formatPrice(FREE_SHIPPING_THRESHOLD - cartTotal)}</span> away from free shipping
              </span>
            ) : (
              <span className="font-semibold">You've unlocked free shipping!</span>
            )}
          </p>
          <div
            className="mt-3 h-1.5 rounded-full bg-tint-200 overflow-hidden"
            role="progressbar"
            aria-label="Progress towards free shipping"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-cream-400 to-accent transition-[width] duration-500"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      )}

      {showItems && (
        <ul className="space-y-4 mb-5">
          {cart.map(item => (
            <li key={item.product.id} className="flex items-center gap-3 text-sm">
              <span className="relative shrink-0">
                <img
                  src={productImageUrl(item.product.imageId, 200)}
                  alt=""
                  className="w-12 h-12 rounded-xl object-cover bg-tint-100"
                />
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-primary text-on-primary text-[0.625rem] font-bold flex items-center justify-center">
                  {item.quantity}
                </span>
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-medium text-ink truncate">{item.product.name}</span>
                <span className="block text-xs text-ink-subtle">{item.product.weight} · Qty {item.quantity}</span>
              </span>
              <span className="font-semibold text-ink shrink-0">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <dl className={`space-y-3 text-sm ${showItems ? 'border-t border-line pt-5' : ''}`}>
        <div className="flex justify-between text-ink-muted">
          <dt>Subtotal</dt>
          <dd className="font-medium text-ink">{formatPrice(cartTotal)}</dd>
        </div>
        <div className="flex justify-between text-ink-muted">
          <dt>Shipping</dt>
          <dd className={shipping === 0 ? 'font-semibold text-green-700 dark:text-green-400' : 'font-medium text-ink'}>
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </dd>
        </div>
        <div className="border-t border-line pt-4 flex justify-between items-baseline text-ink">
          <dt className="font-semibold">Total</dt>
          <dd className="font-display text-2xl font-semibold">{formatPrice(getOrderTotal(cartTotal))}</dd>
        </div>
      </dl>

      {children}
    </div>
  );
}
