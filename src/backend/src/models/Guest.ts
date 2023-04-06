import { Model, snakeCaseMappers } from "objection";
import { User } from "./User";

export class Guest extends Model {
  static get tableName() {
    return "guests";
  }
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  id!: number;
  userId!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  country!: string;
  address1!: string;
  address2?: string;
  city!: string;
  zip!: string;

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        userId: { type: "integer" },
        firstName: { type: "string", minLength: 1, maxLength: 255 },
        lastName: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        phone: { type: "string", minLength: 1, maxLength: 255 },
        country: { type: "string", minLength: 1, maxLength: 255 },
        address1: { type: "string", minLength: 1, maxLength: 255 },
        address2: { type: ["string", "null"], maxLength: 255 },
        city: { type: "string", minLength: 1, maxLength: 255 },
        zip: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "guests.user_id",
          to: "users.id",
        },
      },
    };
  }
}
