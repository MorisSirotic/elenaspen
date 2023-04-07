import { Model, snakeCaseMappers } from "objection";
import db from "../db";

Model.knex(db);

export type ShippingInformationFields = {
  id: number;
  user_id: number;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  zip?: string | null;
  created_at?: Date;
  updated_at?: Date;
};

export class ShippingInformation
  extends Model
  implements ShippingInformationFields
{
  static get tableName() {
    return "shipping_information";
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
        user_id: { type: "integer" },
        first_name: { type: ["string", "null"] },
        last_name: { type: ["string", "null"] },
        email: {
          type: ["string", "null"],
          pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$",
          uniqueItems: true,
        },
        phone: { type: ["string", "null"] },
        country: { type: ["string", "null"] },
        address1: { type: ["string", "null"] },
        address2: { type: ["string", "null"] },
        city: { type: ["string", "null"] },
        zip: { type: ["string", "null"] },
        created_at: { type: "string" },
        updated_at: { type: "string" },
      },
    };
  }

  id!: number;
  user_id!: number;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  zip?: string | null;
  created_at?: Date;
  updated_at?: Date;
}
