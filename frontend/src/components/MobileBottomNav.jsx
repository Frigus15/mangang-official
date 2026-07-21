import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Home, User, ShoppingCart, Heart, Grid } from 'lucide-react';

export default function MobileBottomNav({ onOpenCart }) {
  const { activePage, navigateTo, cart, wishlist, setActiveDashboardTab } = useContext(ShopContext);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleTabClick = (tabId) => {
    if (tabId === 'home') {
      navigateTo('home');
    } else if (tabId === 'profile') {
      setActiveDashboardTab('account');
      navigateTo('dashboard');
    } else if (tabId === 'cart') {
      onOpenCart();
    } else if (tabId === 'wishlist') {
      setActiveDashboardTab('orders');
      navigateTo('dashboard');
    } else if (tabId === 'categories') {
      navigateTo('catalog');
    }
  };

  return (
    <div className="mobile-bottom-nav">
      <button 
        onClick={() => handleTabClick('home')} 
        className={`bottom-nav-item ${activePage === 'home' ? 'active' : ''}`}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button 
        onClick={() => handleTabClick('categories')} 
        className={`bottom-nav-item ${activePage === 'catalog' ? 'active' : ''}`}
      >
        <Grid size={20} />
        <span>Categories</span>
      </button>

      <button 
        onClick={() => handleTabClick('cart')} 
        className="bottom-nav-item"
      >
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="bottom-nav-badge">{cartCount}</span>
          )}
        </div>
        <span>Cart</span>
      </button>

      <button 
        onClick={() => handleTabClick('wishlist')} 
        className="bottom-nav-item"
      >
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <Heart size={20} style={{ color: wishlist.length > 0 ? 'var(--color-danger)' : 'inherit' }} />
          {wishlist.length > 0 && (
            <span className="bottom-nav-badge" style={{ background: 'var(--color-danger)' }}>{wishlist.length}</span>
          )}
        </div>
        <span>Wishlist</span>
      </button>

      <button 
        onClick={() => handleTabClick('profile')} 
        className={`bottom-nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
      >
        <User size={20} />
        <span>Profile</span>
      </button>
    </div>
  );
}
