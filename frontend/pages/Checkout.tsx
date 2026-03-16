import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { clearCart } from '../store/slices/cartSlice';
import api from '../services/api';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: cart } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    street: '',
    city: '',
    zipCode: '',
    country: 'United States',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (cart.length === 0) {
    return <Navigate to="/catalog" replace />;
  }

  const subtotal = cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  const totalAmount = subtotal * 1.08;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        shippingAddress: {
          street: shippingAddress.street,
          city: shippingAddress.city,
          zipCode: shippingAddress.zipCode,
          country: shippingAddress.country
        },
        totalAmount: totalAmount
      };

      await api.post('/orders', orderData);

      dispatch(clearCart());
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

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
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm font-bold uppercase tracking-widest">
                {error}
              </div>
            )}
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  required
                  name="firstName"
                  value={shippingAddress.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" 
                  placeholder="First Name" 
                />
                <input 
                  required
                  name="lastName"
                  value={shippingAddress.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" 
                  placeholder="Last Name" 
                />
              </div>
              <input 
                required
                name="email"
                type="email"
                value={shippingAddress.email}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" 
                placeholder="Email Address" 
              />
              <input 
                required
                name="street"
                value={shippingAddress.street}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" 
                placeholder="Street Address" 
              />
              <div className="grid md:grid-cols-3 gap-6">
                <input 
                  required
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" 
                  placeholder="City" 
                />
                <input 
                  required
                  name="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" 
                  placeholder="ZIP" 
                />
                <input 
                  required
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:ring-1 focus:ring-primary focus:border-primary" 
                  placeholder="Country" 
                />
              </div>

              <div className="pt-8">
                <h3 className="text-xl font-black uppercase tracking-tight mb-6">Shipping Method</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-10">
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
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-12 py-5 bg-primary text-background-dark font-black rounded-xl uppercase tracking-widest text-lg shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? 'Processing Nexus...' : (
                    <>
                      Place Order <span className="material-symbols-outlined font-black">bolt</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
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
                <span className="text-2xl font-black text-primary tracking-tighter">${totalAmount.toFixed(2)}</span>
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
