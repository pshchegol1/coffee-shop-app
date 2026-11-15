import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, ChevronRight, Coffee, Flame, Mountain, ShoppingBag, Sprout, Truck, Droplets, MapPin } from 'lucide-react';
import { products } from '../data/products';
import type { Product, TastingProfile } from '../data/products';
import { FREE_SHIPPING_THRESHOLD, formatPrice } from '../lib/pricing';
import { formatRoast, ROAST_BADGE_COLORS } from '../lib/roast';
import { productImageUrl } from '../lib/images';
import { RoastLevel } from '../components/RoastLevel';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';
import { QuantityStepper } from '../components/QuantityStepper';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import { NotFoundView } from './NotFoundView';

/** Route page for /coffee/:id. */
export function DetailView() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <NotFoundView
        title="Coffee not found"
        message="This coffee may no longer be available. Browse our current selection instead."
      />
    );
  }

  // Keyed by id so quantity and "Added" state reset when moving to another coffee.
  return <ProductDetails key={product.id} product={product} />;
}

const PROFILE_LABELS: Record<keyof TastingProfile, string> = {
  acidity: 'Acidity',
  body: 'Body',
  sweetness: 'Sweetness',
};

/** Same roast first, then the rest of the catalog. */
function relatedTo(product: Product, count = 3) {
  const others = products.filter(p => p.id !== product.id);
  return [
    ...others.filter(p => p.category === product.category),
    ...others.filter(p => p.category !== product.category),
  ].slice(0, count);
}

function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<number | undefined>(undefined);

  // Don't let a pending "Added" reset fire after the view unmounts.
  useEffect(() => () => window.clearTimeout(addedTimer.current), []);

  const handleAdd = () => {
    addToCart(product, quantity);
    showToast({
      message: `${quantity > 1 ? `${quantity} × ` : ''}${product.name} added to cart`,
      imageSrc: productImageUrl(product.imageId, 200),
      action: { label: 'View cart', to: '/cart' },
    });
    setAdded(true);
    window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setAdded(false), 2000);
  };

  const specs = [
    { icon: MapPin, label: 'Region', value: `${product.region}, ${product.origin}` },
    { icon: Droplets, label: 'Process', value: product.process },
    { icon: Mountain, label: 'Altitude', value: product.altitude },
    { icon: Sprout, label: 'Varietal', value: product.varietal },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-subtle">
          <li><Link to="/" className="hover:text-ink transition-colors">Home</Link></li>
          <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
          <li><Link to="/#shop" className="hover:text-ink transition-colors">Coffee</Link></li>
          <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
          <li aria-current="page" className="text-ink font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
        {/* Image */}
        <div className="lg:sticky lg:top-28">
          <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-tint-100 to-tint-200">
            {/* Square crop of a 4:3 photo renders 4/3 wider than its box (584px column on lg). */}
            <ProductImage product={product} sizes="(min-width: 1024px) 780px, 133vw" loading="eager" />
            <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${ROAST_BADGE_COLORS[product.category]}`}>
              {formatRoast(product.category)}
            </span>
            {product.badge && (
              <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-espresso-900/85 text-cream-50 backdrop-blur-sm">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="eyebrow">{product.origin} · {product.region}</p>
          <h1 className="mt-3 text-4xl lg:text-5xl font-medium text-ink leading-[1.08]">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-subtle">
            <span className="font-display text-3xl font-semibold text-ink">{formatPrice(product.price)}</span>
            <span>{product.weight} bag · whole bean</span>
          </div>

          <p className="mt-6 text-ink-muted leading-relaxed text-base lg:text-[1.0625rem]">
            {product.description}
          </p>

          {/* Tasting notes */}
          <div className="mt-7">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle font-sans mb-3">
              Tasting notes
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.notes.map(note => (
                <span key={note} className="px-3.5 py-1.5 bg-tint-100 rounded-full text-sm font-medium text-ink-soft">
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Profile */}
          <div className="mt-7 rounded-3xl border border-line bg-surface p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle font-sans">
                Flavor profile
              </h2>
              <span className="flex items-center gap-2 text-xs text-ink-subtle">
                <Flame className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                Roast
                <RoastLevel level={product.roastLevel} />
              </span>
            </div>
            <dl className="space-y-4">
              {(Object.keys(PROFILE_LABELS) as (keyof TastingProfile)[]).map(key => (
                <div key={key} className="grid grid-cols-[5.5rem_1fr_2rem] items-center gap-3 text-sm">
                  <dt className="text-ink-muted">{PROFILE_LABELS[key]}</dt>
                  <dd className="h-2 rounded-full bg-tint-100 overflow-hidden" aria-hidden="true">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-cream-400 to-accent"
                      style={{ width: `${(product.profile[key] / 5) * 100}%` }}
                    />
                  </dd>
                  <dd className="text-right text-xs font-semibold text-ink-soft">
                    {product.profile[key]}<span className="text-ink-subtle font-normal">/5</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Specs */}
          <dl className="mt-4 grid grid-cols-2 gap-3">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl bg-tint-50 border border-line p-4">
                <dt className="flex items-center gap-1.5 text-xs text-ink-subtle">
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 flex items-start gap-2 text-sm text-ink-muted">
            <Coffee className="w-4 h-4 mt-0.5 text-accent shrink-0" aria-hidden="true" />
            <span><span className="font-semibold text-ink-soft">Brew it with:</span> {product.brewWith.join(', ')}</span>
          </p>

          {/* Add to cart */}
          <div className="mt-8 pt-6 border-t border-line">
            <div className="flex items-center gap-3">
              <QuantityStepper value={quantity} onChange={setQuantity} min={1} />
              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 h-[3.25rem] px-6 rounded-full font-semibold text-sm transition-all active:scale-[0.98] shadow-sm hover:shadow-md ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-primary text-on-primary hover:bg-primary-hover'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" aria-hidden="true" />
                    Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                    <span className="whitespace-nowrap">
                      Add<span className="hidden sm:inline"> to cart</span> · {formatPrice(product.price * quantity)}
                    </span>
                  </>
                )}
              </button>
            </div>
            <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-sm text-ink-muted">
              <li className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-accent" aria-hidden="true" />
                Roasted within 48h of shipping
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-accent" aria-hidden="true" />
                Free shipping over ${FREE_SHIPPING_THRESHOLD}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-20 lg:mt-28" aria-labelledby="related-title">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow">Keep exploring</p>
            <h2 id="related-title" className="mt-3 text-3xl font-medium text-ink">You might also like</h2>
          </div>
          <Link to="/#shop" className="hidden sm:inline-flex text-sm font-semibold text-ink hover:text-accent transition-colors">
            View all coffees →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {relatedTo(product).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
