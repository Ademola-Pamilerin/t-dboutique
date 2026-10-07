import { BATCH_TWO_ITEMS } from './batch2Data';
import { BATCH_THREE_ITEMS } from './batch3Data';
import { BATCH_FIVE_ITEMS as BATCH_FIVE_LEGACY_ITEMS } from './batch5Data';
import { BATCH_FOUR_ITEMS, BATCH_FIVE_ITEMS as BATCH_FIVE_IMAGE_ITEMS, BATCH_SIX_ITEMS } from './batch_combined_data';
import { cloudinaryImage } from '../../lib/cloudinaryImages';

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

export function parseSizes(raw: string): string[] {
  if (!raw) return ['Free Size'];
  let clean = raw.trim().replace(/[\.`]+$/, '').trim();
  const lower = clean.toLowerCase();

  if (lower === 'free size' || lower === 'free' || lower === 'free size.') {
    return ['Free Size'];
  }
  if (lower === 'turkey top' || lower === 'turkey' || lower === 'uk') {
    return [clean];
  }

  // Handle compound like 'Turkey size 36, UK 10'
  if (/turkey.*uk/i.test(clean)) {
    return clean.split(',').map((s) => s.trim()).filter(Boolean);
  }

  // Clean typos like '1611' -> '16'
  clean = clean.replace('1611', '16');

  // Check for regional or standard size prefixes: UK, Turkey, US, Size
  let prefix = '';
  if (/(?:size\s*:\s*|size\s+)?uk\s*(?:size)?/i.test(clean)) {
    prefix = 'UK';
    clean = clean.replace(/^(?:size\s*:\s*|size\s+)?uk\s*(?:size)?\s*:?\s*/i, '');
  } else if (/(?:size\s*:\s*|size\s+)?turkey\s*(?:size)?/i.test(clean)) {
    prefix = 'Turkey';
    clean = clean.replace(/^(?:size\s*:\s*|size\s+)?turkey\s*(?:size)?\s*:?\s*/i, '');
  } else if (/(?:size\s*:\s*|size\s+)?us\s*(?:size)?/i.test(clean)) {
    prefix = 'US';
    clean = clean.replace(/^(?:size\s*:\s*|size\s+)?us\s*(?:size)?\s*:?\s*/i, '');
  } else if (/^size\s*:?\s*/i.test(clean)) {
    prefix = 'Size';
    clean = clean.replace(/^size\s*:?\s*/i, '');
  }

  clean = clean.replace(/[\.`]+$/, '').trim();

  // Split by '&', ',' or 'and'
  const parts = clean
    .split(/[,&]|\band\b/i)
    .map((p) => p.trim().replace(/[\.`]+$/, ''))
    .filter(Boolean);

  const results = parts.map((p) => {
    const pClean = p.replace(/^size\s*:?\s*/i, '').trim();
    if (prefix) {
      return `${prefix} ${pClean}`;
    }
    if (/^\d+$/.test(pClean)) {
      return `Size ${pClean}`;
    }
    return pClean;
  });

  // Return deduplicated array
  return Array.from(new Set(results));
}

export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'Clothes (Skirts & Blouses)',
    slug: 'clothes',
    description: 'Clothing looks from T&D Collections and selected designer labels, available in the sizes and prices shown.',
    bannerImage: cloudinaryImage('product-01.jpg'),
  },
  {
    name: 'Gowns',
    slug: 'gowns',
    description: 'Stunning gown collections celebrating elegance and modern luxury, tailored for special occasions and events.',
    bannerImage: cloudinaryImage('product-383.jpg'),
  },
  {
    name: 'Pants',
    slug: 'pants',
    description: 'Elegant and stylish pants and trousers for every occasion.',
    bannerImage: cloudinaryImage('product-01.jpg'),
  },
  {
    name: 'Shoes',
    slug: 'shoes',
    description: 'Exquisite footwear collections to complement your luxury looks.',
    bannerImage: cloudinaryImage('product-01.jpg'),
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

const BATCH_1_COUNT = BATCH_ITEMS.length;
const BATCH_2_COUNT = BATCH_TWO_ITEMS.length;
const BATCH_3_COUNT = BATCH_THREE_ITEMS.length;
const BATCH_4_COUNT = BATCH_FOUR_ITEMS.length;
const BATCH_5_LEGACY_COUNT = BATCH_FIVE_LEGACY_ITEMS.length;
const BATCH_5_IMAGE_COUNT = BATCH_FIVE_IMAGE_ITEMS.length;
const BATCH_6_COUNT = BATCH_SIX_ITEMS.length;
const PRODUCT_IMAGE_BATCH_COUNT = BATCH_1_COUNT + BATCH_2_COUNT + BATCH_3_COUNT + BATCH_5_LEGACY_COUNT;

const ALL_BATCH_ITEMS = [
  ...BATCH_ITEMS, 
  ...BATCH_TWO_ITEMS, 
  ...BATCH_THREE_ITEMS, 
  ...BATCH_FIVE_LEGACY_ITEMS,
  ...BATCH_FOUR_ITEMS, 
  ...BATCH_FIVE_IMAGE_ITEMS, 
  ...BATCH_SIX_ITEMS
] as const;

export const ALL_PRODUCTS: Product[] = ALL_BATCH_ITEMS.map(([brand, price, rawPrice, size], index) => {
  const number = String(index + 1).padStart(2, '0');
  let image: string;
  let gallery: string[] = [];
  let category = 'Clothes';
  let categorySlug = 'clothes';
  let name = `${brand} Look ${number}`;

  // Product-numbered images cover the first three batches and the legacy batch five.
  if (index < PRODUCT_IMAGE_BATCH_COUNT) {
    const imageNumber = index < BATCH_1_COUNT + BATCH_2_COUNT
      ? index * 2 + 1
      : index < BATCH_1_COUNT + BATCH_2_COUNT + BATCH_3_COUNT
        ? 305 + (index - BATCH_1_COUNT - BATCH_2_COUNT) * 2
        : 425 + (index - BATCH_1_COUNT - BATCH_2_COUNT - BATCH_3_COUNT) * 2;

    image = cloudinaryImage(`product-${String(imageNumber).padStart(2, '0')}.jpg`);
    gallery = [image, cloudinaryImage(`product-${String(imageNumber + 1).padStart(2, '0')}.jpg`)];
    
    // Keep existing category logic for original products
    if (imageNumber >= 383) {
        category = 'Gowns';
        categorySlug = 'gowns';
        name = `${brand} Gown Look ${number}`;
    }
  } 
  // Logic for Batch 4
  else if (index < PRODUCT_IMAGE_BATCH_COUNT + BATCH_4_COUNT) {
    const b4Index = index - PRODUCT_IMAGE_BATCH_COUNT;
    image = cloudinaryImage(`image${b4Index * 2 + 1}_batch_4.jpg`);
    gallery = [image, cloudinaryImage(`image${b4Index * 2 + 2}_batch_4.jpg`)];
    category = 'Gowns';
    categorySlug = 'gowns';
    name = `${brand} Gown Look ${number}`;
  }
  // Logic for Batch 5
  else if (index < PRODUCT_IMAGE_BATCH_COUNT + BATCH_4_COUNT + BATCH_5_IMAGE_COUNT) {
    const b5Index = index - (PRODUCT_IMAGE_BATCH_COUNT + BATCH_4_COUNT);
    image = cloudinaryImage(`image${b5Index * 2 + 1}_batch_5.jpg`);
    gallery = [image, cloudinaryImage(`image${b5Index * 2 + 2}_batch_5.jpg`)];
    category = 'Gowns';
    categorySlug = 'gowns';
    name = `${brand} Gown Look ${number}`;
  }
  // Logic for Batch 6
  else {
    const b6Index = index - (PRODUCT_IMAGE_BATCH_COUNT + BATCH_4_COUNT + BATCH_5_IMAGE_COUNT);
    image = cloudinaryImage(`image${b6Index * 2 + 1}.jpg`);
    gallery = [image, cloudinaryImage(`image${b6Index * 2 + 2}.jpg`)];
    
    const isGown = b6Index < 5;
    category = isGown ? 'Gowns' : 'Pants';
    categorySlug = isGown ? 'gowns' : 'pants';
    name = isGown ? `${brand} Gown Look ${number}` : `${brand} Pants Look ${number}`;
  }

  return {
    id: 1001 + index,
    slug: `${String(brand).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-look-${number}`,
    name,
    price: `₦${price}`,
    rawPrice: Number(rawPrice),
    image,
    gallery,
    category,
    categorySlug,
    isNew: index < 8,
    description: category === 'Gowns' 
      ? `${brand} gown, photographed and priced for T&D Fashion Trend Boutique.`
      : `${brand} clothing look, photographed and priced for T&D Fashion Trend Boutique.`,
    sizes: parseSizes(String(size)),
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
