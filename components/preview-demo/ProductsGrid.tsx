import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { Section } from '../Section';
import { INDUSTRIES, productsByIndustry } from '../../data/previewDemoProducts';

const LogoSlot: React.FC = () => (
  <div className="w-14 h-14 rounded-lg border-2 border-dashed border-bronze-300 bg-bronze-50/40 flex flex-col items-center justify-center shrink-0">
    <Layers size={18} className="text-bronze-400" />
  </div>
);

export const ProductsGrid: React.FC = () => {
  return (
    <Section id="products-grid" className="bg-white">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {INDUSTRIES.map((industry) => {
          const items = productsByIndustry(industry);
          return (
            <div key={industry} id={industry.toLowerCase().replace(/\s+/g, '-')}>
              <div className="flex items-baseline justify-between mb-8 border-b border-stone-200 pb-4">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  {industry}
                </h3>
                <span className="text-xs uppercase tracking-widest text-stone-400">
                  {items.length} {items.length === 1 ? 'Product' : 'Products'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {items.map((product) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4 }}
                    className="group p-5 bg-white border border-stone-200 rounded-xl hover:border-bronze-300 hover:shadow-[0_4px_24px_rgba(180,135,94,0.12)] transition-all duration-300"
                  >
                    <LogoSlot />
                    <h4 className="text-stone-900 font-semibold text-base mt-4 mb-2">{product.name}</h4>
                    <p className="text-stone-500 text-sm leading-relaxed">{product.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
