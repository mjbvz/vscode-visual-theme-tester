import { User, validateEmail } from './utils';

export class AuthService {
  private users: User[] = [];

  async login(email: string, password: string): Promise<User | null> {
    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = this.users.find(u => u.email === email && u.isActive);
    return user || null;
  }

  async register(name: string, email: string, password: string): Promise<User> {
    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      isActive: true
    };

    this.users.push(newUser);
    return newUser;
  }
}