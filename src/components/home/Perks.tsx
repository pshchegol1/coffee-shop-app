import { Flame, HeartHandshake, Leaf, Truck } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '../../lib/pricing';

const PERKS = [
  { icon: Flame, title: 'Roasted to order', text: 'Every bag ships within 48 hours of roasting.' },
  { icon: Truck, title: `Free shipping over $${FREE_SHIPPING_THRESHOLD}`, text: 'Fast, tracked delivery in 3–5 days.' },
  { icon: Leaf, title: 'Direct trade', text: 'We pay growers well above fair-trade prices.' },
  { icon: HeartHandshake, title: 'Love it, guaranteed', text: "Not your cup? We'll make it right." },
];

export function Perks() {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-3xl border border-line bg-line">
      {PERKS.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 bg-surface p-5 sm:p-6">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-tint-100 text-accent shrink-0">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-ink">{title}</span>
            <span className="block mt-1 text-xs sm:text-sm text-ink-subtle leading-relaxed">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
