"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ShoppingBag, Search } from "lucide-react";
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

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
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

  return (
    <>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`fixed w-full top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-md py-4"
            : "bg-white/80 backdrop-blur-md shadow-sm py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center relative">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-4 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/logo.png"
                  alt="T&D Fashion Trend Logo"
                  width={80}
                  height={80}
                  style={{ width: 'auto', height: 'auto' }}
                  priority
                  className="hidden md:block object-cover mix-blend-multiply max-h-16"
                />
                <Image
                  src="/logo.png"
                  alt="T&D Fashion Trend Logo"
                  width={60}
                  height={60}
                  style={{ width: 'auto', height: 'auto' }}
                  priority
                  className="md:hidden object-cover mix-blend-multiply max-h-12"
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute left-[45%] -translate-x-1/2 md:static md:translate-x-0 font-playfair text-2xl md:text-4xl font-bold tracking-tighter group-hover:opacity-80 transition-opacity whitespace-nowrap"
                style={{ color: '#D4AF37' }}
              >
                T&D <span className="font-light italic" style={{ color: '#C5A028' }}>Trend</span>
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-base font-semibold text-zinc-700 hover:text-zinc-900 transition-colors relative group"
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-2 left-0 w-0 h-[2px] transition-all group-hover:w-full"
                      style={{ background: '#D4AF37' }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="text-zinc-700 hover:text-zinc-900 transition-colors transform hover:scale-110"
              >
                <Search className="w-6 h-6" />
              </button>

              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className="text-zinc-700 hover:text-zinc-900 transition-colors relative transform hover:scale-110"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold"
                    style={{ background: '#D4AF37' }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile: Search + Cart + Hamburger */}
            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="text-zinc-800"
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className="text-zinc-800 relative"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold"
                    style={{ background: '#D4AF37' }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-800 focus:outline-none"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl border-t border-zinc-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      className="block text-xl font-playfair text-zinc-900 font-medium hover:opacity-70 transition-opacity"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
