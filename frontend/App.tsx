import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { 
  addToCart as addToCartAction, 
  removeFromCart as removeFromCartAction, 
  updateQuantity as updateQuantityAction, 
  syncCart, 
  fetchCart 
} from './store/slices/cartSlice';
import { fetchWishlist } from './store/slices/wishlistSlice';
import { Product } from './types';
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
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import GeminiAssistant from './components/GeminiAssistant';

const ApiDocsRedirect: React.FC = () => {
  React.useEffect(() => {
    window.location.href = 'http://localhost:5000/api-docs';
  }, []);
  return null;
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const { user, token } = useSelector((state: RootState) => state.auth);
  
  const cartCount = cart.items.reduce((acc: number, item: any) => acc + item.quantity, 0);

  // Sync cart when items change and user is logged in
  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        dispatch(syncCart(cart.items));
      }, 500); // Debounce sync
      return () => clearTimeout(timer);
    }
  }, [cart.items, token, dispatch]);

  // Fetch cart and wishlist on login
  useEffect(() => {
    if (token) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [token, dispatch]);

  const addToCart = (product: Product) => {
    dispatch(addToCartAction({ ...product, quantity: 1 }));
  };

  const removeFromCart = (id: string) => {
    dispatch(removeFromCartAction(id));
  };

  const updateQuantity = (id: string, delta: number) => {
    const item = cart.items.find((i: any) => i.id === id);
    if (item) {
      const newQty = Math.max(1, item.quantity + delta);
      dispatch(updateQuantityAction({ id, quantity: newQty }));
    }
  };

  const navigateToProduct = (id: string) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartCount={cartCount} 
      />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home onProductClick={navigateToProduct} onCategoryClick={() => navigate('/catalog')} />} />
          <Route path="/catalog" element={<Catalog onProductClick={navigateToProduct} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/api-docs" element={<ApiDocsRedirect />} />
          <Route path="*" element={<Home onProductClick={navigateToProduct} onCategoryClick={() => navigate('/catalog')} />} />
        </Routes>
      </main>
      <Footer />
      <GeminiAssistant products={PRODUCTS} />
    </div>
  );
};

export default App;
