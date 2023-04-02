import { Model } from "objection";
import { Product } from "./Product";
import db from "../db";
import { Cart } from "./Cart";

Model.knex(db);

export class CartItem extends Model {
  static get tableName() {
    return "cart_items";
  }

  static get relationMappings() {
    return {
      cart: {
        relation: Model.BelongsToOneRelation,
        modelClass: Cart,
        join: {
          from: "cart_items.cart_id",
          to: "carts.id",
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: "cart_items.product_id",
          to: "products.id",
        },
      },
    };
  }
}
