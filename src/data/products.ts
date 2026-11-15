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
  },
  // The coffees below borrow a photo of the same roast level until they get their own.
  // To add one: put <name>-{200,400,800}.{avif,webp} in public/images/products and update imageId.
  {
    id: '7',
    name: 'Costa Rica Tarrazú',
    origin: 'Costa Rica',
    region: 'Tarrazú',
    category: 'medium',
    price: 17.50,
    weight: '250g',
    description: 'Honey processing leaves some of the sticky fruit on the bean while it dries, and in Tarrazú\'s cool, high valleys that means a cup with syrupy sweetness and a clean, juicy finish. An easygoing coffee that still has plenty to say.',
    notes: ['Brown Sugar', 'Red Apple', 'Milk Chocolate', 'Orange'],
    roastLevel: 3,
    process: 'Honey',
    altitude: '1,200–1,900 m',
    varietal: 'Caturra, Catuaí',
    profile: { acidity: 3, body: 3, sweetness: 5 },
    brewWith: ['Pour-over', 'Drip', 'AeroPress'],
    imageId: 'colombian-supremo',
  },
  {
    id: '8',
    name: 'Panama Geisha',
    origin: 'Panama',
    region: 'Boquete',
    category: 'light',
    price: 34.00,
    weight: '125g',
    description: 'Geisha is the variety that put Panama on the specialty map, prized for an aroma closer to tea than coffee. Our rarest lot is roasted very light to keep every floral note intact. Brew it slowly and give it your full attention.',
    notes: ['Bergamot', 'Jasmine', 'White Peach', 'Honey'],
    roastLevel: 1,
    process: 'Washed',
    altitude: '1,600–1,800 m',
    varietal: 'Geisha',
    profile: { acidity: 4, body: 2, sweetness: 5 },
    brewWith: ['Pour-over', 'Chemex'],
    badge: 'Limited',
    imageId: 'ethiopian-yirgacheffe',
  },
  {
    id: '9',
    name: 'Rwanda Nyamasheke',
    origin: 'Rwanda',
    region: 'Lake Kivu',
    category: 'light',
    price: 19.50,
    weight: '250g',
    description: 'Grown on steep hillsides above Lake Kivu and dried whole in the cherry, this natural-process Rwandan is unapologetically fruity: ripe berries up front, a floral lift, and a cocoa finish that keeps it grounded. Superb as a cold brew.',
    notes: ['Strawberry', 'Hibiscus', 'Cacao Nib', 'Black Tea'],
    roastLevel: 2,
    process: 'Natural',
    altitude: '1,700–2,000 m',
    varietal: 'Red Bourbon',
    profile: { acidity: 4, body: 3, sweetness: 4 },
    brewWith: ['Pour-over', 'AeroPress', 'Cold Brew'],
    badge: 'New',
    imageId: 'kenyan-aa',
  },
  {
    id: '10',
    name: 'Peru Cajamarca',
    origin: 'Peru',
    region: 'Cajamarca',
    category: 'medium',
    price: 16.50,
    weight: '250g',
    description: 'Grown by smallholder families in Peru\'s northern Andes, often in the shade of fruit trees and native forest. A gentle, rounded cup with chocolate and nuts up front and a soft citrus note that keeps it lively. Our everyday morning coffee.',
    notes: ['Milk Chocolate', 'Toasted Almond', 'Mandarin', 'Panela'],
    roastLevel: 3,
    process: 'Washed',
    altitude: '1,600–1,900 m',
    varietal: 'Typica, Caturra, Bourbon',
    profile: { acidity: 3, body: 3, sweetness: 4 },
    brewWith: ['Drip', 'French Press', 'Pour-over'],
    imageId: 'brazilian-santos',
  },
  {
    id: '11',
    name: 'Mexico Chiapas Decaf',
    origin: 'Mexico',
    region: 'Chiapas',
    category: 'dark',
    price: 16.00,
    weight: '250g',
    description: 'All the comfort, none of the caffeine. These Chiapas beans are decaffeinated with the Swiss Water method (just water, temperature and time, no chemical solvents), then roasted a touch darker for a cocoa-rich cup that\'s as good at 9 p.m. as at 9 a.m.',
    notes: ['Cocoa', 'Caramel', 'Roasted Almond', 'Cinnamon'],
    roastLevel: 4,
    process: 'Swiss Water Decaf',
    altitude: '1,200–1,600 m',
    varietal: 'Bourbon, Typica',
    profile: { acidity: 2, body: 4, sweetness: 3 },
    brewWith: ['Drip', 'French Press', 'Espresso'],
    imageId: 'guatemalan-antigua',
  },
  {
    id: '12',
    name: 'India Monsooned Malabar',
    origin: 'India',
    region: 'Malabar Coast',
    category: 'dark',
    price: 18.00,
    weight: '250g',
    description: 'Monsooning recreates the long, humid sea voyages of the sailing-ship era: the beans are spread out in open warehouses on India\'s Malabar Coast to soak up the monsoon winds for weeks. They swell, mellow and lose nearly all their acidity, leaving a heavy, spicy cup made for espresso.',
    notes: ['Nutmeg', 'Dark Chocolate', 'Malt', 'Toasted Walnut'],
    roastLevel: 5,
    process: 'Monsooned',
    altitude: '1,000–1,500 m',
    varietal: 'Kents, S795',
    profile: { acidity: 1, body: 5, sweetness: 2 },
    brewWith: ['Espresso', 'Moka Pot', 'French Press'],
    imageId: 'sumatra-mandheling',
  },
];

export type CategoryId = 'all' | Product['category'];

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All Coffees' },
  { id: 'light', label: 'Light Roast' },
  { id: 'medium', label: 'Medium Roast' },
  { id: 'dark', label: 'Dark Roast' },
];
