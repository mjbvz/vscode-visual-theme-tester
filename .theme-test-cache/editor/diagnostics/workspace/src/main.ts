// This file contains intentional errors for diagnostics demo
import { User } from './user';
// Missing import for createUser - will cause error

// Unused variable - will cause warning
const unusedVariable = "This variable is never used";

function processUser(user: User): string {
  // Type mismatch - assigning string to number
  user.id = "invalid-id-type";
  
  // Using undefined function - missing import
  const newUser = createUser("John", "john@example.com");
  
  // Type mismatch - returning number instead of string  
  return user.id + user.name.length;
}

// Another unused variable
let anotherUnused: boolean;

// Calling function with wrong parameter types
const testUser: User = {
  id: 1,
  name: "Test User", 
  email: "test@example.com",
  isActive: true
};

// Type error - passing number where string expected
const result = processUser(42);

// Accessing property that doesn't exist
console.log(testUser.nonExistentProperty);