import { UserService } from '../src/services/user-service';

describe('UserService', () => {
  let userService: UserService;
  
  beforeEach(() => {
    userService = new UserService();
  });
  
  it('should get all users', async () => {
    const users = await userService.getAllUsers();
    expect(Array.isArray(users)).toBe(true);
  });
  
  it('should create a user', async () => {
    const userData = { email: 'test@example.com', name: 'Test User' };
    const user = await userService.createUser(userData);
    expect(user).toHaveProperty('id');
  });
});