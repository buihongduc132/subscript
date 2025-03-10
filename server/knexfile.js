/* 
  Update with your config settings.
  The test database and development database are by default the same.
  Knex also allows for easy switching between databases. 
  But the .returning() method will only work for postgres, MSSQL, and Oracle databases.
*/
require('dotenv').config();
const env = process.env.NODE_ENV;
const client = 'pg';
const confMap = {
  test: {
    client,
    connection: {
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  dev: {
    client,
    connection: {
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client,
    connection: {
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  prod: {
    client,
    connection: {
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

const conf = confMap[env];
console.log(',,,conf', { conf, env });

module.exports = conf;