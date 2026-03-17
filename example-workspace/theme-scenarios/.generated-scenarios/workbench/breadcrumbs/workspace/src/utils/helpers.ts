/**
 * Utility helpers for data processing and validation
 */

export interface User {
  id: number;
  name: string;
  email: string;
}

export class DataProcessor {
  private cache: Map<string, any> = new Map();

  /**
   * Processes user data with validation
   */
  public processUserData(userData: User[]): User[] {
    return userData.filter(user => this.validateUser(user));
  }

  private validateUser(user: User): boolean {
    return user.email.includes('@') && user.name.length > 0;
  }

  public clearCache(): void {
    this.cache.clear();
  }
}

export function formatUserName(user: User): string {
  return `${user.name} <${user.email}>`;
}

export function generateId(): number {
  return Math.floor(Math.random() * 1000000);
}