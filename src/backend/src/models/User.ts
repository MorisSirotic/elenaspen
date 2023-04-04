import { Model, snakeCaseMappers } from "objection";
import db from "../db";
//TODO Implement password encryption later
Model.knex(db);

export type UserFields = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export class User extends Model implements UserFields {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        email: {
          type: "string",
          pattern: "^[\\w\\d._%+-]+@[\\w\\d.-]+\\.[\\w]{2,}$",
        },
        password: { type: "string" },
      },
    };
  }

  id!: number;
  name!: string;
  email!: string;
  password!: string;
}
