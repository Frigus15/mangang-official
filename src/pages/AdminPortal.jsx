import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import {
  LayoutDashboard, ShoppingBag, CreditCard, Package, Image,
  Tag, Power, Users, ArrowLeftCircle, Plus, Check, Trash,
  DollarSign, Layers, AlertTriangle, Menu, X, ChevronRight
} from 'lucide-react';

// ─── Sidebar menu config ───────────────────────────────────────────────
const MENU_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',      icon: LayoutDashboard },
  { id: 'orders',       label: 'Orders',          icon: ShoppingBag },
  { id: 'payments',     label: 'Payments',        icon: CreditCard },
  { id: 'products',     label: 'Products',        icon: Package },
  { id: 'banners',      label: 'Banners',         icon: Image },
  { id: 'category',     label: 'Category',        icon: Tag },
  { id: 'website',      label: 'Website On/Off',  icon: Power },
  { id: 'customers',    label: 'Customers',       icon: Users },
];

export default function AdminPortal() {
  const {
    products, orders, addNewProduct, updateProductStock,
    bannerSlides, addBannerSlide, removeBannerSlide,
    navigateTo, users
  } = useContext(ShopContext);

  const [activeTab, setActiveTab]   = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Product form state ──────────────────────────────────────────────
  const [newTitle, setNewTitle]       = useState('');
  const [newCategory, setNewCategory] = useState('Audio');
  const [newPrice, setNewPrice]       = useState('');
  const [newStock, setNewStock]       = useState('');
  const [newImage, setNewImage]       = useState('');
  const [newDesc, setNewDesc]         = useState('');
  const [newFeatures, setNewFeatures] = useState('');
  const [specKey1, setSpecKey1]       = useState('Connection');
  const [specVal1, setSpecVal1]       = useState('');
  const [specKey2, setSpecKey2]       = useState('Battery Life');
  const [specVal2, setSpecVal2]       = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // ── Banner form state ───────────────────────────────────────────────
  const [slideImage, setSlideImage]         = useState('');
  const [slideProductId, setSlideProductId] = useState('');
  const [slideSuccess, setSlideSuccess]     = useState(false);

  // ── Website toggle state ────────────────────────────────────────────
  const [siteEnabled, setSiteEnabled] = useState(true);

  // ── Category management state ───────────────────────────────────────
  const [categories, setCategories] = useState(['Audio', 'Wearables', 'Computers', 'Smart Home']);
  const [newCatName, setNewCatName] = useState('');

  // ── Stats ───────────────────────────────────────────────────────────
  const totalRevenue  = orders.reduce((sum, o) => sum + o.pricing.total, 0);
  const lowStockCount = products.filter(p => p.stock < 5).length;
  const totalRevOrders = orders.length;
  const totalCustomers = (users || []).filter(u => u.role !== 'admin').length;

  // ── Handlers ────────────────────────────────────────────────────────
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newStock || !newDesc) {
      alert('Please fill all required fields.');
      return;
    }
    const specs = {};
    if (specKey1 && specVal1) specs[specKey1] = specVal1;
    if (specKey2 && specVal2) specs[specKey2] = specVal2;

    addNewProduct({
      title: newTitle, category: newCategory,
      price: Number(newPrice), stock: Number(newStock), rating: 5.0,
      image: newImage || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
      description: newDesc, features: newFeatures,
      specifications: specs, colors: 'Black, White, Gray', storage: 'Standard Edition'
    });
    setNewTitle(''); setNewPrice(''); setNewStock(''); setNewImage('');
    setNewDesc(''); setNewFeatures(''); setSpecVal1(''); setSpecVal2('');
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  const handleAddSlide = (e) => {
    e.preventDefault();
    if (!slideImage) { alert('Please enter a banner image URL.'); return; }
    addBannerSlide({
      title: 'Banner Slide', subtitle: '', image: slideImage,
      productId: slideProductId || (products[0]?.id || 'prod-1')
    });
    setSlideImage(''); setSlideProductId('');
    setSlideSuccess(true);
    setTimeout(() => setSlideSuccess(false), 3000);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const trimmed = newCatName.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    setCategories(prev => [...prev, trimmed]);
    setNewCatName('');
  };

  const handleDeleteCategory = (cat) => {
    setCategories(prev => prev.filter(c => c !== cat));
  };

  // ── Sidebar ──────────────────────────────────────────────────────────
  const Sidebar = () => (
    <aside style={styles.sidebar}>
      {/* Admin Brand */}
      <div style={styles.sidebarBrand}>
        <div style={styles.brandIconWrap}>
          <LayoutDashboard size={18} color="var(--color-primary)" />
        </div>
        <div>
          <div style={styles.brandTitle}>Admin Hub</div>
          <div style={styles.brandSub}>Control Center</div>
        </div>
      </div>

      <div style={styles.sidebarDivider} />

      {/* Nav Items */}
      <nav style={styles.sidebarNav}>
        {MENU_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              style={{
                ...styles.sidebarItem,
                background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                borderColor: isActive ? 'var(--color-primary)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-secondary)',
              }}
            >
              <Icon size={17} style={{ color: isActive ? 'var(--color-primary)' : 'inherit', flexShrink: 0 }} />
              <span>{item.label}</span>
              {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto', color: 'var(--color-primary)' }} />}
            </button>
          );
        })}
      </nav>

      <div style={styles.sidebarDivider} />

      {/* Back to Basic */}
      <button
        onClick={() => navigateTo('home')}
        style={styles.backToBasicBtn}
      >
        <ArrowLeftCircle size={17} style={{ flexShrink: 0 }} />
        <span>Back to Basic</span>
      </button>
    </aside>
  );

  // ── Tab Content ──────────────────────────────────────────────────────
  const renderContent = () => {
    switch (activeTab) {

      // ── DASHBOARD ─────────────────────────────────────────────────
      case 'dashboard':
        return (
          <div style={styles.tabContent} className="admin-tab-content">
            <div style={styles.tabHeader}>
              <h2 style={styles.tabTitle}>Dashboard</h2>
              <p style={styles.tabSubtitle}>Overview of store performance and key metrics.</p>
            </div>
            <div style={styles.kpiGrid}>
              {[
                { label: 'TOTAL REVENUE', value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, sub: 'From all completed orders', icon: DollarSign, color: 'var(--color-primary)' },
                { label: 'TOTAL ORDERS', value: totalRevOrders, sub: 'Telemetry transaction records', icon: ShoppingBag, color: 'var(--color-secondary)' },
                { label: 'PRODUCTS', value: products.length, sub: 'Active catalog listings', icon: Layers, color: 'var(--color-accent)' },
                { label: 'LOW STOCK', value: lowStockCount, sub: 'Items with < 5 units', icon: AlertTriangle, color: lowStockCount > 0 ? 'var(--color-warning)' : 'var(--color-success)' },
                { label: 'CUSTOMERS', value: totalCustomers, sub: 'Registered user accounts', icon: Users, color: 'var(--color-success)' },
                { label: 'BANNERS', value: bannerSlides.length, sub: 'Active homepage slides', icon: Image, color: 'var(--color-accent)' },
              ].map((kpi, i) => {
                const Icon = kpi.icon;
                return (
                  <div key={i} style={styles.kpiCard} className="glass-panel">
                    <div style={styles.kpiHeader}>
                      <span style={styles.kpiLabel}>{kpi.label}</span>
                      <Icon size={20} style={{ color: kpi.color }} />
                    </div>
                    <h2 style={{ ...styles.kpiValue, color: kpi.color === 'var(--color-warning)' && i === 3 && lowStockCount > 0 ? 'var(--color-warning)' : '#fff' }}>
                      {kpi.value}
                    </h2>
                    <p style={styles.kpiSubText}>{kpi.sub}</p>
                  </div>
                );
              })}
            </div>

            {/* Recent Orders Preview */}
            <div className="glass-panel" style={{ ...styles.panelCard, marginTop: '10px' }}>
              <h3 style={styles.panelTitle}>Recent Orders</h3>
              {orders.length === 0 ? (
                <p style={styles.emptyState}>No orders placed yet.</p>
              ) : (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeaderRow}>
                        <th style={styles.th}>Order ID</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Items</th>
                        <th style={styles.th}>Total</th>
                        <th style={styles.th}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.orderId} style={styles.tr}>
                          <td style={styles.td}><span style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '12px' }}>{o.orderId}</span></td>
                          <td style={styles.td}><span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{o.date}</span></td>
                          <td style={styles.td}><span style={{ fontSize: '12px' }}>{o.items.reduce((s, i) => s + i.quantity, 0)} item(s)</span></td>
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

      // ── ORDERS ────────────────────────────────────────────────────
      case 'orders':
        return (
          <div style={styles.tabContent} className="admin-tab-content">
            <div style={styles.tabHeader}>
              <h2 style={styles.tabTitle}>Orders</h2>
              <p style={styles.tabSubtitle}>All customer orders placed through the store.</p>
            </div>
            <div className="glass-panel" style={styles.panelCard}>
              <h3 style={styles.panelTitle}>All Orders ({orders.length})</h3>
              {orders.length === 0 ? (
                <p style={styles.emptyState}>No orders have been placed yet.</p>
              ) : (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeaderRow}>
                        <th style={styles.th}>Order ID</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Customer</th>
                        <th style={styles.th}>Items</th>
                        <th style={styles.th}>Subtotal</th>
                        <th style={styles.th}>Tax</th>
                        <th style={styles.th}>Shipping</th>
                        <th style={styles.th}>Total</th>
                        <th style={styles.th}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o.orderId} style={styles.tr}>
                          <td style={styles.td}><span style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '12px' }}>{o.orderId}</span></td>
                          <td style={styles.td}><span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{o.date}</span></td>
                          <td style={styles.td}><span style={{ fontSize: '12px' }}>{o.shippingDetails?.name || '—'}</span></td>
                          <td style={styles.td}><span style={{ fontSize: '12px' }}>{o.items.reduce((s, i) => s + i.quantity, 0)}</span></td>
                          <td style={styles.td}><span style={{ fontSize: '12px' }}>${o.pricing.subtotal.toFixed(2)}</span></td>
                          <td style={styles.td}><span style={{ fontSize: '12px' }}>${o.pricing.tax.toFixed(2)}</span></td>
                          <td style={styles.td}><span style={{ fontSize: '12px' }}>${o.pricing.shipping.toFixed(2)}</span></td>
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

      // ── PAYMENTS ──────────────────────────────────────────────────
      case 'payments':
        return (
          <div style={styles.tabContent} className="admin-tab-content">
            <div style={styles.tabHeader}>
              <h2 style={styles.tabTitle}>Payments</h2>
              <p style={styles.tabSubtitle}>Financial transaction history and revenue summary.</p>
            </div>
            {/* Revenue Summary */}
            <div style={styles.kpiGrid}>
              {[
                { label: 'GROSS REVENUE', value: `$${totalRevenue.toFixed(2)}`, color: 'var(--color-success)' },
                { label: 'TOTAL ORDERS', value: orders.length, color: 'var(--color-primary)' },
                { label: 'AVG ORDER VALUE', value: orders.length > 0 ? `$${(totalRevenue / orders.length).toFixed(2)}` : '$0.00', color: 'var(--color-secondary)' },
                { label: 'TOTAL TAX COLLECTED', value: `$${orders.reduce((s, o) => s + o.pricing.tax, 0).toFixed(2)}`, color: 'var(--color-warning)' },
              ].map((stat, i) => (
                <div key={i} className="glass-panel" style={styles.kpiCard}>
                  <span style={styles.kpiLabel}>{stat.label}</span>
                  <h2 style={{ ...styles.kpiValue, color: stat.color }}>{stat.value}</h2>
                </div>
              ))}
            </div>
            <div className="glass-panel" style={styles.panelCard}>
              <h3 style={styles.panelTitle}>Payment Records</h3>
              {orders.length === 0 ? (
                <p style={styles.emptyState}>No payment records found.</p>
              ) : (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeaderRow}>
                        <th style={styles.th}>Order ID</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Card Holder</th>
                        <th style={styles.th}>Card</th>
                        <th style={styles.th}>Discount</th>
                        <th style={styles.th}>Total Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o.orderId} style={styles.tr}>
                          <td style={styles.td}><span style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '12px' }}>{o.orderId}</span></td>
                          <td style={styles.td}><span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{o.date}</span></td>
                          <td style={styles.td}><span style={{ fontSize: '12px' }}>{o.paymentDetails?.cardHolder || '—'}</span></td>
                          <td style={styles.td}><span style={{ fontSize: '12px', fontFamily: 'monospace' }}>{o.paymentDetails?.cardNumber || '—'}</span></td>
                          <td style={styles.td}><span style={{ fontSize: '12px', color: 'var(--color-warning)' }}>-${o.pricing.discount.toFixed(2)}</span></td>
                          <td style={styles.td}><span style={{ color: 'var(--color-success)', fontWeight: '700' }}>${o.pricing.total.toFixed(2)}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );

      // ── PRODUCTS ──────────────────────────────────────────────────
      case 'products':
        return (
          <div style={styles.tabContent} className="admin-tab-content">
            <div style={styles.tabHeader}>
              <h2 style={styles.tabTitle}>Products</h2>
              <p style={styles.tabSubtitle}>Manage catalog listings, stock levels, and add new products.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'start' }} className="responsive-split">
              {/* Stock Table */}
              <div className="glass-panel" style={styles.panelCard}>
                <h3 style={styles.panelTitle}>Inventory ({products.length} products)</h3>
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeaderRow}>
                        <th style={styles.th}>Product</th>
                        <th style={styles.th}>Category</th>
                        <th style={styles.th}>Price</th>
                        <th style={{ ...styles.th, textAlign: 'center' }}>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id} style={styles.tr}>
                          <td style={styles.td}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img src={p.image} alt={p.title} style={styles.prodThumb} />
                              <strong style={{ fontSize: '13px' }}>{p.title}</strong>
                            </div>
                          </td>
                          <td style={styles.td}><span className="badge badge-cyan" style={{ fontSize: '10px' }}>{p.category}</span></td>
                          <td style={styles.td}><span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>${p.price}</span></td>
                          <td style={{ ...styles.td, textAlign: 'center' }}>
                            <div style={styles.stockAdjuster}>
                              <button style={styles.adjustBtn} onClick={() => updateProductStock(p.id, p.stock - 1)}>−</button>
                              <span style={{ ...styles.stockDisplay, color: p.stock < 5 ? 'var(--color-warning)' : '#fff', fontWeight: '700' }}>{p.stock}</span>
                              <button style={styles.adjustBtn} onClick={() => updateProductStock(p.id, p.stock + 1)}>+</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Add Product Form */}
              <div className="glass-panel" style={styles.panelCard}>
                <h3 style={styles.panelTitle}>Add New Product</h3>
                {formSuccess && (
                  <div className="badge badge-green" style={{ ...styles.successMsg, marginBottom: '16px' }}>
                    <Check size={13} /> Product added successfully!
                  </div>
                )}
                <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-group">
                    <span className="form-label">Product Name *</span>
                    <input type="text" required placeholder="e.g., Mangang Soundbar-X" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="form-input" />
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <span className="form-label">Category</span>
                      <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="form-input" style={{ background: 'rgba(11,17,32,0.95)', cursor: 'pointer' }}>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <span className="form-label">Price ($) *</span>
                      <input type="number" required placeholder="249" value={newPrice} onChange={e => setNewPrice(e.target.value)} className="form-input" />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div className="form-group" style={{ flex: 0.6 }}>
                      <span className="form-label">Stock *</span>
                      <input type="number" required placeholder="20" value={newStock} onChange={e => setNewStock(e.target.value)} className="form-input" />
                    </div>
                    <div className="form-group" style={{ flex: 1.4 }}>
                      <span className="form-label">Image URL</span>
                      <input type="text" placeholder="https://..." value={newImage} onChange={e => setNewImage(e.target.value)} className="form-input" />
                    </div>
                  </div>
                  <div className="form-group">
                    <span className="form-label">Description *</span>
                    <textarea required placeholder="Product description..." value={newDesc} onChange={e => setNewDesc(e.target.value)} className="form-input" style={{ height: '70px', resize: 'vertical' }} />
                  </div>
                  <div className="form-group">
                    <span className="form-label">Features (one per line)</span>
                    <textarea placeholder="Feature 1&#10;Feature 2" value={newFeatures} onChange={e => setNewFeatures(e.target.value)} className="form-input" style={{ height: '55px', resize: 'vertical' }} />
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '12px' }}>
                    <span className="form-label" style={{ marginBottom: '10px', display: 'block' }}>Specifications</span>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                      <input type="text" value={specKey1} onChange={e => setSpecKey1(e.target.value)} className="form-input" style={{ flex: 0.8 }} />
                      <input type="text" placeholder="Value..." value={specVal1} onChange={e => setSpecVal1(e.target.value)} className="form-input" style={{ flex: 1.2 }} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input type="text" value={specKey2} onChange={e => setSpecKey2(e.target.value)} className="form-input" style={{ flex: 0.8 }} />
                      <input type="text" placeholder="Value..." value={specVal2} onChange={e => setSpecVal2(e.target.value)} className="form-input" style={{ flex: 1.2 }} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
                    <Plus size={15} /> Add Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      // ── BANNERS ───────────────────────────────────────────────────
      case 'banners':
        return (
          <div style={styles.tabContent} className="admin-tab-content">
            <div style={styles.tabHeader}>
              <h2 style={styles.tabTitle}>Banners</h2>
              <p style={styles.tabSubtitle}>Manage homepage hero slideshow banners.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }} className="responsive-split">
              {/* Active Slides */}
              <div className="glass-panel" style={styles.panelCard}>
                <h3 style={styles.panelTitle}>Active Slides ({bannerSlides.length})</h3>
                {bannerSlides.length === 0 ? (
                  <p style={styles.emptyState}>No banner slides added yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto' }}>
                    {bannerSlides.map(slide => (
                      <div key={slide.id} style={styles.slideCard} className="glass-panel">
                        <img src={slide.image} alt="Slide" style={styles.slideThumb} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff', marginBottom: '3px' }}>ID: {slide.id}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>→ Product: {slide.productId}</div>
                        </div>
                        <button onClick={() => removeBannerSlide(slide.id)} style={styles.deleteBannerBtn}>
                          <Trash size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Add Slide Form */}
              <div className="glass-panel" style={styles.panelCard}>
                <h3 style={styles.panelTitle}>Add New Banner</h3>
                {slideSuccess && (
                  <div className="badge badge-green" style={{ ...styles.successMsg, marginBottom: '16px' }}>
                    <Check size={13} /> Banner slide added!
                  </div>
                )}
                <form onSubmit={handleAddSlide} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-group">
                    <span className="form-label">Banner Image URL *</span>
                    <input type="text" required placeholder="https://images.unsplash.com/..." value={slideImage} onChange={e => setSlideImage(e.target.value)} className="form-input" />
                  </div>
                  {slideImage && (
                    <img src={slideImage} alt="Preview" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-glass)' }} onError={e => e.target.style.display = 'none'} />
                  )}
                  <div className="form-group">
                    <span className="form-label">Link to Product</span>
                    <select value={slideProductId} onChange={e => setSlideProductId(e.target.value)} className="form-input" style={{ background: 'rgba(11,17,32,0.95)', cursor: 'pointer' }}>
                      <option value="">Select product...</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Plus size={15} /> Deploy Banner Slide
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      // ── CATEGORY ──────────────────────────────────────────────────
      case 'category':
        return (
          <div style={styles.tabContent} className="admin-tab-content">
            <div style={styles.tabHeader}>
              <h2 style={styles.tabTitle}>Category</h2>
              <p style={styles.tabSubtitle}>Manage product categories used across the store.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }} className="responsive-split">
              {/* Current Categories */}
              <div className="glass-panel" style={styles.panelCard}>
                <h3 style={styles.panelTitle}>Active Categories ({categories.length})</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {categories.map((cat, i) => (
                    <div key={i} style={styles.categoryRow}>
                      <div style={styles.categoryIcon}>
                        <Tag size={14} color="var(--color-primary)" />
                      </div>
                      <span style={{ flex: 1, fontSize: '14px', fontWeight: '600' }}>{cat}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginRight: '12px' }}>
                        {products.filter(p => p.category === cat).length} products
                      </span>
                      <button onClick={() => handleDeleteCategory(cat)} style={styles.deleteCatBtn}>
                        <Trash size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Add Category */}
              <div className="glass-panel" style={styles.panelCard}>
                <h3 style={styles.panelTitle}>Add New Category</h3>
                <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-group">
                    <span className="form-label">Category Name</span>
                    <input type="text" placeholder="e.g., Gaming Peripherals" value={newCatName} onChange={e => setNewCatName(e.target.value)} className="form-input" />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Plus size={15} /> Add Category
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      // ── WEBSITE ON/OFF ────────────────────────────────────────────
      case 'website':
        return (
          <div style={styles.tabContent} className="admin-tab-content">
            <div style={styles.tabHeader}>
              <h2 style={styles.tabTitle}>Website On/Off</h2>
              <p style={styles.tabSubtitle}>Control website visibility and maintenance mode.</p>
            </div>
            <div className="glass-panel" style={{ ...styles.panelCard, maxWidth: '540px' }}>
              <h3 style={styles.panelTitle}>Site Status Control</h3>

              {/* Status Indicator */}
              <div style={styles.siteStatusBanner(siteEnabled)}>
                <Power size={28} color={siteEnabled ? 'var(--color-success)' : 'var(--color-danger)'} />
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: siteEnabled ? 'var(--color-success)' : 'var(--color-danger)' }}>
                    {siteEnabled ? 'SITE IS ONLINE' : 'SITE IS OFFLINE'}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {siteEnabled
                      ? 'Your store is live and accessible to customers.'
                      : 'Maintenance mode is active. Customers see an offline page.'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSiteEnabled(prev => !prev)}
                style={{
                  ...styles.toggleSiteBtn,
                  background: siteEnabled ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)',
                  borderColor: siteEnabled ? 'var(--color-danger)' : 'var(--color-success)',
                  color: siteEnabled ? 'var(--color-danger)' : 'var(--color-success)',
                }}
              >
                <Power size={18} />
                {siteEnabled ? 'Turn Website OFF (Maintenance Mode)' : 'Turn Website ON (Go Live)'}
              </button>

              <div style={styles.websiteNote}>
                <AlertTriangle size={14} color="var(--color-warning)" />
                <span>This is a UI-level control. Full maintenance mode requires backend integration with MongoDB.</span>
              </div>
            </div>
          </div>
        );

      // ── CUSTOMERS ─────────────────────────────────────────────────
      case 'customers':
        return (
          <div style={styles.tabContent} className="admin-tab-content">
            <div style={styles.tabHeader}>
              <h2 style={styles.tabTitle}>Customers</h2>
              <p style={styles.tabSubtitle}>Registered user accounts and customer details.</p>
            </div>
            <div className="glass-panel" style={styles.panelCard}>
              <h3 style={styles.panelTitle}>All Customers ({(users || []).filter(u => u.role !== 'admin').length})</h3>
              {(users || []).filter(u => u.role !== 'admin').length === 0 ? (
                <p style={styles.emptyState}>No customer accounts registered yet.</p>
              ) : (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeaderRow}>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Role</th>
                        <th style={styles.th}>Orders</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(users || []).filter(u => u.role !== 'admin').map((u, i) => (
                        <tr key={i} style={styles.tr}>
                          <td style={styles.td}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={styles.avatarCircle}>
                                {(u.username || u.email)[0].toUpperCase()}
                              </div>
                              <span style={{ fontSize: '13px', fontWeight: '600' }}>{u.username || '—'}</span>
                            </div>
                          </td>
                          <td style={styles.td}><span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{u.email}</span></td>
                          <td style={styles.td}><span className="badge badge-cyan" style={{ fontSize: '10px' }}>{u.role || 'customer'}</span></td>
                          <td style={styles.td}>
                            <span style={{ fontSize: '13px' }}>
                              {orders.filter(o => o.shippingDetails?.email === u.email).length}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ── Main Render ──────────────────────────────────────────────────────
  return (
    <div style={styles.adminWrapper} className="admin-wrapper">

      {/* Mobile top header bar — full width, shown only on mobile */}
      <div style={styles.mobileHeader} className="admin-mobile-header">
        <button onClick={() => setSidebarOpen(true)} style={styles.mobileMenuBtn}>
          <Menu size={20} />
        </button>
        <span style={styles.mobileHeaderTitle}>
          {MENU_ITEMS.find(m => m.id === activeTab)?.label || 'Admin'}
        </span>
        <button onClick={() => navigateTo('home')} style={{ ...styles.mobileMenuBtn, color: 'var(--color-danger)' }}>
          <ArrowLeftCircle size={20} />
        </button>
      </div>

      {/* Mobile slide-out overlay */}
      {sidebarOpen && (
        <div style={styles.mobileOverlay} onClick={() => setSidebarOpen(false)}>
          <div style={styles.mobileSidebar} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <button onClick={() => setSidebarOpen(false)} style={styles.mobileMenuBtn}><X size={20} /></button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Inner body row: sidebar + main content side by side */}
      <div style={styles.adminBody}>
        {/* Desktop Sidebar — hidden on mobile via CSS */}
        <div style={styles.desktopSidebar} className="admin-desktop-sidebar">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main style={styles.mainContent}>
          {renderContent()}
        </main>
      </div>

    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────
const styles = {
  adminWrapper: {
    display: 'flex',
    flexDirection: 'column',      /* column so mobile header stacks above body */
    minHeight: 'calc(100vh - var(--nav-height))',
    background: 'var(--bg-dark-base)',
  },
  adminBody: {
    display: 'flex',
    flex: 1,
  },
  desktopSidebar: {
    width: '240px',
    flexShrink: 0,
    borderRight: '1px solid var(--border-glass)',
    background: 'var(--bg-dark-surface)',
    position: 'sticky',
    top: 'var(--nav-height)',
    height: 'calc(100vh - var(--nav-height))',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '20px 12px',
    gap: '6px',
  },
  sidebarBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 6px 14px',
  },
  brandIconWrap: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'rgba(99,102,241,0.15)',
    border: '1px solid rgba(99,102,241,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  brandTitle: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: '15px',
    color: 'var(--text-primary)',
    lineHeight: '1',
  },
  brandSub: {
    fontSize: '10px',
    fontWeight: '700',
    color: 'var(--color-primary)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginTop: '2px',
  },
  sidebarDivider: {
    height: '1px',
    background: 'var(--border-glass)',
    margin: '8px 0',
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid transparent',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'var(--font-body)',
    fontWeight: '600',
    fontSize: '13.5px',
    transition: 'all 0.2s ease',
    width: '100%',
  },
  backToBasicBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(239,68,68,0.25)',
    background: 'rgba(239,68,68,0.07)',
    color: 'var(--color-danger)',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    fontWeight: '700',
    fontSize: '13.5px',
    width: '100%',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    marginTop: '8px',
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto',
    minWidth: 0,
  },
  tabContent: {
    padding: '32px 28px 60px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  // NOTE: mobile overrides handled via .admin-tab-content class in index.css
  tabHeader: {
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '16px',
  },
  tabTitle: {
    fontSize: '26px',
    fontWeight: '800',
    fontFamily: 'var(--font-heading)',
    color: 'var(--text-primary)',
    margin: '0 0 4px 0',
  },
  tabSubtitle: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  panelCard: {
    padding: '24px',
  },
  panelTitle: {
    fontSize: '16px',
    fontWeight: '800',
    fontFamily: 'var(--font-heading)',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '12px',
    marginBottom: '18px',
    margin: '0 0 18px 0',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
  },
  kpiCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  kpiHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kpiLabel: {
    fontSize: '10px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
  },
  kpiValue: {
    fontSize: '26px',
    fontWeight: '800',
    fontFamily: 'var(--font-heading)',
    color: '#fff',
    margin: 0,
  },
  kpiSubText: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    margin: 0,
  },
  tableWrapper: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  tableHeaderRow: {
    borderBottom: '1px solid var(--border-glass)',
  },
  th: {
    padding: '10px 10px',
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
  },
  tr: {
    borderBottom: '1px solid var(--border-glass)',
  },
  td: {
    padding: '13px 10px',
    fontSize: '13px',
    verticalAlign: 'middle',
  },
  prodThumb: {
    width: '30px',
    height: '30px',
    borderRadius: '4px',
    objectFit: 'cover',
    background: '#f3f4f6',
    flexShrink: 0,
  },
  stockAdjuster: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.15)',
    border: '1px solid var(--border-glass)',
    borderRadius: '6px',
    padding: '2px',
  },
  adjustBtn: {
    width: '24px',
    height: '24px',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockDisplay: {
    minWidth: '28px',
    textAlign: 'center',
    fontSize: '13px',
  },
  successMsg: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 14px',
    width: '100%',
    fontSize: '12px',
  },
  emptyState: {
    color: 'var(--text-muted)',
    fontSize: '14px',
    textAlign: 'center',
    padding: '30px 0',
  },
  slideCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
  },
  slideThumb: {
    width: '70px',
    height: '44px',
    borderRadius: '6px',
    objectFit: 'cover',
    flexShrink: 0,
    background: '#f3f4f6',
  },
  deleteBannerBtn: {
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.25)',
    color: 'var(--color-danger)',
    borderRadius: '6px',
    padding: '6px 8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  categoryRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 14px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border-glass)',
    borderRadius: '8px',
  },
  categoryIcon: {
    width: '30px',
    height: '30px',
    borderRadius: '8px',
    background: 'rgba(99,102,241,0.1)',
    border: '1px solid rgba(99,102,241,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  deleteCatBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-danger)',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    opacity: 0.7,
  },
  siteStatusBanner: (enabled) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    borderRadius: '12px',
    background: enabled ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
    border: `1px solid ${enabled ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)'}`,
    marginBottom: '20px',
  }),
  toggleSiteBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid',
    cursor: 'pointer',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    marginBottom: '16px',
  },
  websiteNote: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '12px',
    background: 'rgba(245,158,11,0.06)',
    border: '1px solid rgba(245,158,11,0.2)',
    borderRadius: '8px',
    fontSize: '12px',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
  },
  avatarCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(99,102,241,0.15)',
    border: '1px solid rgba(99,102,241,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '13px',
    color: 'var(--color-primary)',
    flexShrink: 0,
  },
  // Mobile
  mobileHeader: {
    display: 'none', /* shown via .admin-mobile-header media query in index.css */
    position: 'sticky',
    top: 'var(--nav-height)',
    zIndex: 200,
    background: 'var(--bg-dark-surface)',
    borderBottom: '1px solid var(--border-glass)',
    padding: '12px 16px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mobileHeaderTitle: {
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    fontSize: '15px',
    color: 'var(--text-primary)',
  },
  mobileMenuBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
  },
  mobileOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex: 2000,
    display: 'flex',
  },
  mobileSidebar: {
    width: '260px',
    background: 'var(--bg-dark-surface)',
    height: '100%',
    overflowY: 'auto',
    padding: '16px 12px',
    borderRight: '1px solid var(--border-glass)',
  },
};

// Row hover: lightweight injection (only behaviour, not layout)
if (typeof document !== 'undefined') {
  const adminCSS = document.createElement('style');
  adminCSS.id = 'admin-portal-styles';
  if (!document.getElementById('admin-portal-styles')) {
    adminCSS.innerHTML = `tbody tr:hover { background: rgba(255,255,255,0.02) !important; }`;
    document.head.appendChild(adminCSS);
  }
}
