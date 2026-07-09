import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

// Seed default products
const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Mangang Vision Pro VR',
    category: 'Wearables',
    price: 899,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80',
    description: 'Next-generation standalone VR headset offering absolute immersion. Featuring micro-OLED 4K display panels per eye, custom spatial audio, and high-precision hand/eye tracking cameras.',
    features: [
      'Dual Micro-OLED 4K Displays',
      '120Hz Hyper-Smooth Refresh Rate',
      'True Spatial Audio Engineering',
      'Zero-Latency Eye and Hand Tracking'
    ],
    specifications: {
      'Resolution': '3840 x 2160 per eye',
      'Battery Life': 'Up to 3 hours active',
      'Weight': '450g ultra-lightweight',
      'Storage Capacity': '256GB / 512GB Options'
    },
    options: {
      colors: ['Space Gray', 'Neon Cyan', 'Cyber Purple'],
      storage: ['256GB', '512GB']
    },
    stock: 12,
    trending: true
  },
  {
    id: 'prod-2',
    title: 'Mangang Wave-9 ANC',
    category: 'Audio',
    price: 299,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'Professional wireless noise-canceling headphones featuring custom 40mm beryllium drivers, high-resolution wireless audio codec support, and ultra-plush premium memory foam earcups.',
    features: [
      '40mm Precision Beryllium Drivers',
      'Hybrid Active Noise Cancelling (45dB)',
      '60-Hour Intelligent Battery Life',
      'LDAC & aptX Adaptive Bluetooth Codec'
    ],
    specifications: {
      'Driver Unit': '40mm Beryllium Dome',
      'Bluetooth Version': 'v5.3 Low Energy',
      'Playback Time': 'Up to 60 Hours (ANC Off)',
      'Frequency Response': '4Hz - 45kHz'
    },
    options: {
      colors: ['Carbon Black', 'Platinum Silver', 'Electric Indigo'],
      storage: ['Standard Edition']
    },
    stock: 25,
    trending: true
  },
  {
    id: 'prod-3',
    title: 'Mangang Chronos Smartwatch',
    category: 'Wearables',
    price: 249,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    description: 'Advanced titanium-body sports watch built for extreme durability. Tracks multi-system GPS, biosensing vitals, electrocardiograms, and blood oxygen levels in real time.',
    features: [
      'Grade 5 Titanium Armor Case',
      'Continuous ECG & SpO2 Sensing',
      'Always-on Sapphire AMOLED Screen',
      '50m (5 ATM) Water Resistance'
    ],
    specifications: {
      'Display Screen': '1.43" AMOLED (466x466 px)',
      'Case Diameter': '46mm Rugged Alloy',
      'Sensor Suite': 'BioTracker 4.0 PPG Sensor',
      'Standby Battery': 'Up to 10 days standard'
    },
    options: {
      colors: ['Titanium Steel', 'Volt Orange', 'Obsidian Black'],
      storage: ['Standard Size']
    },
    stock: 18,
    trending: false
  },
  {
    id: 'prod-4',
    title: 'Mangang Key-V1 Mechanical',
    category: 'Computers',
    price: 179,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    description: 'Hot-swappable optical mechanical keyboard with premium double-shot PBT keycaps, pre-lubed linear silent cyan switches, and custom gasket mounting layers.',
    features: [
      'Hot-Swappable Linear Switches',
      'Acoustic Dampening Gasket Design',
      'Per-Key Programmable Neon RGB',
      'Premium Coiled Type-C Cable'
    ],
    specifications: {
      'Layout Factor': '75% Compact ANSI',
      'Switch Brand': 'Mangang Custom Silent Linear',
      'Connectivity': 'Tri-Mode (Wired/2.4G/BT5)',
      'Keycap Profile': 'Cherry Profile PBT'
    },
    options: {
      colors: ['Classic Dark', 'Retro Cyan', 'Synth Violet'],
      storage: ['Linear Switches', 'Tactile Switches']
    },
    stock: 15,
    trending: false
  },
  {
    id: 'prod-5',
    title: 'Mangang Aura AI Speaker',
    category: 'Smart Home',
    price: 129,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    description: 'Voice-controlled smart hub speaker delivering 360-degree high-fidelity room-filling audio. Dynamic smart lighting ring coordinates with music frequencies and ambient status notifications.',
    features: [
      '360-Degree Spatial Soundstage',
      'Local Edge AI Assistant Built-in',
      'Reactive Rainbow LED Light Aura',
      'Universal Zigbee Smart Hub Protocol'
    ],
    specifications: {
      'Max Power Output': '40W RMS',
      'Voice Assistant': 'Mangang Edge AI offline',
      'Wireless Specs': 'Wi-Fi 6 Dual-Band & BT 5.2',
      'Device Diameter': '110mm x 180mm Cylinder'
    },
    options: {
      colors: ['Charcoal Black', 'Aurora White'],
      storage: ['Standard Model']
    },
    stock: 30,
    trending: true
  }
];

