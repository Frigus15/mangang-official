import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Footer() {
  const { navigateTo, setActiveDashboardTab } = useContext(ShopContext);

  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        {/* Brand Info (Above the boxes) */}
        <div style={styles.brandRow}>
          <div style={styles.logo} onClick={() => navigateTo('home')}>
            <img src="/logo.jpg" alt="Mangang Official Logo" style={styles.logoImg} />
            <div style={styles.logoTextWrapper}>
              <span style={styles.logoText}>MANGANG</span>
              <span style={styles.logoSubtext}>OFFICIAL STORE</span>
            </div>
          </div>
          <div style={styles.descBlock}>
            <p style={styles.brandDesc}>Ultimate destination for electronic goods and purchases.</p>
            <p style={styles.greeting}>KHURUMJARI</p>
          </div>
        </div>

        {/* Two Boxes Grid */}
        <div style={styles.grid} className="footer-boxes-grid">
          {/* Left Box */}
          <div className="glass-panel" style={styles.box}>
            <h4 style={styles.boxTitle}>Customer Portal</h4>
            <div style={styles.buttonsList}>
              <button 
                style={styles.boxBtn} 
                className="footer-action-btn"
                onClick={() => { setActiveDashboardTab('account'); navigateTo('dashboard'); }}
              >
                User Dashboard
              </button>
              <button 
                style={styles.boxBtn} 
                className="footer-action-btn"
                onClick={() => { setActiveDashboardTab('orders'); navigateTo('dashboard'); }}
              >
                Order Tracking
              </button>
              <button 
                style={styles.boxBtn} 
                className="footer-action-btn"
                onClick={() => alert('Support hotline initialized: support@mangang.com')}
              >
                Customer Support
              </button>
            </div>
          </div>

          {/* Right Box */}
          <div className="glass-panel" style={styles.box}>
            <h4 style={styles.boxTitle}>Company Policies</h4>
            <div style={styles.buttonsList}>
              <button 
                style={styles.boxBtn} 
                className="footer-action-btn"
                onClick={() => navigateTo('terms')}
              >
                Terms and Condition
              </button>
              <button 
                style={styles.boxBtn} 
                className="footer-action-btn"
                onClick={() => navigateTo('privacy-policy')}
              >
                Privacy Policy
              </button>
              <button 
                style={styles.boxBtn} 
                className="footer-action-btn"
                onClick={() => navigateTo('refund-policy')}
              >
                Refund Policy
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Footer */}
        <div style={styles.copyrightRow}>
          <p style={styles.copyrightText}>&copy; {new Date().getFullYear()} MANGANG OFFICIAL STORE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: 'var(--bg-dark-surface)',
    borderTop: '1px solid var(--border-glass)',
    padding: '40px 0 30px 0',
    marginTop: 'auto',
    textAlign: 'left'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  brandRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'flex-start',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '20px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer'
  },
  logoImg: {
    height: '36px',
    width: 'auto',
    borderRadius: '4px',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  logoTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  logoText: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: '16px',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
    lineHeight: '1'
  },
  logoSubtext: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '8px',
    letterSpacing: '0.05em',
    color: 'var(--color-primary)',
    lineHeight: '1'
  },
  descBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  brandDesc: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.5'
  },
  greeting: {
    fontSize: '16px',
    fontWeight: '800',
    color: 'var(--color-primary)',
    letterSpacing: '0.05em',
    fontFamily: 'var(--font-heading)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  },
  box: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-glass)'
  },
  boxTitle: {
    fontSize: '15px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    paddingBottom: '8px'
  },
  buttonsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  boxBtn: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border-glass)',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    fontSize: '13px',
    fontFamily: 'var(--font-body)',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  copyrightRow: {
    borderTop: '1px solid var(--border-glass)',
    paddingTop: '20px',
    textAlign: 'center'
  },
  copyrightText: {
    fontSize: '12px',
    color: 'var(--text-muted)'
  }
};

// Add responsive adjustments for footer grid and hover colors
if (typeof document !== 'undefined') {
  const footerStyle = document.createElement('style');
  footerStyle.innerHTML = `
    @media (max-width: 768px) {
      .footer-boxes-grid {
        grid-template-columns: 1fr !important;
      }
    }
    .footer-action-btn:hover {
      color: #ffffff !important;
      background: rgba(99, 102, 241, 0.1) !important;
      border-color: var(--color-primary) !important;
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.15);
    }
  `;
  document.head.appendChild(footerStyle);
}
