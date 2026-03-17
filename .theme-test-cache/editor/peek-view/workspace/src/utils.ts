/**
 * Utility functions for mathematical operations
 */

/**
 * Calculates the area of a rectangle
 * @param width - The width of the rectangle
 * @param height - The height of the rectangle
 * @returns The area of the rectangle
 */
export function calculateRectangleArea(width: number, height: number): number {
    return width * height;
}

/**
 * Calculates the area of a circle
 * @param radius - The radius of the circle
 * @returns The area of the circle
 */
export function calculateCircleArea(radius: number): number {
    return Math.PI * radius * radius;
}

/**
 * Formats a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (default: USD)
 * @returns The formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}