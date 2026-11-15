import { startTransition, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import { formatPrice, getOrderTotal } from '../lib/pricing';
import { FormField } from '../components/FormField';
import { OrderSummary } from '../components/OrderSummary';
import { useCart } from '../hooks/useCart';
import type { OrderConfirmationState } from './ConfirmationView';

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

function CheckoutSection({ step, title, aside, children }: {
  step: number;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="bg-surface rounded-3xl border border-line p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h2 className="flex items-center gap-3 text-xl font-medium text-ink">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-on-primary text-xs font-bold font-sans">
            {step}
          </span>
          {title}
        </h2>
        {aside}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function CheckoutView() {
  const { cart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState(EMPTY_CHECKOUT_FORM);
  const navigate = useNavigate();
  // Set on submit so the empty-cart redirect below can't race the navigation to the confirmation page.
  const orderPlaced = useRef(false);

  // Nothing to check out (e.g. the page was opened directly or refreshed): send them to the cart.
  if (cart.length === 0 && !orderPlaced.current) {
    return <Navigate to="/cart" replace />;
  }

  const total = getOrderTotal(cartTotal);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    orderPlaced.current = true;
    const state: OrderConfirmationState = { orderNumber: Math.floor(Math.random() * 90000 + 10000) };
    // One transition so the route change and the cart clearing land in the same render
    // (the router runs navigation as a transition). replace: Back from the confirmation
    // page shouldn't return to a now-empty checkout.
    startTransition(() => {
      navigate('/order-confirmed', { replace: true, state });
      clearCart();
    });
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
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to cart
      </Link>

      <div className="mb-8">
        <p className="eyebrow">Almost there</p>
        <h1 className="mt-2 text-3xl lg:text-4xl font-medium text-ink">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_24rem] gap-8 items-start">
        <div className="space-y-5">
          <CheckoutSection step={1} title="Contact">
            <FormField {...field('email')} label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
            <FormField {...field('name')} label="Full name" type="text" autoComplete="name" placeholder="Jane Doe" />
          </CheckoutSection>

          <CheckoutSection step={2} title="Shipping address">
            <FormField {...field('address')} label="Street address" type="text" autoComplete="street-address" placeholder="123 Coffee Lane" />
            <div className="grid grid-cols-2 gap-4">
              <FormField {...field('city')} label="City" type="text" autoComplete="address-level2" placeholder="Brooklyn" />
              <FormField {...field('zip')} label="ZIP code" type="text" autoComplete="postal-code" placeholder="11201" />
            </div>
          </CheckoutSection>

          {/* Payment — simulated, so card autofill is deliberately off to keep real card data out of it. */}
          <CheckoutSection
            step={3}
            title="Payment"
            aside={
              <span className="rounded-full bg-tint-100 px-3 py-1 text-xs font-medium text-ink-muted">Simulated</span>
            }
          >
            <FormField {...field('cardNumber')} label="Card number" type="text" inputMode="numeric" autoComplete="off" maxLength={19} placeholder="4242 4242 4242 4242" />
            <div className="grid grid-cols-2 gap-4">
              <FormField {...field('expiry')} label="Expiry" type="text" inputMode="numeric" autoComplete="off" maxLength={5} placeholder="MM/YY" />
              <FormField {...field('cvv')} label="CVV" type="text" inputMode="numeric" autoComplete="off" maxLength={4} placeholder="123" />
            </div>
          </CheckoutSection>
        </div>

        <OrderSummary showItems>
          <button type="submit" className="btn-primary w-full mt-6 py-3.5">
            <Lock className="w-4 h-4" aria-hidden="true" />
            Place order · {formatPrice(total)}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-ink-subtle mt-3">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            This is a simulated checkout — no payment is taken
          </p>
        </OrderSummary>
      </form>
    </div>
  );
}
