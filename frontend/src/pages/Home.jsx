import React, { useContext, useState, useEffect, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Zap, Target, Award, Sparkles } from 'lucide-react';



export default function Home() {
  const { products, navigateTo, setSelectedCategory, bannerSlides, categories } = useContext(ShopContext);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [disableTransition, setDisableTransition] = useState(false);

  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const displayCategories = (categories || []).map((cat, idx) => {
    const name = typeof cat === 'object' ? cat.name : cat;
    const image = typeof cat === 'object' ? cat.image : 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=300&q=80';
    return { id: `cat-${idx}`, name, image };
  });

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    navigateTo('catalog');
  };

  // Auto-scroll loop script that enables manual drag/scroll in both directions
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animationFrameId;
    const speed = 0.8; // scroll speed (pixels per frame)

    const runScroll = () => {
      if (!isHovered && !isDragging) {
        el.scrollLeft += speed;

        // Infinite loop wrap-around logic
        const groupWidth = el.scrollWidth / 2;
        if (groupWidth > 0 && el.scrollLeft >= groupWidth) {
          el.scrollLeft -= groupWidth;
        }
      }
      animationFrameId = requestAnimationFrame(runScroll);
    };

    animationFrameId = requestAnimationFrame(runScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging]);

  // Handle scroll boundary wrap-around during user manual scroll / swipe / drag
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const groupWidth = el.scrollWidth / 2;
      if (groupWidth <= 0) return;

      if (el.scrollLeft >= groupWidth) {
        el.scrollLeft -= groupWidth;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += groupWidth;
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop mouse drag to scroll support
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let isMouseDown = false;
    let startX;
    let scrollLeftVal;

    const handleMouseDown = (e) => {
      isMouseDown = true;
      setIsDragging(true);
      startX = e.pageX - el.offsetLeft;
      scrollLeftVal = el.scrollLeft;
    };

    const handleMouseLeaveOrUp = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    const handleMouseMove = (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5; // drag sensitivity multiplier
      el.scrollLeft = scrollLeftVal - walk;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeaveOrUp);
    el.addEventListener('mouseup', handleMouseLeaveOrUp);
    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseleave', handleMouseLeaveOrUp);
      el.removeEventListener('mouseup', handleMouseLeaveOrUp);
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Autoplay timer for slide changes
  useEffect(() => {
    if (!bannerSlides || bannerSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlideIdx((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerSlides]);

  // Seamless circular transition handler
  useEffect(() => {
    if (!bannerSlides || bannerSlides.length <= 1) return;
    if (activeSlideIdx === bannerSlides.length) {
      // Reached the cloned first slide, wait for the glide transition to finish (1600ms)
      const timer = setTimeout(() => {
        setDisableTransition(true);
        setActiveSlideIdx(0);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [activeSlideIdx, bannerSlides]);

  // Re-enable transition after resetting index back to 0
  useEffect(() => {
    if (disableTransition) {
      const timer = setTimeout(() => {
        setDisableTransition(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [disableTransition]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 7200));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const trendingProducts = products.filter((p) => p.trending).slice(0, 3);

  // Render slides with a clone of the first slide appended to the end for seamless looping
  const displaySlides = bannerSlides && bannerSlides.length > 1
    ? [...bannerSlides, bannerSlides[0]]
    : (bannerSlides || []);

  return (
    <div style={styles.container} className="animate-fade-in">
      {/* SLIDING BANNER HERO */}
      {bannerSlides && bannerSlides.length > 0 && (
        <section className="hero-banner-container">
          {/* Sliding Track */}
          <div
            className="hero-banner-track"
            style={{
              display: 'flex',
              gap: '20px',
              transform: `translateX(calc(-${activeSlideIdx} * (100% + 20px)))`,
              transition: disableTransition ? 'none' : 'transform 1.6s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            {displaySlides.map((slide, idx) => (
              <div
                key={`${slide.id}-${idx}`}
                className="hero-slide"
                onClick={() => navigateTo('product-details', slide.productId)}
                style={{
                  cursor: 'pointer',
                  flex: '0 0 100%',
                  width: '100%',
                  height: '100%',
                  padding: 0,
                  background: 'none',
                  display: 'block'
                }}
              >
                <img 
                  src={slide.image} 
                  alt="Spotlight Banner" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    display: 'block'
                  }} 
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* HERO SKINS SLOT SELECTOR */}
      <section style={styles.section}>
        <h2 className="section-title">Browse by Category</h2>
        <div 
          className="marquee-container"
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          <div className="marquee-track-scroll">
            <div className="marquee-group">
              {displayCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="slot-card"
                  onClick={() => handleCategoryClick(cat.name)}
                >
                  <div className="slot-image-container">
                    <img src={cat.image} alt={cat.name} className="slot-image" />
                    <div className="slot-badge">
                      <span>CATEGORY</span>
                    </div>
                  </div>
                  <div className="slot-info">
                    <h4 className="slot-hero-name">{cat.name}</h4>
                    <p className="slot-skin-name">Explore Products</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="marquee-group">
              {displayCategories.map((cat) => (
                <div
                  key={`${cat.id}-clone`}
                  className="slot-card"
                  onClick={() => handleCategoryClick(cat.name)}
                >
                  <div className="slot-image-container">
                    <img src={cat.image} alt={cat.name} className="slot-image" />
                    <div className="slot-badge">
                      <span>CATEGORY</span>
                    </div>
                  </div>
                  <div className="slot-info">
                    <h4 className="slot-hero-name">{cat.name}</h4>
                    <p className="slot-skin-name">Explore Products</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* TRENDING ITEMS */}
      <section style={styles.section}>
        <div style={styles.trendingHeader}>
          <h2 className="section-title">Trending Tech</h2>
          <button
            onClick={() => {
              setSelectedCategory('All');
              navigateTo('catalog');
            }}
            className="btn btn-text"
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            All Products <ArrowRight size={14} />
          </button>
        </div>
        <div className="product-grid" style={{ marginTop: '20px' }}>
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>


    </div>
  );
}

const styles = {
  container: {
    padding: '15px 0 40px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  /* Removed old slider hero banner styles in favor of responsive CSS classes in index.css */

  indicators: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 20
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.3s ease'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    textAlign: 'left'
  },
  trendingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  promoSection: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '30px 40px',
    gap: '20px',
    flexWrap: 'wrap',
    border: 'none',
    borderRadius: 'var(--border-radius-md)',
    background: 'var(--color-primary)'
  },
  promoContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  timerWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '15px'
  },
  timerLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--text-muted)',
    letterSpacing: '0.1em'
  },
  timer: {
    fontFamily: 'var(--font-heading)',
    fontSize: '24px',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '0.05em',
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    padding: '4px 12px',
    borderRadius: '6px',
    boxShadow: 'none'
  },
  featuresSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '40px',
    textAlign: 'center',
    paddingTop: '20px'
  },
  featureItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    padding: '0 10px'
  },
  featureIconContainer: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'rgba(11, 93, 52, 0.05)',
    border: '1px solid var(--border-glass)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-sm)'
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--text-primary)'
  },
  featureDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    maxWidth: '280px'
  }
};

// Add category list glow stylesheet entry
if (typeof document !== 'undefined') {
  const homeCategoryStyle = document.createElement('style');
  homeCategoryStyle.innerHTML = `
    .animate-fade-in div[style*="sectionTitle"]:before {
      content: "";
      position: absolute;
      left: 0;
      top: 15%;
      bottom: 15%;
      width: 4px;
      background: var(--color-primary);
      border-radius: 2px;
      box-shadow: 0 0 10px var(--color-primary);
    }
  `;
  document.head.appendChild(homeCategoryStyle);
}
