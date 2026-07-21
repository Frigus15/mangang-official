import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Heart, Star, Plus, Truck } from 'lucide-react';

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, addToCart, navigateTo } = useContext(ShopContext);

  const isWishlisted = wishlist.includes(product.id);
  const hasStock = product.stock > 0;

  const handleCardClick = () => {
    navigateTo('product-details', product.id);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (!hasStock) return;
    
    // Choose default specs if options exist
    const defaultOptions = {};
    if (product.options) {
      if (product.options.colors && product.options.colors.length > 0) {
        defaultOptions.color = product.options.colors[0];
      }
      if (product.options.storage && product.options.storage.length > 0) {
        defaultOptions.storage = product.options.storage[0];
      }
    }

    addToCart(product, 1, defaultOptions);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (!hasStock) return;
    
    const defaultOptions = {};
    if (product.options) {
      if (product.options.colors && product.options.colors.length > 0) {
        defaultOptions.color = product.options.colors[0];
      }
      if (product.options.storage && product.options.storage.length > 0) {
        defaultOptions.storage = product.options.storage[0];
      }
    }

    addToCart(product, 1, defaultOptions);
    navigateTo('checkout');
  };

  const originalPrice = Math.round(product.price * 1.3);
  const profitPercent = 30; // 30% profit markup
  const deliveryTime = "Delivered in 2-3 Days";

  return (
    <div
      onClick={handleCardClick}
      className="glass-panel glass-panel-hover"
      style={styles.card}
    >
      {/* Wishlist button */}
      <button
        onClick={handleWishlistToggle}
        style={{
          ...styles.wishlistBtn,
          background: isWishlisted ? 'rgba(239, 68, 68, 0.1)' : 'rgba(11, 15, 25, 0.6)',
          borderColor: isWishlisted ? 'var(--color-danger)' : 'var(--border-glass)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Heart
          size={13}
          style={{
            fill: isWishlisted ? 'var(--color-danger)' : 'none',
            color: isWishlisted ? 'var(--color-danger)' : 'var(--text-secondary)'
          }}
        />
      </button>

      {/* Image container */}
      <div style={styles.imageContainer}>
        <img src={product.image} alt={product.title} style={styles.image} />
        {!hasStock && (
          <div style={styles.soldOutOverlay}>
            <span style={styles.soldOutText}>Sold Out</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div style={styles.content}>
        <h3 style={styles.title} title={product.title}>{product.title}</h3>
        <p style={styles.desc}>{product.description}</p>

        <div style={styles.priceRow}>
          <span style={styles.originalPrice}>₹{originalPrice.toLocaleString()}</span>
          <span style={styles.price}>₹{product.price.toLocaleString()}</span>
          <span style={styles.profitPercent}>{profitPercent}% Off</span>
        </div>

        <div style={styles.deliveryTime}>
          <Truck size={12} style={{ color: 'var(--text-muted)', marginRight: '4px' }} />
          <span>{deliveryTime}</span>
        </div>

        <div style={styles.actionRow}>
          <button
            onClick={handleQuickAdd}
            disabled={!hasStock}
            style={{
              ...styles.quickAddBtn,
              background: hasStock ? 'rgba(99, 102, 241, 0.12)' : 'rgba(0,0,0,0.05)',
              color: hasStock ? 'var(--color-primary)' : 'var(--text-muted)',
              border: hasStock ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid transparent',
              cursor: hasStock ? 'pointer' : 'not-allowed'
            }}
          >
            {hasStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {hasStock && (
            <button
              onClick={handleBuyNow}
              style={styles.buyNowBtn}
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    padding: '20px',
    cursor: 'pointer',
    height: '100%',
    gap: '20px',
    borderRadius: '16px'
  },
  wishlistBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border-glass)',
    zIndex: 10,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  imageContainer: {
    width: '165px',
    height: '165px',
    flexShrink: 0,
    overflow: 'hidden',
    position: 'relative',
    background: 'transparent',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  soldOutOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(6, 9, 19, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(2px)'
  },
  soldOutText: {
    color: 'var(--color-danger)',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: '12px',
    border: '1px solid var(--color-danger)',
    padding: '4px 8px',
    borderRadius: '4px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    textAlign: 'left',
    minWidth: 0
  },
  title: {
    fontSize: '18px',
    fontWeight: '800',
    marginBottom: '6px',
    color: 'var(--text-primary)',
    lineHeight: '1.2',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: '24px'
  },
  desc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginBottom: '10px',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px',
    flexWrap: 'wrap'
  },
  originalPrice: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    textDecoration: 'line-through'
  },
  price: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'var(--color-primary)',
    fontFamily: 'var(--font-heading)'
  },
  profitPercent: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#10b981',
    background: 'rgba(16, 185, 129, 0.12)',
    padding: '2px 8px',
    borderRadius: '6px'
  },
  deliveryTime: {
    fontSize: '11.5px',
    color: 'var(--text-muted)',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center'
  },
  actionRow: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    marginTop: 'auto'
  },
  quickAddBtn: {
    flex: 1,
    padding: '9px 12px',
    fontSize: '12.5px',
    fontWeight: '700',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    textAlign: 'center'
  },
  buyNowBtn: {
    flex: 1,
    padding: '9px 12px',
    fontSize: '12.5px',
    fontWeight: '800',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
    color: '#ffffff',
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
    transition: 'all 0.2s ease'
  }
};


