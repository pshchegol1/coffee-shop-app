export interface TastingProfile {
  /** Each on a 1–5 scale. */
  acidity: number;
  body: number;
  sweetness: number;
}

export interface Product {
  id: string;
  name: string;
  origin: string;
  /** Growing region within the origin country. */
  region: string;
  category: 'light' | 'medium' | 'dark';
  price: number;
  weight: string;
  description: string;
  notes: string[];
  roastLevel: number;
  process: string;
  altitude: string;
  varietal: string;
  profile: TastingProfile;
  /** Brew methods this coffee shines with. */
  brewWith: string[];
  /** Optional merchandising tag shown on the product photo. */
  badge?: 'Bestseller' | 'New' | 'Limited';
  /** File name stem in public/images/products, e.g. 'kenyan-aa' → kenyan-aa-400.avif */
  imageId: string;
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
    region: 'Gedeo Zone',
    category: 'light',
    price: 18.50,
    weight: '250g',
    description: 'A bright and complex coffee from the birthplace of arabica. Grown at elevations above 1,800 meters, this lot delivers an extraordinary cup with floral aromatics and a silky body that lingers on the palate.',
    notes: ['Blueberry', 'Jasmine', 'Lemon Zest', 'Honey'],
    roastLevel: 2,
    process: 'Washed',
    altitude: '1,800–2,200 m',
    varietal: 'Ethiopian Heirloom',
    profile: { acidity: 5, body: 2, sweetness: 4 },
    brewWith: ['Pour-over', 'Chemex', 'AeroPress'],
    badge: 'Bestseller',
    imageId: 'ethiopian-yirgacheffe',
  },
  {
    id: '2',
    name: 'Colombian Supremo',
    origin: 'Colombia',
    region: 'Huila',
    category: 'medium',
    price: 16.00,
    weight: '250g',
    description: 'Sourced from small farms in the Huila region, this supremo-grade bean offers a perfectly balanced cup. The high altitude and volcanic soil create a coffee with remarkable sweetness and a clean, satisfying finish.',
    notes: ['Caramel', 'Red Apple', 'Milk Chocolate', 'Walnut'],
    roastLevel: 3,
    process: 'Washed',
    altitude: '1,500–1,800 m',
    varietal: 'Caturra, Castillo',
    profile: { acidity: 3, body: 3, sweetness: 4 },
    brewWith: ['Drip', 'Pour-over', 'French Press'],
    imageId: 'colombian-supremo',
  },
  {
    id: '3',
    name: 'Brazilian Santos',
    origin: 'Brazil',
    region: 'Minas Gerais',
    category: 'medium',
    price: 14.50,
    weight: '250g',
    description: 'From the sun-drenched hills of Minas Gerais, this natural-process coffee delivers comfort in every sip. Low acidity and a full body make it an ideal everyday brew with a naturally sweet character.',
    notes: ['Hazelnut', 'Dark Chocolate', 'Brown Sugar', 'Toffee'],
    roastLevel: 3,
    process: 'Natural',
    altitude: '1,000–1,250 m',
    varietal: 'Bourbon, Mundo Novo',
    profile: { acidity: 2, body: 4, sweetness: 4 },
    brewWith: ['Espresso', 'Moka Pot', 'Drip'],
    imageId: 'brazilian-santos',
  },
  {
    id: '4',
    name: 'Guatemalan Antigua',
    origin: 'Guatemala',
    region: 'Antigua Valley',
    category: 'dark',
    price: 19.00,
    weight: '250g',
    description: 'Grown in the shadow of three volcanoes, this coffee benefits from rich volcanic soil and a unique microclimate. The result is a bold, full-bodied cup with deep chocolate undertones and a smoky sweetness.',
    notes: ['Dark Chocolate', 'Smoky Spice', 'Dried Fig', 'Molasses'],
    roastLevel: 4,
    process: 'Washed',
    altitude: '1,500–1,700 m',
    varietal: 'Bourbon',
    profile: { acidity: 2, body: 5, sweetness: 3 },
    brewWith: ['Espresso', 'French Press', 'Cold Brew'],
    badge: 'New',
    imageId: 'guatemalan-antigua',
  },
  {
    id: '5',
    name: 'Kenyan AA',
    origin: 'Kenya',
    region: 'Nyeri',
    category: 'light',
    price: 21.00,
    weight: '250g',
    description: 'The AA grade represents the largest and most flavorful beans from Kenya\'s central highlands. Washed processing highlights the bean\'s vibrant acidity and complex fruit character in every cup.',
    notes: ['Blackcurrant', 'Grapefruit', 'Tomato', 'Brown Sugar'],
    roastLevel: 2,
    process: 'Washed',
    altitude: '1,700–1,900 m',
    varietal: 'SL28, SL34',
    profile: { acidity: 5, body: 3, sweetness: 3 },
    brewWith: ['Pour-over', 'AeroPress', 'Chemex'],
    badge: 'Limited',
    imageId: 'kenyan-aa',
  },
  {
    id: '6',
    name: 'Sumatra Mandheling',
    origin: 'Indonesia',
    region: 'North Sumatra',
    category: 'dark',
    price: 17.50,
    weight: '250g',
    description: 'Wet-hulled in the traditional Giling Basah method, this Sumatran coffee develops its signature earthy depth and velvety body. A bold choice for those who appreciate complexity and a lingering finish.',
    notes: ['Cedar', 'Dark Cocoa', 'Tobacco', 'Earthy'],
    roastLevel: 5,
    process: 'Wet-hulled',
    altitude: '1,100–1,500 m',
    varietal: 'Typica, Catimor',
    profile: { acidity: 1, body: 5, sweetness: 2 },
    brewWith: ['French Press', 'Espresso', 'Cold Brew'],
    imageId: 'sumatra-mandheling',
  }
];

export type CategoryId = 'all' | Product['category'];

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All Coffees' },
  { id: 'light', label: 'Light Roast' },
  { id: 'medium', label: 'Medium Roast' },
  { id: 'dark', label: 'Dark Roast' },
];
