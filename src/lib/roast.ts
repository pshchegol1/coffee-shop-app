import type { Product } from '../data/products';

export const formatRoast = (category: Product['category']) =>
  `${category.charAt(0).toUpperCase() + category.slice(1)} Roast`;

// Roast badges sit on top of product photos, so they keep fixed colors in both themes.
export const ROAST_BADGE_COLORS: Record<Product['category'], string> = {
  light: 'bg-amber-50/95 text-amber-900',
  medium: 'bg-orange-50/95 text-orange-900',
  dark: 'bg-espresso-100/95 text-espresso-800',
};
