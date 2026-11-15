import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { products } from '../../data/products';
import type { Product } from '../../data/products';
import { formatPrice } from '../../lib/pricing';
import { productImageUrl } from '../../lib/images';
import { ProductImage } from '../ProductImage';

const byId = (id: string) => products.find(p => p.id === id) as Product;

const STATS = [
  { value: `${products.length}`, label: 'Single origins' },
  { value: '48h', label: 'Roast to ship' },
  { value: '100%', label: 'Arabica' },
];

export function Hero() {
  const [large, smallTop, smallBottom] = [byId('4'), byId('1'), byId('5')];
  const spotlight = products.find(p => p.badge === 'Limited') ?? smallBottom;

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-espresso-900 text-cream-50 ring-1 ring-white/5">
      {/* Warm glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 w-[36rem] h-[36rem] rounded-full bg-cream-500/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 right-0 w-[30rem] h-[30rem] rounded-full bg-amber-accent/15 blur-3xl" />

      <div className="relative grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-12 p-6 sm:p-10 lg:p-14 items-center">
        <div className="motion-safe:animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-cream-200">
            <Sparkles className="w-3.5 h-3.5 text-cream-400" aria-hidden="true" />
            Small-batch roastery · Brooklyn, NY
          </span>

          <h1 className="mt-6 text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem] font-medium">
            Coffee worth
            <br />
            <em className="font-normal text-cream-300">waking up</em> for.
          </h1>

          <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-cream-100/75">
            Hand-selected beans from the world's finest growing regions, roasted in small batches to
            bring out their unique character — and shipped the moment they're ready.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/#shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cream-400 px-7 py-3.5 text-sm font-semibold text-espresso-900 shadow-lg shadow-black/20 hover:bg-cream-300 transition-colors active:scale-[0.98]"
            >
              Shop the collection
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/#roast-guide"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-cream-50 hover:bg-white/10 transition-colors active:scale-[0.98]"
            >
              Find your roast
            </Link>
          </div>

          <dl className="mt-10 grid grid-cols-3 max-w-md divide-x divide-white/10 border-t border-white/10 pt-6">
            {STATS.map(stat => (
              <div key={stat.label} className="flex flex-col-reverse px-4 first:pl-0">
                <dt className="mt-1 text-xs text-cream-200/60">{stat.label}</dt>
                <dd className="font-display text-2xl sm:text-3xl text-cream-50">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photo collage */}
        <div className="relative motion-safe:animate-fade-up [animation-delay:120ms]">
          <div className="grid grid-cols-5 grid-rows-2 gap-3 h-72 sm:h-96 lg:h-[30rem]">
            <div className="col-span-3 row-span-2 rounded-3xl overflow-hidden bg-espresso-800">
              <ProductImage product={large} alt="" sizes="(min-width: 1024px) 340px, 60vw" loading="eager" />
            </div>
            <div className="col-span-2 rounded-3xl overflow-hidden bg-espresso-800">
              <ProductImage product={smallTop} alt="" sizes="(min-width: 1024px) 220px, 40vw" loading="eager" />
            </div>
            <div className="col-span-2 rounded-3xl overflow-hidden bg-espresso-800">
              <ProductImage product={smallBottom} alt="" sizes="(min-width: 1024px) 220px, 40vw" loading="eager" />
            </div>
          </div>

          {/* Floating spotlight card */}
          <Link
            to={`/coffee/${spotlight.id}`}
            className="absolute -bottom-4 left-3 sm:left-6 flex items-center gap-3 rounded-2xl bg-cream-50 p-2.5 pr-5 text-espresso-900 shadow-2xl shadow-black/30 hover:-translate-y-0.5 transition-transform"
          >
            <img
              src={productImageUrl(spotlight.imageId, 200)}
              alt=""
              className="w-12 h-12 rounded-xl object-cover"
            />
            <span>
              <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-cream-700">
                {spotlight.badge ? `${spotlight.badge} release` : 'Featured'}
              </span>
              <span className="block font-display text-base font-semibold leading-tight">{spotlight.name}</span>
              <span className="block text-xs text-espresso-500">{formatPrice(spotlight.price)} · {spotlight.weight}</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
