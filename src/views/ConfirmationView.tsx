import { Link, Navigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

/** Passed as router state by CheckoutView when navigating here. */
export interface OrderConfirmationState {
  orderNumber: number;
}

export function ConfirmationView() {
  // Router state lives in browser history, so the number survives a refresh of this page.
  const state = useLocation().state as OrderConfirmationState | null;

  // Opened directly with no order behind it.
  if (!state?.orderNumber) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="text-center py-16 max-w-lg mx-auto">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-green-600 dark:text-green-400" aria-hidden="true" />
      </div>
      <h2 className="text-3xl font-bold text-ink mb-4">Order Confirmed!</h2>
      <p className="text-ink-subtle text-lg mb-2">
        Thank you for your order. Your specialty coffees are being prepared with care.
      </p>
      <p className="text-ink-subtle mb-8">
        A confirmation email has been sent (simulated). Your beans will be roasted fresh and shipped within 24 hours.
      </p>
      <div className="bg-tint-50 border border-line rounded-xl p-6 mb-8">
        <p className="text-sm text-ink-muted">
          <span className="font-semibold">Order #EB-{state.orderNumber}</span>
          <br />
          Estimated delivery: 3–5 business days
        </p>
      </div>
      <Link to="/" className="btn-primary inline-block">
        Continue Shopping
      </Link>
    </div>
  );
}
