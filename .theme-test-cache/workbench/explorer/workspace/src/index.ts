import { App } from './app/App';
import { DatabaseService } from './services/DatabaseService';
import { Logger } from './utils/Logger';

const logger = new Logger();
const db = new DatabaseService();
const app = new App(db, logger);

app.start().then(() => {
  logger.info('Application started successfully');
}).catch((error) => {
  logger.error('Failed to start application:', error);
});