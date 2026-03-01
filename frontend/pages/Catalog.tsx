
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface CatalogProps {
  onProductClick: (id: string) => void;
  addToCart: (p: Product) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onProductClick, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-4">
            <span>Home</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary">Catalog</span>
          </nav>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">Premium <span className="text-primary not-italic">Gear</span></h1>
          <p className="text-slate-500 mt-2 font-medium">Showing {filteredProducts.length} results for latest tech.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all border ${activeCategory === cat ? 'bg-primary text-background-dark border-primary shadow-[0_0_20px_rgba(0,217,255,0.3)]' : 'bg-surface-dark text-slate-400 border-white/5 hover:border-primary/50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={onProductClick} 
            onAddToCart={addToCart}
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-24 bg-surface-dark rounded-2xl border border-white/5">
          <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">inventory_2</span>
          <p className="text-slate-500 font-bold uppercase tracking-widest">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Catalog;
