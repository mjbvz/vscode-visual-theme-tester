// User interface with proper types
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