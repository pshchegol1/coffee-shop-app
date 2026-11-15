import { useState } from 'react';
import { Check } from 'lucide-react';

export function ConfirmationView({ onBackToShop }: { onBackToShop: () => void }) {
  // Generated once per order; computing it during render would change it on every re-render.
  const [orderNumber] = useState(() => Math.floor(Math.random() * 90000 + 10000));

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
          <span className="font-semibold">Order #EB-{orderNumber}</span>
          <br />
          Estimated delivery: 3–5 business days
        </p>
      </div>
      <button onClick={onBackToShop} className="btn-primary">
        Continue Shopping
      </button>
    </div>
  );
}
