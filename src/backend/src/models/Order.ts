import { Model } from "objection";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

export class Order extends Model {
  static get tableName() {
    return "orders";
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
}
