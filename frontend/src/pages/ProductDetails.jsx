import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ArrowLeft, Star, ShoppingCart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

const DUMMY_REVIEWS = {
  'prod-1': [
    { name: 'Alex M.', rating: 5, date: '2 days ago', comment: 'The micro-OLED panels are insane. Absolutely zero pixelation, hand tracking feels like magic.' },
    { name: 'Tarek K.', rating: 4, date: '1 week ago', comment: 'Spectacular hardware, though it is slightly heavier than expected. The spatial audio is incredible.' }
  ],
  'prod-2': [
    { name: 'Sarah L.', rating: 5, date: '3 days ago', comment: 'Beryllium drivers are no joke. Audiophile grade resolution, ANC blocks out subway rumble completely!' },
    { name: 'Marcus R.', rating: 5, date: '2 weeks ago', comment: 'The battery lasts forever! Literally charged it once last week and still at 40%.' }
  ],
  'prod-3': [
    { name: 'Elena G.', rating: 4, date: '5 days ago', comment: 'Titanium case looks super premium. GPS tracking is incredibly accurate on my mountain runs.' }
  ],
  'prod-4': [
    { name: 'David B.', rating: 5, date: '1 day ago', comment: 'Best gasket keyboard in this price range. Sound profile is creamy and keycaps feel premium.' }
  ],
  'prod-5': [
    { name: 'Chloe F.', rating: 4, date: '3 weeks ago', comment: 'Aura light synced to Spotify is a neat vibe. Smart integration was immediate with Home Assistant.' }
  ]
};

