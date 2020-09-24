import mongoose from 'mongoose';

export { User } from './models/User';

export const connectToDB = () =>
  mongoose
    .connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Connected to mongodb');
    })
    .catch((err) => {
      console.error(err);
    });
