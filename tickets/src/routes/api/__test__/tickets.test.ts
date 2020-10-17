import request from 'supertest';
import app from 'app';
import mongoose from 'mongoose';
import { Ticket } from 'db';

const createTicket = (
  { title, price }: { title: string; price: number },
  cookie?: string[]
) => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', cookie || global.createSessionCookie())
    .send({ title, price })
    .expect(201);
};

describe('/api/tickets', () => {
  describe('GET', () => {
    it('listens for a get request', async () => {
      const res = await request(app).get('/api/tickets').send();
      expect(res.status).not.toEqual(404);
    });
    it('returns a list of tickets', async () => {
      const postRes = await Promise.all([
        createTicket({ title: 'title1', price: 140 }),
        createTicket({ title: 'title2', price: 1200 }),
        createTicket({ title: 'title3', price: 234 }),
      ]);
      const res = await request(app).get('/api/tickets').send();
      expect(res.body).toHaveLength(3);
    });
  });
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
  describe('PUT', () => {
    it('listens for a put request', async () => {
      const res = await request(app).put('/api/tickets').send({});
      expect(res.status).not.toEqual(404);
    });
    it('is only accessed by authenticated users', async () => {
      await request(app).put('/api/tickets').send({}).expect(401);
      const res = await request(app)
        .put('/api/tickets')
        .set('Cookie', global.createSessionCookie())
        .send({});
      expect(res.status).not.toEqual(401);
    });
    it('returns a 404 if invalid id', async () => {
      await request(app)
        .put('/api/tickets')
        .set('Cookie', global.createSessionCookie())
        .send({ id: new mongoose.Types.ObjectId(), title: 'cat', price: 100 })
        .expect(404);
    });
    it('returns a 400 if invalid title or price', async () => {
      await Promise.all([
        request(app)
          .put('/api/tickets')
          .set('Cookie', global.createSessionCookie())
          .send({ title: '' })
          .expect(400),
        request(app)
          .put('/api/tickets')
          .set('Cookie', global.createSessionCookie())
          .send({ price: '' })
          .expect(400),
        request(app)
          .put('/api/tickets')
          .set('Cookie', global.createSessionCookie())
          .send({ title: '', price: '' })
          .expect(400),
      ]);
    });
    it('does not update ticket if user does not own ticket', async () => {
      const [cookie1, cookie2] = [
        global.createSessionCookie(),
        global.createSessionCookie(),
      ];
      const ticketRes = await createTicket(
        { title: 'original', price: 1200 },
        cookie1
      );
      await request(app)
        .put('/api/tickets')
        .set('Cookie', cookie2)
        .send({ id: ticketRes.body.id, title: 'changedFailure' })
        .expect(403);
    });
    it('updates ticket if user owns the ticket', async () => {
      const cookie = global.createSessionCookie();
      const ticketRes = await createTicket(
        { title: 'original', price: 1200 },
        cookie
      );
      const successRes = await request(app)
        .put('/api/tickets')
        .set('Cookie', cookie)
        .send({ id: ticketRes.body.id, title: 'changedSuccess' })
        .expect(200);
      expect(successRes.body).toHaveProperty('title', 'changedSuccess');
      expect(await Ticket.findById(ticketRes.body.id)).toHaveProperty(
        'title',
        'changedSuccess'
      );
    });
  });
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
      const postRes = await createTicket({ title: 'title', price: 1200 });
      const getRes = await request(app)
        .get('/api/tickets/' + postRes.body.id)
        .send()
        .expect(200);
      expect(getRes.body.id).toEqual(postRes.body.id);
    });
  });
});
