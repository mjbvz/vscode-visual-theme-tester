import { App } from '../src/app/App';
import { DatabaseService } from '../src/services/DatabaseService';
import { Logger } from '../src/utils/Logger';

describe('App', () => {
  let app: App;
  let mockDb: DatabaseService;
  let mockLogger: Logger;

  beforeEach(() => {
    mockDb = new DatabaseService();
    mockLogger = new Logger();
    app = new App(mockDb, mockLogger);
  });

  test('should start successfully', async () => {
    await expect(app.start()).resolves.not.toThrow();
  });
});