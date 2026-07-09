import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function Catalog() {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortOption,
    setSortOption,
    navigateTo
  } = useContext(ShopContext);

  const categoriesList = ['All', 'Audio', 'Wearables', 'Computers', 'Smart Home'];

  // Handle category filter click
  const handleCategoryToggle = (category) => {
    setSelectedCategory(category);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange(1000);
    setSortOption('featured');
  };

  // Filter and Sort implementation
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      const matchesPrice = product.price <= priceRange;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortOption === 'price-low') {
        return a.price - b.price;
      }
      if (sortOption === 'price-high') {
        return b.price - a.price;
      }
      if (sortOption === 'rating') {
        return b.rating - a.rating;
      }
      // 'featured'
      return 0; 
    });

  return (
    <div style={styles.container} className="animate-fade-in">
      {/* Top Banner */}
      <div style={styles.banner} className="glass-panel">
        <h1 style={styles.bannerTitle}>Hardware Repository</h1>
        <p style={styles.bannerDesc}>Select and customize your core wearable electronics, computing rigs, and sound drivers.</p>
      </div>

      <div style={styles.contentLayout} className="responsive-split">
        {/* SIDEBAR FILTERS (Desktop) */}
        <aside style={styles.sidebar} className="glass-panel">
          <div style={styles.sidebarHeader}>
            <SlidersHorizontal size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 style={styles.sidebarTitle}>Filters</h3>
            <button style={styles.resetBtn} onClick={handleResetFilters} title="Reset Filters">
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Search filter in sidebar */}
          <div style={styles.filterGroup}>
            <span className="form-label">Search Library</span>
            <div className="search-wrapper" style={{ maxWidth: '100%' }}>
              <Search size={16} />
              <input
                type="text"
                placeholder="Product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Categories filter */}
          <div style={styles.filterGroup}>
            <span className="form-label">Ecosystem Segment</span>
            <div style={styles.pillsContainer}>
              {['All', 'Audio', 'Wearables', 'Computers', 'Smart Home'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryToggle(cat)}
                  style={{
                    ...styles.pillBtn,
                    background: selectedCategory === cat ? 'var(--color-primary)' : '#ffffff',
                    color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                    borderColor: selectedCategory === cat ? 'var(--color-primary)' : 'var(--border-glass)',
                    boxShadow: selectedCategory === cat ? '0 2px 8px rgba(11, 93, 52, 0.15)' : 'none'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div style={styles.filterGroup}>
            <div style={styles.priceLabelRow}>
              <span className="form-label">Max Price</span>
              <span style={styles.priceLimit}>${priceRange}</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="25"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="range-slider"
            />
            <div style={styles.rangeLabels}>
              <span>$50</span>
              <span>$1000</span>
            </div>
          </div>
        </aside>

        {/* PRODUCTS DIRECTORY */}
        <main style={styles.mainGrid}>
          {/* Action Header */}
          <div style={styles.sortHeader} className="glass-panel">
            <span style={styles.resultCount}>
              Found <strong style={{ color: 'var(--color-primary)' }}>{filteredProducts.length}</strong> modules
            </span>
            <div style={styles.sortContainer}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Sort By:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                style={styles.sortSelect}
              >
                <option value="featured">Featured Drop</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Grid or Empty view */}
          {filteredProducts.length === 0 ? (
            <div style={styles.emptyState} className="glass-panel">
              <RotateCcw size={48} style={{ color: 'var(--text-muted)', marginBottom: '15px' }} />
              <h3>No hardware models match the active query parameters.</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '5px', marginBottom: '20px' }}>
                Try adjusting your search tags or resetting filters below.
              </p>
              <button className="btn btn-primary" onClick={handleResetFilters}>
                Reset Filter Settings
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 0 80px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  banner: {
    padding: '40px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    borderRadius: 'var(--border-radius-md)',
    background: 'var(--color-primary)'
  },
  bannerTitle: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#ffffff'
  },
  bannerDesc: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.85)',
    maxWidth: '600px'
  },
  contentLayout: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '30px'
  },
  sidebar: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    alignSelf: 'start',
    height: 'auto'
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '15px'
  },
  sidebarTitle: {
    fontSize: '16px',
    fontWeight: '700',
    flex: 1,
    textAlign: 'left'
  },
  resetBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s',
    ':hover': {
      color: 'var(--color-primary)'
    }
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    textAlign: 'left'
  },
  checklist: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  priceLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priceLimit: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--color-primary)'
  },
  rangeLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: 'var(--text-muted)',
    marginTop: '-5px'
  },
  mainGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  sortHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  resultCount: {
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  sortContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  sortSelect: {
    background: '#ffffff',
    border: '1px solid var(--border-glass)',
    color: 'var(--text-primary)',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.2s'
  },
  pillsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  pillBtn: {
    padding: '10px 16px',
    borderRadius: '24px',
    border: '1px solid var(--border-glass)',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    outline: 'none'
  },
  emptyState: {
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
};

// Add layout adjust for mobile sidebar
if (typeof document !== 'undefined') {
  const catalogStyle = document.createElement('style');
  catalogStyle.innerHTML = `
    @media (max-width: 992px) {
      div[style*="contentLayout"] {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.head.appendChild(catalogStyle);
}
