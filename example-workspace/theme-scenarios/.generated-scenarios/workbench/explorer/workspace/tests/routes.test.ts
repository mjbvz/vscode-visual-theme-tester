import request from 'supertest';
import { createApp } from '../src/app';

describe('User Routes', () => {
  let app: any;
  
  beforeEach(async () => {
    app = await createApp();
  });
  
  it('GET /api/users should return users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);
      
    expect(Array.isArray(response.body)).toBe(true);
  });
});