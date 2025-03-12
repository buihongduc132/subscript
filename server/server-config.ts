
// require('dotenv').config()

import express from 'express';
import bodyParser from 'body-parser';
import { v1Route } from './router';
import { applyHealthRouth } from './router';
import { applyAuthRoute } from './router/auth';
import { addErrorToRequestLog, unexpectedRequest } from './middleware/errorHandler';
import { ENV } from '@/config';
import { container } from '@/container';


const startAppServer = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  const logger = container.resolve('logger');

  const port = ENV.PORT;

  applyHealthRouth(app);
  applyAuthRoute(app);

  v1Route.applyProjectRoute(app);
  v1Route.applyUserRoute(app);

  app.use(addErrorToRequestLog)
  app.use(unexpectedRequest);

  if (ENV.NODE_ENV !== 'test') {
    app.listen(port, () => logger.info(`Listening on port`, { port }));
  }

  return app;
};

export { startAppServer };