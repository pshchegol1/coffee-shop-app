import { Flame, PackageCheck, Sprout } from 'lucide-react';
import { products } from '../../data/products';
import { ProductImage } from '../ProductImage';

const STEPS = [
  {
    icon: Sprout,
    title: 'Sourced at origin',
    text: 'We cup hundreds of samples a year and buy only the lots that stop us in our tracks — directly from the farms that grow them.',
  },
  {
    icon: Flame,
    title: 'Roasted in small batches',
    text: 'Each coffee gets its own roast profile, developed by hand in 12 kg batches to bring out what makes it special.',
  },
  {
    icon: PackageCheck,
    title: 'Shipped at peak freshness',
    text: 'Beans are bagged the day they cool and sent out within 48 hours, so they reach your grinder at their best.',
  },
];

export function Story() {
  const photo = products.find(p => p.id === '3') ?? products[0];

  return (
    <section id="story" className="scroll-mt-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center" aria-labelledby="story-title">
      <div className="relative">
        <div className="aspect-[4/3] lg:aspect-[5/6] rounded-[2rem] overflow-hidden bg-tint-100">
          <ProductImage product={photo} alt="Freshly roasted coffee beans" sizes="(min-width: 1024px) 600px, 100vw" />
        </div>
        <figure className="absolute -bottom-6 right-4 sm:right-8 max-w-xs rounded-2xl bg-surface border border-line p-5 shadow-xl">
          <blockquote className="font-display text-lg italic leading-snug text-ink">
            “Great coffee is grown, not made. Our job is not to get in its way.”
          </blockquote>
          <figcaption className="mt-3 text-xs text-ink-subtle">— Our head roaster</figcaption>
        </figure>
      </div>

      <div className="pt-6 lg:pt-0">
        <p className="eyebrow">Our story</p>
        <h2 id="story-title" className="mt-3 text-3xl sm:text-4xl font-medium text-ink">
          From farm to cup, <em className="text-accent">without shortcuts</em>
        </h2>
        <p className="mt-4 text-ink-muted leading-relaxed">
          Ember &amp; Bloom started with a secondhand roaster in a Brooklyn garage and one simple idea:
          coffee tastes best when every step is done with care.
        </p>

        <ol className="mt-8 space-y-6">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="flex gap-4">
              <span className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-tint-100 text-accent shrink-0">
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary text-[0.625rem] font-bold">
                  {i + 1}
                </span>
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm text-ink-muted leading-relaxed">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
