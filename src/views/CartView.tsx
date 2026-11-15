import { Link } from 'react-router-dom';
import { ArrowRight, Lock, ShoppingBag, Trash2 } from 'lucide-react';
import { formatPrice } from '../lib/pricing';
import { formatRoast } from '../lib/roast';
import { useCart } from '../hooks/useCart';
import { OrderSummary } from '../components/OrderSummary';
import { QuantityStepper } from '../components/QuantityStepper';
import { ProductImage } from '../components/ProductImage';

export function CartView() {
  const { cart, cartCount, updateQuantity, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 sm:py-24">
        <span className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-3xl bg-tint-100">
          <ShoppingBag className="w-9 h-9 text-accent" aria-hidden="true" />
        </span>
        <h1 className="text-3xl font-medium text-ink mb-3">Your cart is empty</h1>
        <p className="text-ink-subtle mb-8">
          Good coffee is just a few clicks away. Explore our single origins and find your next favorite.
        </p>
        <Link to="/#shop" className="btn-primary">
          Browse coffees
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="eyebrow">Your order</p>
          <h1 className="mt-2 text-3xl lg:text-4xl font-medium text-ink">
            Shopping cart <span className="text-ink-subtle font-normal text-2xl">({cartCount})</span>
          </h1>
        </div>
        <Link to="/#shop" className="hidden sm:inline-flex text-sm font-semibold text-ink hover:text-accent transition-colors">
          Continue shopping →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_24rem] gap-8 items-start">
        {/* Items */}
        <ul className="space-y-4">
          {cart.map(item => (
            <li key={item.product.id} className="bg-surface rounded-3xl border border-line p-3 sm:p-4 flex gap-4 sm:gap-5">
              <Link
                to={`/coffee/${item.product.id}`}
                tabIndex={-1}
                aria-hidden="true"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-tint-100 to-tint-200 shrink-0"
              >
                <ProductImage product={item.product} alt="" sizes="171px" />
              </Link>

              <div className="flex-1 min-w-0 flex flex-col py-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                      {formatRoast(item.product.category)} · {item.product.weight}
                    </p>
                    <h2 className="mt-1 text-lg sm:text-xl font-semibold text-ink truncate">
                      <Link to={`/coffee/${item.product.id}`} className="hover:text-accent transition-colors">
                        {item.product.name}
                      </Link>
                    </h2>
                    <p className="text-sm text-ink-subtle truncate">{item.product.notes.slice(0, 3).join(' · ')}</p>
                  </div>
                  <p className="font-display text-lg sm:text-xl font-semibold text-ink shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>

                <div className="mt-auto pt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <QuantityStepper
                      size="sm"
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.product.id, qty)}
                      itemName={item.product.name}
                    />
                    <span className="hidden sm:inline text-xs text-ink-subtle">{formatPrice(item.product.price)} each</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label={`Remove ${item.product.name} from cart`}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm text-ink-subtle hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <OrderSummary showFreeShippingHint>
          <Link to="/checkout" className="btn-primary w-full mt-6 py-3.5">
            <Lock className="w-4 h-4" aria-hidden="true" />
            Checkout
          </Link>
          <Link to="/#shop" className="btn-secondary w-full mt-3">
            Continue shopping
          </Link>
        </OrderSummary>
      </div>
    </div>
  );
}
