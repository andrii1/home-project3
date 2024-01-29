/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('topics', (table) => {
    table.renameColumn('description', 'meta_description');
    table.dropNullable('meta_description');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('topics', (table) => {
    table.setNullable('meta_description');
    table.renameColumn('meta_description', 'description');
  });
};
