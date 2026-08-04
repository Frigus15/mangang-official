import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const ShopContext = createContext();

const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Mangang Vision Pro VR',
    category: 'VR & AR',
    price: 89999,
    costPrice: 65000,
    stock: 12,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80',
    description: 'Next-generation spatial computing headset with dual 4K micro-OLED displays and precision eye & hand tracking.',
    options: {
      colors: ['Space Gray', 'Starlight White'],
      storage: ['256GB', '512GB', '1TB']
    },
    trending: true
  },
  {
    id: 'prod-2',
    title: 'AirPods Pro 2nd Gen (USB-C)',
    category: 'Audio',
    price: 19990,
    costPrice: 14000,
    stock: 25,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80',
    description: 'Active Noise Cancellation with Adaptive Audio, Transparency mode, and Personalized Spatial Audio.',
    options: {
      colors: ['Glossy White'],
      storage: ['MagSafe USB-C Case']
    },
    trending: true
  },
  {
    id: 'prod-3',
    title: 'Mangang CyberWatch Ultra',
    category: 'Wearables',
    price: 34990,
    costPrice: 24000,
    stock: 18,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
    description: 'Titanium chassis smart watch with dual-frequency GPS, 100m water resistance, and 60-hour battery life.',
    options: {
      colors: ['Titanium Gray', 'Oceanic Orange', 'Midnight Black'],
      storage: ['49mm Sapphire Crystal']
    },
    trending: true
  },
  {
    id: 'prod-4',
    title: 'Mangang Gasket Mechanical Keyboard',
    category: 'Computing',
    price: 12490,
    costPrice: 8500,
    stock: 15,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    description: 'Custom gasket mount hot-swappable wireless keyboard with PBT keycaps and South-facing RGB LEDs.',
    options: {
      colors: ['Retro Beige', 'Cyber Neon', 'Matte Black'],
      storage: ['Linear Yellow Switches', 'Tactile Brown Switches']
    },
    trending: true
  },
  {
    id: 'prod-5',
    title: 'Mangang Pulse Bluetooth Speaker',
    category: 'Smart Home',
    price: 8990,
    costPrice: 5800,
    stock: 30,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
    description: '360-degree immersive sound with ambient reactive LED lighting and IP67 dust and water resistance.',
    options: {
      colors: ['Matte Black', 'Deep Indigo', 'Forest Green'],
      storage: ['Standard Edition']
    },
    trending: false
  }
];

const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat-2', name: 'Wearables', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat-3', name: 'VR & AR', image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat-4', name: 'Computing', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80' },
  { id: 'cat-5', name: 'Smart Home', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80' }
];

const DEFAULT_BANNER_SLIDES = [
  {
    id: 'slide-1',
    title: 'MANGANG VISION PRO',
    subtitle: 'Next-Generation Spatial Computing',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1400&q=80',
    productId: 'prod-1'
  },
  {
    id: 'slide-2',
    title: 'AUDIOPHILE SOUNDSCAPE',
    subtitle: 'Active Noise Cancellation & Spatial Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80',
    productId: 'prod-2'
  }
];

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const local = localStorage.getItem('mangang_products');
    if (!local) return DEFAULT_PRODUCTS;
    try {
      const parsed = JSON.parse(local);
      return (Array.isArray(parsed) && parsed.length > 0) ? parsed : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState(() => {
    const local = localStorage.getItem('mangang_categories');
    if (!local) return DEFAULT_CATEGORIES;
    try {
      const parsed = JSON.parse(local);
      return (Array.isArray(parsed) && parsed.length > 0) ? parsed : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  const [bannerSlides, setBannerSlides] = useState(() => {
    const local = localStorage.getItem('mangang_slides');
    if (!local) return DEFAULT_BANNER_SLIDES;
    try {
      const parsed = JSON.parse(local);
      return (Array.isArray(parsed) && parsed.length > 0) ? parsed : DEFAULT_BANNER_SLIDES;
    } catch {
      return DEFAULT_BANNER_SLIDES;
    }
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

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('mangang_is_logged_in') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const local = localStorage.getItem('mangang_user');
    if (!local) return null;
    return JSON.parse(local);
  });

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(100000);
  const [sortOption, setSortOption] = useState('featured');

  // Discount Code State
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');

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
        if (mOrders && Array.isArray(mOrders)) {
          setOrders(mOrders);
        }
        if (mUsers && Array.isArray(mUsers)) {
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
    try {
      const mongoRes = await api.login(email, password);
      if (!mongoRes || !mongoRes.success || !mongoRes.user) {
        setAuthLoading(false);
        return { success: false, error: mongoRes?.error || 'Invalid email or password.' };
      }
      if (mongoRes.user.isBlocked) {
        setAuthLoading(false);
        return { success: false, error: 'Your account has been blocked by administrator.' };
      }
      setIsLoggedIn(true);
      setCurrentUser(mongoRes.user);
      localStorage.setItem('mangang_is_logged_in', 'true');
      localStorage.setItem('mangang_user', JSON.stringify(mongoRes.user));
      setAuthLoading(false);
      return { success: true, user: mongoRes.user };
    } catch (err) {
      setAuthLoading(false);
      return { success: false, error: 'Connection error communicating with authentication server.' };
    }
  };

  const signup = async (username, email, password, phone) => {
    setAuthLoading(true);
    try {
      const mongoRes = await api.signup(username, email, password, phone);
      if (!mongoRes || !mongoRes.success || !mongoRes.user) {
        setAuthLoading(false);
        return { success: false, error: mongoRes?.error || 'Failed to create user account.' };
      }
      setIsLoggedIn(true);
      setCurrentUser(mongoRes.user);
      localStorage.setItem('mangang_is_logged_in', 'true');
      localStorage.setItem('mangang_user', JSON.stringify(mongoRes.user));
      setAuthLoading(false);
      return { success: true, user: mongoRes.user };
    } catch (err) {
      setAuthLoading(false);
      return { success: false, error: 'Connection error communicating with registration server.' };
    }
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
    }, 300);
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
    const cleanName = (name || '').trim();
    if (!cleanName) return;
    const imgUrl = image || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80';
    const res = await api.addCategory(cleanName, imgUrl);
    const newCat = (res && res.category)
      ? { ...res.category, id: res.category._id || res.category.id }
      : { id: `cat-${Date.now()}`, name: cleanName, image: imgUrl };

    setCategories((prev) => {
      const existsIdx = prev.findIndex(c => (typeof c === 'object' ? c.name : c).toLowerCase() === cleanName.toLowerCase());
      if (existsIdx > -1) {
        const updated = [...prev];
        updated[existsIdx] = newCat;
        return updated;
      }
      return [...prev, newCat];
    });
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
      category: productData.category || 'General',
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

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (text) => {
    setToastMessage({ text, id: Date.now() });
  };

  const addToCart = (product, quantity = 1, options = {}) => {
    if (currentUser?.isBlocked) {
      showToast('Your account has been blocked by administrator.');
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
    showToast('Item added to cart!');
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
        toggleBlockUser,
        toastMessage,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
