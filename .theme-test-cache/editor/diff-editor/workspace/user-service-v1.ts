interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  private users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  private loadUsers(): void {
    // Load users from database
    this.users = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" }
    ];
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  createUser(name: string, email: string): User {
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updates: Partial<User>): User | null {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return this.users[userIndex];
  }
}

export default UserService;