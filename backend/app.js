const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Models
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');
const Banner = require('./models/Banner');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Ensure MongoDB Connection on Serverless Requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ── ENSURE CLEAN DATABASE ───────────────────────────────────────────────────
const initializeCleanDB = async () => {
  try {
    const dummyTitleExists = await Product.findOne({ title: 'Mangang Vision Pro VR' });
    if (dummyTitleExists) {
      await Product.deleteMany({});
      await Category.deleteMany({});
      await Banner.deleteMany({});
      console.log('[DB Clean] Removed all dummy products, categories, and banners from MongoDB.');
    }
  } catch (err) {
    console.error('[DB Setup Error]', err.message);
  }
};

setTimeout(initializeCleanDB, 1500);

// ── API ROUTES ──────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mangang MongoDB API Server Online', timestamp: new Date() });
});

// Admin wipe database route
app.post('/api/admin/clean-db', async (req, res) => {
  try {
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Banner.deleteMany({});
    await Order.deleteMany({});
    await User.deleteMany({ role: { $ne: 'admin' } });
    res.json({ success: true, message: 'All dummy data successfully cleared from MongoDB.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── AUTH / USER ROUTES ──
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    const cleanEmail = email.trim().toLowerCase();
    const exists = await User.findOne({ email: cleanEmail });
    if (exists) {
      return res.status(400).json({ error: 'This email is already registered.' });
    }
    const finalUsername = (username && username.trim()) || cleanEmail.split('@')[0];
    const newUser = await User.create({
      username: finalUsername,
      name: finalUsername,
      email: cleanEmail,
      password: password,
      phone: phone || ''
    });
    res.json({ success: true, user: newUser });
  } catch (err) {
    console.error('[Signup Error]', err);
    res.status(500).json({ error: err.message || 'Server error creating user in MongoDB.' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/profile', async (req, res) => {
  try {
    const { email, updatedFields } = req.body;
    const user = await User.findOneAndUpdate({ email }, updatedFields, { new: true });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/users/block', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PRODUCTS ROUTES ──
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id/stock', async (req, res) => {
  try {
    const { stock } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { stock: Math.max(0, Number(stock)) }, { new: true });
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── CATEGORIES ROUTES ──
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name, image } = req.body;
    const category = await Category.create({ name, image });
    res.json({ success: true, category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── ORDERS ROUTES ──
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await Order.create(orderData);
    res.json({ success: true, order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── BANNERS ROUTES ──
app.get('/api/banners', async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/banners', async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.json({ success: true, banner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/banners/:id', async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
