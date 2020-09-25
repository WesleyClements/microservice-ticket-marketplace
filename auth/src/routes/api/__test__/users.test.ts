import request from 'supertest';
import app from 'app';

describe('/signup', () => {
  describe('POST', () => {
    it('returns 400 if missing email and/or password', async () => {
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

    it('returns 400 if invalid email', async () => {
      return request(app)
        .post('/api/users/signup')
        .send({ email: 'testtest.com', password: 'password' })
        .expect(400);
    });

    it('returns 400 if invalid password', async () => {
      return request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'pass' })
        .expect(400);
    });

    it('returns 400 if duplicate email', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201);
      return request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(400);
    });

    it('returns 201 if successful', async () => {
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

describe('/signin', () => {
  describe('POST', () => {
    it('returns 400 if missing email and/or password', async () => {
      await Promise.all([
        request(app).post('/api/users/signin').send({}).expect(400),
        request(app)
          .post('/api/users/signin')
          .send({ email: 'test@test.com' })
          .expect(400),
        request(app)
          .post('/api/users/signin')
          .send({ password: 'password' })
          .expect(400),
      ]);
    });

    it('returns 400 if invalid email', async () => {
      return request(app)
        .post('/api/users/signin')
        .send({ email: 'testtest.com', password: 'password' })
        .expect(400);
    });

    it('returns 400 if unregistered email', async () => {
      return request(app)
        .post('/api/users/signin')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(400);
    });

    it('returns 400 if incorrect password', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201);
      return request(app)
        .post('/api/users/signin')
        .send({ email: 'test@test.com', password: 'pass' })
        .expect(400);
    });

    it('returns 200 if valid credentials', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201);
      return request(app)
        .post('/api/users/signin')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(200);
    });

    it('sets a cookie if valid credentials', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201);
      const res = await request(app)
        .post('/api/users/signin')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(200);
      expect(res.get('Set-Cookie')).toBeDefined();
    });
  });
});

describe('/signout', () => {
  describe('POST', () => {
    it('returns 401 if not logged in', async () => {
      return request(app).post('/api/users/signout').send().expect(401);
    });
    it('returns 200 if logged in', async () => {
      const res = await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201);
      return request(app)
        .post('/api/users/signout')
        .set('Cookie', res.get('Set-Cookie'))
        .expect(200);
    });
  });
});
