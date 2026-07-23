import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { Section } from '../Section';
import { INDUSTRIES, productsByIndustry } from '../../data/previewDemoProducts';

const anchorFor = (industry: string) => industry.toLowerCase().replace(/\s+/g, '-');

const LogoSlot: React.FC = () => (
  <div className="w-11 h-11 rounded-full border-2 border-dashed border-bronze-300 bg-bronze-50/40 flex items-center justify-center shrink-0">
    <Layers size={14} className="text-bronze-400" />
  </div>
);

export const ProductsDirectory: React.FC = () => {
  return (
    <Section id="products-directory" className="bg-stone-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
        {/* Sticky industry rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-1">
            <span className="block text-[10px] uppercase tracking-widest text-stone-400 mb-3">Jump to</span>
            {INDUSTRIES.map((industry) => (
              <a
                key={industry}
                href={`#${anchorFor(industry)}`}
                className="block text-sm text-stone-500 hover:text-bronze-600 py-1.5 transition-colors"
              >
                {industry}
              </a>
            ))}
          </div>
        </aside>

        {/* Directory rows */}
        <div className="space-y-14">
          {INDUSTRIES.map((industry) => {
            const items = productsByIndustry(industry);
            return (
              <div key={industry} id={anchorFor(industry)}>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-1">{industry}</h3>
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-5">
                  {items.length} {items.length === 1 ? 'Product' : 'Products'}
                </p>

                <div className="bg-white border border-stone-200 rounded-xl divide-y divide-stone-100 overflow-hidden">
                  {items.map((product) => (
                    <motion.div
                      key={product.slug}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4 p-4 sm:p-5 hover:bg-stone-50 transition-colors"
                    >
                      <LogoSlot />
                      <div className="min-w-0">
                        <h4 className="text-stone-900 font-medium text-sm sm:text-base">{product.name}</h4>
                        <p className="text-stone-500 text-xs sm:text-sm leading-relaxed mt-0.5">{product.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
