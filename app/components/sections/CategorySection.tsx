import Link from 'next/link';

const categories = [
  { name: 'Shoes', slug: 'shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop' },
  { name: 'Sandals', slug: 'sandals', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=800&auto=format&fit=crop' },
  { name: 'Slippers', slug: 'slippers', image: 'https://images.unsplash.com/photo-1588661661153-dfbc227582b6?q=80&w=800&auto=format&fit=crop' },
  { name: 'Handbags', slug: 'handbags', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop' },
  { name: 'Clothes (Skirts & Blouses)', slug: 'clothes', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop' },
  { name: 'Gowns', slug: 'gowns', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop' },
];

export default function CategorySection() {
  return (
    <section id="categories" className="py-10 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-zinc-900 mb-3">Shop by Category</h2>
            <p className="text-zinc-500 max-w-2xl">
              Discover our exquisite collections tailored for your unique style.
            </p>
          </div>
        </div>

        {/* 2-column on mobile, 3-column on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-xl bg-zinc-100"
              style={{ height: '280px' }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              {/* Gold gradient overlay */}
              <div
                className="absolute inset-0 opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }}
              />

              {/* Gold top-left accent line */}
              <div
                className="absolute top-3 left-3 w-8 h-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: '#D4AF37' }}
              />

              <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end">
                <h3 className="text-base md:text-xl font-serif text-white mb-1 leading-tight">{category.name}</h3>
                <span
                  className="text-xs font-medium uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                  style={{ color: '#D4AF37' }}
                >
                  Shop
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
