if (!process.env.JWT_KEY) {
  throw new Error('JWT_KEY must be defined');
}

import { app } from 'app';

import 'db';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
