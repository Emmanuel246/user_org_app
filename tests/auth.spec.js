const request = require('supertest');
const app = require('../server');
const sequelize = require('../config/database');

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Clear and re-sync database
});

afterAll(async () => {
  await sequelize.close(); // Close database connection
});

describe('Auth Endpoints', () => {
  it('should register a user successfully with default organisation', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        userId: 'user1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      });


  console.log('Registration Response:', res.body);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('user');
  });

  it('should log the user in successfully', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data).toHaveProperty('user');
  });

  it('should fail if required fields are missing', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'John',
        email: 'john2@example.com',
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('errors');
  });

  it('should fail if there’s a duplicate email or userId', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        userId: 'user1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('status', 'Bad request');
  });
});
