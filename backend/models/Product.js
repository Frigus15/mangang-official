const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    stock: { type: Number, default: 10 },
    rating: { type: Number, default: 5.0 },
    image: { type: String, required: true },
    description: { type: String, default: '' },
    options: {
      colors: [{ type: String }],
      storage: [{ type: String }]
    },
    trending: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
