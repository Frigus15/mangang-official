const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userEmail: { type: String, required: true },
    items: [
      {
        product: { type: Object, required: true },
        quantity: { type: Number, required: true },
        options: { type: Object }
      }
    ],
    shippingDetails: {
      name: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      zip: String
    },
    paymentDetails: {
      cardHolder: String,
      cardNumber: String
    },
    pricing: {
      subtotal: Number,
      discount: Number,
      shipping: Number,
      tax: Number,
      total: Number
    },
    status: { type: String, default: 'Processing' },
    date: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
