import mongoose from 'mongoose';

export { Ticket } from './models/Ticket';

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
