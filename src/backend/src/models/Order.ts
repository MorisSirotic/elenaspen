import { Model, snakeCaseMappers } from "objection";
import { User } from "./User";
import { OrderItem } from "./OrderItem";
import db from "../db";

Model.knex(db);

interface OrderFields {
  id: number;
  userId: number;
  totalAmount: number;
  shippingAddress: string;
}

export class Order extends Model implements OrderFields {
  static get tableName() {
    return "orders";
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "orders.user_id",
          to: "users.id",
        },
      },
      items: {
        relation: Model.HasManyRelation,
        modelClass: OrderItem,
        join: {
          from: "orders.id",
          to: "order_items.order_id",
        },
      },
    };
  }

  id!: number;
  userId!: number;
  totalAmount!: number;
  shippingAddress!: string;
}
