import request from 'supertest';
import app from 'app';

describe('/api/users/signup', () => {
  describe('POST', () => {
    it('returns a 400 if missing email and/or password', async () => {
      await Promise.all([
        request(app).post('/api/users/signup').send({}).expect(400),
        request(app)
          .post('/api/users/signup')
          .send({ email: 'test@test.com' })
          .expect(400),
        request(app)
          .post('/api/users/signup')
          .send({ password: 'password' })
          .expect(400),
      ]);
    });

    it('returns a 400 if invalid email', async () => {
      return request(app)
        .post('/api/users/signup')
        .send({ email: 'testtest.com', password: 'password' })
        .expect(400);
    });

    it('returns a 400 if invalid password', async () => {
      return request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'pass' })
        .expect(400);
    });

    it('returns a 400 if duplicate email', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201);
      return request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(400);
    });

    it('returns a 201 if successful', async () => {
      return request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201);
    });

    it('sets a cookie if successful', async () => {
      const res = await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201);
      expect(res.get('Set-Cookie')).toBeDefined();
    });
  });
});
