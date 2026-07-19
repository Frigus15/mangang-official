import React, { useState, useContext } from 'react';
import { ShopContext } from './context/ShopContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import Loader from './components/Loader';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import AdminPortal from './pages/AdminPortal';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';

export default function App() {
  const { activePage, isLoggedIn, currentUser, pageLoading } = useContext(ShopContext);
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
        return isLoggedIn && currentUser?.role === 'admin' ? <AdminPortal /> : <Home />;
      case 'terms':
        return <TermsAndConditions />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'refund-policy':
        return <RefundPolicy />;
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

      {/* Sticky Mobile Bottom Navigation */}
      <MobileBottomNav onOpenCart={() => setCartOpen(true)} />

      {/* Full-Screen Page Transition Overlay */}
      {pageLoading && (
        <div className="page-transition-overlay">
          <Loader />
          <p style={{ marginTop: '24px', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '700', letterSpacing: '0.15em' }}>
            DELIVERING MANGANG STORE...
          </p>
        </div>
      )}
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
  },
  pageLoader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '450px',
    width: '100%'
  }
};
