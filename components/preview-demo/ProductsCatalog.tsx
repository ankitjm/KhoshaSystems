import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';
import { INDUSTRIES, PRODUCTS, Industry } from '../../data/previewDemoProducts';

const LogoSlot: React.FC = () => (
  <div className="w-12 h-12 rounded-lg border-2 border-dashed border-bronze-300 bg-bronze-50/40 flex items-center justify-center shrink-0">
    <Layers size={16} className="text-bronze-400" />
  </div>
);

type Filter = Industry | 'All';

export const ProductsCatalog: React.FC = () => {
  const [active, setActive] = useState<Filter>('All');
  const filtered = active === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.industry === active);

  return (
    <div>
      {/* Custom catalog hero — dark, stat-driven, no page-hero background image */}
      <section className="relative overflow-hidden bg-stone-900 pt-14 sm:pt-16 pb-14 sm:pb-16 px-5 sm:px-6 md:px-12 lg:px-24">
        <div className="absolute inset-0 pattern-diagonal pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <span className="text-bronze-400 font-semibold tracking-widest uppercase text-sm block mb-4">
            Product Catalog — Layout D
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Every Product We've <span className="bronze-gradient-text">Shipped.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed mb-10">
            One studio, four industries. Filter the catalog below to explore what we've built for telecom
            retail, real estate, immigration, and AI automation.
          </p>

          <div className="flex gap-8 sm:gap-12">
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">{PRODUCTS.length}</div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">Products</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">{INDUSTRIES.length}</div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">Industries</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">15+</div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">Years</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 lg:px-24 py-3 flex flex-wrap gap-2">
          {(['All', ...INDUSTRIES] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest rounded-full border transition-colors duration-200 ${
                active === f
                  ? 'bg-bronze-600 text-white border-bronze-600'
                  : 'bg-white text-stone-500 border-stone-200 hover:border-bronze-300 hover:text-bronze-600'
              }`}
            >
              {f}
              {f !== 'All' && (
                <span className="ml-1.5 opacity-60">{PRODUCTS.filter((p) => p.industry === f).length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered grid */}
      <section className="bg-white px-5 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((product) => (
                <div
                  key={product.slug}
                  className="group p-5 bg-white border border-stone-200 rounded-xl hover:border-bronze-300 hover:shadow-[0_4px_24px_rgba(180,135,94,0.12)] transition-all duration-300"
                >
                  <LogoSlot />
                  <span className="text-[10px] uppercase tracking-widest text-bronze-600 font-medium mt-4 block">
                    {product.industry}
                  </span>
                  <h4 className="text-stone-900 font-semibold text-base mt-1 mb-2">{product.name}</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">{product.description}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};
