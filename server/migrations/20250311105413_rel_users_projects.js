
const commonFields = `
id UUID NOT NULL default uuid_generate_v4(),
created_at timestamptz DEFAULT NOW(),
updated_at timestamptz DEFAULT NOW(),
deleted_at timestamptz
`;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const q = `
CREATE TABLE rel_user_project (
  ${commonFields},
	user_id UUID NOT NULL,
  project_id UUID NOT NULL,
  permission TEXT
);
CREATE INDEX rel_user_project_user_id on rel_user_project using btree(user_id);
CREATE INDEX rel_user_project_project_id on rel_user_project using btree(project_id);
  `;
  await knex.raw(q);  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  const q = `
DROP TABLE rel_user_project;
  `;
  knex.raw(q);
};
