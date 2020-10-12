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
    describe('request body', () => {
      describe('title', () => {
        it('returns an error if title is not provided', async () => {
          const sessionCookie = global.createSessionCookie();
          await request(app)
            .post('/api/tickets')
            .set('Cookie', sessionCookie)
            .send({
              price: '1200',
            })
            .expect(400);
        });
        it('returns an error if title is not a string', async () => {
          const sessionCookie = global.createSessionCookie();
          await request(app)
            .post('/api/tickets')
            .set('Cookie', sessionCookie)
            .send({ title: 1234, price: '1200' })
            .expect(400);
        });
        it('returns an error if title is an empty string', async () => {
          const sessionCookie = global.createSessionCookie();
          await request(app)
            .post('/api/tickets')
            .set('Cookie', sessionCookie)
            .send({ title: '', price: '1200' })
            .expect(400);
        });
      });
      describe('price', () => {
        it('returns an error if price is not provided', async () => {
          const sessionCookie = global.createSessionCookie();
          await request(app)
            .post('/api/tickets')
            .set('Cookie', sessionCookie)
            .send({
              title: 'title',
            })
            .expect(400);
        });
        it('returns an error if price is not a string', async () => {
          const sessionCookie = global.createSessionCookie();
          await request(app)
            .post('/api/tickets')
            .set('Cookie', sessionCookie)
            .send({
              title: 'title',
              price: 1200,
            })
            .expect(400);
        });
        it('returns an error if price is an empty string', async () => {
          const sessionCookie = global.createSessionCookie();
          await request(app)
            .post('/api/tickets')
            .set('Cookie', sessionCookie)
            .send({
              title: 'title',
              price: '',
            })
            .expect(400);
        });
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
  });
  describe('PUT', () => {});
});

describe('/api/tickets/:id', () => {
  describe('GET', () => {});
});
