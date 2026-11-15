import type { Product } from '../data/products';

export const formatRoast = (category: Product['category']) =>
  `${category.charAt(0).toUpperCase() + category.slice(1)} Roast`;
