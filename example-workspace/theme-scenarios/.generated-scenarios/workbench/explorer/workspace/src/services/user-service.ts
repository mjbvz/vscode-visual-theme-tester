import { User } from '../types/user';
import { database } from '../utils/database';

export class UserService {
  async getAllUsers(): Promise<User[]> {
    return database.query('SELECT * FROM users');
  }
  
  async createUser(userData: Partial<User>): Promise<User> {
    return database.insert('users', userData);
  }
  
  async getUserById(id: string): Promise<User | null> {
    return database.findOne('users', { id });
  }
}