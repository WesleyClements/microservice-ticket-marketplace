import mongoose from 'mongoose';

export { User } from './models/User';

export const connectToDB = () =>
  mongoose
    .connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Connected to mongodb');
    });
