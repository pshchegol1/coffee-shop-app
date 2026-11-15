import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { CartItem } from '../data/products';
import { formatPrice, getShipping } from '../lib/pricing';
import { FormField } from '../components/FormField';

const EMPTY_CHECKOUT_FORM = {
  email: '',
  name: '',
  address: '',
  city: '',
  zip: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
};

type CheckoutField = keyof typeof EMPTY_CHECKOUT_FORM;

export function CheckoutView({ cart, cartTotal, onBack, onConfirm }: {
  cart: CartItem[];
  cartTotal: number;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const [formData, setFormData] = useState(EMPTY_CHECKOUT_FORM);

  const shipping = getShipping(cartTotal);
  const total = cartTotal + shipping;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onConfirm();
  };

  // Shared props for a required text field bound to formData.
  const field = (key: CheckoutField) => ({
    id: key,
    required: true,
    value: formData[key],
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setFormData(prev => ({ ...prev, [key]: e.target.value })),
  });

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-ink-muted hover:text-ink mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to cart
      </button>

      <h2 className="text-2xl lg:text-3xl font-bold text-ink mb-8">Checkout</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Contact */}
          <div className="bg-surface rounded-xl border border-line p-6">
            <h3 className="font-bold text-ink mb-4">Contact Information</h3>
            <div className="space-y-4">
              <FormField {...field('email')} label="Email" type="email" autoComplete="email" placeholder="your@email.com" />
              <FormField {...field('name')} label="Full Name" type="text" autoComplete="name" placeholder="John Doe" />
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-surface rounded-xl border border-line p-6">
            <h3 className="font-bold text-ink mb-4">Shipping Address</h3>
            <div className="space-y-4">
              <FormField {...field('address')} label="Address" type="text" autoComplete="street-address" placeholder="123 Coffee Lane" />
              <div className="grid grid-cols-2 gap-4">
                <FormField {...field('city')} label="City" type="text" autoComplete="address-level2" placeholder="Brooklyn" />
                <FormField {...field('zip')} label="ZIP Code" type="text" autoComplete="postal-code" placeholder="11201" />
              </div>
            </div>
          </div>

          {/* Payment — simulated, so card autofill is deliberately off to keep real card data out of it. */}
          <div className="bg-surface rounded-xl border border-line p-6">
            <h3 className="font-bold text-ink mb-4">Payment (Simulated)</h3>
            <div className="space-y-4">
              <FormField {...field('cardNumber')} label="Card Number" type="text" inputMode="numeric" autoComplete="off" maxLength={19} placeholder="4242 4242 4242 4242" />
              <div className="grid grid-cols-2 gap-4">
                <FormField {...field('expiry')} label="Expiry" type="text" inputMode="numeric" autoComplete="off" maxLength={5} placeholder="MM/YY" />
                <FormField {...field('cvv')} label="CVV" type="text" inputMode="numeric" autoComplete="off" maxLength={4} placeholder="123" />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-surface rounded-xl border border-line p-6 sticky top-24">
            <h3 className="font-bold text-ink text-lg mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-ink-muted truncate mr-2">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-ink flex-shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-line pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-ink-subtle">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-ink-subtle">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="border-t border-line pt-2 flex justify-between font-bold text-ink text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full mt-6">
              Place Order — {formatPrice(total)}
            </button>
            <p className="text-xs text-center text-ink-subtle mt-3">
              🔒 This is a simulated checkout
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
