import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Product, Category } from "../types";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

interface CatalogProps {
  onProductClick: (id: string) => void;
  addToCart: (p: Product) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onProductClick, addToCart }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter & Sort State
  const [activeCategory, setActiveCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch Categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  // Main Fetch Function
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (activeCategory !== "All") params.append('category', activeCategory);
      if (searchQuery) params.append('search', searchQuery);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (sortBy) params.append('sort', sortBy);

      const { data } = await api.get(`/products?${params.toString()}`);
      
      const mappedProducts = data.map((p: any) => ({
        ...p,
        id: p._id || p.id
      }));
      
      setProducts(mappedProducts);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery, minPrice, maxPrice, sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300); // Debounce to prevent too many calls while typing price
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
        <div>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-4">
            <span>Home</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary">Catalog</span>
          </nav>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">
            Premium <span className="text-primary not-italic">Gear</span>
          </h1>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === "All" ? "bg-primary text-background-dark border-primary shadow-[0_0_15px_rgba(0,217,255,0.3)]" : "bg-surface-dark text-slate-400 border-white/5 hover:border-primary/50"}`}
          >
            All Sectors
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat.name ? "bg-primary text-background-dark border-primary shadow-[0_0_15px_rgba(0,217,255,0.3)]" : "bg-surface-dark text-slate-400 border-white/5 hover:border-primary/50"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filters & Sorting Bar */}
      <div className="bg-surface-dark border border-white/5 p-6 rounded-2xl mb-12 flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Price Range</span>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                placeholder="MIN" 
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-20 bg-background-dark border border-white/10 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-700"
              />
              <span className="text-slate-700">—</span>
              <input 
                type="number" 
                placeholder="MAX" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-20 bg-background-dark border border-white/10 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-700"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sort By</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-background-dark border border-white/10 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest focus:ring-1 focus:ring-primary focus:border-primary text-slate-300"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Recalibrating Flux...</p>
        </div>
      ) : error ? (
        <div className="text-center py-24 px-6 border border-rose-500/20 bg-rose-500/5 rounded-2xl">
          <span className="material-symbols-outlined text-rose-500 text-5xl mb-4">terminal</span>
          <p className="text-rose-500 font-bold uppercase tracking-widest">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={onProductClick}
                onAddToCart={addToCart}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-24 bg-surface-dark rounded-2xl border border-white/5 border-dashed">
              <span className="material-symbols-outlined text-6xl text-slate-700 mb-4">search_off</span>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No signals found in this coordinate.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Catalog;
