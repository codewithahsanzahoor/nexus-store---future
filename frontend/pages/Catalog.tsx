import React, { useState, useMemo, useEffect } from "react";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";

interface CatalogProps {
  onProductClick: (id: string) => void;
  addToCart: (p: Product) => void;
}

const API_URL = "http://localhost:5000/api/products";

const Catalog: React.FC<CatalogProps> = ({ onProductClick, addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(
            `Server error: ${response.status} ${response.statusText}`,
          );
        }
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Products load karne mein problem hui.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
          Loading Catalog...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
        <span className="material-symbols-outlined text-6xl text-rose-500">
          error_outline
        </span>
        <h2 className="text-2xl font-black uppercase tracking-tight text-white">
          Connection Failed
        </h2>
        <p className="text-slate-400 max-w-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-8 py-3 bg-primary text-background-dark font-black text-sm uppercase tracking-widest rounded-lg hover:brightness-110 transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-4">
            <span>Home</span>
            <span className="material-symbols-outlined text-[10px]">
              chevron_right
            </span>
            <span className="text-primary">Catalog</span>
          </nav>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">
            Premium <span className="text-primary not-italic">Gear</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Showing {filteredProducts.length} results for latest tech.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all border ${activeCategory === cat ? "bg-primary text-background-dark border-primary shadow-[0_0_20px_rgba(0,217,255,0.3)]" : "bg-surface-dark text-slate-400 border-white/5 hover:border-primary/50"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
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
          <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">
            inventory_2
          </span>
          <p className="text-slate-500 font-bold uppercase tracking-widest">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default Catalog;
