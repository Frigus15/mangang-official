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
    <nav style={styles.nav} className="glass-nav">
      <div style={styles.navContainer} className="container">
        
        {/* Full-width Search Bar when expanded on mobile */}
        {searchExpanded ? (
          <div style={styles.fullSearchWrapper} className="animate-fade-in">
            <div style={styles.fullSearchInputContainer}>
              <Search size={18} style={{ color: 'var(--color-primary)' }} />
              <input
                type="text"
                placeholder="Search products, brands & skins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.fullSearchInput}
                autoFocus
              />
              <button 
                onClick={() => setSearchExpanded(false)} 
                style={styles.closeSearchBtn}
                title="Close Search"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Logo */}
            <div style={styles.logoGroup} onClick={() => handleNavClick('home')}>
              <div style={styles.logoIcon}>
                <Cpu size={22} style={{ color: '#ffffff' }} />
              </div>
              <div style={styles.logoTextGroup}>
                <span style={styles.logoText}>MANGANG</span>
                <span style={styles.logoSubtext}>OFFICIAL STORE</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div style={styles.navLinks}>
              {filteredNavItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      ...styles.navLink,
                      color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                      fontWeight: isActive ? '700' : '500',
                      borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent'
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Global Search Input (Desktop) */}
            <div style={styles.searchContainer} className="desktop-search">
              <div style={styles.searchInputWrapper}>
                <Search size={16} style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={styles.clearSearchBtn}>
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Header Right Actions */}
            <div style={styles.actionsGroup}>
              {/* Mobile Search Trigger Icon */}
              <button
                onClick={() => setSearchExpanded(true)}
                style={styles.actionBtn}
                className="mobile-search-trigger"
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

              {/* Mobile Menu Toggle */}
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

      {/* Mobile Drawer */}
      {activePage !== 'admin' && (
      <div 
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className="mobile-drawer-panel"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={styles.sidebarHeader}>
            <div style={styles.logoGroup} onClick={() => handleNavClick('home')}>
              <div style={styles.logoIcon}>
                <Cpu size={20} style={{ color: '#ffffff' }} />
              </div>
              <div style={styles.logoTextGroup}>
                <span style={styles.logoText}>MANGANG</span>
                <span style={styles.logoSubtext}>OFFICIAL</span>
              </div>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              style={styles.closeBtn}
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar Menu Items */}
          <div style={styles.sidebarNav}>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavClick('home')}
                  style={getSidebarLinkStyle('home')}
                >
                  <Home size={16} />
                  <span>Home</span>
                </button>

                <button
                  onClick={() => handleNavClick('catalog')}
                  style={getSidebarLinkStyle('catalog')}
                >
                  <Compass size={16} />
                  <span>Explore Shop</span>
                </button>

                <button
                  onClick={() => { handleNavClick('dashboard'); setActiveDashboardTab('orders'); }}
                  style={getSidebarLinkStyle('dashboard', 'orders')}
                >
                  <Package size={16} />
                  <span>My Orders</span>
                </button>

                <button
                  onClick={() => { handleNavClick('dashboard'); setActiveDashboardTab('transactions'); }}
                  style={getSidebarLinkStyle('dashboard', 'transactions')}
                >
                  <History size={16} />
                  <span>Payment History</span>
                </button>

                {currentUser?.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    style={{
                      ...getSidebarLinkStyle('admin'),
                      marginTop: '10px',
                      border: '1px solid var(--border-glass)'
                    }}
                  >
                    <Shield size={16} style={{ color: 'var(--color-primary)' }} />
                    <span style={{ fontWeight: '700' }}>Control Hub (Admin)</span>
                  </button>
                )}

                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  style={{
                    ...styles.sidebarLink,
                    color: 'var(--color-danger)',
                    marginTop: '15px'
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('home')}
                  style={getSidebarLinkStyle('home')}
                >
                  <Home size={16} />
                  <span>Home</span>
                </button>

                <button
                  onClick={() => handleNavClick('catalog')}
                  style={getSidebarLinkStyle('catalog')}
                >
                  <Compass size={16} />
                  <span>Explore Shop</span>
                </button>

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

          {/* Sidebar Footer */}
          <div style={styles.sidebarFooter}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>MANGANG STORE V1.0</span>
          </div>
        </div>
      </div>
      )}

      {/* Auth Modal Overlay */}
      {authModalOpen && (
        <div style={styles.modalOverlay} onClick={() => !authLoading && setAuthModalOpen(false)}>
          <div style={styles.modalContent} className="glass-panel animate-dropdown" onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={20} color="var(--color-primary)" />
                <h3 style={styles.modalTitle}>
                  {authMode === 'login' ? 'Account Login' : 'Create Account'}
                </h3>
              </div>
              {!authLoading && (
                <button style={styles.closeBtn} onClick={() => setAuthModalOpen(false)}>
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Pill Switcher */}
            <div style={styles.pillSwitcher}>
              <button
                type="button"
                style={{
                  ...styles.pillBtn,
                  background: authMode === 'login' ? 'var(--color-primary)' : 'transparent',
                  color: authMode === 'login' ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: authMode === 'login' ? '700' : '500'
                }}
                onClick={() => setAuthMode('login')}
              >
                Log In
              </button>
              <button
                type="button"
                style={{
                  ...styles.pillBtn,
                  background: authMode === 'signup' ? 'var(--color-primary)' : 'transparent',
                  color: authMode === 'signup' ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: authMode === 'signup' ? '700' : '500'
                }}
                onClick={() => setAuthMode('signup')}
              >
                Sign Up
              </button>
            </div>
            
            {authLoading ? (
              <div style={styles.modalLoading}>
                <div className="telemetry-spinner" style={{ margin: '0 auto' }}></div>
                <p style={{ marginTop: '20px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500', textAlign: 'center' }}>
                  {authMode === 'login' ? 'Authenticating via MongoDB...' : 'Creating MongoDB User Account...'}
                </p>
              </div>
            ) : (
              <>
                <form onSubmit={handleAuthSubmit} style={styles.authForm}>
                  {authMode === 'signup' && (
                    <>
                      <div className="form-group">
                        <span className="form-label">Full Name</span>
                        <div style={styles.inputIconWrapper}>
                          <User size={16} style={styles.inputIcon} />
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={authUsername}
                            onChange={(e) => setAuthUsername(e.target.value)}
                            className="form-input"
                            style={styles.authInput}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <span className="form-label">Phone Number</span>
                        <div style={styles.inputIconWrapper}>
                          <User size={16} style={styles.inputIcon} />
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
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <span className="form-label">Email Address</span>
                    <div style={styles.inputIconWrapper}>
                      <User size={16} style={styles.inputIcon} />
                      <input
                        type="email"
                        required
                        placeholder="your-email@domain.com"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        className="form-input"
                        style={styles.authInput}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <span className="form-label">Password</span>
                    <div style={styles.inputIconWrapper}>
                      <Shield size={16} style={styles.inputIcon} />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="form-input"
                        style={{ ...styles.authInput, paddingRight: '38px' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={styles.eyeToggleBtn}
                        title={showPassword ? "Hide Password" : "Show Password"}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-primary" style={styles.authSubmitBtn}>
                    <span>{authMode === 'login' ? 'Authorize & Log In' : 'Register Account'}</span>
                  </button>
                </form>
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
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%'
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer'
  },
  logoIcon: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
  },
  logoTextGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  logoText: {
    fontFamily: 'var(--font-heading)',
    fontSize: '18px',
    fontWeight: '800',
    letterSpacing: '0.05em',
    color: '#ffffff',
    lineHeight: '1.1'
  },
  logoSubtext: {
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '0.15em',
    color: 'var(--color-primary)',
    lineHeight: '1'
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center'
  },
  navLink: {
    background: 'none',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '8px 4px',
    transition: 'all 0.2s ease'
  },
  searchContainer: {
    flex: 1,
    maxWidth: '350px',
    margin: '0 20px',
    display: 'flex',
    justifyContent: 'center'
  },
  searchInputWrapper: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    color: 'var(--text-secondary)',
    pointerEvents: 'none'
  },
  searchInput: {
    width: '100%',
    padding: '8px 32px 8px 36px',
    fontSize: '13px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--border-glass)',
    borderRadius: '20px',
    color: '#ffffff',
    outline: 'none'
  },
  clearSearchBtn: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  actionsGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  actionBtn: {
    position: 'relative',
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid var(--border-glass)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  badgeDanger: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    background: 'var(--color-danger)',
    color: '#fff',
    fontSize: '10px',
    fontWeight: '800',
    borderRadius: '10px',
    padding: '2px 6px',
    lineHeight: '1'
  },
  badgeCyan: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    background: 'var(--color-primary)',
    color: '#fff',
    fontSize: '10px',
    fontWeight: '800',
    borderRadius: '10px',
    padding: '2px 6px',
    lineHeight: '1'
  },
  mobileMenuToggle: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid var(--border-glass)',
    color: '#ffffff',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '20px',
    borderBottom: '1px solid var(--border-glass)'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer'
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px'
  },
  sidebarLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid transparent',
    fontSize: '14px',
    background: 'none',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left'
  },
  sidebarFooter: {
    borderTop: '1px solid var(--border-glass)',
    paddingTop: '15px',
    marginTop: 'auto',
    textAlign: 'center'
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
  pillSwitcher: {
    display: 'flex',
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid var(--border-glass)',
    borderRadius: '12px',
    padding: '4px',
    gap: '4px'
  },
  pillBtn: {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  authForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  inputIconWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    color: 'var(--color-primary)',
    pointerEvents: 'none'
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
    padding: '4px',
    transition: 'color 0.2s ease'
  },
  authInput: {
    padding: '10px 14px 10px 38px',
    fontSize: '13.5px',
    background: 'rgba(0,0,0,0.25)',
    borderColor: 'var(--border-glass)',
    color: '#fff',
    width: '100%'
  },
  authSubmitBtn: {
    padding: '12px',
    fontSize: '14px',
    width: '100%',
    marginTop: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '10px',
    fontWeight: '700'
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
    padding: '2px'
  }
};
