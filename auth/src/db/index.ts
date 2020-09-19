import mongoose from 'mongoose';

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

export { User } from './models/User';
