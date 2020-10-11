import mongoose from 'mongoose';

export { User } from './models/User';

export const connectToDB = () =>
  mongoose
    .connect('mongodb://tickets-mongo-srv:27017/tickets', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Connected to mongodb');
    });
