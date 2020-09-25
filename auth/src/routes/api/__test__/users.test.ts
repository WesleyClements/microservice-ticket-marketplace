import request from 'supertest';
import app from 'app';

describe('/currentuser', () => {
  describe('GET', () => {
    it('responds with { currentUser: null } if not logged in', async () => {
      return request(app)
        .get('/api/users/currentuser')
        .expect(200)
        .expect({ currentUser: null });
    });
    it('responds with { currentUser: *data* } if logged in', async () => {
      const signupRes = await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201);
      const res = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', signupRes.get('Set-Cookie'))
        .expect(200);
      expect(res.body.currentUser).toHaveProperty('role', 'default');
      expect(res.body.currentUser).toHaveProperty('email', 'test@test.com');
    });
  });
});

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
    it('unsets session cookie if logged in', async () => {
      const signupRes = await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201);
      const res = await request(app)
        .post('/api/users/signout')
        .set('Cookie', signupRes.get('Set-Cookie'))
        .expect(200);
      const sessionCookies = res
        .get('Set-Cookie')
        .map((cookieStr) => {
          return cookieStr.split(';').map((section) => section.trim());
        })
        .filter((cookie) =>
          cookie.some((section) => /^express:sess/.test(section))
        );
      expect(sessionCookies).toHaveLength(1);
      expect(sessionCookies[0]).toContain(
        'expires=Thu, 01 Jan 1970 00:00:00 GMT'
      );
    });
  });
});
