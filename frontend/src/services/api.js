const API_BASE_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api');

export const api = {
  // Health check
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Auth
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  signup: async (username, email, password, phone) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, phone })
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  getUsers: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  updateUserProfile: async (email, updatedFields) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, updatedFields })
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  toggleBlockUser: async (email) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/block`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Products
  getProducts: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  addProduct: async (productData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  updateStock: async (id, stock) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}/stock`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock })
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Categories
  getCategories: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`);
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  addCategory: async (name, image) => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, image })
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  deleteCategory: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Orders
  getOrders: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`);
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  placeOrder: async (orderData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Banners
  getBanners: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/banners`);
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  addBanner: async (bannerData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/banners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerData)
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  deleteBanner: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/banners/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      return null;
    }
  }
};
