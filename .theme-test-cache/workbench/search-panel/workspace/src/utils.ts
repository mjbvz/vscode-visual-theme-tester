export interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export function createUser(name: string, email: string): User {
  return {
    id: Math.floor(Math.random() * 1000),
    name,
    email,
    isActive: true
  };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getUsersByStatus(users: User[], isActive: boolean): User[] {
  return users.filter(user => user.isActive === isActive);
}