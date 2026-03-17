import { DatabaseService } from '../../src/services/DatabaseService';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    service = new DatabaseService();
  });

  test('should connect successfully', async () => {
    await service.connect();
    expect(service.isConnected()).toBe(true);
  });
});