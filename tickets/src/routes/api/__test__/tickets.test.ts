import request from 'supertest';
import app from 'app';
import mongoose from 'mongoose';
import { Ticket } from 'db';

describe('/api/tickets', () => {
  describe('GET', () => {});
  describe('POST', () => {
    it('listens for a post request', async () => {
      const res = await request(app).post('/api/tickets').send({});
      expect(res.status).not.toEqual(404);
    });
    it('is only accessed by authenticated users', async () => {
      await request(app).post('/api/tickets').send({}).expect(401);
      const res = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.createSessionCookie())
        .send({});
      expect(res.status).not.toEqual(401);
    });
    describe('request body', () => {
      const validTitle = 'This is a valid title';
      const validPrice = 1200;
      describe('title', () => {
        it('returns an error if title is not provided', async () => {
          await request(app)
            .post('/api/tickets')
            .set('Cookie', global.createSessionCookie())
            .send({
              price: validPrice,
            })
            .expect(400);
        });
        it('returns an error if title is an empty string', async () => {
          await request(app)
            .post('/api/tickets')
            .set('Cookie', global.createSessionCookie())
            .send({ title: '', price: validPrice })
            .expect(400);
        });
        it('returns an error if title is not a string', async () => {
          await request(app)
            .post('/api/tickets')
            .set('Cookie', global.createSessionCookie())
            .send({ title: 1234, price: validPrice })
            .expect(400);
        });
      });
      describe('price', () => {
        it('returns an error if price is not provided', async () => {
          await request(app)
            .post('/api/tickets')
            .set('Cookie', global.createSessionCookie())
            .send({
              title: validTitle,
            })
            .expect(400);
        });
        it('returns an error if price is an empty string', async () => {
          await request(app)
            .post('/api/tickets')
            .set('Cookie', global.createSessionCookie())
            .send({
              title: validTitle,
              price: '',
            })
            .expect(400);
        });
        it('returns an error if price is not a number', async () => {
          await request(app)
            .post('/api/tickets')
            .set('Cookie', global.createSessionCookie())
            .send({
              title: validTitle,
              price: 'cat',
            })
            .expect(400);
        });
        it('returns an error if price is less than 0', async () => {
          await request(app)
            .post('/api/tickets')
            .set('Cookie', global.createSessionCookie())
            .send({
              title: validTitle,
              price: '-1',
            })
            .expect(400);
        });
        it('returns an error if price is equal to 0', async () => {
          await request(app)
            .post('/api/tickets')
            .set('Cookie', global.createSessionCookie())
            .send({
              title: validTitle,
              price: '0',
            })
            .expect(400);
        });
      });
      it('created a ticket with valid inputs', async () => {
        expect((await Ticket.find({})).length).toEqual(0);
        await request(app)
          .post('/api/tickets')
          .set('Cookie', global.createSessionCookie())
          .send({
            title: validTitle,
            price: validPrice,
          })
          .expect(201);
        const tickets = await Ticket.find({});
        expect(tickets.length).toEqual(1);
        expect(tickets[0].title).toEqual(validTitle);
        expect(tickets[0].price).toEqual(validPrice);
      });
    });
  });
  describe('PUT', () => {});
});

describe('/api/tickets/:id', () => {
  describe('GET', () => {
    it('returns 404 if invalid id', async () => {
      await request(app)
        .get('/api/tickets/' + new mongoose.Types.ObjectId())
        .send()
        .expect(404);
    });
    it('returns a ticket if valid id', async () => {
      const postRes = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.createSessionCookie())
        .send({ title: 'title', price: 1200 })
        .expect(201);
      const getRes = await request(app)
        .get('/api/tickets/' + postRes.body.id)
        .send()
        .expect(200);
      expect(getRes.body.id).toEqual(postRes.body.id);
    });
  });
});
