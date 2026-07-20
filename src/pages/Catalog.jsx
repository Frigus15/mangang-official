import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, RotateCcw, ChevronDown, Check, X } from 'lucide-react';

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
  } = useContext(ShopContext);

  const [showFilters, setShowFilters] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const categoriesList = ['All', 'Audio', 'Wearables', 'Computers', 'Smart Home'];

  const sortLabels = {
    'featured': 'Featured Drop',
    'price-low': 'Price: Low to High',
    'price-high': 'Price: High to Low',
    'rating': 'Top Rated',
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange(1000);
    setSortOption('featured');
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div style={styles.container} className="animate-fade-in">
      {/* Top Banner */}
      <div style={styles.banner} className="glass-panel">
        <h1 style={styles.bannerTitle}>Explore Products</h1>
        <p style={styles.bannerDesc}>Browse our full collection of high-performance wearables, computing gear, and audio hardware.</p>
      </div>

      {/* Control Bar: Filter Toggle + Items Count + Animated Sort Dropdown */}
      <div style={styles.controlBar} className="glass-panel">
        <div style={styles.controlLeft}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              ...styles.filterToggleBtn,
              background: showFilters ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
              color: showFilters ? '#ffffff' : 'var(--text-primary)',
              borderColor: showFilters ? 'var(--color-primary)' : 'var(--border-glass)'
            }}
          >
            <SlidersHorizontal size={16} />
            <span>{showFilters ? 'Hide Filters' : 'Filter Products'}</span>
          </button>

          <span style={styles.resultCount}>
            Showing <strong style={{ color: 'var(--color-primary)' }}>{filteredProducts.length}</strong> items
          </span>
        </div>

        {/* Custom Animated Sort Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            style={styles.sortDropdownTrigger}
          >
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Sort By:</span>
            <strong style={{ fontSize: '13px', color: 'var(--color-primary)' }}>{sortLabels[sortOption]}</strong>
            <ChevronDown
              size={15}
              style={{
                transition: 'transform 0.3s ease',
                transform: sortDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                color: 'var(--text-secondary)'
              }}
            />
          </button>

          {sortDropdownOpen && (
            <div
              style={styles.sortMenu}
              className="glass-panel animate-dropdown"
            >
              {Object.entries(sortLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSortOption(key);
                    setSortDropdownOpen(false);
                  }}
                  style={{
                    ...styles.sortOptionItem,
                    background: sortOption === key ? 'rgba(99,102,241,0.12)' : 'transparent',
                    color: sortOption === key ? 'var(--color-primary)' : 'var(--text-primary)',
                    fontWeight: sortOption === key ? '700' : '500'
                  }}
                >
                  <span>{label}</span>
                  {sortOption === key && <Check size={14} color="var(--color-primary)" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Collapsible Filter Panel (hidden by default) */}
      {showFilters && (
        <div style={styles.filterDrawer} className="glass-panel animate-fade-in">
          <div style={styles.filterDrawerHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={16} color="var(--color-primary)" />
              <h3 style={styles.filterDrawerTitle}>Filter Options</h3>
            </div>
            <button style={styles.resetBtn} onClick={handleResetFilters} title="Reset All Filters">
              <RotateCcw size={14} style={{ marginRight: '4px' }} />
              Reset Filters
            </button>
          </div>

          <div style={styles.filterGrid}>
            {/* Search Input */}
            <div style={styles.filterGroup}>
              <span className="form-label">Search Keyword</span>
              <div className="search-wrapper" style={{ maxWidth: '100%' }}>
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div style={styles.filterGroup}>
              <span className="form-label">Category Segment</span>
              <div style={styles.pillsRow}>
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      ...styles.pillBtn,
                      background: selectedCategory === cat ? 'var(--color-primary)' : 'rgba(255,255,255,0.04)',
                      color: selectedCategory === cat ? '#ffffff' : 'var(--text-primary)',
                      borderColor: selectedCategory === cat ? 'var(--color-primary)' : 'var(--border-glass)'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div style={styles.filterGroup}>
              <div style={styles.priceLabelRow}>
                <span className="form-label">Max Price Limit</span>
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
          </div>
        </div>
      )}

      {/* PRODUCTS DIRECTORY GRID */}
      <main style={styles.mainGrid}>
        {filteredProducts.length === 0 ? (
          <div style={styles.emptyState} className="glass-panel">
            <RotateCcw size={44} style={{ color: 'var(--text-muted)', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '18px', color: 'var(--text-primary)' }}>No products match your active filters.</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', marginBottom: '20px' }}>
              Try adjusting your category selection or resetting your filter parameters.
            </p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              Reset Filters
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
  );
}

const styles = {
  container: {
    padding: '30px 0 80px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  banner: {
    padding: '32px 40px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    borderRadius: 'var(--border-radius-md)',
    background: 'var(--color-primary)'
  },
  bannerTitle: {
    fontSize: '30px',
    fontWeight: '800',
    color: '#ffffff',
    fontFamily: 'var(--font-heading)'
  },
  bannerDesc: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.88)',
    maxWidth: '600px'
  },
  controlBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    gap: '16px',
    flexWrap: 'wrap',
  },
  controlLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  filterToggleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    borderRadius: '8px',
    border: '1px solid',
    fontFamily: 'var(--font-heading)',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  resultCount: {
    fontSize: '13.5px',
    color: 'var(--text-secondary)',
  },
  sortDropdownTrigger: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border-glass)',
    background: 'rgba(255,255,255,0.03)',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease',
  },
  sortMenu: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    width: '210px',
    padding: '6px',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    borderRadius: '10px',
  },
  sortOptionItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    textAlign: 'left',
    transition: 'all 0.15s ease',
  },
  filterDrawer: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  filterDrawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid var(--border-glass)',
    paddingBottom: '12px',
  },
  filterDrawerTitle: {
    fontSize: '16px',
    fontWeight: '800',
    fontFamily: 'var(--font-heading)',
    color: 'var(--text-primary)',
    margin: 0,
  },
  resetBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s',
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
    alignItems: 'start',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    textAlign: 'left',
  },
  pillsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  pillBtn: {
    padding: '8px 14px',
    borderRadius: '20px',
    border: '1px solid',
    fontSize: '12.5px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  priceLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLimit: {
    fontSize: '13.5px',
    fontWeight: '700',
    color: 'var(--color-primary)',
  },
  rangeLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: 'var(--text-muted)',
    marginTop: '-4px',
  },
  mainGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  emptyState: {
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
};
