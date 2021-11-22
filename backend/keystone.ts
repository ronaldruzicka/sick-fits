import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

import { User } from './schemas/user';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // TODO: add data seeding here
  },
  lists: createSchema({
    User,
  }),
  ui: {
    // TODO: change for roles
    isAccessAllowed: () => true,
  },
  // TODO: add session values here
});
