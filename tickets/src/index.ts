import app from 'app';
import { connectToDB } from 'db';

import { checkEnv } from '@wkctickets/common/util';

(async () => {
  checkEnv('JWT_KEY', 'MONGO_URI');

  const PORT = process.env.PORT || 3000;

  try {
    await connectToDB();

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
