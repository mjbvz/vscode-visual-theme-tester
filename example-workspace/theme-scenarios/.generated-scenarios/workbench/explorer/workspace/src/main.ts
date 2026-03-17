import { createApp } from './app';
import { logger } from './utils/logger';

async function bootstrap() {
  try {
    const app = await createApp();
    const port = process.env.PORT || 3000;
    
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();