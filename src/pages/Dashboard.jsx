import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Package, CreditCard, User, ShoppingBag, Edit, Lock, Check, X } from 'lucide-react';

export default function Dashboard() {
  const { wishlist, products, orders, navigateTo, currentUser, updateUserProfile } = useContext(ShopContext);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [phone, setPhone] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || currentUser.username || '');
      setAddress(currentUser.address || '');
      setPaymentMode(currentUser.paymentMode || 'Credit Card / UPI');
      setPhone(currentUser.phone || '');
    }
  }, [currentUser]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      username: name,
      address,
      paymentMode,
      phone
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

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
          
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)} 
              style={styles.editBtn}
              title="Edit Profile"
            >
              <Edit size={14} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(false)} 
              style={{ ...styles.editBtn, background: 'rgba(239,68,68,0.1)', color: 'var(--color-danger)', borderColor: 'rgba(239,68,68,0.25)' }}
            >
              <X size={14} />
              <span>Cancel</span>
            </button>
          )}
        </div>

        {saveSuccess && (
          <div className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', fontSize: '12px' }}>
            <Check size={14} /> Profile details updated successfully!
          </div>
        )}

        {!isEditing ? (
          /* View Mode */
          <div style={styles.accountGrid}>
            <div style={styles.detailBox}>
              <span style={styles.detailLabel}>Full Name</span>
              <strong style={styles.detailValue}>{currentUser?.name || currentUser?.username || 'Customer'}</strong>
            </div>

            <div style={styles.detailBox}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={styles.detailLabel}>Email Address</span>
                <span style={styles.lockTag}><Lock size={10} /> Locked</span>
              </div>
              <strong style={styles.detailValue}>{currentUser?.email || 'guest@mangang.com'}</strong>
            </div>

            <div style={styles.detailBox}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={styles.detailLabel}>Phone Number</span>
                {currentUser?.phone && <span style={styles.lockTag}><Lock size={10} /> Locked</span>}
              </div>
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
        ) : (
          /* Edit Form Mode */
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              
              {/* Full Name */}
              <div className="form-group">
                <span className="form-label">Full Name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="Enter full name..."
                />
              </div>

              {/* Email Address (LOCKED) */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="form-label">Email Address</span>
                  <span style={styles.lockNotice}><Lock size={11} /> Cannot be edited</span>
                </div>
                <input
                  type="email"
                  value={currentUser?.email || ''}
                  disabled
                  className="form-input"
                  style={{ opacity: 0.6, cursor: 'not-allowed', background: 'rgba(0,0,0,0.2)' }}
                />
              </div>

              {/* Phone Number (LOCKED if set) */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="form-label">Phone Number</span>
                  {currentUser?.phone ? (
                    <span style={styles.lockNotice}><Lock size={11} /> Locked</span>
                  ) : (
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Set once</span>
                  )}
                </div>
                <input
                  type="tel"
                  value={phone}
                  disabled={Boolean(currentUser?.phone)}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                  placeholder="e.g. +91 9876543210"
                  style={currentUser?.phone ? { opacity: 0.6, cursor: 'not-allowed', background: 'rgba(0,0,0,0.2)' } : {}}
                />
              </div>

              {/* Payment Mode */}
              <div className="form-group">
                <span className="form-label">Default Payment Mode</span>
                <input
                  type="text"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="form-input"
                  placeholder="e.g. UPI / Credit Card"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="form-group">
              <span className="form-label">Shipping Address</span>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-input"
                style={{ height: '70px', resize: 'vertical' }}
                placeholder="Enter full shipping address..."
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '6px' }}>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="btn btn-outline"
                style={{ padding: '10px 18px', fontSize: '13px' }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ padding: '10px 22px', fontSize: '13px' }}
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
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
    justifyContent: 'space-between',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '12px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '800',
    fontFamily: 'var(--font-heading)',
    color: 'var(--text-primary)',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  editBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: '6px',
    border: '1px solid rgba(99,102,241,0.3)',
    background: 'rgba(99,102,241,0.1)',
    color: 'var(--color-primary)',
    cursor: 'pointer',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    fontSize: '12.5px',
    transition: 'all 0.2s ease',
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
  lockTag: {
    fontSize: '10px',
    color: 'var(--color-warning)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    fontWeight: '600'
  },
  lockNotice: {
    fontSize: '10.5px',
    color: 'var(--color-warning)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
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
