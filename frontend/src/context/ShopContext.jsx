import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const local = localStorage.getItem('mangang_products');
    if (!local) return [];
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.some(p => p.title === 'Mangang Vision Pro VR')) {
        localStorage.removeItem('mangang_products');
        return [];
      }
      return parsed;
    } catch {
      return [];
    }
  });

  const [categories, setCategories] = useState(() => {
    const local = localStorage.getItem('mangang_categories');
    if (!local) return [];
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.some(c => c.name === 'Audio' && c.id === 'cat-1')) {
        localStorage.removeItem('mangang_categories');
        return [];
      }
      return parsed;
    } catch {
      return [];
    }
  });

  const [bannerSlides, setBannerSlides] = useState(() => {
    const local = localStorage.getItem('mangang_slides');
    if (!local) return [];
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.some(s => s.title === 'MANGANG VISION PRO')) {
        localStorage.removeItem('mangang_slides');
        return [];
      }
      return parsed;
    } catch {
      return [];
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
    return JSON.parse(local);
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

        if (mProducts && Array.isArray(mProducts)) {
          setProducts(mProducts.map(p => ({ ...p, id: p._id || p.id })));
        }
        if (mCategories && Array.isArray(mCategories)) {
          setCategories(mCategories.map(c => ({ ...c, id: c._id || c.id })));
        }
        if (mBanners && Array.isArray(mBanners)) {
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
        alert(mongoRes?.error || 'Invalid credentials. User authentication is verified strictly via MongoDB.');
        setAuthLoading(false);
        return false;
      }
      if (mongoRes.user.isBlocked) {
        alert('Your account has been blocked by administrator.');
        setAuthLoading(false);
        return false;
      }
      setIsLoggedIn(true);
      setCurrentUser(mongoRes.user);
      localStorage.setItem('mangang_is_logged_in', 'true');
      localStorage.setItem('mangang_user', JSON.stringify(mongoRes.user));
      setAuthLoading(false);
      return true;
    } catch (err) {
      alert('Connection error communicating with MongoDB authentication server.');
      setAuthLoading(false);
      return false;
    }
  };

  const signup = async (username, email, password, phone) => {
    setAuthLoading(true);
    try {
      const mongoRes = await api.signup(username, email, password, phone);
      if (!mongoRes || !mongoRes.success || !mongoRes.user) {
        alert(mongoRes?.error || 'Failed to create user account in MongoDB.');
        setAuthLoading(false);
        return false;
      }
      setIsLoggedIn(true);
      setCurrentUser(mongoRes.user);
      localStorage.setItem('mangang_is_logged_in', 'true');
      localStorage.setItem('mangang_user', JSON.stringify(mongoRes.user));
      setAuthLoading(false);
      return true;
    } catch (err) {
      alert('Connection error communicating with MongoDB registration server.');
      setAuthLoading(false);
      return false;
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
