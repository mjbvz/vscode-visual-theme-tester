import { calculateRectangleArea, calculateCircleArea, formatCurrency } from './utils';

/**
 * Main application logic
 */
function main() {
    // Calculate areas for different shapes
    const roomWidth = 12;
    const roomHeight = 8;
    const roomArea = calculateRectangleArea(roomWidth, roomHeight);
    
    const poolRadius = 5;
    const poolArea = calculateCircleArea(poolRadius);
    
    // Calculate costs
    const flooringCostPerSqFt = 15.50;
    const poolMaintenanceCostPerSqFt = 8.25;
    
    const flooringCost = roomArea * flooringCostPerSqFt;
    const poolMaintenanceCost = poolArea * poolMaintenanceCostPerSqFt;
    
    // Display results
    console.log(`Room area: ${roomArea} sq ft`);
    console.log(`Pool area: ${poolArea.toFixed(2)} sq ft`);
    console.log(`Flooring cost: ${formatCurrency(flooringCost)}`);
    console.log(`Pool maintenance cost: ${formatCurrency(poolMaintenanceCost)}`);
    
    const totalCost = flooringCost + poolMaintenanceCost;
    console.log(`Total cost: ${formatCurrency(totalCost)}`);
}

main();