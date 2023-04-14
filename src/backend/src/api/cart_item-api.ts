import express, { Request, Response } from 'express';
import { CartItem } from '../models/CartItem';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { log } from 'console';
//TODO: Uncomment any verbs that are needed.
const router = express.Router();

// GET all cart items in a cart
router.get('/:cartId/cart_items', async (req: Request, res: Response) => {
    const { cartId } = req.params;
    try {
      const cart = await Cart.query().findById(cartId);
      if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
        return;
      }
      const cartItems = await cart.$relatedQuery('cart_items').withGraphFetched('product');
      res.json(cartItems);
    } catch (error) {
        log(error)
      res.status(500).json({ error: 'Unable to retrieve cart items' });
    }
  });
  
  // GET a cart item by ID
  router.get('/:cartId/cart_items/:id', async (req: Request, res: Response) => {
    const { cartId, id } = req.params;
    try {
      const cart = await Cart.query().findById(cartId);
      if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
        return;
      }
      const cartItem = await cart.$relatedQuery('cart_items').findById(id).withGraphFetched('product');
      if (cartItem) {
        res.json(cartItem);
      } else {
        res.status(404).json({ error: 'Cart item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Unable to retrieve cart item' });
    }
  });
 
  // POST a new cart item to a cart
  router.post('/:cartId/cart_items', async (req: Request, res: Response) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;
    try {
      const cart = await Cart.query().findById(cartId);
      if (!cart) {
        res.status(404).json({ error: 'Cart not found' });
        return;
      }
      const product = await Product.query().findById(productId);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      const cartItem = await cart.$relatedQuery('cart_items').insert({
        product_id: productId,
        quantity,
      }).withGraphFetched('product');
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create cart item' });
    }
  });

  // UPDATE a cart item by ID
router.put('/:cart_id/cart_items/:id', async (req: Request, res: Response) => {
    const { cartId, id } = req.params;
    const { productId, quantity } = req.body;
    try {
      const cartItem = await CartItem.query().findOne({ cartId, id });
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      const updatedCartItem = await cartItem.$query().patchAndFetch({ productId, quantity });
      res.json(updatedCartItem);
    } catch (error) {
      res.status(500).json({ error: 'Unable to update cart item' });
    }
  });
  
  // DELETE a cart item by ID
  router.delete('/:cart_id/cart_items/:id', async (req: Request, res: Response) => {
    const { cartId, id } = req.params;
    try {
      const numDeleted = await CartItem.query().findOne({ cartId, id }).delete();
      if (numDeleted === 0) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete cart item' });
    }
  });
  export {router as cartItems}