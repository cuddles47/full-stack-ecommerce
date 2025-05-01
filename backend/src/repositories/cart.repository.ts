import { Types } from "mongoose";
import { ICart, ICartItem } from "../interfaces/cart";
import Cart from "../models/cart";
import BaseRepository from "./base.repository";

class CartRepository extends BaseRepository<ICart> {
  constructor() {
    super(Cart);
  }

  async findByUserId(userId: string | Types.ObjectId): Promise<ICart | null> {
    return this.model.findOne({ user: userId });
  }

  async createCart(userId: string | Types.ObjectId, items: ICartItem[]): Promise<ICart> {
    const cart = new this.model({
      user: userId,
      items: items
    });
    return await cart.save();
  }

  async updateCart(userId: string | Types.ObjectId, items: ICartItem[]): Promise<ICart | null> {
    const cart = await this.findByUserId(userId);
    
    if (!cart) {
      return null;
    }
    
    cart.items = items;
    return await cart.save();
  }

  async clearCart(userId: string | Types.ObjectId): Promise<ICart | null> {
    const cart = await this.findByUserId(userId);
    
    if (!cart) {
      return null;
    }
    
    cart.items = [];
    return await cart.save();
  }

  async addItemToCart(userId: string | Types.ObjectId, item: ICartItem): Promise<ICart | null> {
    const cart = await this.findByUserId(userId);
    
    if (!cart) {
      return null;
    }
    
    const existingItemIndex = cart.items.findIndex(
      (cartItem) => cartItem.product.toString() === item.product.toString()
    );
    
    if (existingItemIndex > -1) {
      // Update existing item
      cart.items[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      cart.items.push(item);
    }
    
    return await cart.save();
  }

  async removeItemFromCart(userId: string | Types.ObjectId, productId: string | Types.ObjectId): Promise<ICart | null> {
    const cart = await this.findByUserId(userId);
    
    if (!cart) {
      return null;
    }
    
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId.toString()
    );
    
    return await cart.save();
  }

  async updateItemQuantity(
    userId: string | Types.ObjectId, 
    productId: string | Types.ObjectId, 
    quantity: number
  ): Promise<ICart | null> {
    const cart = await this.findByUserId(userId);
    
    if (!cart) {
      return null;
    }
    
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString()
    );
    
    if (itemIndex === -1) {
      return null;
    }
    
    cart.items[itemIndex].quantity = quantity;
    return await cart.save();
  }
}

export default new CartRepository();