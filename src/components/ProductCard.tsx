import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import type { Product } from '../data/products';
import { formatPrice } from '../lib/pricing';
import { formatRoast, ROAST_BADGE_COLORS } from '../lib/roast';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import { productImageUrl } from '../lib/images';
import { RoastLevel } from './RoastLevel';
import { ProductImage } from './ProductImage';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const productUrl = `/coffee/${product.id}`;

  const handleAdd = () => {
    addToCart(product);
    showToast({
      message: `${product.name} added to cart`,
      imageSrc: productImageUrl(product.imageId, 200),
      action: { label: 'View cart', to: '/cart' },
    });
  };

  return (
    <article className="group relative flex flex-col bg-surface rounded-3xl p-2.5 border border-line card-hover">
      {/* Image */}
      <div>
        <span className="block aspect-[4/3] rounded-[1.25rem] bg-gradient-to-br from-tint-100 to-tint-200 relative overflow-hidden">
          <ProductImage
            product={product}
            alt=""
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
            className="group-hover:scale-[1.06] transition-transform duration-700 ease-out"
          />
          <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
          <span className="absolute top-3 left-3 flex gap-1.5">
            <span className={`px-2.5 py-1 rounded-full text-[0.6875rem] font-semibold backdrop-blur-sm ${ROAST_BADGE_COLORS[product.category]}`}>
              {formatRoast(product.category)}
            </span>
          </span>
          {product.badge && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[0.6875rem] font-semibold bg-espresso-900/85 text-cream-50 backdrop-blur-sm">
              {product.badge}
            </span>
          )}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 px-2.5 pt-4 pb-2">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          {product.origin} · {product.region}
        </p>
        <h3 className="mt-1.5 text-xl font-semibold text-ink leading-snug">
          {/* Stretched link: the whole card is clickable, the add button sits above it. */}
          <Link to={productUrl} className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-focus">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm text-ink-muted line-clamp-1">
          {product.notes.slice(0, 3).join(' · ')}
        </p>

        <div className="mt-auto pt-5 flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-2xl font-semibold text-ink leading-none">
              {formatPrice(product.price)}
            </p>
            <div className="mt-2 flex items-center gap-2 text-[0.6875rem] text-ink-subtle">
              <RoastLevel level={product.roastLevel} />
              <span>{product.weight}</span>
            </div>
          </div>
          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className="relative z-10 flex items-center gap-1.5 h-11 pl-3.5 pr-4 rounded-full bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
