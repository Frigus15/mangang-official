import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Package, CreditCard, User, ShoppingBag, Heart } from 'lucide-react';

export default function Dashboard() {
  const { wishlist, products, orders, navigateTo, currentUser } = useContext(ShopContext);

  const totalOrdersCount = orders.length;
  const totalAmountSpent = orders.reduce((sum, o) => sum + (o.pricing?.total || 0), 0);

  return (
    <div style={styles.container} className="animate-fade-in">
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Account Overview</h1>
        <p style={styles.pageSubtitle}>Manage your profile details and summary of orders.</p>
      </div>

      {/* KPI Metrics: Total Orders & Total Amount Spent */}
      <div style={styles.metricsGrid}>
        <div className="glass-panel" style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <span style={styles.metricLabel}>TOTAL ORDERS</span>
            <Package size={20} color="var(--color-primary)" />
          </div>
          <h2 style={{ ...styles.metricValue, color: 'var(--color-primary)' }}>{totalOrdersCount}</h2>
          <p style={styles.metricSub}>Completed order purchases</p>
        </div>

        <div className="glass-panel" style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <span style={styles.metricLabel}>TOTAL AMOUNT SPENT</span>
            <CreditCard size={20} color="var(--color-success)" />
          </div>
          <h2 style={{ ...styles.metricValue, color: 'var(--color-success)' }}>
            ${totalAmountSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <p style={styles.metricSub}>Total spending to date</p>
        </div>
      </div>

      {/* Account Details Panel */}
      <div className="glass-panel" style={styles.sectionCard}>
        <div style={styles.sectionTitleRow}>
          <User size={18} color="var(--color-primary)" />
          <h3 style={styles.sectionTitle}>Account Details</h3>
        </div>

        <div style={styles.accountGrid}>
          <div style={styles.detailBox}>
            <span style={styles.detailLabel}>Full Name</span>
            <strong style={styles.detailValue}>{currentUser?.name || currentUser?.username || 'Customer'}</strong>
          </div>

          <div style={styles.detailBox}>
            <span style={styles.detailLabel}>Email Address</span>
            <strong style={styles.detailValue}>{currentUser?.email || 'guest@mangang.com'}</strong>
          </div>

          <div style={styles.detailBox}>
            <span style={styles.detailLabel}>Phone Number</span>
            <strong style={styles.detailValue}>{currentUser?.phone || 'Not provided'}</strong>
          </div>

          <div style={styles.detailBox}>
            <span style={styles.detailLabel}>Shipping Address</span>
            <strong style={styles.detailValue}>{currentUser?.address || 'No shipping address configured'}</strong>
          </div>

          <div style={styles.detailBox}>
            <span style={styles.detailLabel}>Payment Mode</span>
            <strong style={styles.detailValue}>{currentUser?.paymentMode || 'Credit Card / UPI'}</strong>
          </div>
        </div>
      </div>

      {/* Orders List Section */}
      <div className="glass-panel" style={styles.sectionCard}>
        <div style={styles.sectionTitleRow}>
          <ShoppingBag size={18} color="var(--color-primary)" />
          <h3 style={styles.sectionTitle}>My Orders ({orders.length})</h3>
        </div>

        {orders.length === 0 ? (
          <div style={styles.emptyOrders}>
            <Package size={32} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 12px 0' }}>No orders placed yet.</p>
            <button 
              className="btn btn-primary" 
              style={{ fontSize: '13px', padding: '8px 18px' }}
              onClick={() => navigateTo('catalog')}
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div style={styles.ordersTableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Items Purchased</th>
                  <th style={styles.th}>Total Billed</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.orderId} style={styles.tr}>
                    <td style={styles.td}><span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>{o.orderId}</span></td>
                    <td style={styles.td}><span style={{ color: 'var(--text-secondary)' }}>{o.date}</span></td>
                    <td style={styles.td}><span>{o.items.reduce((s, i) => s + i.quantity, 0)} item(s)</span></td>
                    <td style={styles.td}><span style={{ color: 'var(--color-success)', fontWeight: '700' }}>${o.pricing.total.toFixed(2)}</span></td>
                    <td style={styles.td}><span className="badge badge-green" style={{ fontSize: '10px' }}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
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
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px'
  },
  metricCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  metricLabel: {
    fontSize: '10px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    letterSpacing: '0.07em'
  },
  metricValue: {
    fontSize: '28px',
    fontWeight: '800',
    fontFamily: 'var(--font-heading)',
    margin: 0
  },
  metricSub: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    margin: 0
  },
  sectionCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  sectionTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '12px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '800',
    fontFamily: 'var(--font-heading)',
    color: 'var(--text-primary)',
    margin: 0
  },
  accountGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  },
  detailBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '12px 14px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border-glass)'
  },
  detailLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  detailValue: {
    fontSize: '13.5px',
    color: 'var(--text-primary)',
    fontWeight: '600'
  },
  emptyOrders: {
    textAlign: 'center',
    padding: '30px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  ordersTableWrapper: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  tableHeaderRow: {
    borderBottom: '1px solid var(--border-glass)'
  },
  th: {
    padding: '10px 10px',
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap'
  },
  tr: {
    borderBottom: '1px solid var(--border-glass)'
  },
  td: {
    padding: '12px 10px',
    fontSize: '13px',
    verticalAlign: 'middle'
  }
};
