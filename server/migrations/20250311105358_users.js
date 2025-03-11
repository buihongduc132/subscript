
const commonFields = `
id UUID NOT NULL default uuid_generate_v4(),
created_at timestamptz DEFAULT NOW(),
updated_at timestamptz DEFAULT NOW(),
deleted_at timestamptz`;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const q = `
CREATE TABLE users (
  ${commonFields},
	email TEXT,
  password TEXT
);
CREATE UNIQUE INDEX users_email on users using btree(email);
  `;
  await knex.raw(q);  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  const q = `
DROP TABLE users;
  `;
  knex.raw(q);
};
