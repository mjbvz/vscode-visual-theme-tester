interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date; // Added field
  isActive: boolean; // Added field
}

// Added interface for user creation
interface CreateUserRequest {
  name: string;
  email: string;
}

class UserService {
  private users: User[] = [];
  private nextId: number = 1; // Added field

  constructor() {
    this.initializeService();
  }

  // Renamed and enhanced method
  private initializeService(): void {
    // Enhanced initialization with validation
    this.loadUsersFromDatabase();
    this.validateUserData();
  }

  private loadUsersFromDatabase(): void {
    // Load users from database with enhanced data
    this.users = [
      { 
        id: 1, 
        name: "John Doe", 
        email: "john@example.com",
        createdAt: new Date('2023-01-15'),
        isActive: true
      },
      { 
        id: 2, 
        name: "Jane Smith", 
        email: "jane@example.com",
        createdAt: new Date('2023-02-20'),
        isActive: true
      }
    ];
    this.nextId = this.users.length + 1;
  }

  // Added new method
  private validateUserData(): void {
    this.users = this.users.filter(user => 
      user.email.includes('@') && user.name.trim().length > 0
    );
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id && user.isActive);
  }

  // Enhanced method with new interface
  createUser(userData: CreateUserRequest): User {
    const newUser: User = {
      id: this.nextId++,
      name: userData.name.trim(),
      email: userData.email.toLowerCase(),
      createdAt: new Date(),
      isActive: true
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updates: Partial<Omit<User, 'id' | 'createdAt'>>): User | null {
    const userIndex = this.users.findIndex(user => user.id === id && user.isActive);
    if (userIndex === -1) return null;
    
    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return this.users[userIndex];
  }

  // Added new method
  deleteUser(id: number): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    
    // Soft delete by setting isActive to false
    this.users[userIndex].isActive = false;
    return true;
  }

  // Added new method
  getActiveUsers(): User[] {
    return this.users.filter(user => user.isActive);
  }
}

export default UserService;