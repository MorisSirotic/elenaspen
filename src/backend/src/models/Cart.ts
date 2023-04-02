import { Model } from "objection";
import db from "../db";

Model.knex(db);

export class Cart extends Model {
    static get tableName() {
      return 'carts';
    }
  
    static get relationMappings() {
      const User = require('./User');
      const CartItem = require('./CartItem');
  
      return {
        user: {
          relation: Model.BelongsToOneRelation,
          modelClass: User,
          join: {
            from: 'carts.user_id',
            to: 'users.id',
          },
        },
        items: {
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