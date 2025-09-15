const mongoose = require('mongoose');

const webhookLogSchema = new mongoose.Schema({
  payload: {
    type: Object, // Stores the raw JSON payload from the webhook
    required: true,
  },
  status: {
    type: String, // e.g., 'processed', 'failed'
    default: 'processed',
  },
  errorMessage: {
    type: String,
  },
}, {
  timestamps: true
});

const WebhookLog = mongoose.model('WebhookLog', webhookLogSchema);

module.exports = WebhookLog;