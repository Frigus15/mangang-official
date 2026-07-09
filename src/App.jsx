import React, { useState, useContext } from 'react';
import { ShopContext } from './context/ShopContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import AdminPortal from './pages/AdminPortal';

export default function App() {
  const { activePage } = useContext(ShopContext);
  const [cartOpen, setCartOpen] = useState(false);

  // Page Switcher
  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'catalog':
        return <Catalog />;
      case 'product-details':
        return <ProductDetails />;
      case 'checkout':
        return <Checkout />;
      case 'dashboard':
        return <Dashboard />;
      case 'admin':
        return <AdminPortal />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={styles.appWrapper}>
      {/* Navigation Bar */}
      <Navbar onOpenCart={() => setCartOpen(true)} />

      {/* Slide-out Cart Sidebar */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Main Content Area */}
      <main style={styles.mainContent}>
        <div className="container">
          {renderActivePage()}
        </div>
      </main>

      {/* Footer block */}
      <Footer />
    </div>
  );
}

const styles = {
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative'
  },
  mainContent: {
    flex: '1 0 auto',
    width: '100%',
    position: 'relative',
    zIndex: 1
  }
};
