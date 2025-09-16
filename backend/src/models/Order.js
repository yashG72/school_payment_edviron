// In src/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  school_id: {
    type: String,
    required: true,
    index: true
  },
  trustee_id: {
    type: String,
  },
  student_info: {
    name: String,
    id: String,
    email: String,
  },
  gateway_name: {
    type: String,
  },
  // Add this new field to store the ID from the payment gateway
  collect_request_id: {
    type: String,
    index: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;