import { Link } from 'react-router-dom';
import { MapPin, ShoppingBag } from 'lucide-react';
import type { Product } from '../data/products';
import { formatPrice } from '../lib/pricing';
import { formatRoast } from '../lib/roast';
import { useCart } from '../hooks/useCart';
import { RoastLevel } from './RoastLevel';

// Badges sit on top of product photos, so they keep fixed colors in both themes.
const ROAST_BADGE_COLORS: Record<Product['category'], string> = {
  light: 'bg-amber-100 text-amber-800',
  medium: 'bg-orange-100 text-orange-800',
  dark: 'bg-espresso-200 text-espresso-700',
};

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const productUrl = `/coffee/${product.id}`;

  return (
    <div className="bg-surface rounded-2xl overflow-hidden border border-line card-hover group">
      {/* Product Image Area */}
      <Link to={productUrl} className="block w-full" aria-label={`View ${product.name}`}>
        <span className="block aspect-[4/3] bg-gradient-to-br from-tint-100 to-tint-200 relative overflow-hidden">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ROAST_BADGE_COLORS[product.category]}`}>
              {formatRoast(product.category)}
            </span>
          </span>
          <span className="absolute bottom-3 right-3 bg-surface/80 backdrop-blur-sm rounded-full px-2 py-1">
            <RoastLevel level={product.roastLevel} dotClassName="w-2 h-2" />
          </span>
        </span>
      </Link>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="font-bold text-ink text-lg leading-tight mb-1 group-hover:text-accent transition-colors">
          <Link to={productUrl}>{product.name}</Link>
        </h3>
        <div className="flex items-center gap-1 text-sm text-ink-subtle mb-3">
          <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{product.origin}</span>
          <span className="mx-1" aria-hidden="true">·</span>
          <span>{product.weight}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.notes.slice(0, 3).map(note => (
            <span key={note} className="px-2 py-0.5 bg-tint-50 text-ink-muted text-xs rounded-full border border-line">
              {note}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-ink">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary-hover transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
