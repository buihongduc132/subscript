import { knex } from 'knex';
export const getKnex = (connectionOpt) => {
  return knex({
    connection: connectionOpt,
    client: 'pg',
    pool: {
      min: 2,
      max: 10
    },
  });
}