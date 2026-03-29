// Lifecycle Engine logic based on the prompt's mathematical model
export const computeLifecycle = ({ mrp, mfgDate, expiryDate }) => {
    let mfg = mfgDate ? new Date(mfgDate) : new Date(); // assume current Date if no MFG provided
    let exp = new Date(expiryDate);
    
    // L = Expiry - Manufacturing (in days)
    const lifespanMs = exp - mfg;
    const lifespanDays = lifespanMs / (1000 * 60 * 60 * 24);

    // Sale Window
    // Start = Expiry - (1/5)L
    const msToSubtractForStart = (lifespanDays / 5) * (1000 * 60 * 60 * 24);
    const saleStart = new Date(exp.getTime() - msToSubtractForStart);
    
    // End = Expiry - 1 day
    const saleEnd = new Date(exp.getTime() - (1000 * 60 * 60 * 24));
    
    // Initial Sale Price = P - (1/7)P
    const initialSalePrice = mrp - (mrp / 7);

    return {
        lifespanDays: Math.floor(lifespanDays),
        saleStart,
        saleEnd,
        initialSalePrice: parseFloat(initialSalePrice.toFixed(2)),
        currentSalePrice: parseFloat(initialSalePrice.toFixed(2)) // Default
    };
};
