// In src/controllers/paymentController.js
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const createPayment = async (req, res) => {
  const { amount, student_info } = req.body;

  if (!amount || !student_info) {
    return res.status(400).json({ msg: 'Amount and student info are required' });
  }

  try {
    const callback_url = 'https://www.google.com/'; // Placeholder callback URL
    const school_id = process.env.SCHOOL_ID;

    // 1. Create the payload for the 'sign' JWT
    const signPayload = {
      school_id: school_id,
      amount: String(amount), // API requires amount to be a string
      callback_url: callback_url,
    };

    // 2. Sign the payload using the PG_SECRET_KEY
    const sign = jwt.sign(signPayload, process.env.PG_SECRET_KEY);

    // 3. Construct the main request body for the payment API
    const requestBody = {
      school_id: school_id,
      amount: String(amount),
      callback_url: callback_url,
      sign: sign,
    };
    
    // 4. Set up the authorization headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PAYMENT_API_KEY}`
      }
    };

    // 5. Call the external payment API
    const apiResponse = await axios.post(
      process.env.PAYMENT_API_URL,
      requestBody,
      config
    );

    // 6. Create and save the order in our local database
    const newOrder = new Order({
      school_id: school_id,
      student_info: student_info,
      collect_request_id: apiResponse.data.collect_request_id // Save the important ID
    });
    await newOrder.save();

    // 7. Send the successful response back to the user
    res.status(200).json(apiResponse.data);

  } catch (error) {
    console.error('Payment creation failed:', error.response ? error.response.data : error.message);
    res.status(500).json({ msg: 'Server error during payment creation' });
  }
};

module.exports = {
  createPayment,
};