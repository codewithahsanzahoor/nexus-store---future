import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Product, Review } from "../types";
import { RootState } from "../store/store";
import api from "../services/api";

interface ProductDetailProps {
  addToCart: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Review Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch Product
        const productRes = await api.get(`/products/${id}`);
        const productData = {
          ...productRes.data,
          id: productRes.data._id || productRes.data.id
        };
        setProduct(productData);

        // Fetch Reviews
        const reviewsRes = await api.get(`/reviews/${id}`);
        setReviews(reviewsRes.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      const { data } = await api.post("/reviews", {
        productId: id,
        rating,
        comment
      });
      setReviews([data, ...reviews]);
      setComment("");
      setRating(5);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
          Synchronizing Nexus...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <span className="material-symbols-outlined text-6xl text-rose-500 mb-4">error_outline</span>
        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Neural Link Failed</h2>
        <p className="text-slate-400 max-w-sm">{error || "Product not found in the matrix."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
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
              <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">SKU: NEX-{product.id.substring(product.id.length - 6).toUpperCase()}</span>
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
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="border-t border-white/5 pt-16">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Customer Reviews</h2>
              <div className="flex items-center gap-4">
                <span className="text-5xl font-black text-white">{product.rating}</span>
                <div>
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`material-symbols-outlined ${i < Math.floor(product.rating) ? 'fill-1' : ''}`}>star</span>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Based on {reviews.length} reviews</p>
                </div>
              </div>
            </div>

            {user ? (
              <form onSubmit={handleReviewSubmit} className="bg-surface-dark border border-white/5 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">Write a Review</h3>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star} 
                      type="button"
                      onClick={() => setRating(star)}
                      className={`material-symbols-outlined text-xl ${star <= rating ? 'text-primary fill-1' : 'text-slate-600'}`}
                    >
                      star
                    </button>
                  ))}
                </div>
                <textarea 
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-700 min-h-[100px]"
                />
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-black py-3 rounded-lg text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                >
                  {submitting ? 'Transmitting...' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <div className="bg-white/5 border border-dashed border-white/10 p-8 rounded-2xl text-center">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">Auth Required</p>
                <p className="text-[10px] text-slate-600">Please login to contribute to the Nexus network.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-8 space-y-8">
            {reviews.length === 0 ? (
              <div className="py-12 text-center bg-surface-dark border border-white/5 rounded-2xl">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">No user data in this sector yet.</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="bg-surface-dark border border-white/5 p-8 rounded-2xl animate-in slide-in-from-bottom-2 duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-black uppercase italic">
                        {review.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white uppercase tracking-tight">{review.userName}</p>
                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Verified Nexus Link</p>
                      </div>
                    </div>
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`material-symbols-outlined text-sm ${i < review.rating ? 'fill-1' : ''}`}>star</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed font-light">{review.comment}</p>
                  <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.3em] mt-6">
                    {new Date(review.createdAt).toLocaleDateString()} // SYNC DATE
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
