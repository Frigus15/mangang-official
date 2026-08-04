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
import MyOrders from './pages/MyOrders';
import Transactions from './pages/Transactions';
import AdminPortal from './pages/AdminPortal';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';

import Toast from './components/Toast';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[React Error Boundary]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '60px 24px', textAlign: 'center', maxWidth: '600px', margin: '40px auto' }} className="glass-panel">
          <h2 style={{ color: '#fff', fontSize: '24px', marginBottom: '12px' }}>Something went wrong</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
            We encountered an unexpected view error. You can return home or reset your session.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
            >
              Return Home
            </button>
            <button
              className="btn btn-outline"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Reset Session
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

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
      case 'orders':
        return <MyOrders />;
      case 'transactions':
        return <Transactions />;
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
      {/* Toast Notification Banner */}
      <Toast />

      {/* Navigation Bar — hidden in admin mode until user clicks Back to Basic */}
      {activePage !== 'admin' && <Navbar onOpenCart={() => setCartOpen(true)} />}

      {/* Slide-out Cart Sidebar */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Main Content Area — admin gets full width, no container constraint */}
      <main style={styles.mainContent}>
        <ErrorBoundary>
          {activePage === 'admin' ? (
            renderActivePage()
          ) : (
            <div className="container">
              {renderActivePage()}
            </div>
          )}
        </ErrorBoundary>
      </main>

      {/* Footer — hidden in admin mode */}
      {activePage !== 'admin' && <Footer />}

      {/* Sticky Mobile Bottom Navigation — hidden in admin mode */}
      {activePage !== 'admin' && <MobileBottomNav onOpenCart={() => setCartOpen(true)} />}

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
