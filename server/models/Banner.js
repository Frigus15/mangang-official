const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, default: 'Banner Slide' },
    subtitle: { type: String, default: '' },
    image: { type: String, required: true },
    productId: { type: String, default: 'prod-1' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);
