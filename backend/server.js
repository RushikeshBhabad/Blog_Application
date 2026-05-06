// HOW TO RUN LOCALLY:
// 1. Clone the repo
// 2. BACKEND:
//    cd backend
//    npm install
//    Create .env file with MONGO_URI=<your MongoDB Atlas URI> and PORT=5000
//    npm run dev
// 3. FRONTEND:
//    cd frontend
//    npm install
//    npm run dev
// 4. Open http://localhost:5173 in your browser

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const postsRouter = require('./routes/posts');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/posts', postsRouter);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Close any existing listeners
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    
    // Ensure port is free before listening
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Exiting...`);
        process.exit(1);
      }
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });