// In backend/src/index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Create HTTP server from Express app

const io = new Server(server, { // Attach Socket.IO to the HTTP server
  cors: {
    origin: "*", // Allow all origins for simplicity
    methods: ["GET", "POST"]
  }
});

app.set('socketio', io); // Make `io` globally available to your routes

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('School Payment API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/transactions', transactionRoutes);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 8000;

// IMPORTANT: Listen on the `server` instance, not the `app` instance
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🔥`);
});