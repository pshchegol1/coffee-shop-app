import type { CategoryId, Product } from '../data/products';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'roast-asc' | 'roast-desc';

export const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'roast-asc', label: 'Roast: light to dark' },
  { id: 'roast-desc', label: 'Roast: dark to light' },
];

const searchableText = (p: Product) =>
  [p.name, p.origin, `${p.category} roast`, p.description, ...p.notes].join(' ').toLowerCase();

/**
 * Every word of the query must appear somewhere in the product's text, so
 * "kenya fruit" matches a Kenyan coffee whose description mentions fruit.
 */
export function filterProducts(
  products: Product[],
  { query, category }: { query: string; category: CategoryId }
): Product[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return products.filter(p => {
    if (category !== 'all' && p.category !== category) return false;
    if (words.length === 0) return true;
    const text = searchableText(p);
    return words.every(word => text.includes(word));
  });
}

const COMPARATORS: Record<Exclude<SortOption, 'featured'>, (a: Product, b: Product) => number> = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'roast-asc': (a, b) => a.roastLevel - b.roastLevel,
  'roast-desc': (a, b) => b.roastLevel - a.roastLevel,
};

/** Returns a new array; 'featured' keeps the catalog order. Ties keep catalog order too (sort is stable). */
export function sortProducts(products: Product[], sort: SortOption): Product[] {
  return sort === 'featured' ? products : [...products].sort(COMPARATORS[sort]);
}
