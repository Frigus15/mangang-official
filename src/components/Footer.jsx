import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Footer() {
  const { navigateTo, setActiveDashboardTab } = useContext(ShopContext);

  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.grid} className="responsive-footer-grid">
          {/* Left Box */}
          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Customer Portal</h4>
            <ul style={styles.linkList}>
              <li style={styles.linkItem} onClick={() => { setActiveDashboardTab('account'); navigateTo('dashboard'); }}>User Dashboard</li>
              <li style={styles.linkItem} onClick={() => { setActiveDashboardTab('orders'); navigateTo('dashboard'); }}>Order Tracking</li>
              <li style={styles.linkItem} onClick={() => { alert('Support hotline initialized: support@mangang.com'); }}>Customer Support</li>
            </ul>
          </div>

          {/* Right Box */}
          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Company Policies</h4>
            <ul style={styles.linkList}>
              <li style={styles.linkItem} onClick={() => alert('Terms of Service Protocol loaded.')}>Terms and Condition</li>
              <li style={styles.linkItem} onClick={() => alert('Privacy Cryptography Protocol active.')}>Privacy Policy</li>
              <li style={styles.linkItem} onClick={() => alert('Refund Guarantee Term details: 30 days hardware return window.')}>Refund Policy</li>
            </ul>
          </div>
        </div>

        {/* Lower row */}
        <div style={styles.bottomRow}>
          <p style={styles.copyright}>&copy; {new Date().getFullYear()} MANGANG Official Tech Store. All rights reserved.</p>
          <div style={styles.bottomLinks}>
            <div style={styles.logo} onClick={() => navigateTo('home')}>
              <img src="/logo.jpg" alt="Mangang Official Logo" style={styles.logoImg} />
              <div style={styles.logoTextWrapper}>
                <span style={styles.logoText}>MANGANG</span>
                <span style={styles.logoSubtext}>OFFICIAL STORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: 'var(--bg-dark-surface)',
    borderTop: '1px solid var(--border-glass)',
    padding: '60px 0 30px 0',
    marginTop: 'auto',
    textAlign: 'left'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px'
  },
  linksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  colTitle: {
    fontSize: '15px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)'
  },
  linkList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  linkItem: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'color 0.2s'
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid var(--border-glass)',
    paddingTop: '25px',
    marginTop: '10px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  copyright: {
    fontSize: '12px',
    color: 'var(--text-muted)'
  },
  bottomLinks: {
    display: 'flex',
    gap: '20px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer'
  },
  logoImg: {
    height: '32px',
    width: 'auto',
    borderRadius: '4px',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  logoTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    gap: '2px'
  },
  logoText: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: '14px',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
    lineHeight: '1'
  },
  logoSubtext: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '7px',
    letterSpacing: '0.05em',
    color: 'var(--color-primary)',
    lineHeight: '1'
  }
};

// Add responsive adjustments for footer grid and hover colors
if (typeof document !== 'undefined') {
  const footerStyle = document.createElement('style');
  footerStyle.innerHTML = `
    @media (max-width: 576px) {
      .container div[class*="responsive-footer-grid"] {
        grid-template-columns: 1fr !important;
      }
    }
    footer li:hover {
      color: var(--color-primary) !important;
    }
  `;
  document.head.appendChild(footerStyle);
}
