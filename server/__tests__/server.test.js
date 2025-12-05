const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Server Tests', () => {
  beforeAll(async () => {
    // Connect to test database if needed
    // For now, we'll just test the app without database
  });

  afterAll(async () => {
    // Close database connection
    await mongoose.connection.close();
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('environment');
    });
  });

  describe('GET /api/todos', () => {
    it('should return todos array', async () => {
      const response = await request(app)
        .get('/api/todos')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);

      expect(response.body).toHaveProperty('message', 'Route not found');
    });
  });
});