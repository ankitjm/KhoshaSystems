import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MapPin, Mail, Clock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '/', desc: 'Overview' },
  { label: 'Products', href: '/products', desc: 'Our Product Suite' },
  { label: 'Services', href: '/services', desc: 'What We Build' },
  { label: 'Work', href: '/work', desc: 'Case Studies' },
  { label: 'About', href: '/philosophy', desc: 'Our Story' },
  { label: 'Blog', href: '/blog', desc: 'Insights & Guides' },
  { label: 'Contact', href: '/contact', desc: 'Get in Touch' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : 'unset';
  }, [isMobileOpen]);

  return (
    <>
      {/* Top utility bar — desktop */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-stone-900 text-stone-400 hidden md:block">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex justify-between items-center h-8">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase">
              <MapPin size={10} className="text-bronze-500" /> Indiranagar, Bangalore
            </span>
            <span className="text-stone-700">|</span>
            <a href="mailto:ankit@khoshasystems.com" className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase hover:text-white transition-colors">
              <Mail size={10} className="text-bronze-500" /> ankit@khoshasystems.com
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+918884972272" className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase hover:text-white transition-colors">
              <Phone size={10} className="text-bronze-500" /> +91 888 497 2272
            </a>
            <span className="text-stone-700">|</span>
            <span className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase">
              <Clock size={10} className="text-bronze-500" /> Mon–Fri 9:00–18:00 IST
            </span>
          </div>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-stone-900 text-stone-400 md:hidden">
        <div className="px-5 flex justify-between items-center h-7">
          <span className="flex items-center gap-1 text-[9px] tracking-wider uppercase">
            <MapPin size={9} className="text-bronze-500" /> Bangalore, India
          </span>
          <a href="mailto:ankit@khoshasystems.com" className="flex items-center gap-1 text-[9px] tracking-wider uppercase">
            <Mail size={9} className="text-bronze-500" /> ankit@khoshasystems.com
          </a>
        </div>
      </div>

      <nav
        aria-label="Main navigation"
        className={`fixed left-0 right-0 z-50 transition-all duration-300 top-7 md:top-8 ${
          isScrolled || isMobileOpen
            ? 'bg-white/95 backdrop-blur-lg border-b border-stone-200/80 py-1.5'
            : 'bg-white/80 backdrop-blur-sm py-2 sm:py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group relative z-50" onClick={() => setIsMobileOpen(false)}>
            <img
              src="/logo.png"
              alt="Khoshà Systems"
              width="199"
              height="75"
              className="h-9 sm:h-11 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-4 lg:gap-5 items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-[10px] uppercase tracking-widest transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-bronze-700 font-semibold'
                    : 'text-stone-400 hover:text-stone-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-stone-900 text-white px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider hover:bg-bronze-600 transition-all duration-300 rounded"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative z-50 p-1.5 rounded-full text-stone-700 hover:bg-stone-100 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-40 pt-20 px-6 md:hidden flex flex-col h-[100dvh]"
          >
            <div className="flex-1 flex flex-col gap-1.5 relative z-10 overflow-y-auto pt-2">
              <div className="text-[10px] text-stone-400 uppercase tracking-widest mb-1 border-b border-stone-100 pb-2">
                Navigation
              </div>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.04 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="group block py-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xl font-serif transition-colors ${
                        location.pathname === item.href ? 'text-bronze-600' : 'text-stone-800 group-active:text-bronze-600'
                      }`}>
                        {item.label}
                      </span>
                      <ArrowRight className="text-stone-300" size={14} />
                    </div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest block">
                      {item.desc}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-3">
                <Link to="/contact" onClick={() => setIsMobileOpen(false)}
                  className="block w-full bg-stone-900 text-white text-center py-3 text-sm font-medium uppercase tracking-wider rounded active:bg-bronze-600 transition-colors">
                  Get Started
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="mt-auto mb-6 pt-4 border-t border-stone-100 relative z-10">
              <div className="space-y-2.5">
                <a href="tel:+918884972272" className="flex items-center gap-2.5 text-stone-400">
                  <Phone size={13} className="text-bronze-500 shrink-0" />
                  <span className="text-sm">+91 888 497 2272</span>
                </a>
                <a href="mailto:ankit@khoshasystems.com" className="flex items-center gap-2.5 text-stone-400">
                  <Mail size={13} className="text-bronze-500 shrink-0" />
                  <span className="text-sm">ankit@khoshasystems.com</span>
                </a>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 text-stone-400">
                  <MapPin size={13} className="text-bronze-500 mt-0.5 shrink-0" />
                  <span className="text-sm">Indiranagar, Bangalore (Bengaluru), Karnataka</span>
                </a>
                <div className="flex items-center gap-2.5 text-stone-400">
                  <Clock size={13} className="text-bronze-500 shrink-0" />
                  <span className="text-sm">Mon–Fri 9:00 AM – 6:00 PM IST</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
