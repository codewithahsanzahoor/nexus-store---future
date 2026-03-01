
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/10 h-20 flex items-center px-6 lg:px-12">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link 
            to="/"
            className="flex items-center gap-2 group"
          >
            <span className="material-symbols-outlined text-primary text-3xl font-bold">bolt</span>
            <span className="text-2xl font-black tracking-tighter uppercase italic">Nexus<span className="text-primary not-italic">Store</span></span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              to="/catalog"
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentPath === '/catalog' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
            >
              Shop
            </Link>
            <Link 
              to="/contact"
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentPath === '/contact' ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
            >
              Support
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus-within:border-primary/50 transition-all">
            <span className="material-symbols-outlined text-slate-500 text-lg">search</span>
            <input 
              type="text" 
              placeholder="Search gear..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-slate-600"
            />
          </div>
          
          <Link 
            to="/cart"
            className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-white">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-background-dark text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          <Link 
            to="/dashboard"
            className="w-9 h-9 rounded-full border border-primary/30 overflow-hidden hover:border-primary transition-all"
          >
            <img src="https://picsum.photos/100" alt="Profile" className="w-full h-full object-cover" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
