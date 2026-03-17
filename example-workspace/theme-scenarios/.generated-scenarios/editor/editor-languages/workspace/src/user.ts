import { Database } from './database';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

class UserService {
  private db: Database;

  constructor(database: Database) {
    this.db = database;
  }

  async createUser(name: string, email: string): Promise<User> {
    const user: User = {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      createdAt: new Date()
    };
    
    await this.db.save('users', user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const users = await this.db.find<User>('users', { email });
    return users[0] || null;
  }
}

export { User, UserService };