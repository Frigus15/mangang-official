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

// Connect MongoDB
connectDB();

// ── SEED INITIAL DATA IF EMPTY ─────────────────────────────────────────────
const seedInitialData = async () => {
  try {
    // Seed Admin User
    const adminExists = await User.findOne({ email: 'admin@gmail.com' });
    if (!adminExists) {
      await User.create({
        username: 'Admin Manager',
        name: 'Admin Manager',
        email: 'admin@gmail.com',
        password: 'admin',
        role: 'admin',
        isBlocked: false
      });
      console.log('[Seed] Default admin account admin@gmail.com created.');
    }

    // Seed Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany([
        { name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
        { name: 'Wearables', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80' },
        { name: 'Computers', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80' },
        { name: 'Smart Home', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80' }
      ]);
      console.log('[Seed] Default categories created.');
    }

    // Seed Products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany([
        {
          title: 'Mangang Vision Pro VR',
          category: 'Wearables',
          price: 69999,
          costPrice: 45000,
          stock: 12,
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80',
          description: 'Next-generation standalone VR headset offering absolute immersion with micro-OLED 4K displays.',
          options: { colors: ['Space Gray', 'Neon Cyan'], storage: ['256GB', '512GB'] },
          trending: true
        },
        {
          title: 'Mangang Wave-9 ANC',
          category: 'Audio',
          price: 19999,
          costPrice: 12000,
          stock: 25,
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
          description: 'Professional wireless noise-canceling headphones with 40mm beryllium drivers and 60-hour battery life.',
          options: { colors: ['Carbon Black', 'Platinum Silver'], storage: ['Standard'] },
          trending: true
        },
        {
          title: 'Mangang Chronos Smartwatch',
          category: 'Wearables',
          price: 14999,
          costPrice: 9000,
          stock: 18,
          rating: 4.7,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
          description: 'Titanium-body sports smartwatch with continuous ECG, SpO2 sensing, and sapphire AMOLED screen.',
          options: { colors: ['Titanium Steel', 'Obsidian Black'], storage: ['Standard'] },
          trending: false
        },
        {
          title: 'Mangang Key-V1 Mechanical',
          category: 'Computers',
          price: 8999,
          costPrice: 5500,
          stock: 15,
          rating: 4.6,
          image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
          description: 'Hot-swappable optical mechanical keyboard with pre-lubed silent switches and RGB lighting.',
          options: { colors: ['Classic Dark', 'Retro Cyan'], storage: ['Linear', 'Tactile'] },
          trending: false
        },
        {
          title: 'Mangang Aura AI Speaker',
          category: 'Smart Home',
          price: 5999,
          costPrice: 3500,
          stock: 30,
          rating: 4.5,
          image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
          description: 'Voice-controlled smart hub speaker delivering 360-degree high-fidelity audio.',
          options: { colors: ['Charcoal Black', 'Aurora White'], storage: ['Standard'] },
          trending: true
        }
      ]);
      console.log('[Seed] Default products created in INR.');
    }

    // Seed Banners
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      await Banner.insertMany([
        {
          title: 'MANGANG VISION PRO',
          subtitle: 'Immerse yourself in spatial reality with micro-OLED 4K resolution.',
          image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80',
          productId: 'prod-1'
        },
        {
          title: 'MANGANG WAVE-9 ANC',
          subtitle: 'Professional sound quality with hybrid ANC and 60-hour battery life.',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
          productId: 'prod-2'
        }
      ]);
      console.log('[Seed] Default spotlight banners created.');
    }
  } catch (err) {
    console.error('[Seed Error]', err.message);
  }
};

setTimeout(seedInitialData, 2000);

// ── API ROUTES ──────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mangang MongoDB API Server Online', timestamp: new Date() });
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
    const { username, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: 'Email already registered.' });
    }
    const newUser = await User.create({ username, name: username, email, password });
    res.json({ success: true, user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 MANGANG MongoDB Express Server running on port ${PORT}`);
  console.log(`===================================================`);
});
