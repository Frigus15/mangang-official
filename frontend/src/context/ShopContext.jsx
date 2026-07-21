import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const ShopContext = createContext();

// Seed default products in INR (₹)
const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Mangang Vision Pro VR',
    category: 'Wearables',
    price: 69999,
    costPrice: 45000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80',
    description: 'Next-generation standalone VR headset offering absolute immersion with micro-OLED 4K displays and spatial audio.',
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
    price: 19999,
    costPrice: 12000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'Professional wireless noise-canceling headphones with 40mm beryllium drivers and 60-hour battery life.',
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
    price: 14999,
    costPrice: 9000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    description: 'Titanium-body sports smartwatch with continuous ECG, SpO2 sensing, and sapphire AMOLED screen.',
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
    price: 8999,
    costPrice: 5500,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    description: 'Hot-swappable optical mechanical keyboard with pre-lubed silent switches and RGB lighting.',
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
    price: 5999,
    costPrice: 3500,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    description: 'Voice-controlled smart hub speaker delivering 360-degree high-fidelity audio and reactive LED aura.',
    options: {
      colors: ['Charcoal Black', 'Aurora White'],
      storage: ['Standard Model']
    },
    stock: 30,
    trending: true
  }
];

const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat-2', name: 'Wearables', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat-3', name: 'Computers', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat-4', name: 'Smart Home', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80' }
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
  const [products, setProducts] = useState(() => {
    const local = localStorage.getItem('mangang_products');
    return local ? JSON.parse(local) : DEFAULT_PRODUCTS;
  });

  const [categories, setCategories] = useState(() => {
    const local = localStorage.getItem('mangang_categories');
    return local ? JSON.parse(local) : DEFAULT_CATEGORIES;
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

  const [users, setUsers] = useState(() => {
    const local = localStorage.getItem('mangang_users');
    let loadedUsers = local ? JSON.parse(local) : [];
    const defaultAdmin = { username: 'Admin Manager', email: 'admin@gmail.com', password: 'admin', role: 'admin' };
    if (!loadedUsers.some(u => u.email === defaultAdmin.email)) {
      loadedUsers.push(defaultAdmin);
    }
    return loadedUsers;
  });

  // Navigation State
  const [activePage, setActivePage] = useState('home');
  const [activeDashboardTab, setActiveDashboardTab] = useState('orders');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(100000);
  const [sortOption, setSortOption] = useState('featured');

  // Discount Code State
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('mangang_is_logged_in') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const local = localStorage.getItem('mangang_user');
    if (!local) return null;
    const user = JSON.parse(local);
    if (user.email === 'admin@gmail.com' || user.email === 'admin@mangang.com') return { ...user, role: 'admin' };
    return user;
  });

  // ── Sync with MongoDB Express Backend ──────────────────────────────────
  useEffect(() => {
    const syncWithMongoDB = async () => {
      try {
        const [mProducts, mCategories, mBanners, mOrders, mUsers] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
          api.getBanners(),
          api.getOrders(),
          api.getUsers()
        ]);

        if (mProducts && Array.isArray(mProducts) && mProducts.length > 0) {
          setProducts(mProducts.map(p => ({ ...p, id: p._id || p.id })));
        }
        if (mCategories && Array.isArray(mCategories) && mCategories.length > 0) {
          setCategories(mCategories.map(c => ({ ...c, id: c._id || c.id })));
        }
        if (mBanners && Array.isArray(mBanners) && mBanners.length > 0) {
          setBannerSlides(mBanners.map(b => ({ ...b, id: b._id || b.id })));
        }
        if (mOrders && Array.isArray(mOrders) && mOrders.length > 0) {
          setOrders(mOrders);
        }
        if (mUsers && Array.isArray(mUsers) && mUsers.length > 0) {
          setUsers(mUsers);
        }
      } catch (err) {
        console.log('[MongoDB Sync] Local state active.');
      }
    };
    syncWithMongoDB();
  }, []);

  const navigateTo = (page, productId = null) => {
    setPageLoading(true);
    setTimeout(() => {
      setActivePage(page);
      setSelectedProductId(productId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setPageLoading(false);
    }, 400);
  };

  const login = async (email, password) => {
    setAuthLoading(true);
    const mongoRes = await api.login(email, password);
    const user = (mongoRes && mongoRes.user) || users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      alert('Invalid credentials.');
      setAuthLoading(false);
      return;
    }
    
    setIsLoggedIn(true);
    setCurrentUser(user);
    localStorage.setItem('mangang_is_logged_in', 'true');
    localStorage.setItem('mangang_user', JSON.stringify(user));
    setAuthLoading(false);
  };

  const signup = async (username, email, password) => {
    setAuthLoading(true);
    const mongoRes = await api.signup(username, email, password);
    const newUser = (mongoRes && mongoRes.user) || { username, name: username, email, password };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('mangang_users', JSON.stringify(updatedUsers));

    setIsLoggedIn(true);
    setCurrentUser(newUser);
    localStorage.setItem('mangang_is_logged_in', 'true');
    localStorage.setItem('mangang_user', JSON.stringify(newUser));
    setAuthLoading(false);
  };

  const logout = () => {
    setPageLoading(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      setCurrentUser(null);
      localStorage.removeItem('mangang_is_logged_in');
      localStorage.removeItem('mangang_user');
      setActivePage('home');
      setSelectedProductId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setPageLoading(false);
    }, 400);
  };

  const updateUserProfile = async (updatedFields, targetEmail = null) => {
    const emailToUpdate = targetEmail || currentUser?.email;
    if (!emailToUpdate) return;

    await api.updateUserProfile(emailToUpdate, updatedFields);

    const updatedUsers = users.map((u) => {
      if (u.email === emailToUpdate) return { ...u, ...updatedFields };
      return u;
    });

    setUsers(updatedUsers);
    localStorage.setItem('mangang_users', JSON.stringify(updatedUsers));

    if (currentUser && currentUser.email === emailToUpdate) {
      const updatedUserObj = { ...currentUser, ...updatedFields };
      setCurrentUser(updatedUserObj);
      localStorage.setItem('mangang_user', JSON.stringify(updatedUserObj));
    }
  };

  const toggleBlockUser = async (userEmail) => {
    await api.toggleBlockUser(userEmail);

    const updatedUsers = users.map((u) => {
      if (u.email === userEmail) return { ...u, isBlocked: !u.isBlocked };
      return u;
    });
    setUsers(updatedUsers);
    localStorage.setItem('mangang_users', JSON.stringify(updatedUsers));

    if (currentUser && currentUser.email === userEmail) {
      const updatedUser = { ...currentUser, isBlocked: !currentUser.isBlocked };
      setCurrentUser(updatedUser);
      localStorage.setItem('mangang_user', JSON.stringify(updatedUser));
    }
  };

  // Sync state to LocalStorage
  useEffect(() => { localStorage.setItem('mangang_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('mangang_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('mangang_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('mangang_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('mangang_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('mangang_slides', JSON.stringify(bannerSlides)); }, [bannerSlides]);

  const addCategory = async (name, image) => {
    const imgUrl = image || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80';
    const res = await api.addCategory(name, imgUrl);
    const newCat = (res && res.category) ? { ...res.category, id: res.category._id } : { id: `cat-${Date.now()}`, name, image: imgUrl };
    setCategories((prev) => [...prev, newCat]);
  };

  const deleteCategory = async (catId) => {
    await api.deleteCategory(catId);
    setCategories((prev) => prev.filter((c) => c.id !== catId && c._id !== catId && c.name !== catId));
  };

  const addNewProduct = async (productData) => {
    const sp = Number(productData.price);
    const cp = Number(productData.costPrice || (sp * 0.7));
    const formattedProduct = {
      title: productData.title,
      category: productData.category || 'Audio',
      price: sp,
      costPrice: cp,
      stock: Number(productData.stock || 10),
      rating: 5.0,
      image: productData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      description: productData.description || '',
      options: {
        colors: productData.colors ? productData.colors.split(',').map((c) => c.trim()) : ['Default'],
        storage: productData.storage ? productData.storage.split(',').map((s) => s.trim()) : ['Standard']
      }
    };

    const res = await api.addProduct(formattedProduct);
    const newProductObj = (res && res.product) ? { ...res.product, id: res.product._id } : { id: `prod-${Date.now()}`, ...formattedProduct };
    setProducts((prev) => [newProductObj, ...prev]);
  };

  const updateProductStock = async (productId, newStock) => {
    await api.updateStock(productId, newStock);
    setProducts((prev) =>
      prev.map((p) => (p.id === productId || p._id === productId ? { ...p, stock: Math.max(0, Number(newStock)) } : p))
    );
  };

  const deleteProduct = async (productId) => {
    await api.deleteProduct(productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId && p._id !== productId));
  };

  const addBannerSlide = async (slideData) => {
    const res = await api.addBanner(slideData);
    const newSlide = (res && res.banner) ? { ...res.banner, id: res.banner._id } : { id: `slide-${Date.now()}`, ...slideData };
    setBannerSlides((prev) => [...prev, newSlide]);
  };

  const removeBannerSlide = async (slideId) => {
    await api.deleteBanner(slideId);
    setBannerSlides((prev) => prev.filter((s) => s.id !== slideId && s._id !== slideId));
  };

  const addToCart = (product, quantity = 1, options = {}) => {
    if (currentUser?.isBlocked) {
      alert('Your account has been blocked by administrator. You cannot make any purchases.');
      return;
    }
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.options?.color === options.color && item.options?.storage === options.storage
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
    setCart((prevCart) => prevCart.map((item) => (item.cartId === cartId ? { ...item, quantity: qty } : item)));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(0);
    setDiscountCode('');
    setDiscountMessage('');
  };

  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId) ? prevWishlist.filter((id) => id !== productId) : [...prevWishlist, productId]
    );
  };

  const applyPromoCode = (code) => {
    const formattedCode = code.trim().toUpperCase();
    if (formattedCode === 'MANGANG20') {
      setAppliedDiscount(20);
      setDiscountCode('MANGANG20');
      setDiscountMessage('Promo code MANGANG20 applied: 20% discount!');
      return true;
    } else if (formattedCode === 'FREESHIP') {
      setAppliedDiscount(10);
      setDiscountCode('FREESHIP');
      setDiscountMessage('Promo code FREESHIP applied: 10% discount!');
      return true;
    } else {
      setDiscountMessage('Invalid promo code.');
      return false;
    }
  };

  const placeOrder = async (shippingDetails, paymentDetails) => {
    if (currentUser?.isBlocked) {
      alert('Your account has been blocked by administrator. You cannot place orders.');
      return null;
    }
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = (subtotal * appliedDiscount) / 100;
    const shipping = subtotal > 2000 ? 0 : 150;
    const tax = subtotal * 0.18;
    const total = subtotal - discount + shipping + tax;

    const orderId = `MG-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      orderId,
      userEmail: currentUser?.email || shippingDetails.email,
      items: [...cart],
      shippingDetails,
      paymentDetails: {
        cardHolder: paymentDetails?.cardHolder || 'UPI Customer',
        cardNumber: paymentDetails?.cardNumber ? `**** **** **** ${paymentDetails.cardNumber.replace(/\s/g, '').slice(-4)}` : 'QR Payment'
      },
      pricing: { subtotal, discount, shipping, tax, total },
      status: 'Processing',
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      })
    };

    await api.placeOrder(newOrder);

    // Update product stocks in DB & state
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const cartItemsForProduct = cart.filter((item) => item.product.id === p.id);
        const totalPurchased = cartItemsForProduct.reduce((sum, item) => sum + item.quantity, 0);
        if (totalPurchased > 0) {
          const newStock = Math.max(0, p.stock - totalPurchased);
          api.updateStock(p.id, newStock);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
    return orderId;
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const shippingAmount = subtotal === 0 ? 0 : (subtotal > 2000 ? 0 : 150);
  const taxAmount = subtotal * 0.18;
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
        pageLoading,
        authLoading,
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
        updateProductStock,
        deleteProduct,
        categories,
        addCategory,
        deleteCategory,
        users,
        updateUserProfile,
        toggleBlockUser
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
