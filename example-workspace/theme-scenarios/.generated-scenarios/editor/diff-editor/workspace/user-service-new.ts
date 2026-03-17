export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
}

export class UserService {
  private users: User[] = [];
  private readonly apiUrl = 'https://api.example.com';

  constructor() {
    this.initializeService();
  }

  private async initializeService(): Promise<void> {
    // Initialize service and load users from API
    console.log('Initializing user service...');
    await this.loadUsersFromAPI();
  }

  private async loadUsersFromAPI(): Promise<void> {
    try {
      console.log('Fetching users from API...');
      // API call implementation would go here
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  }

  getUser(id: number): User | undefined {
    const user = this.users.find(user => user.id === id);
    return user?.isActive ? user : undefined;
  }

  addUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...user,
      id: this.generateId(),
      createdAt: new Date(),
      isActive: true
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updates: Partial<Omit<User, 'id' | 'createdAt'>>): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1 && this.users[userIndex].isActive) {
      this.users[userIndex] = { ...this.users[userIndex], ...updates };
      return true;
    }
    return false;
  }

  deactivateUser(id: number): boolean {
    const user = this.getUser(id);
    if (user) {
      return this.updateUser(id, { isActive: false });
    }
    return false;
  }

  private generateId(): number {
    return Math.max(...this.users.map(u => u.id), 0) + 1;
  }
}