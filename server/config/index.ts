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
      'development', 'test', 'production'
    ]
  }),
  POSTGRES_PASSWORD: e.str({ default: 'test', }),
  POSTGRES_USER: e.str({ default: 'test', }),
  POSTGRES_DB: e.str({ default: 'postgres' }),
  POSTGRES_HOST: e.host({ default: '127.0.0.1' }),
  POSTGRES_PORT: e.port({ default: 5416 }),
  JWT_SECRET: e.str({ default: 'kqw$!015AA' }),
});
