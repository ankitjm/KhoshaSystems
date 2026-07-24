import React from 'react';
import { ProductsGrid } from '../components/preview-demo/ProductsGrid';
import { ProductsDirectory } from '../components/preview-demo/ProductsDirectory';
import { ProductsBento } from '../components/preview-demo/ProductsBento';
import { ProductsCatalog } from '../components/preview-demo/ProductsCatalog';
import { ProductsShowcase } from '../components/preview-demo/ProductsShowcase';
import { Contact } from '../components/Contact';

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-stone-800 text-white text-center py-3 text-xs uppercase tracking-widest">
    {children}
  </div>
);

/**
 * Temporary review page — the 5 Products layout explorations only. Not linked from navigation.
 */
export const PreviewDemoProductsPage: React.FC = () => {
  return (
    <div>
      <SectionLabel>Products Layout A — Sectioned Grid</SectionLabel>
      <ProductsGrid />

      <SectionLabel>Products Layout B — Directory List</SectionLabel>
      <ProductsDirectory />

      <SectionLabel>Products Layout C — Dark Bento</SectionLabel>
      <ProductsBento />

      <SectionLabel>Products Layout D — Filterable Catalog</SectionLabel>
      <ProductsCatalog />

      <SectionLabel>Products Layout E — Flagship + Directory</SectionLabel>
      <ProductsShowcase />

      <Contact />
    </div>
  );
};
