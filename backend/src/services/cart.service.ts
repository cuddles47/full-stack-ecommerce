import { Types } from "mongoose";
import { ICart, ICartItem } from "../interfaces/cart";
import cartRepository from "../repositories/cart.repository";
import productService from "../services/product.service";
import NotFoundError from "../errors/not-found.error";

class CartService {
  async getUserCart(userId: string | Types.ObjectId): Promise<ICart> {
    const cart = await cartRepository.findByUserId(userId);
    
    if (!cart) {
      // If cart doesn't exist, create an empty one
      return await cartRepository.createCart(userId, []);
    }
    
    return cart;
  }

  async createOrUpdateCart(userId: string | Types.ObjectId, items: ICartItem[]): Promise<ICart> {
    // Validate all products exist and have sufficient stock
    for (const item of items) {
      await productService.checkStock(item.product, item.quantity);
      
      // Get the current price of the product
      const product = await productService.getProductById(item.product);
      item.price = product.price;
    }

    const existingCart = await cartRepository.findByUserId(userId);
    
    if (!existingCart) {
      // Create new cart
      return await cartRepository.createCart(userId, items);
    } else {
      // Update existing cart
      const updatedCart = await cartRepository.updateCart(userId, items);
      if (!updatedCart) {
        throw new NotFoundError("Cart not found");
      }
      return updatedCart;
    }
  }

  async clearCart(userId: string | Types.ObjectId): Promise<ICart> {
    const cart = await cartRepository.clearCart(userId);
    
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }
    
    return cart;
  }

  async addItemToCart(userId: string | Types.ObjectId, item: ICartItem): Promise<ICart> {
    // Check if product exists and has sufficient stock
    await productService.checkStock(item.product, item.quantity);
    
    // Get the current price of the product
    const product = await productService.getProductById(item.product);
    item.price = product.price;
    
    const cart = await cartRepository.addItemToCart(userId, item);
    
    if (!cart) {
      // If cart doesn't exist, create a new one with this item
      return await cartRepository.createCart(userId, [item]);
    }
    
    return cart;
  }

  async removeItemFromCart(userId: string | Types.ObjectId, productId: string | Types.ObjectId): Promise<ICart> {
    const cart = await cartRepository.removeItemFromCart(userId, productId);
    
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }
    
    return cart;
  }

  async updateItemQuantity(
    userId: string | Types.ObjectId, 
    productId: string | Types.ObjectId, 
    quantity: number
  ): Promise<ICart> {
    // Check if product exists and has sufficient stock
    await productService.checkStock(productId, quantity);
    
    const cart = await cartRepository.updateItemQuantity(userId, productId, quantity);
    
    if (!cart) {
      throw new NotFoundError("Cart or item not found");
    }
    
    return cart;
  }
}

export default new CartService();