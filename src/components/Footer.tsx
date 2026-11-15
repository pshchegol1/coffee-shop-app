import { Coffee } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '../lib/pricing';

export function Footer() {
  return (
    <footer className="bg-espresso-800 text-cream-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-6 h-6 text-cream-400" aria-hidden="true" />
              <span className="text-xl font-bold text-cream-50">Ember & Bloom</span>
            </div>
            <p className="text-sm text-cream-300 leading-relaxed">
              Curating the world's finest specialty coffees, roasted to perfection and delivered fresh to your door.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-cream-50 mb-3">Our Promise</h4>
            <ul className="space-y-2 text-sm text-cream-300">
              <li>✓ Ethically sourced beans</li>
              <li>✓ Roasted within 48 hours</li>
              <li>✓ Free shipping over ${FREE_SHIPPING_THRESHOLD}</li>
              <li>✓ Satisfaction guaranteed</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-cream-50 mb-3">Connect</h4>
            <ul className="space-y-2 text-sm text-cream-300">
              <li>hello@emberandbloom.co</li>
              <li>Mon–Fri: 8am–6pm</li>
              <li>Brooklyn, New York</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-espresso-600 mt-8 pt-8 text-center">
          <p className="text-sm text-cream-400">
            © {new Date().getFullYear()} Ember & Bloom Coffee Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
