import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '../lib/pricing';
import { Logo } from './Header';

const SHOP_LINKS = [
  { to: '/#shop', label: 'All coffees' },
  { to: '/#roast-guide', label: 'Roast guide' },
  { to: '/#story', label: 'Our story' },
  { to: '/cart', label: 'Your cart' },
];

export function Footer() {
  return (
    <footer className="bg-espresso-950 text-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5">
            <Link to="/" aria-label="Ember & Bloom — home" className="inline-block">
              <Logo inverted />
            </Link>
            <p className="mt-5 max-w-sm text-sm text-cream-200/70 leading-relaxed">
              A small-batch roastery in Brooklyn. We buy directly from growers we know by name and
              roast every bag to order, so it arrives at its peak.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-400 mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              {SHOP_LINKS.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-cream-200/80 hover:text-cream-50 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-400 mb-4">Our promise</h4>
            <ul className="space-y-2.5 text-sm text-cream-200/80">
              <li>Ethically sourced</li>
              <li>Roasted within 48h</li>
              <li>Free shipping over ${FREE_SHIPPING_THRESHOLD}</li>
              <li>Satisfaction guaranteed</li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-400 mb-4">Visit the roastery</h4>
            <ul className="space-y-3 text-sm text-cream-200/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-cream-400 shrink-0" aria-hidden="true" />
                Brooklyn, New York
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-cream-400 shrink-0" aria-hidden="true" />
                Mon–Fri, 8am–6pm
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 text-cream-400 shrink-0" aria-hidden="true" />
                hello@emberandbloom.co
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-200/50">
          <p>© {new Date().getFullYear()} Ember &amp; Bloom Coffee Co. All rights reserved.</p>
          <p>Roasted with care in Brooklyn, NY</p>
        </div>
      </div>
    </footer>
  );
}
