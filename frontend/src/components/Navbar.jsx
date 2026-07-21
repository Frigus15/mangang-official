import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ShoppingCart, Heart, Cpu, User, Shield, Menu, X, Home, Compass, Search, Package, History, LogIn, UserPlus, LogOut, Eye, EyeOff } from 'lucide-react';

export default function Navbar({ onOpenCart }) {
  const { activePage, navigateTo, cart, wishlist, searchQuery, setSearchQuery, setActiveDashboardTab, activeDashboardTab, isLoggedIn, logout, login, signup, currentUser, authLoading } = useContext(ShopContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authUsername, setAuthUsername] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getSidebarLinkStyle = (pageId, tabId = null) => {
    const isActive = tabId 
      ? activePage === pageId && activeDashboardTab === tabId
      : activePage === pageId;

    return {
      ...styles.sidebarLink,
      color: isActive ? '#ffffff' : 'var(--text-primary)',
      background: isActive ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
      borderColor: isActive ? 'var(--color-primary)' : 'transparent'
    };
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Explore Shop' },
    { id: 'dashboard', label: 'My Portal' },
    { id: 'admin', label: 'Control Hub' }
  ];

  const filteredNavItems = isLoggedIn
    ? navItems
    : [
        { id: 'home', label: 'Home' },
        { id: 'catalog', label: 'Explore Shop' }
      ];

  const handleNavClick = (pageId) => {
    if (pageId === 'account') {
      navigateTo('dashboard');
    } else {
      navigateTo(pageId);
    }
    setMobileMenuOpen(false);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(authEmail, authPassword);
    } else {
      signup(authUsername || authEmail.split('@')[0], authEmail, authPassword, authPhone);
    }
    setAuthModalOpen(false);
    setAuthEmail('');
    setAuthPassword('');
    setAuthUsername('');
    setAuthPhone('');
  };

  return (
    <nav className="glass-nav" style={styles.nav}>
      <div className="container" style={styles.container}>
        {searchExpanded ? (
          <div className="animate-search-expand" style={styles.fullSearchWrapper}>
            <div style={styles.fullSearchInputContainer}>
              <Search size={18} style={{ color: 'var(--color-primary)' }} />
              <input
                type="text"
                placeholder="Search products, brands or categories..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activePage !== 'catalog') {
                    navigateTo('catalog');
                  }
                }}
                style={styles.fullSearchInput}
                autoFocus
              />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchExpanded(false);
                }}
                style={styles.closeSearchBtn}
                title="Close Search"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Logo */}
            <div onClick={() => handleNavClick('home')} style={styles.logo}>
              <img src="/logo.jpg" alt="Mangang Official Logo" style={styles.logoImg} />
              <div style={styles.logoTextWrapper}>
                <span style={styles.logoText}>MANGANG</span>
                <span style={styles.logoSubtext}>OFFICIAL STORE</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="desktop-only-links" style={styles.navLinks}>
              <button
                onClick={() => handleNavClick('home')}
                style={{
                  ...styles.link,
                  color: activePage === 'home' ? 'var(--color-primary)' : 'var(--text-primary)',
                  borderBottomColor: activePage === 'home' ? 'var(--color-primary)' : 'transparent'
                }}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('catalog')}
                style={{
                  ...styles.link,
                  color: activePage === 'catalog' ? 'var(--color-primary)' : 'var(--text-primary)',
                  borderBottomColor: activePage === 'catalog' ? 'var(--color-primary)' : 'transparent'
                }}
              >
                Explore Shop
              </button>

              {isLoggedIn && (
                <button
                  onClick={() => handleNavClick('dashboard')}
                  style={{
                    ...styles.link,
                    color: activePage === 'dashboard' ? 'var(--color-primary)' : 'var(--text-primary)',
                    borderBottomColor: activePage === 'dashboard' ? 'var(--color-primary)' : 'transparent'
                  }}
                >
                  My Portal
                </button>
              )}

              {isLoggedIn && currentUser?.role === 'admin' && (
                <button
                  onClick={() => handleNavClick('admin')}
                  style={{
                    ...styles.link,
                    color: activePage === 'admin' ? 'var(--color-primary)' : 'var(--text-primary)',
                    borderBottomColor: activePage === 'admin' ? 'var(--color-primary)' : 'transparent'
                  }}
                >
                  Control Hub
                </button>
              )}
            </div>

            {/* Action Icons */}
            <div style={styles.actions}>
              {/* Search button */}
              <button
                onClick={() => setSearchExpanded(true)}
                style={styles.actionBtn}
                title="Search"
              >
                <Search size={18} style={{ color: 'var(--text-primary)' }} />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => handleNavClick('catalog')}
                style={styles.actionBtn}
                title="Wishlist"
              >
                <Heart size={18} style={{ color: wishlist.length > 0 ? 'var(--color-danger)' : 'var(--text-primary)' }} />
                {wishlist.length > 0 && (
                  <span style={styles.badgeDanger}>{wishlist.length}</span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                style={styles.actionBtn}
                title="Shopping Cart"
              >
                <ShoppingCart size={18} style={{ color: cartCount > 0 ? 'var(--color-primary)' : 'var(--text-primary)' }} />
                {cartCount > 0 && (
                  <span style={styles.badgeCyan}>{cartCount}</span>
                )}
              </button>

              {/* Profile / Auth Button */}
              {isLoggedIn ? (
                <button
                  onClick={() => handleNavClick('dashboard')}
                  style={styles.actionBtn}
                  title={currentUser?.username || currentUser?.email || 'User Account'}
                >
                  <User size={18} style={{ color: 'var(--color-primary)' }} />
                </button>
              ) : (
                <button
                  onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
                  style={styles.actionBtn}
                  title="Login / Sign Up"
                >
                  <LogIn size={18} style={{ color: 'var(--color-primary)' }} />
                </button>
              )}

              {/* Side Menu Button — hidden on desktop, shown on mobile */}
              {activePage !== 'admin' && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  style={styles.mobileMenuToggle}
                  className="mobile-menu-trigger"
                  title="Menu"
                >
                  <Menu size={20} />
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Mobile Drawer — hidden in admin mode */}
      {activePage !== 'admin' && (
      <div 
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`mobile-sidebar glass-panel ${mobileMenuOpen ? 'active' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div style={styles.sidebarHeader}>
            <div style={styles.sidebarLogo}>
              <img src="/logo.jpg" alt="Mangang Official Logo" style={styles.logoImg} />
              <div style={styles.logoTextWrapper}>
                <span style={styles.logoText}>MANGANG</span>
                <span style={styles.logoSubtext}>OFFICIAL STORE</span>
              </div>
            </div>
            <button style={styles.closeBtn} onClick={() => setMobileMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Sidebar Navigation Links */}
          <div style={styles.sidebarLinksContainer}>
            {isLoggedIn ? (
              <>
                {/* Home */}
                <button
                  onClick={() => handleNavClick('home')}
                  style={getSidebarLinkStyle('home')}
                >
                  <Home size={16} />
                  <span>Home</span>
                </button>

                {/* Explore Shop */}
                <button
                  onClick={() => handleNavClick('catalog')}
                  style={getSidebarLinkStyle('catalog')}
                >
                  <Compass size={16} />
                  <span>Explore Shop</span>
                </button>

                {/* My Orders */}
                <button
                  onClick={() => handleNavClick('orders')}
                  style={getSidebarLinkStyle('orders')}
                >
                  <Package size={16} />
                  <span>My Orders</span>
                </button>

                {/* Recent Transactions */}
                <button
                  onClick={() => handleNavClick('transactions')}
                  style={getSidebarLinkStyle('transactions')}
                >
                  <History size={16} />
                  <span>Recent Transactions</span>
                </button>

                {/* My Account */}
                <button
                  onClick={() => handleNavClick('account')}
                  style={getSidebarLinkStyle('dashboard')}
                >
                  <User size={16} />
                  <span>My Account</span>
                </button>

                {/* Control Hub */}
                {currentUser?.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    style={getSidebarLinkStyle('admin')}
                  >
                    <Shield size={16} />
                    <span>Admin</span>
                  </button>
                )}

                {/* Logout */}
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  style={{
                    ...styles.sidebarLink,
                    color: 'var(--color-danger)'
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Home */}
                <button
                  onClick={() => handleNavClick('home')}
                  style={getSidebarLinkStyle('home')}
                >
                  <Home size={16} />
                  <span>Home</span>
                </button>

                {/* Login */}
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  style={styles.sidebarLink}
                >
                  <LogIn size={16} style={{ color: 'var(--color-primary)' }} />
                  <span>Login</span>
                </button>

                {/* Sign Up */}
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  style={styles.sidebarLink}
                >
                  <UserPlus size={16} style={{ color: 'var(--color-secondary)' }} />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>

          {/* Sidebar Footer info */}
          <div style={styles.sidebarFooter}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>MANGANG TELEMETRY V1.0</span>
          </div>
        </div>
      </div>
      )}

      {/* Auth Modal Overlay */}
      {authModalOpen && (
        <div style={styles.modalOverlay} onClick={() => !authLoading && setAuthModalOpen(false)}>
          <div style={styles.modalContent} className="glass-panel" onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {authMode === 'login' ? 'Log In to Mangang' : 'Create Your Account'}
              </h3>
              {!authLoading && (
                <button style={styles.closeBtn} onClick={() => setAuthModalOpen(false)}>
                  <X size={18} />
                </button>
              )}
            </div>
            
            {authLoading ? (
              <div style={styles.modalLoading}>
                <div className="telemetry-spinner" style={{ margin: '0 auto' }}></div>
                <p style={{ marginTop: '20px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500', textAlign: 'center' }}>
                  {authMode === 'login' ? 'Logging in, please wait...' : 'Creating account, please wait...'}
                </p>
              </div>
            ) : (
              <>
                <form onSubmit={handleAuthSubmit} style={styles.authForm}>
                  {authMode === 'signup' && (
                    <>
                      <div className="form-group">
                        <span className="form-label">Full Name</span>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          value={authUsername}
                          onChange={(e) => setAuthUsername(e.target.value)}
                          className="form-input"
                          style={styles.authInput}
                        />
                      </div>

                      <div className="form-group">
                        <span className="form-label">Phone Number</span>
                        <input
                          type="tel"
                          required
                          placeholder="+91 9876543210"
                          value={authPhone}
                          onChange={(e) => setAuthPhone(e.target.value)}
                          className="form-input"
                          style={styles.authInput}
                        />
                      </div>
                    </>
                  )}
                  <div className="form-group">
                    <span className="form-label">Email Address</span>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className="form-input"
                      style={styles.authInput}
                    />
                  </div>
                  <div className="form-group">
                    <span className="form-label">Password</span>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="form-input"
                        style={{ ...styles.authInput, width: '100%', paddingRight: '38px' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={styles.eyeToggleBtn}
                        title={showPassword ? 'Hide Password' : 'Show Password'}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-primary" style={styles.authSubmitBtn}>
                    {authMode === 'login' ? 'Log In' : 'Sign Up'}
                  </button>
                </form>

                <div style={styles.modalFooter}>
                  {authMode === 'login' ? (
                    <span>
                      Don't have an account?{' '}
                      <button style={styles.switchBtn} onClick={() => setAuthMode('signup')}>
                        Sign Up
                      </button>
                    </span>
                  ) : (
                    <span>
                      Already have an account?{' '}
                      <button style={styles.switchBtn} onClick={() => setAuthMode('login')}>
                        Log In
                      </button>
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    height: 'var(--nav-height)',
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: 'var(--bg-glass)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border-glass)',
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    userSelect: 'none'
  },
  logoImg: {
    height: '36px',
    width: 'auto',
    borderRadius: '4px',
    border: '1px solid rgba(255,255,255,0.08)'
  },
  logoTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    gap: '0px'
  },
  logoText: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: '17px',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
    lineHeight: '1'
  },
  logoSubtext: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '8px',
    letterSpacing: '0.06em',
    color: 'var(--color-primary)',
    lineHeight: '1'
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
    height: '100%',
    alignItems: 'center'
  },
  link: {
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    padding: '4px 0',
    fontFamily: 'var(--font-heading)',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  actionBtn: {
    position: 'relative',
    background: 'rgba(0,0,0,0.03)',
    border: '1px solid var(--border-glass)',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  badgeCyan: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    background: 'var(--color-primary)',
    color: '#ffffff',
    fontSize: '10px',
    fontWeight: '800',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--bg-dark-base)'
  },
  badgeDanger: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    background: 'var(--color-danger)',
    color: '#fff',
    fontSize: '10px',
    fontWeight: '800',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--bg-dark-base)'
  },
  iconCyan: {
    color: 'var(--color-primary)'
  },
  mobileMenuToggle: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    display: 'none',
    marginLeft: '8px'
  },

  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '15px',
    marginBottom: '25px'
  },
  sidebarLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '4px'
  },
  sidebarLinksContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1
  },
  sidebarLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'var(--font-heading)',
    fontWeight: 600,
    fontSize: '15px',
    color: 'var(--text-primary)',
    transition: 'all 0.2s ease'
  },
  sidebarFooter: {
    borderTop: '1px solid var(--border-glass)',
    paddingTop: '15px',
    marginTop: 'auto',
    textAlign: 'center'
  },
  searchContainer: {
    flex: 1,
    maxWidth: '400px',
    margin: '0 30px',
    display: 'flex',
    justifyContent: 'center'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(3, 5, 10, 0.75)',
    backdropFilter: 'blur(10px)',
    zIndex: 3000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box'
  },
  modalContent: {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxSizing: 'border-box',
    boxShadow: '0 12px 40px rgba(99, 102, 241, 0.18)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.08)'
  },
  modalLoading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 0',
    width: '100%'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '12px'
  },
  modalTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '18px',
    fontWeight: '800',
    color: 'var(--text-primary)'
  },
  authForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  authInput: {
    padding: '10px 14px',
    fontSize: '14px',
    background: 'rgba(0,0,0,0.2)',
    borderColor: 'var(--border-glass)',
    color: '#fff'
  },
  eyeToggleBtn: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px'
  },
  authSubmitBtn: {
    padding: '12px',
    fontSize: '14px',
    width: '100%',
    marginTop: '5px'
  },
  modalFooter: {
    textAlign: 'center',
    fontSize: '13px',
    color: 'var(--text-secondary)'
  },
  switchBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-primary)',
    fontWeight: '700',
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'underline'
  },
  fullSearchWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullSearchInputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--border-glass)',
    borderRadius: '24px',
    padding: '8px 16px',
    boxSizing: 'border-box'
  },
  fullSearchInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none',
    padding: '4px 0',
    fontFamily: 'var(--font-body)'
  },
  closeSearchBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',
    transition: 'color 0.2s'
  }
};

// Add CSS rules for hiding items on mobile using CSS inject or style injection
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    @media (max-width: 768px) {
      .glass-nav button[style*="borderBottomColor"] {
        display: none !important;
      }
      .glass-nav button[style*="mobileMenuToggle"] {
        display: flex !important;
      }
    }
  `;
  document.head.appendChild(styleEl);
}
