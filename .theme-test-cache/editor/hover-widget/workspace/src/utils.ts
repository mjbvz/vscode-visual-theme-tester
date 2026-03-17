/**
 * Calculates the area of a rectangle
 * @param width - The width of the rectangle
 * @param height - The height of the rectangle
 * @returns The area of the rectangle
 */
export function calculateArea(width: number, height: number): number {
  return width * height;
}

/**
 * Formats a user's full name
 * @param firstName - The user's first name
 * @param lastName - The user's last name
 * @param includeMiddle - Whether to include middle initial
 * @returns The formatted full name
 */
export function formatName(firstName: string, lastName: string, includeMiddle?: boolean): string {
  if (includeMiddle) {
    return `${firstName} M. ${lastName}`;
  }
  return `${firstName} ${lastName}`;
}

/**
 * Validates an email address using a simple regex pattern
 * @param email - The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Usage examples
const area = calculateArea(10, 5);
const fullName = formatName("John", "Doe", true);
const isValid = validateEmail("user@example.com");

console.log(`Area: ${area}`);
console.log(`Name: ${fullName}`);
console.log(`Email valid: ${isValid}`);