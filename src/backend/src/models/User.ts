export type UserProps = {
  id: number;
  name: string;
  email: string;
  password: string;
};

import { Model } from "objection";
import knexfile from "../../knexfile";
import knex from "knex";
import db from "../db";

Model.knex(db);

export class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        email: { type: "string",  pattern: "^[\\w\\d._%+-]+@[\\w\\d.-]+\\.[\\w]{2,}$"},
        password: { type: "string" },
      },
    };
  }
}