const DEFAULT_SLIDES = [
  {
    id: 'slide-1',
    title: 'MANGANG VISION PRO',
    subtitle: 'Immerse yourself in spatial reality with micro-OLED 4K resolution and zero-latency eye tracking.',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80',
    productId: 'prod-1'
  },
  {
    id: 'slide-2',
    title: 'MANGANG WAVE-9 ANC',
    subtitle: 'Professional sound quality with hybrid Active Noise Cancelling and 60-hour battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    productId: 'prod-2'
  }
];

export const ShopContextProvider = ({ children }) => {
  // Load state from localStorage if it exists, otherwise use defaults
  const [products, setProducts] = useState(() => {
    const local = localStorage.getItem('mangang_products');
    return local ? JSON.parse(local) : DEFAULT_PRODUCTS;
  });

  const [bannerSlides, setBannerSlides] = useState(() => {
    const local = localStorage.getItem('mangang_slides');
    return local ? JSON.parse(local) : DEFAULT_SLIDES;
  });

  const [cart, setCart] = useState(() => {
    const local = localStorage.getItem('mangang_cart');
    return local ? JSON.parse(local) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const local = localStorage.getItem('mangang_wishlist');
    return local ? JSON.parse(local) : [];
  });

  const [orders, setOrders] = useState(() => {
    const local = localStorage.getItem('mangang_orders');
    return local ? JSON.parse(local) : [];
  });

  // Navigation State
  const [activePage, setActivePage] = useState('home');
  const [activeDashboardTab, setActiveDashboardTab] = useState('orders');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const navigateTo = (page, productId = null) => {
    setActivePage(page);
    setSelectedProductId(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(1000); // Max Price Limit
  const [sortOption, setSortOption] = useState('featured');

  // Discount Code State
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // percentage (e.g. 20 for 20%)
  const [discountMessage, setDiscountMessage] = useState('');

  // Authentication State
  const [users, setUsers] = useState(() => {
    const local = localStorage.getItem('mangang_users');
    let loadedUsers = local ? JSON.parse(local) : [];
    
    // Seed default admin accounts
    const defaultAdmins = [
      { username: 'CS Manager', email: 'admin@mangang.com', password: 'password', role: 'admin' },
      { username: 'CS Agent', email: 'mangangofficialstore.cs@gmail.com', password: 'admin@123', role: 'admin' }
    ];

    defaultAdmins.forEach(admin => {
      if (!loadedUsers.some(u => u.email === admin.email)) {
        loadedUsers.push(admin);
      }
    });

    // Enforce admin roles
    loadedUsers = loadedUsers.map(u => {
      if (u.email === 'admin@mangang.com' || u.email === 'mangangofficialstore.cs@gmail.com') {
        return { ...u, role: 'admin' };
      }
      return u;
    });

    return loadedUsers;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('mangang_is_logged_in') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const local = localStorage.getItem('mangang_user');
    return local ? JSON.parse(local) : null;
  });

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      alert('Invalid cryptographic credentials.');
      return;
    }
    setIsLoggedIn(true);
    setCurrentUser(user);
    localStorage.setItem('mangang_is_logged_in', 'true');
    localStorage.setItem('mangang_user', JSON.stringify(user));
  };

  const signup = (username, email, password) => {
    const exists = users.find(u => u.email === email);
    if (exists) {
      alert('Email already registered.');
      return;
    }
    const newUser = { username, email, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('mangang_users', JSON.stringify(updatedUsers));

    setIsLoggedIn(true);
    setCurrentUser(newUser);
    localStorage.setItem('mangang_is_logged_in', 'true');
    localStorage.setItem('mangang_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('mangang_is_logged_in');
    localStorage.removeItem('mangang_user');
    navigateTo('home');
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mangang_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mangang_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('mangang_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mangang_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mangang_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mangang_slides', JSON.stringify(bannerSlides));
  }, [bannerSlides]);

  // Cart operations
  const addToCart = (product, quantity = 1, options = {}) => {
    setCart((prevCart) => {
      // Find if item with same ID and specs already exists
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.options.color === options.color &&
          item.options.storage === options.storage
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        const cartId = `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        return [...prevCart, { cartId, product, quantity, options }];
      }
    });
  };

  const removeFromCart = (cartId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
  };

  const updateCartQty = (cartId, qty) => {
    if (qty <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.cartId === cartId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(0);
    setDiscountCode('');
    setDiscountMessage('');
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  // Promotion/Discount Checker
  const applyPromoCode = (code) => {
    const formattedCode = code.trim().toUpperCase();
    if (formattedCode === 'MANGANG20') {
      setAppliedDiscount(20);
      setDiscountCode('MANGANG20');
      setDiscountMessage('Promo code MANGANG20 applied: 20% discount!');
      return true;
    } else if (formattedCode === 'FREESHIP') {
      setAppliedDiscount(10); // Assume 10% or custom rules, let's make it 10%
      setDiscountCode('FREESHIP');
      setDiscountMessage('Promo code FREESHIP applied: 10% discount!');
      return true;
    } else {
      setDiscountMessage('Invalid promo code.');
      return false;
    }
  };

  // Checkout order submission
  const placeOrder = (shippingDetails, paymentDetails) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = (subtotal * appliedDiscount) / 100;
    const shipping = subtotal > 500 ? 0 : 25;
    const tax = subtotal * 0.08;
    const total = subtotal - discount + shipping + tax;

    const orderId = `MG-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      orderId,
      items: [...cart],
      shippingDetails,
      paymentDetails: {
        cardHolder: paymentDetails.cardHolder,
        cardNumber: `**** **** **** ${paymentDetails.cardNumber.replace(/\s/g, '').slice(-4)}`
      },
      pricing: {
        subtotal,
        discount,
        shipping,
        tax,
        total
      },
      status: 'Processing',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Update stock levels
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const cartItemsForProduct = cart.filter((item) => item.product.id === p.id);
        const totalPurchased = cartItemsForProduct.reduce((sum, item) => sum + item.quantity, 0);
        if (totalPurchased > 0) {
          return { ...p, stock: Math.max(0, p.stock - totalPurchased) };
        }
        return p;
      })
    );

    // Update current user info with checkout details
    if (isLoggedIn && currentUser) {
      const updatedUser = {
        ...currentUser,
        name: shippingDetails.name,
        address: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.zip}`,
        phone: shippingDetails.phone || '',
        paymentMode: `Credit Card (**** **** **** ${paymentDetails.cardNumber.replace(/\s/g, '').slice(-4)})`
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('mangang_user', JSON.stringify(updatedUser));

      // Also update in users list state
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.email === currentUser.email ? updatedUser : u))
      );
    }

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
    return orderId;
  };

  // Admin add products
  const addNewProduct = (productData) => {
    const id = `prod-${Date.now()}`;
    const formattedProduct = {
      id,
      ...productData,
      price: Number(productData.price),
      stock: Number(productData.stock),
      rating: Number(productData.rating || 5.0),
      features: Array.isArray(productData.features)
        ? productData.features
        : productData.features.split('\n').filter((f) => f.trim().length > 0),
      specifications: typeof productData.specifications === 'object'
        ? productData.specifications
        : {},
      options: {
        colors: productData.colors ? productData.colors.split(',').map((c) => c.trim()) : ['Default'],
        storage: productData.storage ? productData.storage.split(',').map((s) => s.trim()) : ['Standard']
      }
    };

    setProducts((prevProducts) => [...prevProducts, formattedProduct]);
  };

  // Admin adjust stock level
  const updateProductStock = (productId, newStock) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, Number(newStock)) } : p))
    );
  };

  // Admin banner slides management
  const addBannerSlide = (slideData) => {
    const id = `slide-${Date.now()}`;
    const newSlide = {
      id,
      title: slideData.title,
      subtitle: slideData.subtitle,
      image: slideData.image || 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80',
      productId: slideData.productId || 'prod-1'
    };
    setBannerSlides((prev) => [...prev, newSlide]);
  };

  const removeBannerSlide = (slideId) => {
    setBannerSlides((prev) => prev.filter((s) => s.id !== slideId));
  };

  // Calculate pricing
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const shippingAmount = subtotal === 0 ? 0 : (subtotal > 500 ? 0 : 25);
  const taxAmount = subtotal * 0.08;
  const orderTotal = subtotal - discountAmount + shippingAmount + taxAmount;

  return (
    <ShopContext.Provider
      value={{
        activePage,
        activeDashboardTab,
        setActiveDashboardTab,
        isLoggedIn,
        currentUser,
        login,
        signup,
        logout,
        selectedProductId,
        navigateTo,
        products,
        bannerSlides,
        addBannerSlide,
        removeBannerSlide,
        cart,
        wishlist,
        orders,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        sortOption,
        setSortOption,
        appliedDiscount,
        discountCode,
        discountMessage,
        subtotal,
        discountAmount,
        shippingAmount,
        taxAmount,
        orderTotal,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        applyPromoCode,
        placeOrder,
        addNewProduct,
        updateProductStock
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
