import { ArrowRight } from 'lucide-react';
import { products } from '../../data/products';
import type { Product } from '../../data/products';
import { RoastLevel } from '../RoastLevel';

const GUIDE: {
  id: Product['category'];
  title: string;
  tagline: string;
  description: string;
  level: number;
  bestFor: string;
  /** Bean color swatch; fixed in both themes. */
  swatch: string;
}[] = [
  {
    id: 'light',
    title: 'Light Roast',
    tagline: 'Bright, floral & fruity',
    description: 'Roasted just past first crack to keep the origin front and center. Lively acidity, tea-like body.',
    level: 2,
    bestFor: 'Pour-over, Chemex, AeroPress',
    swatch: 'from-[#d4a46b] to-[#a8743f]',
  },
  {
    id: 'medium',
    title: 'Medium Roast',
    tagline: 'Balanced & sweet',
    description: 'Caramelized sugars meet gentle acidity. The crowd-pleaser — round, smooth and easy to love.',
    level: 3,
    bestFor: 'Drip, French press, Espresso',
    swatch: 'from-[#9a6334] to-[#6b4020]',
  },
  {
    id: 'dark',
    title: 'Dark Roast',
    tagline: 'Bold, rich & smoky',
    description: 'Deep chocolate, spice and a heavy, syrupy body. Stands up beautifully to milk.',
    level: 5,
    bestFor: 'Espresso, Moka pot, Cold brew',
    swatch: 'from-[#4a2c18] to-[#22140b]',
  },
];

export function RoastGuide({ onSelect }: { onSelect: (category: Product['category']) => void }) {
  return (
    <section id="roast-guide" className="scroll-mt-24" aria-labelledby="roast-guide-title">
      <div className="max-w-2xl">
        <p className="eyebrow">Roast guide</p>
        <h2 id="roast-guide-title" className="mt-3 text-3xl sm:text-4xl font-medium text-ink">
          Not sure where to start?
        </h2>
        <p className="mt-3 text-ink-muted leading-relaxed">
          Roast level shapes everything in the cup. Pick the profile that sounds like you and we'll
          show you the beans to match.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {GUIDE.map(roast => {
          const count = products.filter(p => p.category === roast.id).length;
          return (
            <div key={roast.id} className="flex flex-col rounded-3xl border border-line bg-surface p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span
                  aria-hidden="true"
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${roast.swatch} shadow-inner ring-4 ring-tint-100`}
                />
                <RoastLevel level={roast.level} size="md" />
              </div>
              <h3 className="mt-6 text-2xl font-medium text-ink">{roast.title}</h3>
              <p className="mt-1 text-sm font-semibold text-accent">{roast.tagline}</p>
              <p className="mt-3 text-sm text-ink-muted leading-relaxed">{roast.description}</p>
              <p className="mt-4 text-xs text-ink-subtle">
                <span className="font-semibold text-ink-soft">Best for:</span> {roast.bestFor}
              </p>
              <button
                onClick={() => onSelect(roast.id)}
                className="group mt-6 pt-5 border-t border-line flex items-center justify-between text-sm font-semibold text-ink hover:text-accent transition-colors"
              >
                Shop {count} {roast.title.toLowerCase()}{count === 1 ? '' : 's'}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