export default function ProductDetails() {
  const { selectedProductId, products, addToCart, navigateTo } = useContext(ShopContext);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [reviews, setReviews] = useState([]);
  
  const [activeImage, setActiveImage] = useState('');
  
  // Review form states
  const [revName, setRevName] = useState('');
  const [revComment, setRevComment] = useState('');
  const [revRating, setRevRating] = useState(5);

  const targetId = selectedProductId || (products && products.length > 0 ? (products[0].id || products[0]._id) : null);
  const product = (products || []).find(
    (p) => String(p.id) === String(targetId) || String(p._id) === String(targetId)
  ) || (products && products.length > 0 ? products[0] : null);

  const productImages = product
    ? (product.images && product.images.length > 0 ? product.images : [product.image])
    : [];

  const colorsList = product?.options?.colors || [];
  const storageList = product?.options?.storage || [];

  // Initialize selected options & reviews
  useEffect(() => {
    if (product) {
      const imgs = (product.images && product.images.length > 0) ? product.images : (product.image ? [product.image] : []);
      setActiveImage(imgs[0] || '');

      if (colorsList.length > 0) {
        setSelectedColor(colorsList[0]);
      }
      if (storageList.length > 0) {
        setSelectedStorage(storageList[0]);
      }
      
      const pId = product.id || product._id;
      const seedReviews = DUMMY_REVIEWS[pId] || [
        { name: 'Anonymous', rating: 5, date: '1 month ago', comment: 'Excellent electronic gadget. Works perfectly as described.' }
      ];
      setReviews(seedReviews);
      setQty(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div style={styles.errorContainer} className="glass-panel">
        <h2>No Product Modules Selected</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '10px 0 20px 0' }}>
          Please go back to the directory to select an active model.
        </p>
        <button className="btn btn-primary" onClick={() => navigateTo('catalog')}>
          Go to Shop Catalog
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const options = {};
    if (selectedColor) options.color = selectedColor;
    if (selectedStorage) options.storage = selectedStorage;
    
    addToCart(product, qty, options);
    
    // Quick user notification
    const btn = document.getElementById('add-to-cart-btn');
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Added to Cart!';
      btn.style.opacity = '0.9';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
      }, 1500);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (revName.trim() && revComment.trim()) {
      const newReview = {
        name: revName,
        rating: revRating,
        date: 'Just now',
        comment: revComment
      };
      setReviews([newReview, ...reviews]);
      setRevName('');
      setRevComment('');
      setRevRating(5);
    }
  };

  const hasStock = (product.stock || 0) > 0;
  const displayPrice = (Number(product.price) || 0).toLocaleString();

  return (
    <div style={styles.container} className="animate-fade-in">
      {/* Back link */}
      <button
        onClick={() => navigateTo('catalog')}
        style={styles.backBtn}
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      {/* Main Details Sheet */}
      <section style={styles.mainGrid} className="responsive-grid-sm">
        {/* Left Column: Media Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={styles.mediaCol} className="glass-panel">
            <img src={activeImage || product.image} alt={product.title} style={styles.image} />
            {!hasStock && (
              <div style={styles.soldOutOverlay}>
                <span style={styles.soldOutText}>Stock Depleted</span>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery Row */}
          {productImages.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
              {productImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '10px',
                    border: activeImage === imgUrl ? '2px solid var(--color-primary)' : '1px solid var(--border-glass)',
                    padding: '2px',
                    background: 'transparent',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Spec Selector Sheet */}
        <div style={styles.specsCol} className="glass-panel">
          <div style={styles.metaRow}>
            <span className="badge badge-cyan">{product.category}</span>
            <div style={styles.rating}>
              <Star size={14} style={styles.starIcon} />
              <span style={styles.ratingVal}>{product.rating || 5.0}</span>
              <span style={styles.ratingCount}>({reviews.length} reviews)</span>
            </div>
          </div>

          <h1 style={styles.title}>{product.title}</h1>
          <p style={styles.price}>₹{displayPrice}</p>
          <p style={styles.description}>{product.description}</p>

          {/* Key bullets */}
          {product.features && product.features.length > 0 && (
            <ul style={styles.featuresList}>
              {product.features.map((feat, idx) => (
                <li key={idx} style={styles.featureItem}>
                  <span style={styles.bulletCyan}>✦</span> {feat}
                </li>
              ))}
            </ul>
          )}

          {/* Options Configurator */}
          <div style={styles.configurator}>
            {/* Colors Option */}
            {colorsList.length > 0 && (
              <div style={styles.optionGroup}>
                <span style={styles.optionLabel}>Chassis Color:</span>
                <div style={styles.optionButtons}>
                  {colorsList.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        ...styles.optionBtn,
                        borderColor: selectedColor === color ? 'var(--color-primary)' : 'var(--border-glass)',
                        background: selectedColor === color ? 'rgba(11, 93, 52, 0.08)' : 'transparent',
                        color: selectedColor === color ? 'var(--color-primary)' : 'var(--text-primary)'
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage/Spec Option */}
            {storageList.length > 0 && storageList[0] !== 'Standard Edition' && storageList[0] !== 'Standard Size' && storageList[0] !== 'Standard Model' && (
              <div style={styles.optionGroup}>
                <span style={styles.optionLabel}>Specification Size:</span>
                <div style={styles.optionButtons}>
                  {storageList.map((spec) => (
                    <button
                      key={spec}
                      onClick={() => setSelectedStorage(spec)}
                      style={{
                        ...styles.optionBtn,
                        borderColor: selectedStorage === spec ? 'var(--color-primary)' : 'var(--border-glass)',
                        background: selectedStorage === spec ? 'rgba(11, 93, 52, 0.08)' : 'transparent',
                        color: selectedStorage === spec ? 'var(--color-primary)' : 'var(--text-primary)'
                      }}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart Actions */}
          <div style={styles.actionsBox}>
            <div style={styles.qtyContainer}>
              <button
                style={styles.qtyBtn}
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={!hasStock}
              >
                -
              </button>
              <span style={styles.qtyValText}>{qty}</span>
              <button
                style={styles.qtyBtn}
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                disabled={!hasStock}
              >
                +
              </button>
            </div>

            <button
              id="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!hasStock}
              className="btn btn-primary"
              style={styles.cartBtn}
            >
              <ShoppingCart size={16} /> Add to Workspace
            </button>
          </div>
          {hasStock ? (
            <p style={styles.stockLabelGreen}>In Stock: {product.stock} units available</p>
          ) : (
            <p style={styles.stockLabelRed}>Ecosystem replenishment in progress</p>
          )}

          {/* Guarantees */}
          <div style={styles.guaranteeRow}>
            <div style={styles.guaranteeItem}>
              <Truck size={16} style={{ color: 'var(--color-primary)' }} />
              <span>Free Delivery &gt;$500</span>
            </div>
            <div style={styles.guaranteeItem}>
              <ShieldCheck size={16} style={{ color: 'var(--color-primary)' }} />
              <span>2-Year Warranty</span>
            </div>
            <div style={styles.guaranteeItem}>
              <RefreshCw size={16} style={{ color: 'var(--color-primary)' }} />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications details sheet & Reviews */}
      <section style={styles.lowerGrid} className="responsive-grid">
        {/* Specs Table */}
        <div style={styles.specsTableBox} className="glass-panel">
          <h3 style={styles.boxTitle}>Technical Parameters</h3>
          <table className="spec-table">
            <tbody>
              {Object.entries(product.specifications).map(([key, val]) => (
                <tr key={key}>
                  <td className="label">{key}</td>
                  <td className="value">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Reviews Panel */}
        <div style={styles.reviewsBox} className="glass-panel">
          <h3 style={styles.boxTitle}>Device Assessments</h3>
          
          {/* Review form */}
          <form onSubmit={handleReviewSubmit} style={styles.reviewForm}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Write a feedback</span>
            <div style={styles.formRow}>
              <input
                type="text"
                required
                placeholder="Your Name"
                value={revName}
                onChange={(e) => setRevName(e.target.value)}
                style={styles.formInputName}
              />
              <div style={styles.ratingFormSelect}>
                <span style={{ fontSize: '12px' }}>Rating:</span>
                <select
                  value={revRating}
                  onChange={(e) => setRevRating(Number(e.target.value))}
                  style={styles.ratingFormDrop}
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>
            <textarea
              required
              placeholder="Submit details about sound fidelity, ergonomics, design adjustments..."
              value={revComment}
              onChange={(e) => setRevComment(e.target.value)}
              style={styles.formTextArea}
            />
            <button type="submit" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '12px', alignSelf: 'flex-start' }}>
              Publish Review
            </button>
          </form>

          {/* List reviews */}
          <div style={styles.reviewsList}>
            {reviews.map((rev, idx) => (
              <div key={idx} style={styles.reviewCard}>
                <div style={styles.revHeader}>
                  <strong style={{ color: '#fff', fontSize: '14px' }}>{rev.name}</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{rev.date}</span>
                </div>
                <div style={styles.revStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      style={{
                        color: i < rev.rating ? '#fbbf24' : 'var(--text-muted)',
                        fill: i < rev.rating ? '#fbbf24' : 'none'
                      }}
                    />
                  ))}
                </div>
                <p style={styles.revComment}>{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 0 80px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    textAlign: 'left'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    alignSelf: 'flex-start',
    transition: 'color 0.2s',
    ':hover': {
      color: 'var(--color-primary)'
    }
  },
  errorContainer: {
    padding: '60px 40px',
    margin: '80px auto',
    maxWidth: '500px',
    textAlign: 'center'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px'
  },
  mediaCol: {
    height: '420px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: '1px solid var(--border-glass)',
    borderRadius: 'var(--border-radius-md)',
    position: 'relative',
    overflow: 'hidden'
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    borderRadius: '8px'
  },
  soldOutOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255,255,255,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)'
  },
  soldOutText: {
    color: 'var(--color-danger)',
    fontWeight: '800',
    border: '1px solid var(--color-danger)',
    padding: '8px 16px',
    borderRadius: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  },
  specsCol: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  starIcon: {
    color: '#fbbf24',
    fill: '#fbbf24'
  },
  ratingVal: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--text-primary)'
  },
  ratingCount: {
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: 'var(--text-primary)',
    lineHeight: '1.2'
  },
  price: {
    fontSize: '28px',
    fontWeight: '800',
    color: 'var(--color-primary)',
    fontFamily: 'var(--font-heading)'
  },
  description: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6'
  },
  featuresList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    margin: '10px 0'
  },
  featureItem: {
    fontSize: '13px',
    color: 'var(--text-primary)'
  },
  bulletCyan: {
    color: 'var(--color-primary)',
    marginRight: '6px'
  },
  configurator: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    margin: '10px 0',
    borderTop: '1px solid var(--border-glass)',
    paddingTop: '15px'
  },
  optionGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  optionLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    textTransform: 'uppercase'
  },
  optionButtons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  optionBtn: {
    padding: '8px 16px',
    fontSize: '13px',
    borderRadius: '6px',
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  actionsBox: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px'
  },
  qtyContainer: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.03)',
    border: '1px solid var(--border-glass)',
    borderRadius: '8px',
    padding: '4px'
  },
  qtyBtn: {
    width: '32px',
    height: '32px',
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  qtyValText: {
    minWidth: '30px',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '15px'
  },
  cartBtn: {
    flex: 1,
    height: '42px',
    gap: '8px'
  },
  stockLabelGreen: {
    fontSize: '12px',
    color: 'var(--color-success)',
    fontWeight: '600',
    textAlign: 'left'
  },
  stockLabelRed: {
    fontSize: '12px',
    color: 'var(--color-danger)',
    fontWeight: '600',
    textAlign: 'left'
  },
  guaranteeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    paddingTop: '15px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  guaranteeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  lowerGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '40px'
  },
  specsTableBox: {
    padding: '24px',
    alignSelf: 'start'
  },
  boxTitle: {
    fontSize: '18px',
    fontWeight: '800',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '12px',
    marginBottom: '15px'
  },
  reviewsBox: {
    padding: '24px'
  },
  reviewForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    borderBottom: '1px dashed rgba(255,255,255,0.08)',
    paddingBottom: '20px',
    marginBottom: '20px'
  },
  formRow: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap'
  },
  formInputName: {
    flex: 1,
    padding: '10px 12px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border-glass)',
    color: '#fff',
    fontSize: '13px',
    borderRadius: '6px',
    outline: 'none',
    minWidth: '150px'
  },
  ratingFormSelect: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  ratingFormDrop: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border-glass)',
    color: '#fff',
    padding: '8px 10px',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none',
    cursor: 'pointer'
  },
  formTextArea: {
    width: '100%',
    height: '80px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border-glass)',
    color: '#fff',
    padding: '10px 12px',
    fontSize: '13px',
    borderRadius: '6px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'var(--font-body)'
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  reviewCard: {
    padding: '15px',
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255, 255, 255, 0.03)',
    borderRadius: '8px'
  },
  revHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px'
  },
  revStars: {
    display: 'flex',
    gap: '3px',
    marginBottom: '8px'
  },
  revComment: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.5'
  }
};
