import React, { useState, useEffect } from "react";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

interface HomeProps {
  onProductClick: (id: string) => void;
  onCategoryClick: (cat: string) => void;
}

const Home: React.FC<HomeProps> = ({ onProductClick, onCategoryClick }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get("/products");

        // Map _id to id if backend provides _id
        const mappedProducts = data.map((p: any) => ({
          ...p,
          id: p._id || p.id,
        }));

        setProducts(mappedProducts);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Products load karne mein problem hui.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const trending = products.slice(0, 4);
  const heroProduct = products[0];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
          Loading Products...
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
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative px-6 py-12 lg:py-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] -z-10"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-[0.3em] uppercase">
              <span className="material-symbols-outlined text-sm">bolt</span>{" "}
              Next Gen Wireless
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tighter uppercase italic">
              The Future <br />
              Of <span className="text-primary not-italic">Audio</span>
            </h1>
            <p className="text-lg text-slate-400  leading-relaxed font-light">
              Experience sonic precision with the new Nexus-X series. Engineered
              for those who demand absolute clarity and uncompromising style.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => heroProduct && onProductClick(heroProduct.id)}
                className="bg-primary text-background-dark font-black px-10 py-5 rounded-lg text-lg uppercase tracking-widest shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:brightness-110 active:scale-95 transition-all"
              >
                Pre-Order Now — ${heroProduct ? heroProduct.price : "..."}
              </button>
              <button
                onClick={() => onCategoryClick("audio")}
                className="border border-white/20 text-white font-bold px-10 py-5 rounded-lg text-lg uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                View Specs
              </button>
            </div>
          </div>

          <div
            className="relative flex items-center justify-center group cursor-pointer"
            onClick={() => heroProduct && onProductClick(heroProduct.id)}
          >
            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-75 animate-pulse"></div>
            {heroProduct && (
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
                className="relative z-10 w-full max-w-md drop-shadow-[0_20px_50px_rgba(0,217,255,0.4)] group-hover:scale-105 transition-transform duration-700"
              />
            )}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight uppercase italic">
              Featured Categories
            </h2>
            <div className="h-1 w-20 bg-primary mt-2"></div>
          </div>
          <button
            onClick={() => onCategoryClick("all")}
            className="text-primary text-sm font-black flex items-center gap-1 hover:underline tracking-widest"
          >
            BROWSE ALL{" "}
            <span className="material-symbols-outlined text-sm">
              open_in_new
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Headphones",
              count: 42,
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVwdYXH4iT07-8SsrpPkNQ0D8q1QXjVqV5xe93mMeGEGKOlF3GYocZvh8qwcrhVCRBnnXrAAt_Z5b4lwEx2Mu70XkyCRJ1BrMovDUOQ5kDhtJu0k3EOtwlJDEW7b0na3A-dEEg_IBitDBNDTGEOoqV1PGOnbOxNz67ZN2WSf_g-pSjy3QKyZBbcMAj8XYbgMxKska1V_y6C-yt1-mpPFGCMXMUawTUGpEEY6ealQbJ7ibwh2sr8a83vy_dREBCo7PYmydCTMUHHKM",
            },
            {
              name: "Wearables",
              count: 18,
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcatktqRZhLczS_yxbVFOS_hvMqblelookNTrPf_XeL7GgciZ9fl9lFwIQjiGDuubbg3hmF_L4jvUrDgiVM9UKNdPhMJKmn6TPwGsN28vYFOgLrCUJWe87HICW_08Hg597837iFnOAhbXWk3-Sk5eaEQEYuZ0TxUdmZZuwjIRlezv8AzbfOF5qBn90M7y0jFGkyf1MXst8keLlYG6jrvYjKcB2QIP-AhK6vAyGv4_emtv0MOlbR_j1rNPffd2mL9bfLUNkiTfqqXY",
            },
            {
              name: "Gaming",
              count: 29,
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ_rklrlN374afsRNlJdVRROfx78VyGQsU4akq-le3QVXbBICF4pikEStPf0oMrFoiq3JW-TkC-5_w4oJicCAyDjTFSVF4mPyHIaqei_HpPA66BTKbhtikDaUCoOvb99jOU2exGvP5mUWZL0HbVd7GPHsg4BAyWY9V73qSR2nrUI5dXrLmkk-Gl0sukjoFruOSQHgsAb016aM0hP8uGN4VnCAgIG81B-78Ttti2NAtMNKnmHZZ289w3dsBcQSk-d0mJA0XxK7YIzs",
            },
            {
              name: "Audio Gear",
              count: 85,
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnXVs2Vaq2KgKITp-N6jHLz6sW0qk-Z8aRmLAxu45DacpEVRK4Jwos0JiezjMtENfivY0kTI4yHxangJLRGEn3FsRLFC60F_AMcmNuf8xG2-3ejJDxkPA14VEfUBv1YKpH6JSmos8vFuSYa05FzDUXWSo7siprCbASRQJC7Nps0q6jpuyEsI1kFlLNtQnM7QFUUmMgTHhhzP1m4UgekPHd_xpPq2tXte9l3PdPj1lbuF9oyE9RgptXABHFNNezJ85Yl_LNu9AGugs",
            },
          ].map((cat) => (
            <div
              key={cat.name}
              onClick={() => onCategoryClick(cat.name)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-surface-dark border border-white/5 transition-all transform hover:-translate-y-2"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-xl font-black uppercase tracking-widest text-white">
                  {cat.name}
                </h3>
                <p className="text-xs text-primary font-bold tracking-[0.2em] mt-1">
                  {cat.count} PRODUCTS
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl font-black tracking-tight uppercase italic">
                Trending Now
              </h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">
                The most sought-after tech this week.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={onProductClick}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
