import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Package, History, ArrowRight } from 'lucide-react';

export default function MyOrders() {
  const { orders, navigateTo } = useContext(ShopContext);

  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>My Orders</h1>
        <p style={styles.pageSubtitle}>History of all your purchases and order logs.</p>
      </div>

      {orders.length === 0 ? (
        <div style={styles.emptyCard} className="glass-panel">
          <Package size={44} style={{ color: 'var(--text-muted)', marginBottom: '14px' }} />
          <h3 style={{ color: '#fff', fontSize: '18px', margin: '0 0 6px 0' }}>No Active Orders</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 20px 0' }}>
            You haven't placed any orders yet. Explore our hardware catalog to get started.
          </p>
          <button className="btn btn-primary" onClick={() => navigateTo('catalog')}>
            Explore Shop
          </button>
        </div>
      ) : (
        <div style={styles.ordersList}>
          {orders.map((order) => (
            <div key={order.orderId} style={styles.orderCard} className="glass-panel">
              <div style={styles.orderHeader}>
                <div>
                  <span style={styles.orderIdLabel}>ORDER ID</span>
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
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Payment: QR Code Verification</span>
                <div style={styles.totalBlock}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total Paid:</span>
                  <strong style={styles.totalPrice}>${order.pricing.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '30px 0 80px 0',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  header: {
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '14px'
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '800',
    fontFamily: 'var(--font-heading)',
    color: 'var(--text-primary)',
    margin: '0 0 4px 0'
  },
  pageSubtitle: {
    fontSize: '13.5px',
    color: 'var(--text-secondary)',
    margin: 0
  },
  emptyCard: {
    padding: '60px 40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  orderCard: {
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '12px'
  },
  orderIdLabel: {
    fontSize: '10px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    letterSpacing: '0.07em'
  },
  orderIdText: {
    fontSize: '16px',
    fontWeight: '800',
    color: 'var(--color-primary)',
    margin: '2px 0 0 0',
    fontFamily: 'var(--font-heading)'
  },
  statusCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px'
  },
  orderDate: {
    fontSize: '12px',
    color: 'var(--text-muted)'
  },
  statusBadge: {
    fontSize: '10px'
  },
  orderItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  orderItemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13.5px'
  },
  orderItemDetails: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  itemTitle: {
    fontWeight: '600',
    color: 'var(--text-primary)'
  },
  itemOptionsText: {
    fontSize: '12px',
    color: 'var(--text-muted)'
  },
  itemQty: {
    color: 'var(--text-secondary)',
    fontWeight: '600'
  },
  itemPrice: {
    fontWeight: '700',
    color: 'var(--text-primary)'
  },
  orderTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid var(--border-glass)',
    paddingTop: '12px'
  },
  totalBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  totalPrice: {
    fontSize: '16px',
    fontWeight: '800',
    color: 'var(--color-success)',
    fontFamily: 'var(--font-heading)'
  }
};
