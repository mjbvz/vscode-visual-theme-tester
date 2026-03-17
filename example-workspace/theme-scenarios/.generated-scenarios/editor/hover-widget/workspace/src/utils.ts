/**
 * Calculates the area of a rectangle
 * @param width - The width of the rectangle
 * @param height - The height of the rectangle
 * @returns The area as a number
 */
export function calculateArea(width: number, height: number): number {
  return width * height;
}

/**
 * Formats a user's full name
 * @param firstName - The user's first name
 * @param lastName - The user's last name
 * @param middleInitial - Optional middle initial
 * @returns The formatted full name
 */
export function formatName(firstName: string, lastName: string, middleInitial?: string): string {
  if (middleInitial) {
    return `${firstName} ${middleInitial}. ${lastName}`;
  }
  return `${firstName} ${lastName}`;
}

/**
 * Validates an email address format
 * @param email - The email address to validate
 * @returns True if the email format is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Example usage of the functions
const area = calculateArea(10, 5);
const fullName = formatName("John", "Doe", "M");
const isValid = validateEmail("user@example.com");