import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ShoppingCart, Heart, Cpu, User, Shield, Menu, X, Home, Compass, Search, Package, History, LogIn, UserPlus, LogOut } from 'lucide-react';

export default function Navbar({ onOpenCart }) {
  const { activePage, navigateTo, cart, wishlist, searchQuery, setSearchQuery, setActiveDashboardTab, isLoggedIn, logout, login, signup } = useContext(ShopContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authUsername, setAuthUsername] = useState('');
  const [searchExpanded, setSearchExpanded] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Explore Shop' },
    { id: 'dashboard', label: 'My Portal' },
    { id: 'admin', label: 'Admin Hub' }
  ];

  const filteredNavItems = isLoggedIn
    ? navItems
    : [
        { id: 'home', label: 'Home' },
        { id: 'catalog', label: 'Explore Shop' }
      ];

  const handleNavClick = (pageId) => {
    if (pageId === 'orders' || pageId === 'transactions' || pageId === 'account') {
      setActiveDashboardTab(pageId);
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
      signup(authUsername || authEmail.split('@')[0], authEmail, authPassword);
    }
    setAuthModalOpen(false);
    setAuthEmail('');
    setAuthPassword('');
    setAuthUsername('');
  };

  return (
    <nav className="glass-nav" style={styles.nav}>
      <div className="container" style={styles.container}>
        {/* Logo */}
        <div onClick={() => handleNavClick('home')} style={styles.logo}>
          <img src="/logo.jpg" alt="Mangang Official Logo" style={styles.logoImg} />
          <div style={styles.logoTextWrapper}>
            <span style={styles.logoText}>MANGANG</span>
            <span style={styles.logoSubtext}>OFFICIAL STORE</span>
          </div>
        </div>

        {/* Action Icons */}
        <div style={styles.actions}>
          {/* Search Button + Expanding Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {searchExpanded && (
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activePage !== 'catalog') {
                    navigateTo('catalog');
                  }
                }}
                className="form-input"
                style={{
                  padding: '6px 12px',
                  fontSize: '13px',
                  width: '180px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '20px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                autoFocus
                onBlur={() => {
                  if (searchQuery === '') setSearchExpanded(false);
                }}
              />
            )}
            <button
              onClick={() => setSearchExpanded(!searchExpanded)}
              style={styles.actionBtn}
              title="Search"
            >
              <Search size={20} style={{ color: 'var(--text-primary)' }} />
            </button>
          </div>

          {/* Login Button (only when logged out, removed when logged in) */}
          {!isLoggedIn && (
            <button
              onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
              style={styles.actionBtn}
              title="Login / Sign Up"
            >
              <LogIn size={20} style={{ color: 'var(--color-primary)' }} />
            </button>
          )}

          {/* Side Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ ...styles.mobileMenuToggle, display: 'flex' }}
            className="mobile-menu-trigger"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Sliding Sidebar Menu) */}
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
                  style={{
                    ...styles.sidebarLink,
                    color: activePage === 'home' ? 'var(--color-primary)' : 'var(--text-primary)',
                    background: activePage === 'home' ? 'rgba(0, 245, 255, 0.04)' : 'transparent',
                    borderColor: activePage === 'home' ? 'var(--color-primary)' : 'transparent'
                  }}
                >
                  <Home size={16} />
                  <span>Home</span>
                </button>

                {/* Explore Shop */}
                <button
                  onClick={() => handleNavClick('catalog')}
                  style={{
                    ...styles.sidebarLink,
                    color: activePage === 'catalog' ? 'var(--color-primary)' : 'var(--text-primary)',
                    background: activePage === 'catalog' ? 'rgba(0, 245, 255, 0.04)' : 'transparent',
                    borderColor: activePage === 'catalog' ? 'var(--color-primary)' : 'transparent'
                  }}
                >
                  <Compass size={16} />
                  <span>Explore Shop</span>
                </button>

                {/* My Orders */}
                <button
                  onClick={() => handleNavClick('orders')}
                  style={styles.sidebarLink}
                >
                  <Package size={16} />
                  <span>My Orders</span>
                </button>

                {/* Recent Transactions */}
                <button
                  onClick={() => handleNavClick('transactions')}
                  style={styles.sidebarLink}
                >
                  <History size={16} />
                  <span>Recent Transactions</span>
                </button>

                {/* My Account */}
                <button
                  onClick={() => handleNavClick('account')}
                  style={styles.sidebarLink}
                >
                  <User size={16} />
                  <span>My Account</span>
                </button>

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
                  style={{
                    ...styles.sidebarLink,
                    color: activePage === 'home' ? 'var(--color-primary)' : 'var(--text-primary)',
                    background: activePage === 'home' ? 'rgba(0, 245, 255, 0.04)' : 'transparent',
                    borderColor: activePage === 'home' ? 'var(--color-primary)' : 'transparent'
                  }}
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

      {/* Auth Modal Overlay */}
      {authModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setAuthModalOpen(false)}>
          <div style={styles.modalContent} className="glass-panel" onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {authMode === 'login' ? 'User Decryption Access' : 'Initialize Client Core'}
              </h3>
              <button style={styles.closeBtn} onClick={() => setAuthModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleAuthSubmit} style={styles.authForm}>
              {authMode === 'signup' && (
                <div className="form-group">
                  <span className="form-label">Client Identity Name</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Agent Enforcer"
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value)}
                    className="form-input"
                    style={styles.authInput}
                  />
                </div>
              )}
              <div className="form-group">
                <span className="form-label">Secure Uplink Email</span>
                <input
                  type="email"
                  required
                  placeholder="name@net.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="form-input"
                  style={styles.authInput}
                />
              </div>
              <div className="form-group">
                <span className="form-label">Cryptographic Password</span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="form-input"
                  style={styles.authInput}
                />
              </div>
              
              <button type="submit" className="btn btn-primary" style={styles.authSubmitBtn}>
                {authMode === 'login' ? 'Decrypt & Establish Link' : 'Register Identity Credentials'}
              </button>
            </form>

            <div style={styles.modalFooter}>
              {authMode === 'login' ? (
                <span>
                  No identity record?{' '}
                  <button style={styles.switchBtn} onClick={() => setAuthMode('signup')}>
                    Initialize profile
                  </button>
                </span>
              ) : (
                <span>
                  Already initialized?{' '}
                  <button style={styles.switchBtn} onClick={() => setAuthMode('login')}>
                    Access terminal
                  </button>
                </span>
              )}
            </div>
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
    boxSizing: 'border-box'
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
