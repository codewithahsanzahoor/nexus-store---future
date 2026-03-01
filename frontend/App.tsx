
import React, { useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Product, CartItem } from './types';
import { PRODUCTS } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import GeminiAssistant from './components/GeminiAssistant';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const navigateToProduct = (id: string) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
      />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home onProductClick={navigateToProduct} onCategoryClick={() => navigate('/catalog')} />} />
          <Route path="/catalog" element={<Catalog onProductClick={navigateToProduct} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart items={cart} onUpdate={updateQuantity} onRemove={removeFromCart} onCheckout={() => navigate('/checkout')} />} />
          <Route path="/checkout" element={<Checkout cart={cart} onComplete={() => { setCart([]); navigate('/'); }} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Home onProductClick={navigateToProduct} onCategoryClick={() => navigate('/catalog')} />} />
        </Routes>
      </main>
      <Footer />
      <GeminiAssistant products={PRODUCTS} />
    </div>
  );
};

export default App;
