import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, MapPin, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '../data/products';
import { formatPrice } from '../lib/pricing';
import { formatRoast } from '../lib/roast';
import { RoastLevel } from '../components/RoastLevel';
import { QuantityStepper } from '../components/QuantityStepper';
import { useCart } from '../hooks/useCart';

export function DetailView({ product, onBack }: {
  product: Product;
  onBack: () => void;
}) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<number | undefined>(undefined);

  // Don't let a pending "Added" reset fire after the view unmounts.
  useEffect(() => () => window.clearTimeout(addedTimer.current), []);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-ink-muted hover:text-ink mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-tint-100 to-tint-200 rounded-2xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-tint-100 text-ink-muted rounded-full text-sm font-medium">
              {formatRoast(product.category)}
            </span>
            <RoastLevel level={product.roastLevel} dotClassName="w-2.5 h-2.5" />
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-ink mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 text-ink-subtle mb-4">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            <span>{product.origin}</span>
            <span aria-hidden="true">·</span>
            <span>{product.weight}</span>
          </div>

          <p className="text-ink-muted leading-relaxed mb-6 text-base lg:text-lg">
            {product.description}
          </p>

          {/* Flavor Notes */}
          <div className="mb-6">
            <h3 className="font-semibold text-ink-soft mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" aria-hidden="true" /> Flavor Notes
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.notes.map(note => (
                <span key={note} className="px-3 py-1.5 bg-tint-50 border border-line rounded-full text-sm text-ink-muted">
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Price & Add to Cart */}
          <div className="mt-auto border-t border-line pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-ink">{formatPrice(product.price)}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <QuantityStepper value={quantity} onChange={setQuantity} min={1} />

              {/* Add Button */}
              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all active:scale-95 ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-primary text-on-primary hover:bg-primary-hover'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" aria-hidden="true" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                    Add to Cart — {formatPrice(product.price * quantity)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
