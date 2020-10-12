import request from 'supertest';
import app from '../../../app';

describe('/api/tickets', () => {
  describe('GET', () => {});
  describe('POST', () => {
    it('listens for a post request', async () => {
      const res = await request(app).post('/api/tickets').send({});
      expect(res.status).not.toEqual(404);
    });
    it('is only accessed by authenticated users', async () => {
      await request(app).post('/api/tickets').send({}).expect(401);
      const sessionCookie = global.createSessionCookie();
      const res = await request(app)
        .post('/api/tickets')
        .set('Cookie', sessionCookie)
        .send({});
      expect(res.status).not.toEqual(401);
    });
    it('returns an error if invalid title', async () => {
      const sessionCookie = global.createSessionCookie();
      await request(app)
        .post('/api/tickets')
        .set('Cookie', sessionCookie)
        .send({})
        .expect(400);
      await request(app)
        .post('/api/tickets')
        .set('Cookie', sessionCookie)
        .send({ title: 1234 })
        .expect(400);
    });
    it('returns an error if invalid price', async () => {
      const sessionCookie = global.createSessionCookie();
      await request(app)
        .post('/api/tickets')
        .set('Cookie', sessionCookie)
        .send({})
        .expect(400);
      await request(app)
        .post('/api/tickets')
        .set('Cookie', sessionCookie)
        .send({ price: 1234 })
        .expect(400);
    });
    it('created a ticket with valid inputs', async () => {
      const sessionCookie = global.createSessionCookie();
      await request(app)
        .post('/api/tickets')
        .set('Cookie', sessionCookie)
        .send({})
        .expect(201);
    });
  });
  describe('PUT', () => {});
});

describe('/api/tickets/:id', () => {
  describe('GET', () => {});
});
