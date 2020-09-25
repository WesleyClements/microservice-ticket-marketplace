import request from 'supertest';
import app from 'app';

it('return a 201 on successfil signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
});
