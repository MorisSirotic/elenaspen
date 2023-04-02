import { Model } from "objection";
import db from "../db";

Model.knex(db);

export class Product extends Model {
  static get tableName() {
    return "products";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "description", "price", "stock"],
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number", minimum: 0 },
        stock: { type: "integer", minimum: 0 },
      },
    };
  }
}
