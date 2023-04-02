import { Model } from "objection";
import db from "../db";
import { CartItem } from "./CartItem";
import { User } from "./User";

Model.knex(db);

export class Cart extends Model {
    static get tableName() {
      return 'carts';
    }
  
    static get relationMappings() {
      return {
        user: {
          relation: Model.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: 'carts.user_id',
            to: 'users.id',
          },
        },
        cart_items: {
          relation: Model.HasManyRelation,
          modelClass: CartItem,
          join: {
            from: 'carts.id',
            to: 'cart_items.cart_id',
          },
        },
      };
    }
  }