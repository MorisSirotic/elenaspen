import { Model, snakeCaseMappers } from "objection";
import db from "../db";
import { Cart } from "./Cart";
import { Product } from "./Product";

Model.knex(db);

interface CartItemFields {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
}

export class CartItem extends Model implements CartItemFields {
  static get tableName() {
    return "cart_items";
  }
  static get columnNameMappers() {
    return snakeCaseMappers();
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

  id!: number;
  cartId!: number;
  productId!: number;
  quantity!: number;
}
