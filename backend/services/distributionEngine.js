import Store from '../models/Store.js';
// To simulate B2C push notifications to consumers
// In a real app we'd use 'get_users_within_radius'

export const triggerDistribution = async (product) => {
    console.log(`[DISTRIBUTION ENGINE] Activating parallel demand matching for ${product.name}`);
    
    // 1. Notify B2C (Consumers)
    console.log(`B2C Notification => Sending Push to users within 2km: "🔥 ${product.name} at ₹${product.currentSalePrice} (2km away) – Act Fast!"`);
    
    // 2. Notify B2B (Retailers)
    // Find retailers within 2km who are active and need stock
    // Using $geoNear aggregation equivalent (conceptually)
    
    const nearbyRetailers = await Store.find({
        location: {
            $near: {
                $geometry: product.location, // Same geo location point [lon, lat]
                $maxDistance: 2000 // 2km radius
            }
        },
        isActive: true
    });
    
    for (let store of nearbyRetailers) {
         // Logic: Check if that store has the product and stock < threshold
         // Simulation assuming 'store inventory checking'
         if (product.stock < store.b2bDemandThreshold) {
              console.log(`B2B Notification => Alerting Nearby Store [${store.name}]: "🏪 Retail demand detected nearby. Bulk stock of ${product.name} available at discount!"`);
         }
    }
};
