import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart, updateQuantity } from "../store/slices/cartSlice";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const subtotal = items.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );

  const handleUpdate = (id: string, delta: number) => {
    const item = items.find((i: any) => i.id === id);
    if (item) {
      const newQty = Math.max(1, item.quantity + delta);
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <span className="material-symbols-outlined text-8xl text-slate-800 mb-6">
          shopping_cart
        </span>
        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-slate-500 font-medium mb-10">
          Time to upgrade your digital experience.
        </p>
        <button
          onClick={() => navigate("/catalog")} // Simplified navigation
          className="bg-primary text-background-dark font-black px-10 py-5 rounded-xl uppercase tracking-widest shadow-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="flex items-baseline justify-between mb-12">
        <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
          Your <span className="text-primary not-italic">Cart</span>
        </h1>
        <span className="text-slate-500 font-black uppercase tracking-widest text-xs">
          {items.length} items
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-surface-dark border border-white/5 rounded-2xl p-6 flex gap-6 items-center"
            >
              <div className="size-24 bg-accent-dark/50 rounded-xl p-4 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-white uppercase tracking-tight">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-500 font-medium mb-3">
                  {item.category}
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-xs text-red-500/70 hover:text-red-500 font-bold uppercase tracking-widest flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>{" "}
                  Remove
                </button>
              </div>
              <div className="flex items-center gap-4 bg-black/40 p-1 rounded-lg border border-white/5">
                <button
                  onClick={() => handleUpdate(item.id, -1)}
                  className="size-8 flex items-center justify-center hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    remove
                  </span>
                </button>
                <span className="w-4 text-center font-bold text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleUpdate(item.id, 1)}
                  className="size-8 flex items-center justify-center hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
              <div className="text-right min-w-[100px]">
                <p className="text-xl font-black text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                  ${item.price} EA
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="bg-surface-dark border border-white/5 rounded-2xl p-8 sticky top-32">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-8">
              Summary
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-400 font-bold uppercase text-xs tracking-widest">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-bold uppercase text-xs tracking-widest">
                <span>Shipping</span>
                <span className="text-primary">Free</span>
              </div>
              <div className="flex justify-between text-slate-400 font-bold uppercase text-xs tracking-widest pb-4 border-b border-white/5">
                <span>Tax</span>
                <span>${(subtotal * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-end mb-10">
              <div>
                <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">
                  Total
                </p>
                <p className="text-4xl font-black text-primary tracking-tighter">
                  ${(subtotal * 1.08).toFixed(2)}
                </p>
              </div>
              <span className="text-xs text-slate-600 font-black">USD</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-primary text-background-dark font-black py-5 rounded-xl text-lg uppercase tracking-widest shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Checkout{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
