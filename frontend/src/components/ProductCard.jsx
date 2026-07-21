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

  const originalPrice = Math.round(product.price * 1.3);
  const profitPercent = 30; // 30% profit markup
  const deliveryTime = "Delivered in 2-3 Days";

  return (
    <div
      onClick={handleCardClick}
      className="glass-panel"
      style={styles.card}
    >
      {/* Wishlist button */}
      <button
        onClick={handleWishlistToggle}
        style={{
          ...styles.wishlistBtn,
          background: isWishlisted ? 'rgba(239, 68, 68, 0.1)' : '#ffffff',
          borderColor: isWishlisted ? 'var(--color-danger)' : 'var(--border-glass)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
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
              background: hasStock ? 'var(--color-primary)' : 'rgba(0,0,0,0.05)',
              color: hasStock ? '#ffffff' : 'var(--text-muted)',
              cursor: hasStock ? 'pointer' : 'not-allowed'
            }}
          >
            {hasStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
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
    padding: '16px',
    cursor: 'pointer',
    height: '100%',
    gap: '16px'
  },
  wishlistBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '28px',
    height: '28px',
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
    width: '140px',
    height: '140px',
    flexShrink: 0,
    overflow: 'hidden',
    position: 'relative',
    background: '#f9fafb',
    borderRadius: '10px'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '8px',
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
    fontSize: '17px',
    fontWeight: '700',
    marginBottom: '4px',
    color: 'var(--text-primary)',
    lineHeight: '1.2',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: '24px' // leave space for absolute wishlist button
  },
  desc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginBottom: '8px',
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
    fontSize: '12px',
    color: 'var(--text-muted)',
    textDecoration: 'line-through'
  },
  price: {
    fontSize: '16px',
    fontWeight: '800',
    color: 'var(--color-primary)',
    fontFamily: 'var(--font-heading)'
  },
  profitPercent: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#10b981',
    background: 'rgba(16, 185, 129, 0.1)',
    padding: '2px 6px',
    borderRadius: '4px'
  },
  deliveryTime: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  actionRow: {
    display: 'flex',
    width: '100%'
  },
  quickAddBtn: {
    flex: 1,
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: '700',
    borderRadius: '6px',
    border: 'none',
    transition: 'all 0.2s ease',
    textAlign: 'center',
    boxShadow: '0 1px 4px rgba(11, 93, 52, 0.15)'
  }
};


