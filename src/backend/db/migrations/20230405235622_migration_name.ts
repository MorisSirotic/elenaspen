import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("email").unique();
    table.string("password");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.text("description");
    table.decimal("price");
    table.integer("stock");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("carts", (table) => {
    table.increments("id").primary();
    table.integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("cart_items", (table) => {
    table.increments("id").primary();
    table.integer("cart_id")
      .unsigned()
      .references("id")
      .inTable("carts")
      .onDelete("CASCADE");
    table.integer("product_id")
      .unsigned()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");
    table.integer("quantity");
    table.unique(["cart_id", "product_id"]);
    table.timestamps(true, true);
  });

  await knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.decimal("total_amount");
    table.string("shipping_address");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("order_items", (table) => {
    table.increments("id").primary();
    table.integer("order_id")
      .unsigned()
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
    table.integer("product_id")
      .unsigned()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");
    table.integer("quantity");
    table.timestamps(true, true);
  });

  await knex.schema.createTable("guests", (table) => {
    table.increments("id").primary();
    table.integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("first_name");
    table.string("last_name");
    table.string("email").index();
    table.string("phone");
    table.string("country");
    table.string("address1");
    table.string("address2");
    table.string("city");
    table.string("zip");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("guests");
  await knex.schema.dropTableIfExists("order_items");
  await knex.schema.dropTableIfExists("orders");
  await knex.schema.dropTableIfExists("cart_items");
  await knex.schema.dropTableIfExists("carts");
  await knex.schema.dropTableIfExists("products");
  await knex.schema.dropTableIfExists("users");
}
