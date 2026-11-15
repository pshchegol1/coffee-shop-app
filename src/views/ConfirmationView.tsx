import { Link, Navigate, useLocation } from 'react-router-dom';
import { Check, Flame, Home, Package, Receipt } from 'lucide-react';

/** Passed as router state by CheckoutView when navigating here. */
export interface OrderConfirmationState {
  orderNumber: number;
}

const TIMELINE = [
  { icon: Receipt, title: 'Order placed', text: 'Just now', done: true },
  { icon: Flame, title: 'Roasting', text: 'Within 24 hours' },
  { icon: Package, title: 'Shipped', text: 'Tracking link by email' },
  { icon: Home, title: 'Delivered', text: 'In 3–5 business days' },
];

export function ConfirmationView() {
  // Router state lives in browser history, so the number survives a refresh of this page.
  const state = useLocation().state as OrderConfirmationState | null;

  // Opened directly with no order behind it.
  if (!state?.orderNumber) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-10 sm:py-16 motion-safe:animate-fade-up">
      <span className="relative mx-auto mb-8 flex items-center justify-center w-20 h-20">
        <span className="absolute inset-0 rounded-full bg-green-500/15 motion-safe:animate-ping [animation-iteration-count:2]" />
        <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-green-600 text-white shadow-lg shadow-green-600/30">
          <Check className="w-10 h-10" strokeWidth={2.5} aria-hidden="true" />
        </span>
      </span>

      <p className="eyebrow">Order #EB-{state.orderNumber}</p>
      <h1 className="mt-3 text-4xl sm:text-5xl font-medium text-ink">Thank you!</h1>
      <p className="mt-4 text-lg text-ink-muted leading-relaxed">
        Your order is confirmed and your beans are queued for the roaster. A confirmation email is on
        its way (simulated).
      </p>

      <ol className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
        {TIMELINE.map(({ icon: Icon, title, text, done }) => (
          <li
            key={title}
            className={`rounded-2xl border p-4 ${done ? 'border-transparent bg-primary text-on-primary' : 'border-line bg-surface'}`}
          >
            <Icon className={`w-5 h-5 ${done ? '' : 'text-accent'}`} aria-hidden="true" />
            <p className={`mt-3 text-sm font-semibold ${done ? '' : 'text-ink'}`}>{title}</p>
            <p className={`mt-0.5 text-xs ${done ? 'opacity-75' : 'text-ink-subtle'}`}>{text}</p>
          </li>
        ))}
      </ol>

      <Link to="/" className="btn-primary mt-10">
        Continue shopping
      </Link>
    </div>
  );
}
