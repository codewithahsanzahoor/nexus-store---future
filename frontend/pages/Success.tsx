import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';

const Success: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      dispatch(clearCart());
    }
  }, [dispatch, sessionId]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center animate-in fade-in duration-700">
      <div className="size-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
        <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
      </div>
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">Payment Successful</h1>
      <p className="text-slate-400 mb-12 max-w-lg mx-auto">
        Your order has been placed successfully. Thank you for shopping with Nexus Store.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl uppercase tracking-widest hover:bg-white/10 transition-colors"
        >
          View Orders
        </button>
        <button
          onClick={() => navigate('/catalog')}
          className="px-8 py-3 bg-primary text-background-dark font-black rounded-xl uppercase tracking-widest hover:brightness-110 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Success;
