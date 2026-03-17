import { Database } from './database';
import { Logger } from './logger';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  isActive: boolean;
}

type UserCreateInput = Omit<User, 'id' | 'createdAt'>;

export class UserService {
  private db: Database;
  private logger: Logger;

  constructor(database: Database, logger: Logger) {
    this.db = database;
    this.logger = logger;
  }

  async createUser(userData: UserCreateInput): Promise<User> {
    try {
      const user: User = {
        id: crypto.randomUUID(),
        ...userData,
        createdAt: new Date(),
      };

      await this.db.insert('users', user);
      this.logger.info(`User created: ${user.email}`);
      
      return user;
    } catch (error) {
      this.logger.error('Failed to create user', error);
      throw new Error('User creation failed');
    }
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.db.findById<User>('users', id);
    return user?.isActive ? user : null;
  }

  async updateUserStatus(id: string, isActive: boolean): Promise<void> {
    await this.db.update('users', id, { isActive });
    this.logger.info(`User ${id} status updated to ${isActive ? 'active' : 'inactive'}`);
  }
}