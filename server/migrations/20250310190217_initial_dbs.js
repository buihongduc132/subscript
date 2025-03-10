
const commonFields = `
id UUID NOT NULL default uuid_generate_v4(),
created_at timestamptz DEFAULT NOW(),
updated_at timestamptz DEFAULT NOW(),
deleted_at timestamptz
`;

const createGinIndex = (tableName, fields) => {
  return `CREATE INDEX ${tableName}_${fields.join('_')} on ${tableName} using gin(to_tsvector('english', ${fields.join(', ')}));`
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const q = `
CREATE TABLE projects (
  ${commonFields},
	name TEXT,
  org_id UUID,
  config JSONB
);
${createGinIndex('projects', ['name'])}
CREATE INDEX projects_org_id on projects using btree(org_id);

CREATE TABLE project_stages (
  ${commonFields},
	name TEXT,
  project_id UUID,
  config JSONB
);
CREATE INDEX project_stages_org_id on project_stages using btree(project_id);
  `;
  await knex.raw(q);  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  const q = `
DROP TABLE projects;
DROP TABLE project_stages;
  `;
  knex.raw(q);
};
