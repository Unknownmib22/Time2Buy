import Product from '../models/Product.js';

export const pricingEngineCron = async () => {
    try {
        const currentDate = new Date();
        
        // Find all "active" products (where current time > start time and stock > 0)
        const activeProducts = await Product.find({
            isActive: true,
            stock: { $gt: 0 }
            // $or: [ { saleEnd: { $gte: currentDate } } ]
        });

        for (let product of activeProducts) {
             const start = new Date(product.saleStart);
             const daysPassed = Math.floor((currentDate - start) / (1000 * 60 * 60 * 24));
             
             // Step decay: Every 2 days
             const steps = Math.floor(daysPassed / 2);
             
             // price = price - (0.01 × MRP)
             const reduction = steps * (0.01 * product.mrp);
             
             const newPrice = product.initialSalePrice - reduction;
             
             // Ensure price >= 0
             product.currentSalePrice = Math.max(newPrice, 0);
             
             // What if saleEnd has passed? Mark inactive
             if (currentDate > new Date(product.saleEnd)) {
                  product.isActive = false;
             }

             await product.save();
        }
        
    } catch (err) {
        console.error("Pricing Cron Engine Error: ", err);
    }
};
