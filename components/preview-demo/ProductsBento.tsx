import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { Section } from '../Section';
import { INDUSTRIES, productsByIndustry } from '../../data/previewDemoProducts';

const LogoSlot: React.FC = () => (
  <div className="w-12 h-12 rounded-lg border-2 border-dashed border-bronze-400/40 bg-white/5 flex items-center justify-center shrink-0">
    <Layers size={16} className="text-bronze-400/70" />
  </div>
);

export const ProductsBento: React.FC = () => {
  return (
    <Section id="products-bento" className="bg-stone-900 relative overflow-hidden">
      <div className="absolute inset-0 pattern-diagonal pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 space-y-16 sm:space-y-20">
        {INDUSTRIES.map((industry) => {
          const items = productsByIndustry(industry);
          return (
            <div key={industry} id={industry.toLowerCase().replace(/\s+/g, '-')}>
              <div className="mb-8">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-bronze-400/80 block mb-2">
                  {items.length} {items.length === 1 ? 'Product' : 'Products'}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold">
                  <span className="bronze-gradient-text">{industry}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((product) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4 }}
                    className="group p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-bronze-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_rgba(180,135,94,0.1),0_4px_24px_rgba(180,135,94,0.14)] transition-all duration-300"
                  >
                    <LogoSlot />
                    <h4 className="text-white font-semibold text-base mt-4 mb-2">{product.name}</h4>
                    <p className="text-stone-400 text-sm leading-relaxed">{product.description}</p>
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
