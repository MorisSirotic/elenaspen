import { Model } from "objection";
import { Product } from "./Product";
import { Order } from "./Order";

export class OrderItem extends Model {
  static get tableName() {
    return "order_items";
  }

  static get relationMappings() {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: "order_items.order_id",
          to: "orders.id",
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: "order_items.product_id",
          to: "products.id",
        },
      },
    };
  }
}
