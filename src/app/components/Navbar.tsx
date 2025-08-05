"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Menu, Droplet, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { usePathname } from 'next/navigation';

interface Bubble {
  id: number;
  x: number;
  duration: number;
  delay: number;
}

export default function AquaticNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // Hydration guard

  const pathname = usePathname();
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/Products' },
    { name: 'About', href: '.' },
    { name: 'Contact', href: '/contactUs' },
    { name: 'Account', href: '/account' },
  ];

  // Ensure client-only rendering
  useEffect(() => {
    setHasMounted(true);
    const checkSize = () => setIsDesktop(window.innerWidth > 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Generate bubbles only on client after hydration
  useEffect(() => {
    if (!hasMounted) return;
    if (isOpen) {
      const newBubbles: Bubble[] = Array.from({ length: 12 }).map((_, i) => ({
        id: i + Math.random(), // unique IDs
        x: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }));
      setBubbles(newBubbles);
    } else {
      setBubbles([]);
    }
  }, [isOpen, hasMounted]);

  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (!hasMounted) return null; // ⛔ Prevent SSR mismatch

  return (
    <>
      {/* Desktop Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between bg-gradient-to-r from-blue-950/90 via-blue-500/30 to-blue-950/90 shadow-lg px-6 py-4">
        <div className="flex items-center gap-3 text-white">
          <Droplet className="w-8 h-8 text-blue-400 animate-pulse" />
          <Link href="/" className="text-xl font-bold tracking-wide hover:text-green-400 transition-colors">
            Neon
          </Link>
        </div>
        <nav className="flex items-center gap-20 mr-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-white/90 hover:text-green-400 transition-colors ${pathname === item.href || (item.href === '/' && pathname === '') ? 'font-bold underline underline-offset-4' : ''}`}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
          {/* Cart Icon */}
          <Link href="/cart" className="relative ml-6 group">
            <ShoppingCart className="w-7 h-7 text-cyan-300 group-hover:text-green-400 transition-colors" />
            <span className="absolute -top-2 -right-2 bg-green-400 text-xs text-white font-bold rounded-full px-2 py-0.5 shadow">{cartCount}</span>
          </Link>
        </nav>
      </header>

      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 group md:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="w-6 h-6 text-white group-hover:text-green-400 transition-colors" />
      </button>

      {/* Mobile/Tablet Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.nav
              initial={isDesktop ? { y: -100, opacity: 0 } : { x: -100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={isDesktop ? { y: -100, opacity: 0 } : { x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed z-50 bg-gradient-to-b from-blue-950/90 via-emerald-950/90 to-teal-900/90 backdrop-blur-md border border-green-500/20 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between 
                ${isDesktop ? "top-16 left-0 right-0" : "top-0 left-0 h-full w-2/3"} 
                md:h-auto md:w-10 rounded-xl md:rounded-none px-6 py-12 md:px-0 md:py-0`}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8 md:mb-0 md:mr-8">
                <Droplet className="w-8 h-8 text-blue-400 animate-pulse" />
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-bold text-white hover:text-green-400 transition-colors"
                >
                  Neon
                </Link>
              </div>

              {/* Nav Links */}
              <ul className="flex flex-col md:flex-row md:items-center md:gap-8 space-y-4 md:space-y-0">
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ x: isDesktop ? 0 : 10 }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`block py-2 px-3 text-white/90 hover:text-green-400 transition-all duration-300 font-medium ${pathname === item.href || (item.href === '/' && pathname === '') ? 'font-bold underline underline-offset-4' : ''}`}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-teal-400 transition-all duration-300 hover:w-full" />
                  </motion.li>
                ))}
                {/* Cart Icon in Drawer */}
                <li className="mt-6 md:mt-0">
                  <Link href="/cart" className="relative flex items-center group" onClick={() => setIsOpen(false)}>
                    <ShoppingCart className="w-7 h-7 text-cyan-300 group-hover:text-green-400 transition-colors" />
                    <span className="absolute -top-2 -right-2 bg-green-400 text-xs text-white font-bold rounded-full px-2 py-0.5 shadow">{cartCount}</span>
                  </Link>
                </li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Water Bubbles Animation */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
            {bubbles.map((bubble) => (
              <motion.div
                key={bubble.id}
                initial={{ y: "100%", opacity: 0 }}
                animate={{
                  y: "-100%",
                  opacity: [0, 1, 0],
                  x: `${bubble.x}%`,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: bubble.duration,
                    ease: "linear",
                    repeatType: "loop",
                  },
                  opacity: {
                    duration: 0.5,
                    delay: bubble.delay,
                  },
                }}
                className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-blue-300/60 mix-blend-screen"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
