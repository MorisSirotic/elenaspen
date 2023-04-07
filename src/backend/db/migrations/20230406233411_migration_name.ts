import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.string("first_name");
    table.string("last_name");
    table.string("phone");
    table.string("country");
    table.string("address1");
    table.string("address2");
    table.string("city");
    table.string("zip");
  });

  await knex.schema.createTable("shipping_information", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table.string("first_name");
    table.string("last_name");
    table.string("email").unique();
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
  await knex.schema.dropTableIfExists("shipping_information");

  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("first_name");
    table.dropColumn("last_name");
    table.dropColumn("phone");
    table.dropColumn("country");
    table.dropColumn("address1");
    table.dropColumn("address2");
    table.dropColumn("city");
    table.dropColumn("zip");
  });
}
