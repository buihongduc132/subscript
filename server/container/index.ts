import {
  createTypedContainer
} from './container.helper';

import {
  asValue, asFunction, asClass
} from 'awilix';

import { logger } from '@/helpers/logger';
import { Logger } from 'winston';

export const container = createTypedContainer({
  logger: asValue(logger),
});

export type Cradle = {
  logger: Logger
}