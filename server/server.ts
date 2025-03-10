import { app } from './server-config';
import { ENV } from '@/config';
import { container } from '@/container';

export { app };

(async () => {
  const logger = await container.resolve('logger');

  if (ENV.NODE_ENV === 'dev') {
    const knex = await container.resolve('knex');
    await knex.raw('SELECT 1 + 1 as VALUE');
    logger.info('DB authenticated');
  }

  const port = ENV.PORT;

  // app.get('/', routes.getAllTodos);
  // app.get('/:id', routes.getTodo);

  // app.post('/', routes.postTodo);
  // app.patch('/:id', routes.patchTodo);

  // app.delete('/', routes.deleteAllTodos);
  // app.delete('/:id', routes.deleteTodo);

  if (ENV.NODE_ENV !== 'test') {
    app.listen(port, () => logger.info(`Listening on port`, { port }));
  }
})();
