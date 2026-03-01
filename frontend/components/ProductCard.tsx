
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
  onAddToCart?: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  return (
    <div 
      className="group bg-surface-dark border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1"
      onClick={() => onClick(product.id)}
    >
      <div className="aspect-[4/5] bg-accent-dark/50 relative overflow-hidden flex items-center justify-center p-8">
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-black px-2 py-1 rounded tracking-widest uppercase shadow-[0_0_10px_rgba(168,85,247,0.4)]">New</span>
        )}
        {product.isBestseller && (
          <span className="absolute top-4 left-4 bg-primary text-background-dark text-[10px] font-black px-2 py-1 rounded tracking-widest uppercase shadow-[0_0_10px_rgba(0,217,255,0.4)]">Bestseller</span>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
        />
        {onAddToCart && (
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="absolute bottom-4 right-4 bg-primary text-background-dark size-10 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            <span className="material-symbols-outlined font-bold">add_shopping_cart</span>
          </button>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors uppercase tracking-tight">{product.name}</h3>
          <span className="text-primary font-black text-lg">${product.price}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`material-symbols-outlined text-xs ${i < Math.floor(product.rating) ? 'fill-1' : ''}`}>star</span>
            ))}
          </div>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">({product.reviews} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
