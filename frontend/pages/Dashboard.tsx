import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchMyOrders } from "../store/slices/orderSlice";
import { fetchProfile, updateProfile } from "../store/slices/profileSlice";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { orders, loading: ordersLoading } = useSelector((state: RootState) => state.orders);
  const { profile, loading: profileLoading } = useSelector((state: RootState) => state.profile);

  // Edit Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
      country: ""
    }
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchMyOrders());
      dispatch(fetchProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        address: {
          street: profile.address?.street || "",
          city: profile.address?.city || "",
          zipCode: profile.address?.zipCode || "",
          country: profile.address?.country || ""
        }
      });
    }
  }, [profile]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Calculate dynamic stats
  const activeOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const totalSpent = orders.reduce((acc, o) => acc + o.totalAmount, 0).toFixed(2);
  const nexusPoints = Math.floor(parseFloat(totalSpent) * 10);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-2">
            Welcome back,{" "}
            <span className="text-primary not-italic">
              {user.name.split(" ")[0]}
            </span>
          </h1>
          <p className="text-slate-500 font-medium">
            Your nexus status:{" "}
            <span className="text-primary">
              {user.role === "admin" ? "Administrator" : "Elite Member"}
            </span>
          </p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-3 border border-primary/50 text-primary font-black text-xs uppercase tracking-widest rounded-xl hover:bg-primary/10 transition-all flex items-center gap-2 w-fit"
        >
          <span className="material-symbols-outlined text-sm">{isEditing ? 'close' : 'edit'}</span>
          {isEditing ? 'Cancel Sync' : 'Re-configure Profile'}
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "LIFETIME", value: nexusPoints.toLocaleString(), sub: "Nexus Points", icon: "star" },
          { label: "CURRENT", value: activeOrdersCount.toString().padStart(2, '0'), sub: "Active Orders", icon: "inventory_2" },
          { label: "TOTAL SPENT", value: `$${totalSpent}`, sub: "Investment", icon: "payments" },
          { label: "SAVED", value: "03", sub: "Payment Methods", icon: "account_balance_wallet" },
        ].map((stat) => (
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
        <div className="lg:col-span-2 space-y-8">
          {isEditing ? (
            <div className="bg-surface-dark border border-primary/30 rounded-2xl p-8 animate-in slide-in-from-left-4 duration-500">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Profile Configuration</h3>
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">Username</label>
                    <input name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">Phone Nexus</label>
                    <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">Street Sector</label>
                  <input name="address.street" value={formData.address.street} onChange={handleInputChange} className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary" />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">City</label>
                    <input name="address.city" value={formData.address.city} onChange={handleInputChange} className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">Zip Code</label>
                    <input name="address.zipCode" value={formData.address.zipCode} onChange={handleInputChange} className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">Country</label>
                    <input name="address.country" value={formData.address.country} onChange={handleInputChange} className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary" />
                  </div>
                </div>
                <button type="submit" className="bg-primary text-background-dark font-black px-8 py-4 rounded-xl text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,217,255,0.4)] hover:brightness-110 active:scale-95 transition-all">
                  Save Configuration
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-surface-dark border border-white/5 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tight">Recent Orders</h3>
                {ordersLoading && <span className="text-xs text-primary animate-pulse font-bold">UPDATING NEXUS...</span>}
              </div>
              <div className="space-y-6">
                {orders.length === 0 ? (
                  <div className="py-10 text-center border border-dashed border-white/10 rounded-xl">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No chronal transactions found.</p>
                  </div>
                ) : (
                  orders.slice(0, 5).map((order) => (
                    <div key={order._id} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-xs font-black text-primary mb-1">#{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                        <p className="font-bold text-white uppercase tracking-tight">{order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}</p>
                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-white">${order.totalAmount.toFixed(2)}</p>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${order.status === "shipped" || order.status === "delivered" ? "bg-emerald-500/10 text-emerald-400" : "bg-primary/10 text-primary"}`}>{order.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group min-h-[250px]">
            <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-[100px] font-black">bolt</span></div>
            <h3 className="text-3xl font-black text-background-dark uppercase italic leading-none">Nexus Elite</h3>
            <button className="bg-background-dark text-primary font-black py-4 rounded-xl uppercase tracking-widest text-xs hover:brightness-125 transition-all">Upgrade Now</button>
          </div>

          <div className="bg-surface-dark border border-white/5 rounded-2xl p-8">
            <h3 className="text-xl font-black uppercase tracking-tight mb-6">Profile Details</h3>
            {profile ? (
              <div className="space-y-4">
                <div><p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Email Address</p><p className="text-sm font-bold text-white">{profile.email}</p></div>
                <div><p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Phone Nexus</p><p className="text-sm font-bold text-white">{profile.phone || 'Not linked'}</p></div>
                <div><p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Shipping Sector</p><p className="text-sm font-bold text-white">{profile.address?.city ? `${profile.address.city}, ${profile.address.country}` : 'No address saved'}</p></div>
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center"><span className="text-xs text-slate-600 font-bold animate-pulse">LOADING PROFILE...</span></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
