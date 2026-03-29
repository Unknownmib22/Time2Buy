import { pricingEngineCron } from '../services/pricingEngine.js';
import app from '../server.js';

// Vercel Cron Handler
// This endpoint is meant to be called by Vercel's automated cron scheduler.
export default async function handler(req, res) {
  // Check for authorization (Optional but highly recommended)
  // if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }

  try {
    console.log('⏰ Triggering Price Decay Engine via Vercel Cron');
    await pricingEngineCron();
    res.status(200).json({ success: true, message: 'Pricing engine executed successfully.' });
  } catch (err) {
    console.error('❌ Pricing engine execution failed:', err);
    res.status(500).json({ success: false, error: err.message });
  }
}
