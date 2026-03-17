import { Router } from 'express';
import { Database } from './database';
import { Logger } from './logger';
import { ValidationError, NotFoundError } from './errors';

/**
 * Main application class that handles all the core functionality
 * of our web service including routing, data processing, and
 * error handling across multiple endpoints.
 */
export class Application {
    private router: Router;
    private db: Database;
    private logger: Logger;
    
    constructor() {
        this.router = Router();
        this.db = new Database();
        this.logger = new Logger();
        this.setupRoutes();
    }

    /**
     * Configures all the application routes and their handlers
     */
    private setupRoutes(): void {
        this.router.get('/users', this.getUsers.bind(this));
        this.router.post('/users', this.createUser.bind(this));
        this.router.get('/users/:id', this.getUserById.bind(this));
        this.router.put('/users/:id', this.updateUser.bind(this));
        this.router.delete('/users/:id', this.deleteUser.bind(this));
    }

    /**
     * Retrieves all users from the database with optional filtering
     */
    async getUsers(req: any, res: any): Promise<void> {
        try {
            const { page = 1, limit = 10, search } = req.query;
            const offset = (page - 1) * limit;
            
            let query = 'SELECT * FROM users';
            const params: any[] = [];
            
            if (search) {
                query += ' WHERE name LIKE ? OR email LIKE ?';
                params.push(`%${search}%`, `%${search}%`);
            }
            
            query += ' LIMIT ? OFFSET ?';
            params.push(limit, offset);
            
            const users = await this.db.query(query, params);
            
            res.json({
                success: true,
                data: users,
                pagination: { page, limit, total: users.length }
            });
            
            this.logger.info(`Retrieved ${users.length} users`);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    /**
     * Creates a new user in the database
     */
    async createUser(req: any, res: any): Promise<void> {
        try {
            const { name, email, password } = req.body;
            
            if (!name || !email || !password) {
                throw new ValidationError('Name, email, and password are required');
            }
            
            const existingUser = await this.db.query(
                'SELECT id FROM users WHERE email = ?',
                [email]
            );
            
            if (existingUser.length > 0) {
                throw new ValidationError('User with this email already exists');
            }
            
            const hashedPassword = await this.hashPassword(password);
            const result = await this.db.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, hashedPassword]
            );
            
            res.status(201).json({
                success: true,
                data: { id: result.insertId, name, email }
            });
            
            this.logger.info(`Created user: ${email}`);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    /**
     * Retrieves a specific user by their ID
     */
    async getUserById(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            
            const users = await this.db.query(
                'SELECT id, name, email, created_at FROM users WHERE id = ?',
                [id]
            );
            
            if (users.length === 0) {
                throw new NotFoundError('User not found');
            }
            
            res.json({ success: true, data: users[0] });
            this.logger.info(`Retrieved user ID: ${id}`);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    /**
     * Updates an existing user's information
     */
    async updateUser(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            
            const existingUser = await this.db.query(
                'SELECT id FROM users WHERE id = ?',
                [id]
            );
            
            if (existingUser.length === 0) {
                throw new NotFoundError('User not found');
            }
            
            await this.db.query(
                'UPDATE users SET name = ?, email = ? WHERE id = ?',
                [name, email, id]
            );
            
            res.json({ success: true, message: 'User updated successfully' });
            this.logger.info(`Updated user ID: ${id}`);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    /**
     * Deletes a user from the database
     */
    async deleteUser(req: any, res: any): Promise<void> {
        try {
            const { id } = req.params;
            
            const result = await this.db.query(
                'DELETE FROM users WHERE id = ?',
                [id]
            );
            
            if (result.affectedRows === 0) {
                throw new NotFoundError('User not found');
            }
            
            res.json({ success: true, message: 'User deleted successfully' });
            this.logger.info(`Deleted user ID: ${id}`);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    /**
     * Handles password hashing with salt
     */
    private async hashPassword(password: string): Promise<string> {
        const bcrypt = await import('bcrypt');
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
    }

    /**
     * Centralized error handling for all routes
     */
    private handleError(error: any, res: any): void {
        this.logger.error('Application error:', error);
        
        if (error instanceof ValidationError) {
            res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: error.message
            });
        } else if (error instanceof NotFoundError) {
            res.status(404).json({
                success: false,
                error: 'Not Found',
                message: error.message
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Internal Server Error',
                message: 'An unexpected error occurred'
            });
        }
    }

    /**
     * Returns the configured router instance
     */
    getRouter(): Router {
        return this.router;
    }
}