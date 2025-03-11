import { ENV } from '@/config';

import {
  createTypedContainer
} from './container.helper';

import {
  asValue, asFunction, asClass
} from 'awilix';

import { getKnex  } from '@/database/connection';
import { getRepos } from './stack/repo';
import { getServices } from './stack/service';

import { logger } from '@/helpers/logger';
import { Logger } from 'winston';

export const container = createTypedContainer({
  logger: asValue(logger),
  knex: asFunction(() => {
    const k = getKnex({
      password: ENV.POSTGRES_PASSWORD,
      user: ENV.POSTGRES_USER,
      database: ENV.POSTGRES_DB,
      host: ENV.POSTGRES_HOST,
      port: ENV.POSTGRES_PORT,
    });
    return k;
  }).singleton(),
  repo: asFunction((c) => {
    return getRepos(c);
  }).singleton(),
  service: asFunction((c) => getServices(c)).singleton(),
});

export type Cradle = {
  logger: Logger,
  knex: ReturnType<typeof getKnex>
  repo: ReturnType<typeof getRepos>
  service: ReturnType<typeof getServices>
}
