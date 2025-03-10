import dotenv from 'dotenv';
import * as e from 'envalid';

dotenv.config();

export const ENV = e.cleanEnv(process.env, {
  PORT: e.port({ default: 5555 }),
  NODE_ENV: e.str({
    choices: [
      'dev', 'test', 'prod'
    ]
  });
});