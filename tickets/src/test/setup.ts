import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { createJWT, UserRole } from '@wkctickets/common/auth';

declare global {
  namespace NodeJS {
    interface Global {
      createSessionCookie: (role?: UserRole) => string[];
    }
  }
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdfasdf';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.disconnect();
});

global.createSessionCookie = (role = 'default') => {
  const payload = {
    id: '123123',
    email: 'test@test.test',
    role,
  };
  const session = { jwt: createJWT(payload) };
  const encoded = Buffer.from(JSON.stringify(session)).toString('base64');
  return [`express:sess=${encoded}`];
};
