
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
// import http from 'http'; 
// import { Server } from 'socket.io';
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

app.set('socketio', io);

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🔥`);
});