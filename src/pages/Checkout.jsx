import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { CreditCard, ShoppingBag, Truck, Lock, CheckCircle, ArrowRight } from 'lucide-react';

export default function Checkout() {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingAmount,
    taxAmount,
    orderTotal,
    appliedDiscount,
    placeOrder,
    navigateTo
  } = useContext(ShopContext);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Order Placement Success state
  const [orderSuccessId, setOrderSuccessId] = useState(null);

  if (cart.length === 0 && !orderSuccessId) {
    return (
      <div style={styles.emptyContainer} className="glass-panel">
        <ShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '15px' }} />
        <h2>Your Workspace Cart is Empty</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '10px 0 20px 0' }}>
          Add hardware modules first before processing checkout.
        </p>
        <button className="btn btn-primary" onClick={() => navigateTo('catalog')}>
          Return to Catalog
        </button>
      </div>
    );
  }

  // Formatting Card Number: xxxx xxxx xxxx xxxx
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(val);
    }
  };

  // Formatting Expiry: MM/YY
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length >= 3) {
      setCardExpiry(`${val.slice(0, 2)}/${val.slice(2)}`);
    } else {
      setCardExpiry(val);
    }
  };

  // Formatting CVV: max 3 digits
  const handleCvvChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 3) {
      setCardCvv(val);
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !city || !zip || !cardName || !cardNumber || !cardExpiry || !cardCvv) {
      alert('Please fill out all billing and payment details.');
      return;
    }

    const shipDetails = { name, email, phone, address, city, zip };
    const payDetails = { cardHolder: cardName, cardNumber };

    const orderId = placeOrder(shipDetails, payDetails);
    setOrderSuccessId(orderId);
  };

  // SUCCESS LAYOUT RENDER
  if (orderSuccessId) {
    return (
      <div style={styles.successWrapper} className="animate-fade-in">
        <div style={styles.successBox} className="glass-panel glow-loop">
          <CheckCircle size={64} style={{ color: 'var(--color-primary)', marginBottom: '20px' }} />
          <h1 style={styles.successTitle}>Transaction Authorized</h1>
          <p style={styles.successDesc}>
            Your payment was approved and the order details are committed.
          </p>

          <div style={styles.receiptBox}>
            <div style={styles.receiptRow}>
              <span>Order ID</span>
              <strong style={{ color: 'var(--color-primary)' }}>{orderSuccessId}</strong>
            </div>
            <div style={styles.receiptRow}>
              <span>Deliver To</span>
              <span>{name}</span>
            </div>
            <div style={styles.receiptRow}>
              <span>Shipping Address</span>
              <span style={{ textAlign: 'right', maxWidth: '200px' }}>{address}, {city} ({zip})</span>
            </div>
            <div style={styles.receiptRow}>
              <span>Email Contact</span>
              <span>{email}</span>
            </div>
            <div style={{ ...styles.receiptRow, borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '10px', marginTop: '10px' }}>
              <span>Charged Total</span>
              <strong style={{ color: 'var(--color-primary)', fontSize: '18px' }}>
                ${orderTotal.toLocaleString()}
              </strong>
            </div>
          </div>

          <div style={styles.successButtons}>
            <button
              className="btn btn-primary"
              onClick={() => navigateTo('dashboard')}
            >
              Track Order Status <ArrowRight size={16} />
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigateTo('home')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container} className="animate-fade-in">
      <h1 style={styles.pageTitle}>Secure Checkout</h1>
      <p style={styles.pageSubtitle}>Confirm shipping logs and authorization credentials to complete your procurement.</p>

      <form onSubmit={handleCheckoutSubmit} style={styles.splitLayout} className="responsive-grid">
        {/* LEFT COLUMN: Shipping & Billing details */}
        <div style={styles.formPanel} className="glass-panel">
          {/* Shipping Address */}
          <div style={styles.sectionHeader}>
            <Truck size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={styles.sectionTitle}>1. Shipping Specifications</h3>
          </div>
          <div style={styles.inputsGrid}>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <span className="form-label">Full Name</span>
              <input
                type="text"
                required
                className="form-input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <span className="form-label">Email Address</span>
              <input
                type="email"
                required
                className="form-input"
                placeholder="johndoe@mangang.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <span className="form-label">Phone Number</span>
              <input
                type="tel"
                required
                className="form-input"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <span className="form-label">Street Address</span>
              <input
                type="text"
                required
                className="form-input"
                placeholder="100 Cyberpunk Lane"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <span className="form-label">City</span>
              <input
                type="text"
                required
                className="form-input"
                placeholder="Neo City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <span className="form-label">ZIP / Postal Code</span>
              <input
                type="text"
                required
                className="form-input"
                placeholder="94016"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
          </div>

          {/* Payment Info */}
          <div style={{ ...styles.sectionHeader, marginTop: '30px' }}>
            <CreditCard size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={styles.sectionTitle}>2. Payment Protocol</h3>
          </div>
          <div style={styles.inputsGrid}>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <span className="form-label">Cardholder Name</span>
              <input
                type="text"
                required
                className="form-input"
                placeholder="JOHN DOE"
                value={cardName}
                onChange={(e) => setCardName(e.target.value.toUpperCase())}
              />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <span className="form-label">Card Number</span>
              <input
                type="text"
                required
                className="form-input"
                placeholder="4111 2222 3333 4444"
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
            </div>
            <div className="form-group">
              <span className="form-label">Expiration Date</span>
              <input
                type="text"
                required
                className="form-input"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={handleExpiryChange}
              />
            </div>
            <div className="form-group">
              <span className="form-label">Security Code (CVV)</span>
              <input
                type="password"
                required
                className="form-input"
                placeholder="***"
                value={cardCvv}
                onChange={handleCvvChange}
              />
            </div>
          </div>

          <div style={styles.secureBanner}>
            <Lock size={14} style={{ color: 'var(--color-success)' }} />
            <span>Authorized by SSL and 256-bit encryption pipelines.</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Order summary details */}
        <div style={styles.summaryPanel} className="glass-panel">
          <h3 style={styles.summaryTitle}>Procurement Summary</h3>

          {/* Summary Items list */}
          <div style={styles.summaryItems}>
            {cart.map((item) => (
              <div key={item.cartId} style={styles.summaryItem}>
                <img src={item.product.image} alt={item.product.title} style={styles.sumImg} />
                <div style={styles.sumInfo}>
                  <h4 style={styles.sumName}>{item.product.title}</h4>
                  <span style={styles.sumQty}>Qty: {item.quantity}</span>
                </div>
                <span style={styles.sumPrice}>
                  ${(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing calculations details */}
          <div style={styles.breakdown}>
            <div style={styles.calcRow}>
              <span>Hardware Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            {appliedDiscount > 0 && (
              <div style={{ ...styles.calcRow, color: 'var(--color-success)' }}>
                <span>Discount Deduction</span>
                <span>-${discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div style={styles.calcRow}>
              <span>Delivery Cost</span>
              <span>{shippingAmount === 0 ? 'FREE' : `$${shippingAmount}`}</span>
            </div>
            <div style={styles.calcRow}>
              <span>State Tax (8%)</span>
              <span>${taxAmount.toLocaleString()}</span>
            </div>
            <div style={styles.totalRow}>
              <span>Estimated Total</span>
              <span style={styles.totalPrice}>${orderTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '20px', height: '48px', fontSize: '16px' }}
          >
            Authorize Purchase
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 0 80px 0',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  emptyContainer: {
    padding: '60px 40px',
    margin: '80px auto',
    maxWidth: '500px',
    textAlign: 'center'
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: '800'
  },
  pageSubtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '30px'
  },
  splitLayout: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '30px',
    alignItems: 'start'
  },
  formPanel: {
    padding: '30px'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '12px',
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: 'var(--text-primary)'
  },
  inputsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px 20px',
    marginBottom: '10px'
  },
  secureBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '25px',
    padding: '12px 16px',
    background: 'rgba(16, 185, 129, 0.04)',
    border: '1px solid rgba(16, 185, 129, 0.15)',
    borderRadius: '6px',
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  summaryPanel: {
    padding: '30px'
  },
  summaryTitle: {
    fontSize: '18px',
    fontWeight: '800',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '12px',
    marginBottom: '20px'
  },
  summaryItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxHeight: '260px',
    overflowY: 'auto',
    paddingRight: '5px',
    marginBottom: '20px'
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  sumImg: {
    width: '50px',
    height: '50px',
    borderRadius: '6px',
    objectFit: 'contain',
    padding: '4px',
    boxSizing: 'border-box',
    background: '#f9fafb'
  },
  sumInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  sumName: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-primary)'
  },
  sumQty: {
    fontSize: '11px',
    color: 'var(--text-secondary)'
  },
  sumPrice: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--color-primary)'
  },
  breakdown: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    borderTop: '1px dashed var(--border-glass)',
    paddingTop: '20px'
  },
  calcRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: 'var(--text-secondary)'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid var(--border-glass)',
    paddingTop: '12px',
    marginTop: '5px'
  },
  totalPrice: {
    fontSize: '22px',
    fontWeight: '800',
    color: 'var(--color-primary)',
    fontFamily: 'var(--font-heading)'
  },
  successWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px 0'
  },
  successBox: {
    maxWidth: '520px',
    width: '100%',
    padding: '40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid var(--border-glass)',
    background: '#ffffff'
  },
  successTitle: {
    fontSize: '26px',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '8px'
  },
  successDesc: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '30px'
  },
  receiptBox: {
    width: '100%',
    background: '#f4f6f5',
    border: '1px solid var(--border-glass)',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    textAlign: 'left'
  },
  receiptRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: 'var(--text-secondary)'
  },
  successButtons: {
    display: 'flex',
    gap: '15px',
    width: '100%'
  }
};

// Add responsive layout updates dynamically
if (typeof document !== 'undefined') {
  const checkoutStyles = document.createElement('style');
  checkoutStyles.innerHTML = `
    @media (max-width: 992px) {
      form[style*="splitLayout"] {
        grid-template-columns: 1fr !important;
      }
    }
    @media (max-width: 576px) {
      .checkout-grid-adjust {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.head.appendChild(checkoutStyles);
}
