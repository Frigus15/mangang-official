import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Cpu, Mail, Send } from 'lucide-react';

export default function Footer() {
  const { navigateTo } = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.grid} className="responsive-footer-grid">
          {/* Brand Info */}
          <div style={styles.brandCol}>
            <div style={styles.logo} onClick={() => navigateTo('home')}>
              <img src="/logo.jpg" alt="Mangang Official Logo" style={styles.logoImg} />
              <div style={styles.logoTextWrapper}>
                <span style={styles.logoText}>MANGANG</span>
                <span style={styles.logoSubtext}>OFFICIAL STORE</span>
              </div>
            </div>
            <p style={styles.brandDesc}>
              Designing the future of premium sound, visual fidelity, and wearable intelligence. Elevate your everyday hardware ecosystem.
            </p>
          </div>

          {/* Catalog Links */}
          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Hardware</h4>
            <ul style={styles.linkList}>
              <li style={styles.linkItem} onClick={() => navigateTo('catalog')}>Audio Gear</li>
              <li style={styles.linkItem} onClick={() => navigateTo('catalog')}>Smart Home</li>
              <li style={styles.linkItem} onClick={() => navigateTo('catalog')}>Wearables</li>
              <li style={styles.linkItem} onClick={() => navigateTo('catalog')}>Computers</li>
            </ul>
          </div>

          {/* User Links */}
          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Account</h4>
            <ul style={styles.linkList}>
              <li style={styles.linkItem} onClick={() => navigateTo('dashboard')}>User Dashboard</li>
              <li style={styles.linkItem} onClick={() => navigateTo('dashboard')}>Order Tracking</li>
              <li style={styles.linkItem} onClick={() => navigateTo('admin')}>Admin Portal</li>
              <li style={styles.linkItem} onClick={() => navigateTo('home')}>Support Center</li>
            </ul>
          </div>

          {/* Newsletter signup */}
          <div style={styles.newsletterCol}>
            <h4 style={styles.colTitle}>Newsletter</h4>
            <p style={styles.newsletterDesc}>Subscribe to receive exclusive access to drops, tech reviews, and private promos.</p>
            {subscribed ? (
              <div style={styles.subbedBox} className="badge badge-green">
                Subscription activated. Welcome to Mangang.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={styles.form}>
                <div style={styles.inputWrapper}>
                  <Mail size={16} style={styles.mailIcon} />
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                  />
                  <button type="submit" style={styles.sendBtn}>
                    <Send size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Lower row */}
        <div style={styles.bottomRow}>
          <p style={styles.copyright}>&copy; {new Date().getFullYear()} MANGANG Official Tech Store. All rights reserved.</p>
          <div style={styles.bottomLinks}>
            <span style={styles.bottomLink}>Privacy Policy</span>
            <span style={styles.bottomLink}>Terms of Service</span>
            <span style={styles.bottomLink}>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: '#ffffff',
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
    gridTemplateColumns: '1.2fr 0.6fr 0.6fr 1.2fr',
    gap: '40px'
  },
  brandCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer'
  },
  logoImg: {
    height: '40px',
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
    fontSize: '18px',
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
  brandDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    maxWidth: '300px'
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
    transition: 'color 0.2s',
    ':hover': {
      color: 'var(--color-primary)'
    }
  },
  newsletterCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  newsletterDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.5'
  },
  form: {
    width: '100%'
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  mailIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)'
  },
  input: {
    width: '100%',
    padding: '12px 48px 12px 38px',
    background: '#f4f6f5',
    border: '1px solid var(--border-glass)',
    borderRadius: '6px',
    color: 'var(--text-primary)',
    fontSize: '13px',
    outline: 'none',
    transition: 'all 0.3s ease',
    ':focus': {
      borderColor: 'var(--color-primary)'
    }
  },
  sendBtn: {
    position: 'absolute',
    right: '6px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    background: 'var(--color-primary)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#ffffff',
    transition: 'opacity 0.2s',
    ':hover': {
      opacity: 0.9
    }
  },
  subbedBox: {
    padding: '10px 14px',
    fontSize: '12px',
    borderRadius: '6px',
    textAlign: 'center'
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
  bottomLink: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    transition: 'color 0.2s',
    ':hover': {
      color: 'var(--color-primary)'
    }
  }
};

// Add responsive adjustments for footer grid and hover colors
if (typeof document !== 'undefined') {
  const footerStyle = document.createElement('style');
  footerStyle.innerHTML = `
    @media (max-width: 992px) {
      .container div[style*="gridTemplateColumns: \\"1.2fr 0.6fr 0.6fr 1.2fr\\""] {
        grid-template-columns: 1fr 1fr !important;
      }
    }
    @media (max-width: 576px) {
      .container div[style*="gridTemplateColumns: \\"1.2fr 0.6fr 0.6fr 1.2fr\\""] {
        grid-template-columns: 1fr !important;
      }
    }
    footer li:hover {
      color: var(--color-primary) !important;
    }
    footer span:hover {
      color: var(--color-primary) !important;
    }
  `;
  document.head.appendChild(footerStyle);
}
