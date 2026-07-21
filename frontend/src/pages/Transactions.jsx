import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { History, CreditCard } from 'lucide-react';

export default function Transactions() {
  const { orders, navigateTo } = useContext(ShopContext);

  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Recent Transactions</h1>
        <p style={styles.pageSubtitle}>Financial transaction log and payment history ledger.</p>
      </div>

      {orders.length === 0 ? (
        <div style={styles.emptyCard} className="glass-panel">
          <History size={44} style={{ color: 'var(--text-muted)', marginBottom: '14px' }} />
          <h3 style={{ color: '#fff', fontSize: '18px', margin: '0 0 6px 0' }}>No Recorded Transactions</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 20px 0' }}>
            There are no recorded financial transactions on your account profile yet.
          </p>
          <button className="btn btn-primary" onClick={() => navigateTo('catalog')}>
            Explore Shop
          </button>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)', minWidth: '500px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glass)', textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TXN HASH</th>
                <th style={{ padding: '12px 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DATE</th>
                <th style={{ padding: '12px 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PAYMENT TYPE</th>
                <th style={{ padding: '12px 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>STATUS</th>
                <th style={{ padding: '12px 10px', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId} style={{ borderBottom: '1px solid var(--border-glass)', fontSize: '13.5px' }}>
                  <td style={{ padding: '14px 10px', fontFamily: 'monospace', color: 'var(--color-primary)', fontWeight: '700' }}>
                    txn_{order.orderId.substring(4)}
                  </td>
                  <td style={{ padding: '14px 10px', color: 'var(--text-secondary)' }}>{order.date}</td>
                  <td style={{ padding: '14px 10px', color: 'var(--text-primary)', fontWeight: '600' }}>UPI / QR Payment</td>
                  <td style={{ padding: '14px 10px' }}>
                    <span className="badge badge-green" style={{ fontSize: '10px' }}>Verified</span>
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'right', fontWeight: '800', color: 'var(--color-success)', fontFamily: 'var(--font-heading)' }}>
                    ₹{order.pricing.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  }
};
