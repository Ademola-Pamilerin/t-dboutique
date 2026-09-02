export interface Product {
  id: number | string;
  slug: string;
  name: string;
  price: string;
  rawPrice: number;
  image: string;
  gallery?: string[];
  category: string;
  categorySlug: string;
  badge?: string;
  isNew?: boolean;
  description?: string;
  details?: string[];
  sizes?: string[];
  colors?: string[];
  fabric?: string;
}

export interface CategoryInfo {
  name: string;
  slug: string;
  description: string;
  bannerImage: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'Clothes (Skirts & Blouses)',
    slug: 'clothes',
    description: 'Clothing looks from T&D Collections and selected designer labels, available in the sizes and prices shown.',
    bannerImage: '/assets/images/products/product-01.jpeg',
  },
];

const BATCH_ITEMS = [
  ['Peacocks', '20,500', 20500, 'UK 10'],
  ['By Nancy', '75,000', 75000, 'XXL'],
  ['WE', '35,000', 35000, 'L'],
  ['T&D Collections', '28,500', 28500, 'Free Size'],
  ['T&D Collections', '30,000', 30000, 'Free Size'],
  ['T&D Collections', '38,000', 38000, 'Free Size'],
  ['T&D Collections', '55,000', 55000, 'Free Size'],
  ['T&D Collections', '25,000', 25000, 'Free Size'],
  ['Fanny', '55,000', 55000, 'XL'],
  ['Dorothy Perkins', '38,000', 38000, 'Free Size'],
  ['Moments', '35,000', 35000, 'Free Size'],
  ['WE', '35,000', 35000, 'XL'],
  ['T&D Collection', '35,000', 35000, 'Free Size'],
  ['T&D Collections', '30,500', 30500, 'Free Size'],
  ['T&D Collections', '28,000', 28000, 'Free Size'],
  ['Lamiar Italy', '45,000', 45000, 'Free Size'],
  ['T&D Collections', '28,000', 28000, 'Free Size'],
  ['T&D Collections', '45,000', 45000, 'Free Size'],
  ['Vimoment', '55,000', 55000, 'Free Size'],
  ['T&D Collections', '65,000', 65000, 'Free Size'],
  ['T&D Collections', '38,500', 38500, 'Free Size'],
  ['Fanny', '65,000', 65000, 'Free Size'],
  ['GENESE', '65,000', 65000, 'Free Size'],
  ['TEVMO', '75,000', 75000, 'Free Size'],
  ['T&D Collections', '45,000', 45000, 'Free Size'],
  ['T&D Collections', '18,000', 18000, 'Free Size'],
  ['VOGUE ALONE', '22,000', 22000, 'Free Size'],
  ['River Island, London', '35,000', 35000, 'Free Size'],
  ['RC', '22,000', 22000, 'XL'],
  ['X&T Fashion', '25,000', 25000, 'Free Size'],
  ['TEVMO', '55,000', 55000, 'Free Size'],
  ['Milk&Honey', '28,000', 28000, 'L'],
  ['SERPIL', '75,000', 75000, 'Size 2'],
  ['T&D Collections', '55,000', 55000, 'Free Size'],
  ['Vita Fushi', '55,000', 55000, 'Free Size'],
  ['XING MU DESIGN', '35,000', 35000, 'Free Size'],
  ['XING MU DESIGN', '35,000', 35000, 'Free Size'],
  ['T&D Collections', '38,000', 38000, 'Free Size'],
  ['Fashion & Best', '35,000', 35000, 'Free Size'],
  ['Fashion & Best', '35,000', 35000, 'Free Size'],
  ['Fashion & Best', '35,000', 35000, 'Free Size'],
] as const;

export const ALL_PRODUCTS: Product[] = BATCH_ITEMS.map(([brand, price, rawPrice, size], index) => {
  const number = String(index + 1).padStart(2, '0');
  const name = `${brand} Look ${number}`;
  return {
    id: 1001 + index,
    slug: `${brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-look-${number}`,
    name,
    price: `₦${price}`,
    rawPrice,
    image: `/assets/images/products/product-${String(index * 2 + 1).padStart(2, '0')}.jpeg`,
    gallery: [
      `/assets/images/products/product-${String(index * 2 + 1).padStart(2, '0')}.jpeg`,
      `/assets/images/products/product-${String(index * 2 + 2).padStart(2, '0')}.jpeg`,
    ],
    category: 'Clothes',
    categorySlug: 'clothes',
    isNew: index < 8,
    description: `${brand} clothing look, photographed and priced for T&D Fashion Trend Boutique.`,
    sizes: [size],
  };
});

export function getProductBySlug(slug: string): Product | undefined {
  const normalized = slug.toLowerCase();
  return ALL_PRODUCTS.find(
    (p) =>
      p.slug.toLowerCase() === normalized ||
      p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === normalized
  );
}
