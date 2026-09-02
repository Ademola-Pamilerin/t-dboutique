import { Metadata } from 'next';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ProductPageClient from './ProductPageClient';
import { getProductBySlug, ALL_PRODUCTS } from '../../categories/[slug]/categoryData';

// Dynamic SEO Metadata for Each Product
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    const formattedTitle = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
    return {
      title: `${formattedTitle} | T&D Fashion Trend`,
      description: 'Discover luxury handcrafted fashion pieces at T&D Fashion Trend Boutique Lagos.',
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

  const relatedProducts = product
    ? ALL_PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4)
    : [];

  return (
    <main className="flex min-h-screen flex-col w-full overflow-x-hidden">
      <Navbar />
      <ProductPageClient
        slug={slug}
        initialProduct={product || null}
        initialRelated={relatedProducts}
      />
      <Footer />
    </main>
  );
}
