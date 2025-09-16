const Order = require('../models/Order');
const OrderStatus = require('../models/OrderStatus');
const WebhookLog = require('../models/WebhookLog');

const handleWebhook = async (req, res) => {
  const payload = req.body;

  try {
    await new WebhookLog({ payload }).save();

    const { order_info } = payload;
    if (!order_info) {
      return res.status(400).json({ msg: 'Invalid webhook payload' });
    }

    const order = await Order.findOne({ collect_request_id: order_info.order_id });
    if (!order) {
      console.error(`Webhook Error: Order not found for collect_request_id ${order_info.order_id}`);
      return res.status(404).json({ msg: 'Order not found' });
    }

    const existingStatus = await OrderStatus.findOne({ collect_id: order._id });
    if (existingStatus) {
      console.log(`Webhook Info: Status for order ${order._id} already exists. Skipping.`);
      return res.status(200).json({ msg: 'Status already recorded' });
    }
    
    const newStatus = new OrderStatus({
      collect_id: order._id,
      order_amount: order_info.order_amount,
      transaction_amount: order_info.transaction_amount,
      payment_mode: order_info.payment_mode,
      payment_details: order_info.payemnt_details,
      bank_reference: order_info.bank_reference,
      payment_message: order_info.Payment_message,
      status: order_info.status,
      error_message: order_info.error_message,
      payment_time: new Date(order_info.payment_time),
    });

    await newStatus.save();

    const io = req.app.get('socketio');
    io.emit('transaction_update', newStatus);
    
    res.status(200).json({ msg: 'Webhook received successfully' });
  } catch (error) {
    console.error('Webhook processing failed:', error.message);
    await new WebhookLog({ payload, status: 'failed', errorMessage: error.message }).save();
    res.status(500).json({ msg: 'Server error during webhook processing' });
  }
};

module.exports = {
  handleWebhook,
};