import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, Tag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose }) {
  const {
    cart,
    updateCartQty,
    removeFromCart,
    applyPromoCode,
    discountCode,
    discountMessage,
    appliedDiscount,
    subtotal,
    discountAmount,
    shippingAmount,
    taxAmount,
    orderTotal,
    navigateTo
  } = useContext(ShopContext);

  const [promoInput, setPromoInput] = useState('');

  if (!isOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
    }
  };

  const handleCheckoutClick = () => {
    navigateTo('checkout');
    onClose();
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={styles.drawer}
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Your Cart</h2>
          <button style={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div style={styles.itemsContainer}>
          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '15px' }}>Your shopping cart is empty</p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  navigateTo('catalog');
                  onClose();
                }}
              >
                Browse Gadgets
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} style={styles.cartItem}>
                <img src={item.product.image} alt={item.product.title} style={styles.itemImage} />
                <div style={styles.itemInfo}>
                  <div style={styles.itemTitleRow}>
                    <h4 style={styles.itemTitle}>{item.product.title}</h4>
                    <button
                      style={styles.trashBtn}
                      onClick={() => removeFromCart(item.cartId)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  {/* Option values if selected */}
                  {(item.options.color || item.options.storage) && (
                    <div style={styles.itemOptionsText}>
                      {item.options.color && <span>Color: {item.options.color}</span>}
                      {item.options.storage && <span> | Spec: {item.options.storage}</span>}
                    </div>
                  )}

                  <div style={styles.qtyRow}>
                    <div style={styles.qtyControls}>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => updateCartQty(item.cartId, item.quantity - 1)}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={styles.qtyValue}>{item.quantity}</span>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => updateCartQty(item.cartId, item.quantity + 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span style={styles.itemPrice}>
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Calculations */}
        {cart.length > 0 && (
          <div style={styles.footer}>
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} style={styles.promoForm}>
              <div style={styles.promoInputWrapper}>
                <Tag size={16} style={styles.promoIcon} />
                <input
                  type="text"
                  placeholder="Promo Code (MANGANG20)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  style={styles.promoInput}
                />
              </div>
              <button type="submit" className="btn btn-secondary" style={styles.promoBtn}>
                Apply
              </button>
            </form>
            {discountMessage && (
              <p
                style={{
                  fontSize: '12px',
                  color: appliedDiscount > 0 ? 'var(--color-success)' : 'var(--color-danger)',
                  marginTop: '4px',
                  textAlign: 'left'
                }}
              >
                {discountMessage}
              </p>
            )}

            {/* Price breakdown */}
            <div style={styles.breakdown}>
              <div style={styles.priceRow}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {appliedDiscount > 0 && (
                <div style={{ ...styles.priceRow, color: 'var(--color-success)' }}>
                  <span>Discount ({appliedDiscount}%)</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div style={styles.priceRow}>
                <span>Shipping</span>
                <span>{shippingAmount === 0 ? 'FREE' : `₹${shippingAmount}`}</span>
              </div>
              <div style={styles.priceRow}>
                <span>Est. GST (18%)</span>
                <span>₹{taxAmount.toLocaleString()}</span>
              </div>
              <div style={styles.totalRow}>
                <span>Total</span>
                <span style={styles.totalVal}>₹{orderTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={handleCheckoutClick}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '15px' }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(3, 5, 10, 0.7)',
    backdropFilter: 'blur(8px)',
    zIndex: 2000,
    display: 'flex',
    justifyContent: 'flex-end',
    animation: 'fadeIn 0.2s ease-out'
  },
  drawer: {
    width: '100%',
    maxWidth: '460px',
    height: '100%',
    borderRadius: '0',
    borderTop: 'none',
    borderBottom: 'none',
    borderRight: 'none',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid var(--border-glass)'
  },
  title: {
    fontSize: '20px',
    fontWeight: '700'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s'
  },
  itemsContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  emptyCart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  cartItem: {
    display: 'flex',
    gap: '16px',
    background: '#ffffff',
    border: '1px solid var(--border-glass)',
    borderRadius: '12px',
    padding: '12px',
    transition: 'border-color 0.2s'
  },
  itemImage: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'contain',
    padding: '8px',
    boxSizing: 'border-box',
    background: '#f9fafb'
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  itemTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  itemTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    textAlign: 'left'
  },
  itemOptionsText: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    textAlign: 'left',
    marginTop: '2px'
  },
  trashBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '2px',
    transition: 'color 0.2s'
  },
  qtyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px'
  },
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.03)',
    border: '1px solid var(--border-glass)',
    borderRadius: '6px',
    padding: '2px'
  },
  qtyBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  qtyValue: {
    fontSize: '13px',
    fontWeight: '600',
    minWidth: '24px',
    textAlign: 'center'
  },
  itemPrice: {
    fontSize: '15px',
    fontWeight: '700',
    color: 'var(--color-primary)'
  },
  footer: {
    padding: '24px',
    borderTop: '1px solid var(--border-glass)',
    background: '#ffffff'
  },
  promoForm: {
    display: 'flex',
    gap: '10px',
    marginBottom: '8px'
  },
  promoInputWrapper: {
    position: 'relative',
    flex: 1
  },
  promoIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)'
  },
  promoInput: {
    width: '100%',
    padding: '10px 12px 10px 36px',
    background: '#ffffff',
    border: '1px solid var(--border-glass)',
    borderRadius: '6px',
    color: 'var(--text-primary)',
    fontSize: '13px'
  },
  promoBtn: {
    padding: '10px 16px',
    fontSize: '13px'
  },
  breakdown: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '15px',
    borderTop: '1px dashed var(--border-glass)',
    paddingTop: '15px'
  },
  priceRow: {
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
    paddingTop: '10px',
    marginTop: '5px',
    fontWeight: '700',
    fontSize: '16px',
    color: 'var(--text-primary)'
  },
  totalVal: {
    color: 'var(--color-primary)',
    fontSize: '20px',
    fontFamily: 'var(--font-heading)'
  }
};
