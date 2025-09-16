const mongoose = require('mongoose');

const orderStatusSchema = new mongoose.Schema({
  // This creates a reference to a document in the 'Order' collection
  collect_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', // The model to use for the reference
    required: true,
    index: true
  },
  order_amount: {
    type: Number,
    required: true,
  },
  transaction_amount: {
    type: Number,
  },
  payment_mode: {
    type: String,
  },
  payment_details: {
    type: String,
  },
  bank_reference: {
    type: String,
  },
  payment_message: {
    type: String,
  },
  status: {
    type: String, // e.g., 'success', 'pending', 'failed'
    required: true,
  },
  error_message: {
    type: String,
  },
  payment_time: {
    type: Date,
  },
}, {
  timestamps: true
});

const OrderStatus = mongoose.model('OrderStatus', orderStatusSchema);

module.exports = OrderStatus;