const Order = require('../models/Order');
const OrderStatus = require('../models/OrderStatus');
const mongoose = require('mongoose');

const getAllTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'payment_time';
    const order = req.query.order === 'asc' ? 1 : -1;
    const status = req.query.status; // Get status from query

    const skip = (page - 1) * limit;

    const matchStage = {};
    if (status) {
      matchStage.status = status;
    }

    const aggregationPipeline = [
      { $match: matchStage }, // Add this match stage
      {
        $lookup: {
          from: 'orders',
          localField: 'collect_id',
          foreignField: '_id',
          as: 'orderDetails'
        }
      },
      // ... rest of the pipeline remains the same
      { $unwind: '$orderDetails' },
      { $sort: { [sortBy]: order } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          collect_id: '$orderDetails.collect_request_id',
          custom_order_id: '$orderDetails.collect_request_id',
          school_id: '$orderDetails.school_id',
          gateway: '$payment_mode',
          order_amount: '$order_amount',
          transaction_amount: '$transaction_amount',
          status: '$status',
          payment_time: '$payment_time',
        }
      }
    ];

    const transactions = await OrderStatus.aggregate(aggregationPipeline);
    const totalTransactions = await OrderStatus.countDocuments(matchStage);

    res.json({
      transactions,
      currentPage: page,
      totalPages: Math.ceil(totalTransactions / limit),
      totalTransactions
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const getTransactionsBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const orders = await Order.find({ school_id: schoolId });
    
    const orderIds = orders.map(order => order._id);
    
    const transactions = await OrderStatus.find({ collect_id: { $in: orderIds } })
      .populate({
        path: 'collect_id',
        select: 'collect_request_id school_id'
      });

    res.json(transactions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const getTransactionStatus = async (req, res) => {
  try {
    const { custom_order_id } = req.params;
    
    const order = await Order.findOne({ collect_request_id: custom_order_id });
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    const transactionStatus = await OrderStatus.findOne({ collect_id: order._id });
    if (!transactionStatus) {
      return res.status(404).json({ msg: 'Transaction status not found' });
    }

    res.json(transactionStatus);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllTransactions,
  getTransactionsBySchool,
  getTransactionStatus
};