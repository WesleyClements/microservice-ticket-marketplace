import app from 'app';
import { connectToDB } from 'db';

(async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  const PORT = process.env.PORT || 3000;

  await connectToDB();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})();
