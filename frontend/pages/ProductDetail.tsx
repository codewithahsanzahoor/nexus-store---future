
import React from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface ProductDetailProps {
  addToCart: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Media Gallery */}
        <div className="space-y-6">
          <div className="aspect-square bg-surface-dark border border-white/5 rounded-2xl p-12 flex items-center justify-center relative group overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full scale-75 group-hover:scale-90 transition-transform"></div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,217,255,0.3)] transform group-hover:scale-110 transition-transform duration-700" 
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-surface-dark border border-white/5 rounded-xl p-4 flex items-center justify-center cursor-pointer hover:border-primary transition-all grayscale hover:grayscale-0 opacity-50 hover:opacity-100">
                <img src={product.image} alt="Thumbnail" className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Details Column */}
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">In Stock</span>
              <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">SKU: NEX-{product.id.toUpperCase()}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase italic leading-none mb-6">
              {product.name}
            </h1>
            <div className="flex items-center gap-6">
              <span className="text-4xl font-black text-primary">${product.price}</span>
              {product.oldPrice && (
                <span className="text-2xl text-slate-600 line-through font-medium">${product.oldPrice}</span>
              )}
            </div>
          </div>

          <p className="text-lg text-slate-400 leading-relaxed font-light max-w-xl">
            {product.description}
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Technical Specs</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Latency', value: '0.2ms' },
                  { label: 'Battery', value: '40 Hours' },
                  { label: 'Drivers', value: 'Nexus Carbon' },
                  { label: 'Build', value: 'Aerospace Grade' }
                ].map(spec => (
                  <div key={spec.label} className="p-4 bg-surface-dark border border-white/5 rounded-xl">
                    <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-1">{spec.label}</p>
                    <p className="font-bold text-white uppercase tracking-tight">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6">
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-primary text-background-dark font-black py-5 rounded-xl text-lg uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                Add To Cart <span className="material-symbols-outlined font-black">add_shopping_cart</span>
              </button>
              <button className="w-full border-2 border-primary text-primary font-black py-4 rounded-xl text-lg uppercase tracking-[0.2em] hover:bg-primary/5 transition-all">
                Buy It Now
              </button>
            </div>
            
            <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">local_shipping</span>
              Free Express Shipping Worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
