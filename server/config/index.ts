import dotenv from 'dotenv';
import * as e from 'envalid';

dotenv.config();

export const ENV = e.cleanEnv(process.env, {
  PORT: e.port({ default: 5555 }),
  LOG_LEVEL: e.str({
    default: 'info',
    choices: [
      'info', 'warn', 'critical', 'debug', 'verbose',
    ]
  }),
  APP_NAME: e.str({ default: 'subscript-main' }),
  NODE_ENV: e.str({
    choices: [
      'dev', 'test', 'prod'
    ]
  })
});
