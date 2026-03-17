import { DatabaseService } from '../services/DatabaseService';
import { Logger } from '../utils/Logger';

export class App {
  constructor(
    private db: DatabaseService,
    private logger: Logger
  ) {}

  async start(): Promise<void> {
    this.logger.info('Initializing application...');
    await this.db.connect();
    this.logger.info('Database connected');
  }
}