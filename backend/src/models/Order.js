
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  school_id: {
    type: String,
    required: true,
  },
  trustee_id: {
    type: String,
    required: true,
  },
  student_info: {
    name: String,
    id: String,
    email: String,
  },
  gateway_name: {
    type: String,
  },
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;