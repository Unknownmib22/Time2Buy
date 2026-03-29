import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';

// Internal modules
import { pricingEngineCron } from './services/pricingEngine.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Healthcheck
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date(), env: process.env.NODE_ENV || 'development' });
});

// Database Connection Helper (Serverless Friendly)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/time2buy';

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
  }
}

// Global middleware to ensure DB is connected for every request on Serverless
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Server listen (Persistent hosting like Render)
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  // Initialize Background Cron Jobs
  cron.schedule('0 0 * * *', () => { 
     console.log('⏰ Running Price Decay Job');
     pricingEngineCron();
  });
});

// Export the app for Vercel
export default app;
