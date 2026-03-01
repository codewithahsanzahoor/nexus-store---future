
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-2">Welcome back, <span className="text-primary not-italic">Alex</span></h1>
        <p className="text-slate-500 font-medium">Your nexus status: <span className="text-primary">Elite Member</span></p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'LIFETIME', value: '4,250', sub: 'Nexus Points', icon: 'star' },
          { label: 'CURRENT', value: '02', sub: 'Active Orders', icon: 'inventory_2' },
          { label: 'WISHLIST', value: '18', sub: 'Saved Items', icon: 'favorite' },
          { label: 'SAVED', value: '03', sub: 'Payment Methods', icon: 'payments' }
        ].map(stat => (
          <div key={stat.label} className="bg-surface-dark border border-white/5 p-8 rounded-2xl hover:border-primary/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform">{stat.icon}</span>
              <span className="text-[10px] font-black tracking-widest text-slate-600">{stat.label}</span>
            </div>
            <h4 className="text-4xl font-black text-white mb-1">{stat.value}</h4>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-dark border border-white/5 rounded-2xl p-8">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Recent Orders</h3>
          <div className="space-y-6">
            {[
              { id: 'NX-88210', product: 'Nexus-X Ultra Pro', date: 'Oct 24, 2023', status: 'Shipped', amount: '299.00' },
              { id: 'NX-88195', product: 'RGB Core TKL Keyboard', date: 'Oct 18, 2023', status: 'Delivered', amount: '110.00' }
            ].map(order => (
              <div key={order.id} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-xs font-black text-primary mb-1">#{order.id}</p>
                  <p className="font-bold text-white uppercase tracking-tight">{order.product}</p>
                  <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-1">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-white">${order.amount}</p>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${order.status === 'Shipped' ? 'bg-primary/10 text-primary' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[120px] font-black">bolt</span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-background-dark uppercase italic leading-none mb-4">Nexus Elite</h3>
            <p className="text-background-dark/80 font-bold leading-relaxed mb-8">
              Unlock free same-day shipping and early access to ultra-limited drops.
            </p>
          </div>
          <button className="bg-background-dark text-primary font-black py-4 rounded-xl uppercase tracking-widest text-sm hover:brightness-125 transition-all">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
