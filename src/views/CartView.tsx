import { ShoppingBag, Trash2 } from 'lucide-react';
import { formatPrice } from '../lib/pricing';
import { useCart } from '../hooks/useCart';
import { OrderSummary } from '../components/OrderSummary';
import { QuantityStepper } from '../components/QuantityStepper';

export function CartView({ onCheckout, onContinueShopping }: {
  onCheckout: () => void;
  onContinueShopping: () => void;
}) {
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-20 h-20 text-tint-300 mx-auto mb-6" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-ink mb-3">Your cart is empty</h2>
        <p className="text-ink-subtle mb-8">Discover our curated selection of specialty coffees</p>
        <button onClick={onContinueShopping} className="btn-primary">
          Browse Coffees
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-ink mb-8">Your Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className="bg-surface rounded-xl border border-line p-4 sm:p-6 flex gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-tint-100 to-tint-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-ink truncate">{item.product.name}</h3>
                <p className="text-sm text-ink-subtle">{item.product.origin} · {item.product.weight}</p>
                <p className="font-semibold text-ink-soft mt-1">{formatPrice(item.product.price)}</p>

                <div className="flex items-center justify-between mt-3">
                  <QuantityStepper
                    size="sm"
                    value={item.quantity}
                    onChange={(qty) => updateQuantity(item.product.id, qty)}
                    itemName={item.product.name}
                  />
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label={`Remove ${item.product.name} from cart`}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <p className="font-bold text-ink text-lg">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary showFreeShippingHint>
            <button onClick={onCheckout} className="btn-primary w-full mt-6">
              Proceed to Checkout
            </button>
            <button onClick={onContinueShopping} className="btn-secondary w-full mt-3">
              Continue Shopping
            </button>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}
