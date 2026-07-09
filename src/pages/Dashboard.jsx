import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Package, Heart, History, Trash2, ShoppingCart, ArrowRight, User } from 'lucide-react';

export default function Dashboard() {
  const { wishlist, products, orders, toggleWishlist, addToCart, navigateTo, activeDashboardTab, setActiveDashboardTab, currentUser } = useContext(ShopContext);

  const wishlistedItems = products.filter((p) => wishlist.includes(p.id));

  const handleRemoveWishlist = (id, e) => {
    e.stopPropagation();
    toggleWishlist(id);
  };

  const handleWishlistAddToCart = (item, e) => {
    e.stopPropagation();
    if (item.stock <= 0) return;
    
    const defaultOptions = {};
    if (item.options) {
      if (item.options.colors && item.options.colors.length > 0) {
        defaultOptions.color = item.options.colors[0];
      }
      if (item.options.storage && item.options.storage.length > 0) {
        defaultOptions.storage = item.options.storage[0];
      }
    }

    addToCart(item, 1, defaultOptions);
  };

  return (
    <div style={styles.container} className="animate-fade-in">
      <h1 style={styles.pageTitle}>User Dashboard</h1>
      <p style={styles.pageSubtitle}>Welcome to your dashboard — manage everything in one place.</p>

      {/* Tab Navigation Row */}
      <div style={styles.tabsRow}>
        <button
          onClick={() => setActiveDashboardTab('orders')}
          style={{
            ...styles.tabBtn,
            color: activeDashboardTab === 'orders' ? 'var(--color-primary)' : 'var(--text-secondary)',
            borderBottomColor: activeDashboardTab === 'orders' ? 'var(--color-primary)' : 'transparent',
            fontWeight: activeDashboardTab === 'orders' ? '700' : '600'
          }}
        >
          <Package size={15} />
          <span>My Orders</span>
        </button>
        <button
          onClick={() => setActiveDashboardTab('transactions')}
          style={{
            ...styles.tabBtn,
            color: activeDashboardTab === 'transactions' ? 'var(--color-primary)' : 'var(--text-secondary)',
            borderBottomColor: activeDashboardTab === 'transactions' ? 'var(--color-primary)' : 'transparent',
            fontWeight: activeDashboardTab === 'transactions' ? '700' : '600'
          }}
        >
          <History size={15} />
          <span>Recent Transactions</span>
        </button>
        <button
          onClick={() => setActiveDashboardTab('account')}
          style={{
            ...styles.tabBtn,
            color: activeDashboardTab === 'account' ? 'var(--color-primary)' : 'var(--text-secondary)',
            borderBottomColor: activeDashboardTab === 'account' ? 'var(--color-primary)' : 'transparent',
            fontWeight: activeDashboardTab === 'account' ? '700' : '600'
          }}
        >
          <User size={15} />
          <span>My Account</span>
        </button>
      </div>

      <div style={styles.layoutGrid} className="responsive-grid">
        {/* LEFT COLUMN: ACTIVE TAB PANEL */}
        <div style={styles.leftCol}>
          
          {/* TAB 1: MY ORDERS */}
          {activeDashboardTab === 'orders' && (
            <>
              <div style={styles.sectionHeader}>
                <Package size={18} style={{ color: 'var(--color-primary)' }} />
                <h3 style={styles.sectionTitle}>Procurement Log History</h3>
              </div>

              {orders.length === 0 ? (
                <div style={styles.emptyCard} className="glass-panel">
                  <History size={36} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
                  <h4 style={{ color: '#fff' }}>No Active Logs</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px', marginBottom: '15px' }}>
                    You have not checked out any hardware nodes yet.
                  </p>
                  <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => navigateTo('catalog')}>
                    Deploy Products
                  </button>
                </div>
              ) : (
                <div style={styles.ordersList}>
                  {orders.map((order) => (
                    <div key={order.orderId} style={styles.orderCard} className="glass-panel">
                      <div style={styles.orderHeader}>
                        <div>
                          <span style={styles.orderIdLabel}>ORDER LOG</span>
                          <h4 style={styles.orderIdText}>{order.orderId}</h4>
                        </div>
                        <div style={styles.statusCol}>
                          <span style={styles.orderDate}>{order.date}</span>
                          <span className="badge badge-cyan" style={styles.statusBadge}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div style={styles.orderItems}>
                        {order.items.map((item, idx) => (
                          <div key={idx} style={styles.orderItemRow}>
                            <div style={styles.orderItemDetails}>
                              <span style={styles.itemTitle}>{item.product.title}</span>
                              {item.options && (item.options.color || item.options.storage) && (
                                <span style={styles.itemOptionsText}>
                                  [{item.options.color || ''} {item.options.storage || ''}]
                                </span>
                              )}
                            </div>
                            <span style={styles.itemQty}>x{item.quantity}</span>
                            <span style={styles.itemPrice}>${(item.product.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      <div style={styles.orderTotalRow}>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Payment: {order.paymentDetails.cardNumber}</span>
                        <div style={styles.totalBlock}>
                          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total Billed:</span>
                          <strong style={styles.totalPrice}>${order.pricing.total.toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* TAB 2: RECENT TRANSACTIONS */}
          {activeDashboardTab === 'transactions' && (
            <>
              <div style={styles.sectionHeader}>
                <History size={18} style={{ color: 'var(--color-primary)' }} />
                <h3 style={styles.sectionTitle}>Recent Payments Ledger</h3>
              </div>

              {orders.length === 0 ? (
                <div style={styles.emptyCard} className="glass-panel">
                  <History size={36} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
                  <h4 style={{ color: '#fff' }}>No Transactions Yet</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px', marginBottom: '15px' }}>
                    There are no recorded transaction events on this profile.
                  </p>
                  <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => navigateTo('catalog')}>
                    Explore Shop
                  </button>
                </div>
              ) : (
                <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)', minWidth: '400px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-glass)', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '10px 8px' }}>TXN HASH</th>
                        <th style={{ padding: '10px 8px' }}>DATE</th>
                        <th style={{ padding: '10px 8px' }}>BILLING ACCOUNT</th>
                        <th style={{ padding: '10px 8px', textAlign: 'right' }}>AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.orderId} style={{ borderBottom: '1px solid var(--border-glass)', fontSize: '13px' }}>
                          <td style={{ padding: '12px 8px', fontFamily: 'monospace', color: 'var(--color-primary)' }}>txn_{order.orderId.substring(4)}</td>
                          <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{order.date}</td>
                          <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{order.paymentDetails.cardNumber}</td>
                          <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: '700' }}>${order.pricing.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* TAB 3: MY ACCOUNT */}
          {activeDashboardTab === 'account' && (
            <>
              <div style={styles.sectionHeader}>
                <User size={18} style={{ color: 'var(--color-primary)' }} />
                <h3 style={styles.sectionTitle}>Identity Profile</h3>
              </div>

              <div className="glass-panel" style={{ padding: '24px' }}>
                <div style={styles.accountCard}>
                  <div style={styles.accountRow}>
                    <span style={styles.accountLabel}>Name:</span>
                    <span style={styles.accountValue}>{currentUser?.name || currentUser?.username || 'Client Enforcer'}</span>
                  </div>
                  <div style={styles.accountRow}>
                    <span style={styles.accountLabel}>Client ID:</span>
                    <span style={styles.accountValue}>{currentUser?.clientId || `usr_db_${currentUser?.email?.split('@')[0] || '9381'}`}</span>
                  </div>
                  <div style={styles.accountRow}>
                    <span style={styles.accountLabel}>Address:</span>
                    <span style={styles.accountValue}>{currentUser?.address || 'No address set up yet.'}</span>
                  </div>
                  <div style={styles.accountRow}>
                    <span style={styles.accountLabel}>Phone Number:</span>
                    <span style={styles.accountValue}>{currentUser?.phone || 'No phone number set up yet.'}</span>
                  </div>
                  <div style={styles.accountRow}>
                    <span style={styles.accountLabel}>Email Address:</span>
                    <span style={styles.accountValue}>{currentUser?.email || 'guest@mangang.com'}</span>
                  </div>
                  <div style={styles.accountRow}>
                    <span style={styles.accountLabel}>Payment Mode:</span>
                    <span style={styles.accountValue}>{currentUser?.paymentMode || 'No payment mode set up yet.'}</span>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        {/* RIGHT COLUMN: ECOSYSTEM WISHLIST */}
        <div style={styles.rightCol}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ ...styles.sectionHeader, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', marginBottom: '20px' }}>
              <Heart size={18} style={{ color: 'var(--color-danger)' }} />
              <h3 style={styles.sectionTitle}>Wishlist Item</h3>
            </div>

            {wishlistedItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <Heart size={24} style={{ color: 'var(--text-muted)', marginBottom: '10px' }} />
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Your wishlist catalog is empty.</p>
              </div>
            ) : (
              <div style={styles.wishlistItems}>
                {wishlistedItems.map((item) => (
                  <div
                    key={item.id}
                    style={styles.wishItem}
                    onClick={() => navigateTo('product-details', item.id)}
                  >
                    <img src={item.image} alt={item.title} style={styles.wishImg} />
                    <div style={styles.wishInfo}>
                      <h4 style={styles.wishTitle}>{item.title}</h4>
                      <span style={styles.wishPrice}>${item.price.toLocaleString()}</span>
                    </div>
                    
                    <div style={styles.wishActions}>
                      <button
                        onClick={(e) => handleWishlistAddToCart(item, e)}
                        disabled={item.stock <= 0}
                        style={{
                          ...styles.wishActionBtn,
                          background: item.stock > 0 ? 'rgba(0, 245, 255, 0.08)' : 'rgba(255,255,255,0.02)'
                        }}
                        title={item.stock > 0 ? 'Quick Add to Cart' : 'Out of Stock'}
                      >
                        <ShoppingCart size={14} style={{ color: item.stock > 0 ? 'var(--color-primary)' : 'var(--text-muted)' }} />
                      </button>
                      <button
                        onClick={(e) => handleRemoveWishlist(item.id, e)}
                        style={{ ...styles.wishActionBtn, background: 'rgba(239, 68, 68, 0.08)' }}
                        title="Remove from Wishlist"
                      >
                        <Trash2 size={14} style={{ color: 'var(--color-danger)' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
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
  pageTitle: {
    fontSize: '32px',
    fontWeight: '800'
  },
  pageSubtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '35px'
  },
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '30px',
    alignItems: 'start'
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  tabsRow: {
    display: 'flex',
    gap: '15px',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '0px',
    marginBottom: '25px',
    flexWrap: 'wrap'
  },
  tabBtn: {
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    padding: '8px 4px',
    fontFamily: 'var(--font-heading)',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    outline: 'none'
  },
  accountCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '5px'
  },
  accountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '8px'
  },
  accountLabel: {
    color: 'var(--text-muted)',
    fontWeight: '500'
  },
  accountValue: {
    color: 'var(--text-primary)',
    fontWeight: '600'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: 'var(--text-primary)'
  },
  emptyCard: {
    padding: '40px 20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  orderCard: {
    padding: '24px'
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '15px',
    marginBottom: '15px'
  },
  orderIdLabel: {
    fontSize: '10px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    letterSpacing: '0.05em'
  },
  orderIdText: {
    fontSize: '16px',
    fontWeight: '800',
    color: 'var(--text-primary)'
  },
  statusCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px'
  },
  orderDate: {
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  statusBadge: {
    fontSize: '9px',
    padding: '3px 8px'
  },
  orderItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '15px',
    marginBottom: '15px'
  },
  orderItemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px'
  },
  orderItemDetails: {
    flex: 1,
    display: 'flex',
    gap: '6px',
    alignItems: 'center'
  },
  itemTitle: {
    fontWeight: '600',
    color: 'var(--text-primary)'
  },
  itemOptionsText: {
    fontSize: '11px',
    color: 'var(--text-muted)'
  },
  itemQty: {
    color: 'var(--text-secondary)',
    width: '40px',
    textAlign: 'center'
  },
  itemPrice: {
    fontWeight: '600',
    color: 'var(--text-primary)',
    width: '70px',
    textAlign: 'right'
  },
  orderTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  totalPrice: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'var(--color-primary)',
    fontFamily: 'var(--font-heading)'
  },
  wishlistItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  wishItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '10px',
    background: '#ffffff',
    border: '1px solid var(--border-glass)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      borderColor: 'var(--color-primary)'
    }
  },
  wishImg: {
    width: '45px',
    height: '45px',
    borderRadius: '4px',
    objectFit: 'contain',
    padding: '2px',
    boxSizing: 'border-box',
    background: '#f9fafb'
  },
  wishInfo: {
    flex: 1,
    textAlign: 'left'
  },
  wishTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--text-primary)'
  },
  wishPrice: {
    fontSize: '12px',
    color: 'var(--color-primary)',
    fontWeight: '700'
  },
  wishActions: {
    display: 'flex',
    gap: '6px'
  },
  wishActionBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    ':hover': {
      opacity: 0.9
    }
  }
};

// Add layout adjust style tag
if (typeof document !== 'undefined') {
  const dashStyle = document.createElement('style');
  dashStyle.innerHTML = `
    @media (max-width: 992px) {
      div[style*="layoutGrid"] {
        grid-template-columns: 1fr !important;
      }
    }
    div[style*="wishItem"]:hover {
      border-color: var(--color-primary) !important;
    }
  `;
  document.head.appendChild(dashStyle);
}
