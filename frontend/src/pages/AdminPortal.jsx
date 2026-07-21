import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import {
  LayoutDashboard, ShoppingBag, CreditCard, Package, Image,
  Tag, Power, Users, ArrowLeftCircle, Plus, Check, Trash,
  DollarSign, Layers, AlertTriangle, Menu, X, ChevronRight, Upload, User, Edit, Ban
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
    products, orders, addNewProduct, updateProductStock, deleteProduct,
    bannerSlides, addBannerSlide, removeBannerSlide,
    navigateTo, users, currentUser, updateUserProfile, toggleBlockUser,
    categories, addCategory, deleteCategory
  } = useContext(ShopContext);

  const [activeTab, setActiveTab]   = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Admin Edit User modal state ────────────────────────────────────
  const [editingUser, setEditingUser]   = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail]       = useState('');
  const [editPhone, setEditPhone]       = useState('');
  const [editRole, setEditRole]         = useState('customer');

  // ── Product form state ──────────────────────────────────────────────
  const [newTitle, setNewTitle]       = useState('');
  const [newCategory, setNewCategory] = useState('Audio');
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [newPrice, setNewPrice]       = useState('');
  const [newCostPrice, setNewCostPrice] = useState('');
  const [newStock, setNewStock]       = useState('');
  const [newImage, setNewImage]       = useState('');
  const [newDesc, setNewDesc]         = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // ── Category form state ─────────────────────────────────────────────
  const [newCatName, setNewCatName]   = useState('');
  const [newCatImage, setNewCatImage] = useState('');
  const [catSuccess, setCatSuccess]   = useState(false);

  // ── Banner form state ───────────────────────────────────────────────
  const [slideImage, setSlideImage]     = useState('');
  const [slideSuccess, setSlideSuccess] = useState(false);

  // ── Website toggle state ────────────────────────────────────────────
  const [siteEnabled, setSiteEnabled] = useState(true);

  // ── Stats ───────────────────────────────────────────────────────────
  const totalRevenue  = orders.reduce((sum, o) => sum + (o.pricing?.total || 0), 0);
  const lowStockCount = products.filter(p => p.stock < 5).length;
  const totalRevOrders = orders.length;
  const totalCustomers = (users || []).filter(u => u.role !== 'admin').length;

  // Calculate Profit across all orders
  const totalProfit = orders.reduce((accProfit, order) => {
    const orderNetRevenue = (order.pricing?.subtotal || 0) - (order.pricing?.discount || 0);
    const orderCostPrice = (order.items || []).reduce((accCost, item) => {
      const cp = item.product?.costPrice ?? ((item.product?.price || 0) * 0.7);
      return accCost + (cp * item.quantity);
    }, 0);
    return accProfit + (orderNetRevenue - orderCostPrice);
  }, 0);

  // ── Helper: Client-Side Image Compression (prevents Vercel 4.5MB payload crash) ──
  const compressImage = (file, maxWidth = 1200, quality = 0.75) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG Base64
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // ── File Upload Handlers with Compression ───────────────────────────
  const handleProductImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImage(file, 800, 0.75);
      setNewImage(compressed);
    }
  };

  const handleCategoryImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImage(file, 600, 0.75);
      setNewCatImage(compressed);
    }
  };

  const handleBannerFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressed = await compressImage(file, 1200, 0.75);
      setSlideImage(compressed);
    }
  };

  // ── Action Handlers ──────────────────────────────────────────────────
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newStock) {
      alert('Please fill product name, selling price, and stock.');
      return;
    }
    const sp = Number(newPrice);
    const cp = Number(newCostPrice || (sp * 0.7));

    addNewProduct({
      title: newTitle,
      category: newCategory,
      price: sp,
      costPrice: cp,
      stock: Number(newStock),
      image: newImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: newDesc
    });

    setNewTitle(''); setNewPrice(''); setNewCostPrice(''); setNewStock(''); setNewImage(''); setNewDesc('');
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory(newCatName.trim(), newCatImage);
    setNewCatName('');
    setNewCatImage('');
    setCatSuccess(true);
    setTimeout(() => setCatSuccess(false), 3000);
  };

  const handleAddSlide = (e) => {
    e.preventDefault();
    if (!slideImage) { alert('Please choose an image file.'); return; }
    addBannerSlide({
      title: 'Banner Slide', subtitle: '', image: slideImage
    });
    setSlideImage('');
    setSlideSuccess(true);
    setTimeout(() => setSlideSuccess(false), 3000);
  };

  const handleOpenUserEdit = (u) => {
    setEditingUser(u);
    setEditUsername(u.username || u.name || '');
    setEditEmail(u.email || '');
    setEditPhone(u.phone || '');
    setEditRole(u.role || 'customer');
  };

  const handleSaveUserByAdmin = (e) => {
    e.preventDefault();
    if (!editingUser) return;
    updateUserProfile(
      {
        username: editUsername,
        name: editUsername,
        email: editEmail,
        phone: editPhone,
        role: editRole
      },
      editingUser.email
    );
    setEditingUser(null);
  };

  // ── Sidebar ──────────────────────────────────────────────────────────
  const Sidebar = () => (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarBrand}>
        <img src="/logo.jpg" alt="Mangang" style={styles.brandLogo} />
        <div>
          <span style={styles.brandTitle}>MANGANG</span>
          <span style={styles.brandSub}>CONTROL HUB</span>
        </div>
      </div>

      <nav style={styles.navMenu}>
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              style={{
                ...styles.navItem,
                background: isActive ? 'var(--color-primary)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: isActive ? '700' : '500'
              }}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={styles.sidebarFooter}>
        <button style={styles.backBasicBtn} onClick={() => navigateTo('home')}>
          <ArrowLeftCircle size={15} />
          <span>Back to Basic</span>
        </button>
      </div>
    </aside>
  );

  // ── Main Content Switcher ─────────────────────────────────────────────
  const renderContent = () => {
    switch (activeTab) {
      // ── DASHBOARD ──────────────────────────────────────────────────
      case 'dashboard':
        return (
          <div style={styles.tabContent} className="admin-tab-content">
            <div style={styles.tabHeader}>
              <h2 style={styles.tabTitle}>Dashboard Overview</h2>
              <p style={styles.tabSubtitle}>Live telemetry stats and control hub.</p>
            </div>

            <div style={styles.kpiGrid}>
              <div className="glass-panel" style={styles.kpiCard}>
                <span style={styles.kpiLabel}>TOTAL REVENUE</span>
                <h2 style={{ ...styles.kpiValue, color: 'var(--color-primary)' }}>
                  ₹{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
                <p style={styles.kpiSubText}>Gross sales volume</p>
              </div>

              <div className="glass-panel" style={styles.kpiCard}>
                <span style={styles.kpiLabel}>TOTAL ORDERS</span>
                <h2 style={{ ...styles.kpiValue, color: 'var(--color-secondary)' }}>{totalRevOrders}</h2>
                <p style={styles.kpiSubText}>Completed purchases</p>
              </div>

              <div className="glass-panel" style={styles.kpiCard}>
                <span style={styles.kpiLabel}>TOTAL PROFIT</span>
                <h2 style={{ ...styles.kpiValue, color: totalProfit >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                  ₹{totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
                <p style={styles.kpiSubText}>Net margin (SP − CP)</p>
              </div>

              <div className="glass-panel" style={styles.kpiCard}>
                <span style={styles.kpiLabel}>CUSTOMERS</span>
                <h2 style={{ ...styles.kpiValue, color: '#fff' }}>{totalCustomers}</h2>
                <p style={styles.kpiSubText}>Registered users</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-panel" style={{ ...styles.panelCard, marginTop: '20px' }}>
              <h3 style={styles.panelTitle}>Recent Orders Telemetry</h3>
              {orders.length === 0 ? (
                <p style={styles.emptyState}>No recent orders recorded.</p>
              ) : (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeaderRow}>
                        <th style={styles.th}>Order ID</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Customer</th>
                        <th style={styles.th}>Total (₹)</th>
                        <th style={styles.th}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.orderId} style={styles.tr}>
                          <td style={styles.td}><span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>{o.orderId}</span></td>
                          <td style={styles.td}>{o.date}</td>
                          <td style={styles.td}>{o.shippingDetails?.name || '—'}</td>
                          <td style={styles.td}><strong style={{ color: 'var(--color-success)' }}>₹{o.pricing?.total?.toLocaleString()}</strong></td>
                          <td style={styles.td}><span className="badge badge-green">{o.status}</span></td>
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
              <h2 style={styles.tabTitle}>Orders Log</h2>
              <p style={styles.tabSubtitle}>All customer orders placed through the store.</p>
            </div>
            <div className="glass-panel" style={styles.panelCard}>
              <h3 style={styles.panelTitle}>All Orders ({orders.length})</h3>
              {orders.length === 0 ? (
                <p style={styles.emptyState}>No orders placed yet.</p>
              ) : (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeaderRow}>
                        <th style={styles.th}>Order ID</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Customer</th>
                        <th style={styles.th}>Items</th>
                        <th style={styles.th}>Total (₹)</th>
                        <th style={styles.th}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o.orderId} style={styles.tr}>
                          <td style={styles.td}><span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>{o.orderId}</span></td>
                          <td style={styles.td}>{o.date}</td>
                          <td style={styles.td}>{o.shippingDetails?.name || '—'}</td>
                          <td style={styles.td}>{o.items.reduce((s, i) => s + i.quantity, 0)} item(s)</td>
                          <td style={styles.td}><strong style={{ color: 'var(--color-success)' }}>₹{o.pricing?.total?.toLocaleString()}</strong></td>
                          <td style={styles.td}><span className="badge badge-green">{o.status}</span></td>
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
              <h2 style={styles.tabTitle}>Payments & Financial Ledger</h2>
              <p style={styles.tabSubtitle}>Total sales, total orders, total profit, and complete payment history.</p>
            </div>

            <div style={styles.kpiGrid}>
              <div className="glass-panel" style={styles.kpiCard}>
                <span style={styles.kpiLabel}>TOTAL SALES</span>
                <h2 style={{ ...styles.kpiValue, color: 'var(--color-primary)' }}>
                  ₹{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
                <p style={styles.kpiSubText}>Gross revenue from purchases</p>
              </div>

              <div className="glass-panel" style={styles.kpiCard}>
                <span style={styles.kpiLabel}>TOTAL ORDERS</span>
                <h2 style={{ ...styles.kpiValue, color: 'var(--color-secondary)' }}>{totalRevOrders}</h2>
                <p style={styles.kpiSubText}>Completed transactions</p>
              </div>

              <div className="glass-panel" style={styles.kpiCard}>
                <span style={styles.kpiLabel}>TOTAL PROFIT</span>
                <h2 style={{ ...styles.kpiValue, color: totalProfit >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                  ₹{totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h2>
                <p style={styles.kpiSubText}>Net margin (SP − CP)</p>
              </div>
            </div>

            {/* Payment History Log */}
            <div className="glass-panel" style={{ ...styles.panelCard, marginTop: '20px' }}>
              <h3 style={styles.panelTitle}>Payment History Log ({orders.length})</h3>
              {orders.length === 0 ? (
                <p style={styles.emptyState}>No payment transaction records yet.</p>
              ) : (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeaderRow}>
                        <th style={styles.th}>Transaction HASH</th>
                        <th style={styles.th}>Customer Email</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Payment Mode</th>
                        <th style={styles.th}>Status</th>
                        <th style={{ ...styles.th, textAlign: 'right' }}>Amount Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.orderId} style={styles.tr}>
                          <td style={{ ...styles.td, fontFamily: 'monospace', color: 'var(--color-primary)', fontWeight: '700' }}>
                            txn_{o.orderId.substring(4)}
                          </td>
                          <td style={styles.td}>{o.shippingDetails?.email || '—'}</td>
                          <td style={styles.td}>{o.date}</td>
                          <td style={styles.td}><span style={{ fontWeight: '600' }}>QR Code Payment</span></td>
                          <td style={styles.td}><span className="badge badge-green">Verified</span></td>
                          <td style={{ ...styles.td, textAlign: 'right', fontWeight: '800', color: 'var(--color-success)' }}>
                            ₹{o.pricing?.total?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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

      // ── PRODUCTS ──────────────────────────────────────────────────
      case 'products':
        return (
          <div style={styles.tabContent} className="admin-tab-content">
            <div style={styles.tabHeader}>
              <h2 style={styles.tabTitle}>Products Management</h2>
              <p style={styles.tabSubtitle}>Manage product inventory and add new products with device image upload.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'start' }} className="responsive-split">
              {/* Inventory Table */}
              <div className="glass-panel" style={styles.panelCard}>
                <h3 style={styles.panelTitle}>Inventory ({products.length} items)</h3>
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeaderRow}>
                        <th style={styles.th}>Product</th>
                        <th style={styles.th}>Category</th>
                        <th style={styles.th}>SP (₹)</th>
                        <th style={styles.th}>CP (₹)</th>
                        <th style={styles.th}>Profit/Unit</th>
                        <th style={{ ...styles.th, textAlign: 'center' }}>Stock</th>
                        <th style={{ ...styles.th, textAlign: 'center' }}>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => {
                        const cp = p.costPrice ?? (p.price * 0.7);
                        const margin = p.price - cp;
                        return (
                          <tr key={p.id} style={styles.tr}>
                            <td style={styles.td}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={p.image} alt={p.title} style={styles.prodThumb} />
                                <strong style={{ fontSize: '13px' }}>{p.title}</strong>
                              </div>
                            </td>
                            <td style={styles.td}><span className="badge badge-cyan" style={{ fontSize: '10px' }}>{p.category}</span></td>
                            <td style={styles.td}><span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>₹{p.price.toLocaleString()}</span></td>
                            <td style={styles.td}><span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>₹{cp.toLocaleString()}</span></td>
                            <td style={styles.td}><span style={{ color: 'var(--color-success)', fontWeight: '700' }}>+₹{margin.toLocaleString()}</span></td>
                            <td style={{ ...styles.td, textAlign: 'center' }}>
                              <div style={styles.stockAdjuster}>
                                <button style={styles.adjustBtn} onClick={() => updateProductStock(p.id, p.stock - 1)}>−</button>
                                <span style={{ ...styles.stockDisplay, color: p.stock < 5 ? 'var(--color-warning)' : '#fff', fontWeight: '700' }}>{p.stock}</span>
                                <button style={styles.adjustBtn} onClick={() => updateProductStock(p.id, p.stock + 1)}>+</button>
                              </div>
                            </td>
                            <td style={{ ...styles.td, textAlign: 'center' }}>
                              <button 
                                onClick={() => deleteProduct(p.id)} 
                                style={styles.deleteBannerBtn} 
                                title="Delete Product"
                              >
                                <Trash size={13} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
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
                    <input type="text" required placeholder="Product title..." value={newTitle} onChange={e => setNewTitle(e.target.value)} className="form-input" />
                  </div>

                  {/* Custom Animated Category Dropdown Design */}
                  <div className="form-group" style={{ position: 'relative' }}>
                    <span className="form-label">Category *</span>
                    <button
                      type="button"
                      onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-primary)',
                        background: 'rgba(99, 102, 241, 0.08)',
                        color: '#ffffff',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Tag size={15} color="var(--color-primary)" />
                        <span>{newCategory}</span>
                      </div>
                      <ChevronRight 
                        size={15} 
                        style={{ 
                          transform: catDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                          color: 'var(--color-primary)'
                        }} 
                      />
                    </button>

                    {catDropdownOpen && (
                      <div 
                        className="glass-panel animate-dropdown"
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 6px)',
                          left: 0,
                          right: 0,
                          zIndex: 100,
                          padding: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          borderRadius: '10px',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                          background: 'rgba(11, 17, 32, 0.98)'
                        }}
                      >
                        {categories.map(c => {
                          const catName = typeof c === 'object' ? c.name : c;
                          const catImg = typeof c === 'object' ? c.image : null;
                          const isSelected = newCategory === catName;
                          return (
                            <button
                              key={catName}
                              type="button"
                              onClick={() => {
                                setNewCategory(catName);
                                setCatDropdownOpen(false);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: isSelected ? 'rgba(99,102,241,0.18)' : 'transparent',
                                color: isSelected ? 'var(--color-primary)' : 'var(--text-primary)',
                                fontWeight: isSelected ? '700' : '500',
                                fontSize: '13px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {catImg && <img src={catImg} alt="" style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} />}
                                <span>{catName}</span>
                              </div>
                              {isSelected && <Check size={14} color="var(--color-primary)" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <span className="form-label">Selling Price (₹ SP) *</span>
                      <input type="number" required placeholder="₹ 19999" value={newPrice} onChange={e => setNewPrice(e.target.value)} className="form-input" />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <span className="form-label">Cost Price (₹ CP) *</span>
                      <input type="number" placeholder="₹ 12000" value={newCostPrice} onChange={e => setNewCostPrice(e.target.value)} className="form-input" />
                    </div>
                  </div>

                  <div className="form-group">
                    <span className="form-label">Stock Quantity *</span>
                    <input type="number" required placeholder="20" value={newStock} onChange={e => setNewStock(e.target.value)} className="form-input" />
                  </div>

                  {/* Product Image Device Upload */}
                  <div className="form-group">
                    <span className="form-label">Upload Product Image from Device</span>
                    <label 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '2px dashed var(--color-primary)',
                        background: 'rgba(99, 102, 241, 0.08)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '13px'
                      }}
                    >
                      <Upload size={16} color="var(--color-primary)" />
                      <span>{newImage ? 'Change Image File' : 'Select Image File'}</span>
                      <input type="file" accept="image/*" onChange={handleProductImageUpload} style={{ display: 'none' }} />
                    </label>
                    {newImage && (
                      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={newImage} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                        <span style={{ fontSize: '12px', color: 'var(--color-success)' }}>Image selected!</span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <span className="form-label">Product Description</span>
                    <textarea placeholder="Brief description..." value={newDesc} onChange={e => setNewDesc(e.target.value)} className="form-input" style={{ height: '70px', resize: 'vertical' }} />
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
              <h2 style={styles.tabTitle}>Banners Management</h2>
              <p style={styles.tabSubtitle}>Upload banner images directly from your device gallery.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }} className="responsive-split">
              {/* Active Slides */}
              <div className="glass-panel" style={styles.panelCard}>
                <h3 style={styles.panelTitle}>Active Banners ({bannerSlides.length})</h3>
                {bannerSlides.length === 0 ? (
                  <p style={styles.emptyState}>No banner slides added yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {bannerSlides.map(slide => (
                      <div key={slide.id} style={styles.slideCard} className="glass-panel">
                        <img src={slide.image} alt="Slide" style={styles.slideThumb} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Banner Image</div>
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
                <h3 style={styles.panelTitle}>Upload Banner Image</h3>
                {slideSuccess && (
                  <div className="badge badge-green" style={{ ...styles.successMsg, marginBottom: '16px' }}>
                    <Check size={13} /> Banner uploaded!
                  </div>
                )}
                <form onSubmit={handleAddSlide} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-group">
                    <span className="form-label">Upload Image from Device</span>
                    <label 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '14px',
                        borderRadius: '10px',
                        border: '2px dashed var(--color-primary)',
                        background: 'rgba(99, 102, 241, 0.08)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '13px'
                      }}
                    >
                      <Upload size={18} color="var(--color-primary)" />
                      <span>Choose Image File</span>
                      <input type="file" accept="image/*" onChange={handleBannerFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>

                  {slideImage && (
                    <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
                      <img src={slideImage} alt="Preview" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                      <button type="button" onClick={() => setSlideImage('')} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.8)', color: '#fff', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer' }}>
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
                    <Plus size={15} /> Publish Banner
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
              <h2 style={styles.tabTitle}>Category Management</h2>
              <p style={styles.tabSubtitle}>Add categories with custom image uploads from your device.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'start' }} className="responsive-split">
              {/* Current Categories */}
              <div className="glass-panel" style={styles.panelCard}>
                <h3 style={styles.panelTitle}>Categories ({categories.length})</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                  {categories.map((c, i) => {
                    const catName = typeof c === 'object' ? c.name : c;
                    const catImg = typeof c === 'object' ? c.image : 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80';
                    const catId = typeof c === 'object' ? c.id : c;
                    return (
                      <div key={i} className="glass-panel" style={{ padding: '12px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', textAlign: 'center' }}>
                        <img src={catImg} alt={catName} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} />
                        <strong style={{ fontSize: '13px', color: '#fff' }}>{catName}</strong>
                        <button onClick={() => deleteCategory(catId)} style={styles.deleteBannerBtn} title="Delete Category">
                          <Trash size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add Category Form with Device Image Upload */}
              <div className="glass-panel" style={styles.panelCard}>
                <h3 style={styles.panelTitle}>Add New Category</h3>
                {catSuccess && (
                  <div className="badge badge-green" style={{ ...styles.successMsg, marginBottom: '16px' }}>
                    <Check size={13} /> Category added successfully!
                  </div>
                )}
                <form onSubmit={handleAddCategorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-group">
                    <span className="form-label">Category Name *</span>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Gaming Gear" 
                      value={newCatName} 
                      onChange={e => setNewCatName(e.target.value)} 
                      className="form-input" 
                    />
                  </div>

                  <div className="form-group">
                    <span className="form-label">Upload Category Image from Device</span>
                    <label 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '2px dashed var(--color-primary)',
                        background: 'rgba(99, 102, 241, 0.08)',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '13px'
                      }}
                    >
                      <Upload size={16} color="var(--color-primary)" />
                      <span>{newCatImage ? 'Change Image File' : 'Select Image File'}</span>
                      <input type="file" accept="image/*" onChange={handleCategoryImageUpload} style={{ display: 'none' }} />
                    </label>
                    {newCatImage && (
                      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={newCatImage} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} />
                        <span style={{ fontSize: '12px', color: 'var(--color-success)' }}>Image uploaded!</span>
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
                    <Plus size={15} /> Add Category
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      // ── WEBSITE ───────────────────────────────────────────────────
      case 'website':
        return (
          <div style={styles.tabContent} className="admin-tab-content">
            <div style={styles.tabHeader}>
              <h2 style={styles.tabTitle}>Website Status</h2>
              <p style={styles.tabSubtitle}>Enable or disable customer store features.</p>
            </div>
            <div className="glass-panel" style={styles.panelCard}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
                <div>
                  <h4 style={{ color: '#fff', margin: '0 0 4px 0' }}>Storefront Status</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
                    Current mode: <strong style={{ color: siteEnabled ? 'var(--color-success)' : 'var(--color-danger)' }}>{siteEnabled ? 'ONLINE' : 'MAINTENANCE MODE'}</strong>
                  </p>
                </div>
                <button
                  onClick={() => setSiteEnabled(!siteEnabled)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: siteEnabled ? 'var(--color-danger)' : 'var(--color-success)',
                    color: '#fff',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {siteEnabled ? 'Turn OFF Store' : 'Turn ON Store'}
                </button>
              </div>
            </div>
          </div>
        );

      // ── CUSTOMERS ─────────────────────────────────────────────────
      case 'customers':
        return (
          <div style={styles.tabContent} className="admin-tab-content">
            <div style={styles.tabHeader}>
              <h2 style={styles.tabTitle}>User Control & Customer Management</h2>
              <p style={styles.tabSubtitle}>Edit customer details and block/unblock user accounts.</p>
            </div>
            <div className="glass-panel" style={styles.panelCard}>
              <h3 style={styles.panelTitle}>Registered Accounts ({(users || []).length})</h3>
              {(users || []).length === 0 ? (
                <p style={styles.emptyState}>No customer accounts registered yet.</p>
              ) : (
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.tableHeaderRow}>
                        <th style={styles.th}>User</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Phone</th>
                        <th style={styles.th}>Role</th>
                        <th style={styles.th}>Status</th>
                        <th style={{ ...styles.th, textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(users || []).map((u, i) => (
                        <tr key={i} style={styles.tr}>
                          <td style={styles.td}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={styles.avatarCircle}>
                                {(u.username || u.name || u.email)[0].toUpperCase()}
                              </div>
                              <span style={{ fontSize: '13px', fontWeight: '600' }}>{u.username || u.name || '—'}</span>
                            </div>
                          </td>
                          <td style={styles.td}><span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{u.email}</span></td>
                          <td style={styles.td}><span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{u.phone || '—'}</span></td>
                          <td style={styles.td}>
                            <span className={u.role === 'admin' ? "badge badge-green" : "badge badge-cyan"} style={{ fontSize: '10px' }}>
                              {u.role || 'customer'}
                            </span>
                          </td>
                          <td style={styles.td}>
                            {u.isBlocked ? (
                              <span className="badge badge-red" style={{ fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                <Ban size={10} /> Blocked
                              </span>
                            ) : (
                              <span className="badge badge-green" style={{ fontSize: '10px' }}>Active</span>
                            )}
                          </td>
                          <td style={{ ...styles.td, textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                              <button 
                                onClick={() => handleOpenUserEdit(u)}
                                style={styles.actionBtnSmall}
                                title="Edit User"
                              >
                                <Edit size={12} /> Edit
                              </button>
                              {u.role !== 'admin' && (
                                <button
                                  onClick={() => toggleBlockUser(u.email)}
                                  style={{
                                    ...styles.actionBtnSmall,
                                    background: u.isBlocked ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                                    color: u.isBlocked ? 'var(--color-success)' : 'var(--color-danger)',
                                    borderColor: u.isBlocked ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'
                                  }}
                                  title={u.isBlocked ? 'Unblock User' : 'Block User'}
                                >
                                  <Ban size={12} /> {u.isBlocked ? 'Unblock' : 'Block'}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Admin Edit User Modal */}
            {editingUser && (
              <div style={styles.modalOverlay} onClick={() => setEditingUser(null)}>
                <div className="glass-panel" style={styles.modalBox} onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Edit Customer Profile</h3>
                    <button onClick={() => setEditingUser(null)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveUserByAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
                    <div className="form-group">
                      <span className="form-label">Full Name</span>
                      <input type="text" required value={editUsername} onChange={e => setEditUsername(e.target.value)} className="form-input" />
                    </div>

                    <div className="form-group">
                      <span className="form-label">Email Address</span>
                      <input type="email" required value={editEmail} onChange={e => setEditEmail(e.target.value)} className="form-input" />
                    </div>

                    <div className="form-group">
                      <span className="form-label">Phone Number</span>
                      <input type="tel" value={editPhone} onChange={e => setEditPhone(e.target.value)} className="form-input" placeholder="+91 9876543210" />
                    </div>

                    <div className="form-group">
                      <span className="form-label">User Role</span>
                      <select value={editRole} onChange={e => setEditRole(e.target.value)} className="form-input" style={{ background: 'rgba(11,17,32,0.95)', cursor: 'pointer' }}>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                      <button type="button" onClick={() => setEditingUser(null)} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>Cancel</button>
                      <button type="submit" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>Save Details</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.adminWrapper} className="admin-wrapper">
      <div style={styles.topNavbar} className="admin-top-navbar">
        <div style={styles.topLeft}>
          <button style={styles.mobileToggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)} className="admin-mobile-toggle">
            <Menu size={20} />
          </button>
          <img src="/logo.jpg" alt="Logo" style={styles.navLogoImg} />
          <span style={styles.navBrandText} className="nav-brand-text">MANGANG ADMIN</span>
        </div>

        <div style={styles.topRight}>
          <div style={styles.adminBadge} className="desktop-admin-chip">
            <User size={13} color="var(--color-primary)" />
            <span>{currentUser?.email || 'admin@gmail.com'}</span>
          </div>
          <button style={styles.backBasicNavBtn} className="back-basic-nav-btn" onClick={() => navigateTo('home')}>
            <ArrowLeftCircle size={14} />
            <span>Back to Basic</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div className="admin-desktop-sidebar" style={{ width: '250px', flexShrink: 0 }}>
          <Sidebar />
        </div>

        <div 
          className={`admin-drawer-overlay ${sidebarOpen ? 'active' : ''}`} 
          onClick={() => setSidebarOpen(false)}
        >
          <div 
            className={`admin-drawer-sidebar ${sidebarOpen ? 'active' : ''}`} 
            onClick={e => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>

        <main style={styles.mainContainer}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

const styles = {
  adminWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: 'var(--bg-dark)',
    color: 'var(--text-primary)',
    textAlign: 'left'
  },
  topNavbar: {
    height: '60px',
    background: 'rgba(11, 17, 32, 0.95)',
    borderBottom: '1px solid var(--border-glass)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    zIndex: 100
  },
  topLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  mobileToggleBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    display: 'none'
  },
  navLogoImg: {
    width: '28px',
    height: '28px',
    borderRadius: '6px'
  },
  navBrandText: {
    fontFamily: 'var(--font-heading)',
    fontSize: '14px',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '0.05em'
  },
  topRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  adminBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '20px',
    background: 'rgba(99,102,241,0.1)',
    border: '1px solid rgba(99,102,241,0.25)',
    fontSize: '12px',
    color: 'var(--text-primary)'
  },
  backBasicNavBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: '6px',
    border: '1px solid var(--border-glass)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '12.5px',
    fontWeight: '600'
  },
  sidebar: {
    width: '100%',
    height: '100%',
    background: 'rgba(11, 17, 32, 0.85)',
    borderRight: '1px solid var(--border-glass)',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 14px'
  },
  sidebarBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--border-glass)',
    marginBottom: '16px'
  },
  brandLogo: {
    width: '32px',
    height: '32px',
    borderRadius: '6px'
  },
  brandTitle: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#fff',
    display: 'block'
  },
  brandSub: {
    fontSize: '10px',
    color: 'var(--color-primary)',
    fontWeight: '700',
    letterSpacing: '0.05em'
  },
  navMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    textAlign: 'left',
    transition: 'all 0.15s ease'
  },
  sidebarFooter: {
    paddingTop: '16px',
    borderTop: '1px solid var(--border-glass)'
  },
  backBasicBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid var(--border-glass)',
    background: 'rgba(255,255,255,0.04)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600'
  },
  mainContainer: {
    flex: 1,
    padding: '24px',
    overflowY: 'auto'
  },
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  tabHeader: {
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '12px'
  },
  tabTitle: {
    fontSize: '24px',
    fontWeight: '800',
    margin: '0 0 4px 0',
    color: '#fff'
  },
  tabSubtitle: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    margin: 0
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  },
  kpiCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  kpiLabel: {
    fontSize: '10px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    letterSpacing: '0.07em'
  },
  kpiValue: {
    fontSize: '26px',
    fontWeight: '800',
    margin: 0
  },
  kpiSubText: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    margin: 0
  },
  panelCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  panelTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#fff',
    margin: 0,
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '10px'
  },
  emptyState: {
    color: 'var(--text-muted)',
    fontSize: '13px',
    textAlign: 'center',
    padding: '20px'
  },
  tableWrapper: {
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
    padding: '10px',
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  tr: {
    borderBottom: '1px solid var(--border-glass)'
  },
  td: {
    padding: '12px 10px',
    fontSize: '13px',
    verticalAlign: 'middle'
  },
  prodThumb: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    objectFit: 'cover'
  },
  stockAdjuster: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(255,255,255,0.04)',
    padding: '2px 6px',
    borderRadius: '6px',
    border: '1px solid var(--border-glass)'
  },
  adjustBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '14px'
  },
  stockDisplay: {
    fontSize: '13px',
    minWidth: '20px',
    textAlign: 'center'
  },
  deleteBannerBtn: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.25)',
    color: 'var(--color-danger)',
    borderRadius: '6px',
    padding: '4px 8px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center'
  },
  slideCard: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  slideThumb: {
    width: '60px',
    height: '40px',
    objectFit: 'cover',
    borderRadius: '6px'
  },
  avatarCircle: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'var(--color-primary)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '12px'
  },
  actionBtnSmall: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '6px',
    border: '1px solid rgba(99,102,241,0.3)',
    background: 'rgba(99,102,241,0.1)',
    color: 'var(--color-primary)',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(6px)',
    zIndex: 2500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  modalBox: {
    width: '100%',
    maxWidth: '460px',
    padding: '24px',
    borderRadius: '16px'
  },
  drawerOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    zIndex: 1500
  },
  drawerContent: {
    width: '260px',
    height: '100%'
  }
};
