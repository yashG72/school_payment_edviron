const express = require('express');
const router = express.Router();
const { 
  getAllTransactions, 
  getTransactionsBySchool, 
  getTransactionStatus 
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllTransactions);
router.get('/school/:schoolId', protect, getTransactionsBySchool);
router.get('/status/:custom_order_id', protect, getTransactionStatus);

module.exports = router;