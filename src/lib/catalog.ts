import { categories, products as catalog } from '../data/products';
import type { CategoryId, Product } from '../data/products';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'roast-asc' | 'roast-desc';

export const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'roast-asc', label: 'Roast: light to dark' },
  { id: 'roast-desc', label: 'Roast: dark to light' },
];

/** "French Press" → "french-press", for readable URL values. */
export const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export interface FacetOption {
  id: string;
  label: string;
  /** Products in the whole catalog with this value. */
  count: number;
}

/** Distinct values in catalog order, so adding a product with a new brew method or process adds the option. */
function facet(getValues: (p: Product) => string[]): FacetOption[] {
  const options = new Map<string, FacetOption>();
  for (const product of catalog) {
    for (const label of new Set(getValues(product))) {
      const id = toSlug(label);
      const option = options.get(id) ?? { id, label, count: 0 };
      option.count++;
      options.set(id, option);
    }
  }
  return [...options.values()];
}

export const BREW_OPTIONS = facet(p => p.brewWith);
export const PROCESS_OPTIONS = facet(p => [p.process]);

/** Tasting-profile filters; each matches a strong (4–5 out of 5) score. */
const TASTES = [
  { id: 'bright', label: 'Bright & fruity', test: (p: Product) => p.profile.acidity >= 4 },
  { id: 'sweet', label: 'Sweet', test: (p: Product) => p.profile.sweetness >= 4 },
  { id: 'full-bodied', label: 'Full-bodied', test: (p: Product) => p.profile.body >= 4 },
] as const;

export type TasteId = (typeof TASTES)[number]['id'];

export const TASTE_OPTIONS: FacetOption[] = TASTES.map(({ id, label, test }) => ({
  id,
  label,
  count: catalog.filter(test).length,
}));

export interface CatalogFilters {
  query: string;
  category: CategoryId;
  /** Slugs from BREW_OPTIONS / PROCESS_OPTIONS; null means any. */
  brew: string | null;
  process: string | null;
  taste: TasteId | null;
}

export const NO_FILTERS: CatalogFilters = { query: '', category: 'all', brew: null, process: null, taste: null };

/** True when anything other than the search text narrows the results. */
export const hasNarrowingFilters = (f: CatalogFilters) =>
  f.category !== 'all' || f.brew !== null || f.process !== null || f.taste !== null;

// ---- URL params -----------------------------------------------------------
// Default values are left out of the URL, so the plain shop is just "/".

const oneOf = <T extends string>(value: string | null, allowed: readonly { id: T }[]): T | null =>
  allowed.find(o => o.id === value)?.id ?? null;

/** Reads filters and sort from the URL, ignoring unknown values rather than showing an empty shop. */
export function parseShopParams(params: URLSearchParams): { filters: CatalogFilters; sort: SortOption } {
  return {
    filters: {
      query: params.get('q') ?? '',
      category: oneOf(params.get('roast'), categories) ?? 'all',
      brew: oneOf(params.get('brew'), BREW_OPTIONS),
      process: oneOf(params.get('process'), PROCESS_OPTIONS),
      taste: oneOf(params.get('taste'), TASTES),
    },
    sort: oneOf(params.get('sort'), SORT_OPTIONS) ?? 'featured',
  };
}

export type ShopParam = 'q' | 'roast' | 'brew' | 'process' | 'taste' | 'sort';

/** Returns new params with the changes applied; null, '' and default values remove the key. */
export function withShopParams(params: URLSearchParams, changes: Partial<Record<ShopParam, string | null>>) {
  const next = new URLSearchParams(params);
  for (const [key, value] of Object.entries(changes)) {
    const isDefault = !value || (key === 'roast' && value === 'all') || (key === 'sort' && value === 'featured');
    if (isDefault) next.delete(key);
    else next.set(key, value);
  }
  return next;
}

// ---- Filtering and sorting ------------------------------------------------

const searchableText = (p: Product) =>
  [p.name, p.origin, p.region, p.process, `${p.category} roast`, p.description, ...p.notes, ...p.brewWith]
    .join(' ')
    .toLowerCase();

/**
 * Every filter must match. Every word of the query must appear somewhere in the
 * product's text, so "kenya fruit" matches a Kenyan coffee whose description mentions fruit.
 */
export function filterProducts(products: Product[], { query, category, brew, process, taste }: CatalogFilters): Product[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const tasteTest = TASTES.find(t => t.id === taste)?.test;
  return products.filter(p => {
    if (category !== 'all' && p.category !== category) return false;
    if (brew && !p.brewWith.some(b => toSlug(b) === brew)) return false;
    if (process && toSlug(p.process) !== process) return false;
    if (tasteTest && !tasteTest(p)) return false;
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
