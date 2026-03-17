import express from 'express';
import { UserController } from './controllers/UserController';
import { DatabaseService } from './services/DatabaseService';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users', UserController);

// Database connection
DatabaseService.connect().then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.error('Database connection failed:', error);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});