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
  image: string;
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
    image: 'https://image.qwenlm.ai/generated-images/1a270eaa-ee69-4526-b09d-d4f1c00daf7e/_result.png',
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
    image: 'https://image.qwenlm.ai/generated-images/e3026985-9f2b-4301-9d9c-12beb3cf11cc/_result.png',
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
    image: 'https://image.qwenlm.ai/generated-images/e2e66fb0-f63d-4fdd-b96a-8a62bc006b3a/_result.png',
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
    image: 'https://image.qwenlm.ai/generated-images/1ed0cedb-cac5-4672-8e9c-807332a7161b/_result.png',
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
    image: 'https://image.qwenlm.ai/generated-images/1dd8ebe7-f95a-4459-9d32-0e142a61abfa/_result.png',
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
    image: 'https://image.qwenlm.ai/generated-images/e0375e9a-49d9-46b7-bbf9-9f2008d42c97/_result.png',
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
