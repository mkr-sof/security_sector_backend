exports.up = function (knex) {
  return knex.schema.createTable('items', (table) => {
    table.increments('id').primary();
    table.string('category').notNullable(); //sheet
    table.string('series').nullable();
    table.string('model').nullable();
    table.string('picture_url').nullable();
    table.string('resolution').nullable();
    table.text('features').nullable();
    table.text('description').nullable();
    table.decimal('dealer_price', 10, 2).nullable();
    table.decimal('sales_price', 10, 2).nullable();
    table.jsonb('attributes').defaultTo("{}");
    table.timestamps(true, true); // created_at и updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('items');
};

