interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
    console.log(`Added user: ${user.name}`);
  }

  findUser(id: number): User | undefined {
    const user = this.users.find(u => u.id === id);
    if (user) {
      console.log(`Found user: ${user.name}`);
      return user;
    }
    console.log(`User not found with id: ${id}`);
    return undefined;
  }

  updateUser(id: number, updates: Partial<User>): boolean {
    const user = this.users.find(u => u.id === id);
    if (user) {
      Object.assign(user, updates);
      console.log(`Updated user: ${user.name}`);
      return true;
    }
    return false;
  }

  deleteUser(id: number): boolean {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      const user = this.users[userIndex];
      this.users.splice(userIndex, 1);
      console.log(`Deleted user: ${user.name}`);
      return true;
    }
    return false;
  }

  getAllUsers(): User[] {
    return [...this.users];
  }
}

export default UserService;