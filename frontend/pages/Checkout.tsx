
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { clearCart } from '../store/slices/cartSlice';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  
  const handleComplete = () => {
    dispatch(clearCart());
    navigate('/');
  };

  const subtotal = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="flex items-center justify-center gap-12 mb-16 overflow-hidden">
        <div className="flex flex-col items-center gap-2">
          <div className="size-12 rounded-full bg-primary flex items-center justify-center text-background-dark font-black shadow-[0_0_15px_rgba(0,217,255,0.4)]">
            <span className="material-symbols-outlined">local_shipping</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">Shipping</span>
        </div>
        <div className="h-[2px] w-20 bg-primary/20"></div>
        <div className="flex flex-col items-center gap-2 opacity-30">
          <div className="size-12 rounded-full border border-white/20 flex items-center justify-center">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Payment</span>
        </div>
        <div className="h-[2px] w-20 bg-primary/20"></div>
        <div className="flex flex-col items-center gap-2 opacity-30">
          <div className="size-12 rounded-full border border-white/20 flex items-center justify-center">
            <span className="material-symbols-outlined">rate_review</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Review</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-12">
          <section>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-8">Shipping Information</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" placeholder="First Name" />
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" placeholder="Last Name" />
              </div>
              <input className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" placeholder="Email Address" type="email" />
              <input className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" placeholder="Street Address" />
              <div className="grid md:grid-cols-3 gap-6">
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" placeholder="City" />
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" placeholder="ZIP" />
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" placeholder="Country" defaultValue="United States" />
              </div>
            </form>
          </section>

          <section>
            <h3 className="text-xl font-black uppercase tracking-tight mb-6">Shipping Method</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-primary bg-primary/5 p-6 rounded-2xl flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="size-6 rounded-full border-2 border-primary flex items-center justify-center p-1">
                    <div className="size-full bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-bold text-white uppercase tracking-tight">Standard Delivery</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">4-7 business days</p>
                  </div>
                </div>
                <span className="font-black text-primary uppercase">Free</span>
              </div>
              <div className="border border-white/10 p-6 rounded-2xl flex justify-between items-center cursor-pointer hover:border-white/20">
                <div className="flex items-center gap-4">
                  <div className="size-6 rounded-full border border-white/10"></div>
                  <div>
                    <p className="font-bold text-slate-400 uppercase tracking-tight">Express Shipping</p>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">1-2 business days</p>
                  </div>
                </div>
                <span className="font-black text-slate-500 uppercase tracking-widest">$24.00</span>
              </div>
            </div>
          </section>

          <button 
            onClick={handleComplete}
            className="w-full md:w-auto px-12 py-5 bg-primary text-background-dark font-black rounded-xl uppercase tracking-widest text-lg shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            Continue to Payment <span className="material-symbols-outlined font-black">arrow_forward</span>
          </button>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-surface-dark border border-white/5 p-8 rounded-3xl sticky top-32">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Order Summary</h3>
            <div className="space-y-6 mb-10 max-h-60 overflow-y-auto pr-4 hide-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="size-16 bg-accent-dark/50 rounded-xl p-2 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="size-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm text-white uppercase tracking-tight line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-black text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-8 pt-6 border-t border-white/5">
              <div className="flex justify-between text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-primary text-[10px] font-black uppercase tracking-widest">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-white text-[10px] font-black uppercase tracking-widest pt-3 border-t border-white/5">
                <span className="text-sm font-black">Total</span>
                <span className="text-2xl font-black text-primary tracking-tighter">${(subtotal * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-center gap-4">
              <span className="material-symbols-outlined text-primary">shield</span>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                Encrypted 256-bit SSL secure checkout. Your data is protected by nexus security systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
