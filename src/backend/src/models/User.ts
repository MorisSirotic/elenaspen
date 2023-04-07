import { Model, snakeCaseMappers } from "objection";
import db from "../db";
import Ajv from "ajv";

Model.knex(db);

export type UserFields = {
  id: number;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  last_name?: string | null;
  phone?: string | null;
  country?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  zip?: string | null;
  created_at?: Date;
  updated_at?: Date;
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
      properties: {
        id: { type: "integer" },
        name: { type: ["string", "null"] },
        email: {
          type: "string",
          pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$",
          uniqueItems: true,
        },
        password: { type: ["string", "null"] },
        last_name: { type: ["string", "null"] },
        phone: { type: ["string", "null"] },
        country: { type: ["string", "null"] },
        address1: { type: ["string", "null"] },
        address2: { type: ["string", "null"] },
        city: { type: ["string", "null"] },
        zip: { type: ["string", "null"] },
        created_at: { type: "string"},
        updated_at: { type: "string"},
      },
    };
  }

  id!: number;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  last_name?: string | null;
  phone?: string | null;
  country?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  zip?: string | null;
  created_at?: Date;
  updated_at?: Date;
}
