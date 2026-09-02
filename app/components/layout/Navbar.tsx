"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ShoppingBag, Search, Menu, X, ShieldCheck } from "lucide-react";
import CartDrawer from "../cart/CartDrawer";
import SearchModal from "../search/SearchModal";

const navLinks = [
  { label: "New Arrivals", href: "/#new-arrivals" },
  { label: "Collections", href: "/#collections" },
  { label: "Categories", href: "/#categories" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  // Smooth & passive scroll handler
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial scroll
    if (typeof window !== "undefined") {
      setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Open search with Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Smooth scroll handler for anchor links
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("/#") && pathname === "/") {
        e.preventDefault();
        const targetId = href.replace("/#", "");
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsOpen(false);
      } else {
        setIsOpen(false);
      }
    },
    [pathname]
  );

  return (
    <>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Fixed Header with smooth GPU-accelerated background and shadow transitions */}
      <header
        className={`fixed w-full top-0 z-40 will-change-transform transition-colors duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-200/80 py-3.5"
            : "bg-white/85 backdrop-blur-sm border-b border-zinc-100/60 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 relative">
            
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Image
                src="/logo.png"
                alt="T&D Fashion Trend Logo"
                width={50}
                height={50}
                priority
                style={{ width: 'auto', height: 'auto' }}
                className="object-contain mix-blend-multiply max-h-12 w-auto"
              />
              <span
                className="font-playfair text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 whitespace-nowrap"
              >
                T&D <span className="font-light italic" style={{ color: '#D4AF37' }}>Trend</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-semibold text-zinc-700 hover:text-zinc-950 transition-colors relative py-1 group"
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-[2px] rounded-full transition-all duration-300 group-hover:w-full"
                    style={{ background: '#D4AF37' }}
                  />
                </Link>
              ))}
            </nav>

            {/* Desktop Actions (Admin, Search, Cart) */}
            <div className="hidden md:flex items-center space-x-5">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search Catalog"
                className="p-2 rounded-full text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 transition-all duration-150"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCartOpen(true)}
                aria-label="Shopping Cart"
                className="p-2 rounded-full text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 transition-all duration-150 relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    className="absolute 0 top-0.5 right-0.5 text-white text-[11px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold shadow-sm"
                    style={{ background: '#D4AF37' }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions: Search, Cart, Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2 text-zinc-800"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className="p-2 text-zinc-800 relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    className="absolute top-1 right-1 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold"
                    style={{ background: '#D4AF37' }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
                className="p-2 text-zinc-800 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu with smooth transition */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-zinc-100 bg-white/95 backdrop-blur-xl ${
            isOpen ? "max-h-96 opacity-100 py-4 shadow-xl" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="px-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-base font-serif text-zinc-900 font-semibold py-1.5 hover:text-gold-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-zinc-100">
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-900 shadow-sm"
                style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #a18143 100%)' }}
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
