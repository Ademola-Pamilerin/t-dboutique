import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ProductDetailView from './ProductDetailView';
import { getProductBySlug, ALL_PRODUCTS } from '../../categories/[slug]/categoryData';

// Dynamic SEO Metadata for Each Product
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | T&D Fashion Trend',
      description: 'The requested product could not be found in our boutique catalog.',
    };
  }

  return {
    title: `${product.name} | T&D Fashion Trend Lagos`,
    description: product.description || `Discover the luxury ${product.name} at T&D Fashion Trend. Handcrafted in Nigeria with premium elegance. Price: ${product.price}.`,
    keywords: [product.name, product.category, "Nigerian boutique", "luxury fashion Lagos", "buy dress online Nigeria"],
    openGraph: {
      title: `${product.name} | T&D Fashion Trend`,
      description: product.description || `Shop ${product.name} at T&D Fashion Trend.`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col w-full overflow-x-hidden">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-4">
          <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
            <h1 className="text-3xl font-serif text-zinc-900 mb-3">Product Not Found</h1>
            <p className="text-sm text-zinc-500 mb-6">
              We couldn&apos;t find the product you were looking for. It may have been relocated or updated.
            </p>
            <Link
              href="/categories/all"
              className="inline-block py-3 px-6 rounded-lg text-sm font-semibold uppercase tracking-wider text-zinc-900 transition-all shadow-md"
              style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #a18143 100%)' }}
            >
              Browse All Collections
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Get related products from the same category
  const relatedProducts = ALL_PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden">
      <Navbar />
      <div className="bg-zinc-50 pt-28 md:pt-32 pb-20 flex-grow">
        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </div>
      <Footer />
    </main>
  );
}
