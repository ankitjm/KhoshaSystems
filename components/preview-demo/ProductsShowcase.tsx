import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Check } from 'lucide-react';
import { INDUSTRIES, PRODUCTS, flagshipProducts, Industry } from '../../data/previewDemoProducts';

type Filter = Industry | 'All';

const LogoSlot: React.FC<{ size?: 'lg' | 'sm' }> = ({ size = 'sm' }) => {
  const dims = size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
  const iconSize = size === 'lg' ? 20 : 16;
  return (
    <div className={`${dims} rounded-lg border-2 border-dashed border-bronze-300 bg-bronze-50/40 flex items-center justify-center shrink-0`}>
      <Layers size={iconSize} className="text-bronze-400" />
    </div>
  );
};

export const ProductsShowcase: React.FC = () => {
  const [active, setActive] = useState<Filter>('All');
  const filtered = active === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.industry === active);
  const flagships = flagshipProducts();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-900 pt-14 sm:pt-16 pb-14 sm:pb-16 px-5 sm:px-6 md:px-12 lg:px-24">
        <div className="absolute inset-0 pattern-diagonal pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <span className="text-bronze-400 font-semibold tracking-widest uppercase text-sm block mb-4">
            Product Suite — Layout E: Flagship + Directory
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Proven Products.<br />A Growing <span className="bronze-gradient-text">Catalog.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed">
            Two products are live and shipping today. Twenty-three more are in motion across telecom,
            real estate, immigration, and AI automation — browse the full catalog below.
          </p>
        </div>
      </section>

      {/* Flagship spotlight */}
      <section className="bg-white px-5 sm:px-6 md:px-12 lg:px-24 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-8 border-b border-stone-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Flagship Products</h2>
            <span className="text-xs uppercase tracking-widest text-stone-400">Live & Shipping</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {flagships.map((product) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className="p-6 sm:p-8 bg-stone-50 border border-stone-200 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-5">
                  <LogoSlot size="lg" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-bronze-600 font-medium">
                      {product.industry}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">{product.name}</h3>
                  </div>
                </div>
                {product.tagline && (
                  <p className="text-bronze-600 font-medium text-sm uppercase tracking-wider mb-3">{product.tagline}</p>
                )}
                <p className="text-stone-500 text-sm sm:text-base leading-relaxed mb-6">{product.description}</p>
                {product.highlights && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-2">
                        <Check size={14} className="text-bronze-500 mt-0.5 shrink-0" />
                        <span className="text-stone-600 text-xs sm:text-sm leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
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

      {/* Full catalog grid */}
      <section className="bg-stone-50 px-5 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">Full Catalog</h2>
            <span className="text-xs uppercase tracking-widest text-stone-400">{filtered.length} Products</span>
          </div>

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
                  <div className="flex items-start justify-between mb-4">
                    <LogoSlot />
                    {product.flagship && (
                      <span className="text-[9px] uppercase tracking-widest text-bronze-600 bg-bronze-50 border border-bronze-200 rounded-full px-2 py-0.5">
                        Flagship
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1">
                    {product.industry}
                  </span>
                  <h4 className="text-stone-900 font-semibold text-base mb-2">{product.name}</h4>
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
