const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Models
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
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('[DB Middleware Error]', err.message);
    res.status(500).json({ error: 'Database connection failure: ' + err.message });
  }
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
    res.json({ success: true, message: 'All store data successfully cleared from MongoDB.' });
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
