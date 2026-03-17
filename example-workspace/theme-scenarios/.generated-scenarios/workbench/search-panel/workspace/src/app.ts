import { User, UserManager } from './utils';

const userManager = new UserManager();

// Sample users data
const sampleUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', isActive: true },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', isActive: false },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', isActive: true }
];

// Initialize application with sample data
function initializeApp(): void {
  sampleUsers.forEach(user => userManager.addUser(user));
  
  console.log('Application initialized with sample users');
  console.log('Active users:', userManager.getActiveUsers().length);
}

initializeApp();