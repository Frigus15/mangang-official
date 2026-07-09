import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { DollarSign, ShoppingBag, Layers, AlertTriangle, Plus, Check, Trash } from 'lucide-react';

export default function AdminPortal() {
  const { products, orders, addNewProduct, updateProductStock, bannerSlides, addBannerSlide, removeBannerSlide } = useContext(ShopContext);

  // Form states for New Product
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Audio');
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newFeatures, setNewFeatures] = useState('');
  
  // Custom specifications inputs
  const [specKey1, setSpecKey1] = useState('Connection');
  const [specVal1, setSpecVal1] = useState('');
  const [specKey2, setSpecKey2] = useState('Battery Life');
  const [specVal2, setSpecVal2] = useState('');

  const [formSuccess, setFormSuccess] = useState(false);

  // Form states for Sliding Banners
  const [slideImage, setSlideImage] = useState('');
  const [slideProductId, setSlideProductId] = useState('');
  const [slideSuccess, setSlideSuccess] = useState(false);

  const handleAddSlideSubmit = (e) => {
    e.preventDefault();
    if (!slideImage) {
      alert('Please enter a banner image URL.');
      return;
    }

    addBannerSlide({
      title: 'Banner Slide',
      subtitle: '',
      image: slideImage,
      productId: slideProductId || (products.length > 0 ? products[0].id : 'prod-1')
    });

    setSlideImage('');
    setSlideProductId('');
    setSlideSuccess(true);
    setTimeout(() => setSlideSuccess(false), 3000);
  };

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, o) => sum + o.pricing.total, 0);
  const lowStockCount = products.filter((p) => p.stock < 5).length;

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newStock || !newDesc) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    // Build specs object
    const specs = {};
    if (specKey1 && specVal1) specs[specKey1] = specVal1;
    if (specKey2 && specVal2) specs[specKey2] = specVal2;

    const newProd = {
      title: newTitle,
      category: newCategory,
      price: Number(newPrice),
      stock: Number(newStock),
      rating: 5.0,
      image: newImage || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
      description: newDesc,
      features: newFeatures,
      specifications: specs,
      colors: 'Black, White, Gray',
      storage: 'Standard Edition'
    };

    addNewProduct(newProd);

    // Reset inputs
    setNewTitle('');
    setNewPrice('');
    setNewStock('');
    setNewImage('');
    setNewDesc('');
    setNewFeatures('');
    setSpecVal1('');
    setSpecVal2('');

    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  return (
    <div style={styles.container} className="animate-fade-in">
      <h1 style={styles.pageTitle}>Seller Dashboard</h1>
      <p style={styles.pageSubtitle}>Monitor sales, customer payments and manage unit stocks.</p>

      {/* KPI METRICS OVERVIEW */}
      <section style={styles.kpiGrid}>
        {/* Metric 1 */}
        <div style={styles.kpiCard} className="glass-panel">
          <div style={styles.kpiHeader}>
            <span style={styles.kpiLabel}>TOTAL SALES</span>
            <DollarSign size={20} style={{ color: 'var(--color-primary)' }} />
          </div>
          <h2 style={styles.kpiValue}>${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
          <p style={styles.kpiSubText}>Reflected from checkout validations</p>
        </div>

        {/* Metric 2 */}
        <div style={styles.kpiCard} className="glass-panel">
          <div style={styles.kpiHeader}>
            <span style={styles.kpiLabel}>ORDERS</span>
            <ShoppingBag size={20} style={{ color: 'var(--color-secondary)' }} />
          </div>
          <h2 style={styles.kpiValue}>{orders.length}</h2>
          <p style={styles.kpiSubText}>Telemetry transaction records</p>
        </div>

        {/* Metric 3 */}
        <div style={styles.kpiCard} className="glass-panel">
          <div style={styles.kpiHeader}>
            <span style={styles.kpiLabel}>PRODUCTS</span>
            <Layers size={20} style={{ color: 'var(--color-accent)' }} />
          </div>
          <h2 style={styles.kpiValue}>{products.length}</h2>
          <p style={styles.kpiSubText}>Active hardware options</p>
        </div>

        {/* Metric 4 */}
        <div style={styles.kpiCard} className="glass-panel">
          <div style={styles.kpiHeader}>
            <span style={styles.kpiLabel}>STOCK AMOUNT</span>
            <AlertTriangle size={20} style={{ color: lowStockCount > 0 ? 'var(--color-warning)' : 'var(--color-success)' }} />
          </div>
          <h2 style={{ ...styles.kpiValue, color: lowStockCount > 0 ? 'var(--color-warning)' : '#fff' }}>{lowStockCount}</h2>
          <p style={styles.kpiSubText}>Modules with &lt; 5 units in stock</p>
        </div>
      </section>

      {/* BANNER EDITING REGISTRATION PANEL */}
      <section className="glass-panel" style={styles.bannerAdminSection}>
        <h3 style={styles.panelTitle}>Homepage Spotlight Sliding Banner Manager</h3>
        <div style={styles.bannerGridContainer}>
          {/* Left panel: slides list */}
          <div style={styles.bannerListCol}>
            <span className="form-label" style={{ marginBottom: '10px', display: 'block' }}>Active Banner Slides ({bannerSlides.length})</span>
            {bannerSlides.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', padding: '10px 0' }}>No active slides in homepage banner loops.</p>
            ) : (
              <div style={styles.bannerSlidesList}>
                {bannerSlides.map((slide) => (
                  <div key={slide.id} style={styles.slideCardAdmin} className="glass-panel">
                    <img src={slide.image} alt="Banner Slide" style={styles.slideThumbAdmin} />
                    <div style={styles.slideInfoAdmin}>
                      <strong style={{ fontSize: '13px', color: '#fff' }}>Slide ID: {slide.id}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Linked Product: {slide.productId}</span>
                    </div>
                    <button
                      onClick={() => removeBannerSlide(slide.id)}
                      style={styles.slideRemoveBtnAdmin}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right panel: add slide form */}
          <div style={styles.bannerFormCol}>
            <span className="form-label" style={{ marginBottom: '10px', display: 'block' }}>Create Spot Slide Banner</span>
            {slideSuccess && (
              <div style={{ ...styles.successMessage, marginBottom: '10px' }} className="badge badge-green">
                Banner slide committed successfully!
              </div>
            )}
            <form onSubmit={handleAddSlideSubmit} style={styles.slideForm}>
              <div className="form-group">
                <span className="form-label">Banner Image URL *</span>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com..."
                  value={slideImage}
                  onChange={(e) => setSlideImage(e.target.value)}
                  className="form-input"
                  style={{ padding: '8px 12px', fontSize: '13px' }}
                />
              </div>
              <div className="form-group">
                <span className="form-label">Linked Product Target</span>
                <select
                  value={slideProductId}
                  onChange={(e) => setSlideProductId(e.target.value)}
                  className="form-input"
                  style={{ padding: '8px 12px', fontSize: '13px', background: 'rgba(11, 17, 32, 0.95)', cursor: 'pointer' }}
                >
                  <option value="">Select Target...</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px', fontSize: '13px', width: '100%', marginTop: '10px' }}>
                <Plus size={14} style={{ marginRight: '5px' }} /> Deploy Banner Slide
              </button>
            </form>
          </div>
        </div>
      </section>

      <div style={styles.twoColumnGrid} className="responsive-split">
        {/* LEFT COLUMN: STOCK MANAGEMENT TABLE */}
        <div style={styles.stockPanel} className="glass-panel">
          <h3 style={styles.panelTitle}>Ecosystem Inventory Stock</h3>
          
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.th}>Hardware Name</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Price</th>
                  <th style={{ ...styles.th, textAlign: 'center' }}>Units In Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.productTdName}>
                        <img src={p.image} alt={p.title} style={styles.prodThumb} />
                        <strong>{p.title}</strong>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span className="badge badge-cyan" style={{ fontSize: '10px' }}>{p.category}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>${p.price}</span>
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                      <div style={styles.stockAdjuster}>
                        <button
                          style={styles.adjustBtn}
                          onClick={() => updateProductStock(p.id, p.stock - 1)}
                        >
                          -
                        </button>
                        <span style={{
                          ...styles.stockDisplay,
                          color: p.stock < 5 ? 'var(--color-warning)' : '#fff',
                          fontWeight: '700'
                        }}>
                          {p.stock}
                        </span>
                        <button
                          style={styles.adjustBtn}
                          onClick={() => updateProductStock(p.id, p.stock + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: ADD HARDWARE FORM */}
        <div style={styles.formPanel} className="glass-panel">
          <h3 style={styles.panelTitle}>Register New Hardware Module</h3>

          {formSuccess && (
            <div style={styles.successMessage} className="badge badge-green">
              <Check size={14} style={{ marginRight: '5px' }} /> Hardware node committed to global index database.
            </div>
          )}

          <form onSubmit={handleAddProductSubmit} style={styles.form}>
            {/* Title */}
            <div className="form-group">
              <span className="form-label">Product Name *</span>
              <input
                type="text"
                required
                placeholder="e.g., Mangang Soundbar-X"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Category & Pricing */}
            <div style={styles.formRow}>
              <div className="form-group" style={{ flex: 1 }}>
                <span className="form-label">Segment Category</span>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="form-input"
                  style={{ background: 'rgba(11, 17, 32, 0.95)', cursor: 'pointer' }}
                >
                  <option value="Audio">Audio</option>
                  <option value="Wearables">Wearables</option>
                  <option value="Computers">Computers</option>
                  <option value="Smart Home">Smart Home</option>
                </select>
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <span className="form-label">Price ($ USD) *</span>
                <input
                  type="number"
                  required
                  placeholder="249"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Initial Stock & Image URL */}
            <div style={styles.formRow}>
              <div className="form-group" style={{ flex: 0.6 }}>
                <span className="form-label">Initial Stock *</span>
                <input
                  type="number"
                  required
                  placeholder="20"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group" style={{ flex: 1.4 }}>
                <span className="form-label">Module Image Link URL</span>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com..."
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <span className="form-label">Short Description *</span>
              <textarea
                required
                placeholder="Give details about key design parameters, target audience, and usage conditions..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                style={styles.textArea}
                className="form-input"
              />
            </div>

            {/* Key bullet features */}
            <div className="form-group">
              <span className="form-label">Features / Selling Highlights (one per line)</span>
              <textarea
                placeholder="e.g. Ultra high density soundboard&#10;50 hour battery duration&#10;Glow LED synchronized colors"
                value={newFeatures}
                onChange={(e) => setNewFeatures(e.target.value)}
                style={styles.textAreaShort}
                className="form-input"
              />
            </div>

            {/* Specs Specifications Fields */}
            <div style={styles.specHeadersRow}>
              <span className="form-label">Specifications Details</span>
            </div>
            <div style={styles.formRow}>
              <input
                type="text"
                value={specKey1}
                onChange={(e) => setSpecKey1(e.target.value)}
                style={styles.specKeyField}
                className="form-input"
              />
              <input
                type="text"
                placeholder="e.g., Bluetooth v5.3"
                value={specVal1}
                onChange={(e) => setSpecVal1(e.target.value)}
                style={styles.specValField}
                className="form-input"
              />
            </div>
            <div style={styles.formRow}>
              <input
                type="text"
                value={specKey2}
                onChange={(e) => setSpecKey2(e.target.value)}
                style={styles.specKeyField}
                className="form-input"
              />
              <input
                type="text"
                placeholder="e.g., 60 Hours (ANC off)"
                value={specVal2}
                onChange={(e) => setSpecVal2(e.target.value)}
                style={styles.specValField}
                className="form-input"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }}>
              <Plus size={16} /> Deploy Module
            </button>
          </form>
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
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  kpiCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  kpiHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  kpiLabel: {
    fontSize: '10px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    letterSpacing: '0.05em'
  },
  kpiValue: {
    fontSize: '28px',
    fontWeight: '800',
    fontFamily: 'var(--font-heading)',
    color: 'var(--text-primary)'
  },
  kpiSubText: {
    fontSize: '11px',
    color: 'var(--text-secondary)'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '30px',
    alignItems: 'start'
  },
  stockPanel: {
    padding: '30px'
  },
  formPanel: {
    padding: '30px'
  },
  panelTitle: {
    fontSize: '18px',
    fontWeight: '800',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '12px',
    marginBottom: '20px'
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
    padding: '12px 10px',
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    textTransform: 'uppercase'
  },
  tr: {
    borderBottom: '1px solid var(--border-glass)',
    transition: 'background 0.2s'
  },
  td: {
    padding: '16px 10px',
    fontSize: '13px'
  },
  productTdName: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  prodThumb: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    objectFit: 'contain',
    padding: '2px',
    boxSizing: 'border-box',
    background: '#f9fafb'
  },
  stockAdjuster: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.03)',
    border: '1px solid var(--border-glass)',
    borderRadius: '6px',
    padding: '2px'
  },
  adjustBtn: {
    width: '24px',
    height: '24px',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stockDisplay: {
    minWidth: '24px',
    textAlign: 'center',
    fontSize: '12px'
  },
  successMessage: {
    width: '100%',
    padding: '10px 14px',
    fontSize: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  formRow: {
    display: 'flex',
    gap: '15px'
  },
  textArea: {
    height: '80px',
    resize: 'vertical',
    fontFamily: 'var(--font-body)'
  },
  textAreaShort: {
    height: '60px',
    resize: 'vertical',
    fontFamily: 'var(--font-body)'
  },
  specHeadersRow: {
    borderTop: '1px solid var(--border-glass)',
    paddingTop: '15px',
    marginTop: '5px',
    textAlign: 'left'
  },
  specKeyField: {
    flex: 0.8,
    fontWeight: '700',
    color: 'var(--text-secondary)'
  },
  specValField: {
    flex: 1.2
  },
  bannerAdminSection: {
    padding: '30px',
    marginBottom: '40px'
  },
  bannerGridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px'
  },
  bannerListCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  bannerSlidesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '320px',
    overflowY: 'auto',
    paddingRight: '5px'
  },
  slideCardAdmin: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px',
    background: '#ffffff',
    border: '1px solid var(--border-glass)',
    borderRadius: '8px'
  },
  slideThumbAdmin: {
    width: '60px',
    height: '40px',
    borderRadius: '4px',
    objectFit: 'contain',
    padding: '2px',
    boxSizing: 'border-box',
    background: '#f9fafb'
  },
  slideInfoAdmin: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  slideRemoveBtnAdmin: {
    padding: '6px 12px',
    fontSize: '11px',
    borderRadius: '4px',
    color: 'var(--color-danger)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  bannerFormCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  slideForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }
};

// Add table hover adjustments
if (typeof document !== 'undefined') {
  const adminStyle = document.createElement('style');
  adminStyle.innerHTML = `
    tbody tr:hover {
      background: rgba(0, 0, 0, 0.02) !important;
    }
  `;
  document.head.appendChild(adminStyle);
}
