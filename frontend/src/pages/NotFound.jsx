import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { AlertTriangle, Home, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const { navigateTo } = useContext(ShopContext);

  return (
    <div style={styles.container} className="animate-fade-in">
      <div className="glass-panel" style={styles.card}>
        <div style={styles.iconBadge}>
          <AlertTriangle size={36} color="var(--color-primary)" />
        </div>
        
        <h1 style={styles.errorCode}>404</h1>
        <h2 style={styles.title}>Signal Lost: Page Not Found</h2>
        <p style={styles.subtitle}>
          The requested page or location could not be located. It may have been moved, renamed, or no longer exists.
        </p>

        <div style={styles.actions}>
          <button className="btn btn-primary" onClick={() => navigateTo('home')} style={styles.btn}>
            <Home size={16} />
            <span>Return to Home</span>
          </button>
          <button className="btn btn-secondary" onClick={() => navigateTo('catalog')} style={styles.btn}>
            <ShoppingBag size={16} />
            <span>Explore Shop</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '60px 20px 100px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh'
  },
  card: {
    maxWidth: '520px',
    width: '100%',
    padding: '40px 30px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    borderRadius: '20px',
    border: '1px solid var(--border-glass)'
  },
  iconBadge: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  errorCode: {
    fontFamily: 'var(--font-heading)',
    fontSize: '64px',
    fontWeight: '900',
    color: 'var(--color-primary)',
    margin: 0,
    lineHeight: 1,
    letterSpacing: '0.05em'
  },
  title: {
    fontSize: '22px',
    fontWeight: '800',
    color: 'var(--text-primary)',
    margin: 0
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    margin: 0
  },
  actions: {
    display: 'flex',
    gap: '12px',
    width: '100%',
    justifyContent: 'center',
    marginTop: '15px'
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    fontSize: '14px'
  }
};
