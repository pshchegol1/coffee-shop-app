export interface Product {
  id: string;
  name: string;
  origin: string;
  category: 'light' | 'medium' | 'dark';
  price: number;
  weight: string;
  description: string;
  notes: string[];
  roastLevel: number;
  /** File name stem in public/images/products, e.g. 'kenyan-aa' → kenyan-aa-400.avif */
  imageId: string;
  emoji: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Ethiopian Yirgacheffe',
    origin: 'Ethiopia',
    category: 'light',
    price: 18.50,
    weight: '250g',
    description: 'A bright and complex coffee from the birthplace of arabica. Grown at elevations above 1,800 meters, this lot delivers an extraordinary cup with floral aromatics and a silky body that lingers on the palate.',
    notes: ['Blueberry', 'Jasmine', 'Lemon Zest', 'Honey'],
    roastLevel: 2,
    imageId: 'ethiopian-yirgacheffe',
    emoji: '🫐'
  },
  {
    id: '2',
    name: 'Colombian Supremo',
    origin: 'Colombia',
    category: 'medium',
    price: 16.00,
    weight: '250g',
    description: 'Sourced from small farms in the Huila region, this supremo-grade bean offers a perfectly balanced cup. The high altitude and volcanic soil create a coffee with remarkable sweetness and a clean, satisfying finish.',
    notes: ['Caramel', 'Red Apple', 'Milk Chocolate', 'Walnut'],
    roastLevel: 3,
    imageId: 'colombian-supremo',
    emoji: '🍎'
  },
  {
    id: '3',
    name: 'Brazilian Santos',
    origin: 'Brazil',
    category: 'medium',
    price: 14.50,
    weight: '250g',
    description: 'From the sun-drenched hills of Minas Gerais, this natural-process coffee delivers comfort in every sip. Low acidity and a full body make it an ideal everyday brew with a naturally sweet character.',
    notes: ['Hazelnut', 'Dark Chocolate', 'Brown Sugar', 'Toffee'],
    roastLevel: 3,
    imageId: 'brazilian-santos',
    emoji: '🌰'
  },
  {
    id: '4',
    name: 'Guatemalan Antigua',
    origin: 'Guatemala',
    category: 'dark',
    price: 19.00,
    weight: '250g',
    description: 'Grown in the shadow of three volcanoes, this coffee benefits from rich volcanic soil and a unique microclimate. The result is a bold, full-bodied cup with deep chocolate undertones and a smoky sweetness.',
    notes: ['Dark Chocolate', 'Smoky Spice', 'Dried Fig', 'Molasses'],
    roastLevel: 4,
    imageId: 'guatemalan-antigua',
    emoji: '🍫'
  },
  {
    id: '5',
    name: 'Kenyan AA',
    origin: 'Kenya',
    category: 'light',
    price: 21.00,
    weight: '250g',
    description: 'The AA grade represents the largest and most flavorful beans from Kenya\'s central highlands. Washed processing highlights the bean\'s vibrant acidity and complex fruit character in every cup.',
    notes: ['Blackcurrant', 'Grapefruit', 'Tomato', 'Brown Sugar'],
    roastLevel: 2,
    imageId: 'kenyan-aa',
    emoji: '🍇'
  },
  {
    id: '6',
    name: 'Sumatra Mandheling',
    origin: 'Indonesia',
    category: 'dark',
    price: 17.50,
    weight: '250g',
    description: 'Wet-hulled in the traditional Giling Basah method, this Sumatran coffee develops its signature earthy depth and velvety body. A bold choice for those who appreciate complexity and a lingering finish.',
    notes: ['Cedar', 'Dark Cocoa', 'Tobacco', 'Earthy'],
    roastLevel: 5,
    imageId: 'sumatra-mandheling',
    emoji: '🌿'
  }
];

export type CategoryId = 'all' | Product['category'];

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All Coffees' },
  { id: 'light', label: 'Light Roast' },
  { id: 'medium', label: 'Medium Roast' },
  { id: 'dark', label: 'Dark Roast' },
];
