import { AuthService } from './auth';
import { createUser, getUsersByStatus } from './utils';

class Application {
  private authService = new AuthService();

  async initialize(): Promise<void> {
    console.log('Initializing application...');
    
    try {
      // Create some test users
      const testUser1 = createUser('John Doe', 'john@example.com');
      const testUser2 = createUser('Jane Smith', 'jane@example.com');
      
      console.log('Test users created:', testUser1, testUser2);
      
      // Simulate user login
      const loginResult = await this.authService.login('john@example.com', 'password123');
      
      if (loginResult) {
        console.log('User logged in successfully:', loginResult.name);
      } else {
        console.log('Login failed');
      }
      
    } catch (error) {
      console.error('Application initialization failed:', error);
    }
  }

  async shutdown(): Promise<void> {
    console.log('Shutting down application...');
    // Cleanup logic here
  }
}

const app = new Application();
app.initialize().catch(console.error);

export default app;