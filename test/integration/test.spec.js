const request = require('supertest');
const app = require('../../src/index');

describe('Insights Service', () => {
  describe('GET /categories', () => {
    it('should return a 501 error', async () => {
      await request(app)
        .get('/insights/categories')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(501, { message: 'Not Implemented' });
    });
  });

  describe('GET /cashflow', () => {
    it('should return a 501 error', async () => {
      await request(app)
        .get('/insights/cashflow')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(501, { message: 'Not Implemented' });
    });
  });
});
