import { app } from './server-config';
import { ENV } from '@/config';
import { container } from '@/container';

export { app };

(async () => {
  const logger = await container.resolve('logger');
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
