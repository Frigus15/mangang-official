import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (toastMessage && toastMessage.text) {
      setCurrentText(toastMessage.text);
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (!visible) return null;

  return (
    <div style={styles.toastContainer} className="animate-toast-pop">
      <div style={styles.toastBadge}>
        <CheckCircle2 size={16} color="var(--color-primary)" />
      </div>
      <span style={styles.toastText}>{currentText}</span>
    </div>
  );
}

const styles = {
  toastContainer: {
    position: 'fixed',
    bottom: '80px',
    right: '24px',
    zIndex: 9999,
    background: 'rgba(11, 15, 25, 0.94)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(99, 102, 241, 0.4)',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.2)',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    pointerEvents: 'none',
    maxWidth: '320px'
  },
  toastBadge: {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    background: 'rgba(99, 102, 241, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  toastText: {
    fontSize: '13.5px',
    fontWeight: '700',
    letterSpacing: '0.01em',
    color: '#ffffff',
    lineHeight: '1.3'
  }
};
