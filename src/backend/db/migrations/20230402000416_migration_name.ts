import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
  });

  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.decimal('price').notNullable();
    table.integer('stock').notNullable();
  });

  await knex.schema.createTable('carts', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('cart_items', (table) => {
    table.increments('id').primary();
    table.integer('cart_id').notNullable().unsigned().references('id').inTable('carts').onDelete('CASCADE');
    table.integer('product_id').notNullable().unsigned().references('id').inTable('products').onDelete('CASCADE');
    table.integer('quantity').notNullable();
    table.unique(['cart_id', 'product_id']);
  });

  await knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.decimal('total_amount').notNullable();
    table.string('shipping_address').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('order_items', (table) => {
    table.increments('id').primary();
    table.integer('order_id').notNullable().unsigned().references('id').inTable('orders').onDelete('CASCADE');
    table.integer('product_id').notNullable().unsigned().references('id').inTable('products').onDelete('CASCADE');
    table.integer('quantity').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('order_items');
  await knex.schema.dropTableIfExists('orders');
  await knex.schema.dropTableIfExists('cart_items');
  await knex.schema.dropTableIfExists('carts');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('users');
}
