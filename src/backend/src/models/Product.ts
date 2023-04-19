import { Model, snakeCaseMappers } from "objection";
import db from "../db";

Model.knex(db);

interface ProductFields {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export class Product extends Model implements ProductFields {
  static get tableName() {
    return "products";
  }
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number", minimum: 0 },
        stock: { type: "integer" },
      },
    };
  }

  id!: string;
  name!: string;
  description!: string;
  price!: number;
  stock!: number;
}
