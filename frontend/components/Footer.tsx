
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-dark border-t border-white/5 pt-16 pb-8 px-6 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 text-primary mb-6">
            <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
            <h2 className="text-xl font-black uppercase italic tracking-tighter">Nexus</h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Leading the frontier of audio and wearable technology since 2024. Designed for the digital vanguard.
          </p>
          <div className="flex gap-4">
            {['public', 'share', 'alternate_email'].map(icon => (
              <button key={icon} className="size-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:text-primary hover:border-primary transition-all">
                <span className="material-symbols-outlined text-lg">{icon}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Explore</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link to="/catalog" className="hover:text-primary transition-colors">Catalog</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">New Drops</Link></li>
            <li><Link to="/catalog" className="hover:text-primary transition-colors">Refurbished</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Support</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            <li><button className="hover:text-primary transition-colors">Warranty Info</button></li>
            <li><button className="hover:text-primary transition-colors">Shipping Policy</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Newsletter</h4>
          <p className="text-slate-500 text-sm mb-4">Join the inner circle for exclusive drops.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-white/5 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-primary"
            />
            <button className="bg-primary text-background-dark px-4 py-2 rounded-lg hover:brightness-110 transition-all">
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
        <p>© 2024 NEXUS STORE. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <button className="hover:text-white transition-colors">Privacy Policy</button>
          <button className="hover:text-white transition-colors">Terms of Service</button>
          <button className="hover:text-white transition-colors">Cookies</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
