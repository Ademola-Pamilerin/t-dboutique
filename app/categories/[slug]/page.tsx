import { Metadata } from 'next';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CategoryView from './CategoryView';
import { ALL_PRODUCTS, CATEGORIES } from './categoryData';

// SEO Meta Data Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();

  const foundCategory = CATEGORIES.find(c => c.slug.toLowerCase() === normalizedSlug);
  const formattedTitle = normalizedSlug === 'all'
    ? 'All Categories & Collections'
    : foundCategory?.name || (slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '));

  return {
    title: `${formattedTitle} | T&D Fashion Trend Lagos`,
    description: foundCategory?.description || `Explore our latest ${formattedTitle} collection at T&D Fashion Trend. Handcrafted luxury and modern Nigerian couture.`,
    keywords: [slug, "fashion", "boutique", "T&D Fashion", "Nigerian fashion", "Lagos boutique", "luxury clothing"],
    openGraph: {
      title: `${formattedTitle} | T&D Fashion Trend`,
      description: `Discover exclusive ${formattedTitle} designs at T&D Fashion Trend Boutique.`,
      images: [
        {
          url: foundCategory?.bannerImage || '/logo.png',
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();

  const foundCategory = CATEGORIES.find(c => c.slug.toLowerCase() === normalizedSlug);

  const categoryTitle = normalizedSlug === 'all'
    ? 'All Products'
    : foundCategory?.name || (slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '));

  const categoryDescription = normalizedSlug === 'all'
    ? 'Browse our complete catalog of luxury gowns, handcrafted footwear, designer handbags, and tailored Nigerian apparel.'
    : foundCategory?.description || `Explore our meticulously curated ${categoryTitle.toLowerCase()} collection. Crafted for elegance and timeless style.`;

  // Get matching products
  const products = normalizedSlug === 'all'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.categorySlug.toLowerCase() === normalizedSlug || p.category.toLowerCase().includes(normalizedSlug));

  // Fallback if custom slug has no exact matches
  const displayProducts = products.length > 0
    ? products
    : ALL_PRODUCTS;

  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden">
      <Navbar />
      <div className="bg-zinc-50 pt-28 md:pt-32 pb-20 flex-grow">
        <CategoryView
          currentSlug={normalizedSlug}
          initialProducts={displayProducts}
          categoryTitle={categoryTitle}
          categoryDescription={categoryDescription}
        />
      </div>
      <Footer />
    </main>
  );
}
