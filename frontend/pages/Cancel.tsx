import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center animate-in fade-in duration-700">
      <div className="size-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
        <span className="material-symbols-outlined text-red-500 text-5xl">cancel</span>
      </div>
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">Payment Cancelled</h1>
      <p className="text-slate-400 mb-12 max-w-lg mx-auto">
        Your payment process was interrupted or cancelled. You have not been charged.
      </p>
      <button
        onClick={() => navigate('/checkout')}
        className="px-8 py-3 bg-primary text-background-dark font-black rounded-xl uppercase tracking-widest hover:brightness-110 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default Cancel;
