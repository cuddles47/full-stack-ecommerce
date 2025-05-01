import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import cartService from "../services/cart.service";
import BadRequestError from "../errors/bad-request.error";
import { IUser } from "../interfaces/user.interface";

// Extend the Express Request interface to include user
interface AuthenticatedRequest extends Request {
  user?: IUser;
}

class CartController {
  async getCart(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?._id;
      
      if (!userId) {
        throw new BadRequestError("User ID is required");
      }

      const cart = await cartService.getUserCart(userId);
      
      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  async createOrUpdateCart(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?._id;
      const { items } = req.body;
      
      if (!userId) {
        throw new BadRequestError("User ID is required");
      }

      const cart = await cartService.createOrUpdateCart(userId, items);
      
      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  async clearCart(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?._id;
      
      if (!userId) {
        throw new BadRequestError("User ID is required");
      }

      const cart = await cartService.clearCart(userId);
      
      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  async addItemToCart(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?._id;
      const item = req.body;
      
      if (!userId) {
        throw new BadRequestError("User ID is required");
      }

      const cart = await cartService.addItemToCart(userId, item);
      
      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeItemFromCart(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?._id;
      const { productId } = req.params;
      
      if (!userId) {
        throw new BadRequestError("User ID is required");
      }

      if (!productId || !Types.ObjectId.isValid(productId)) {
        throw new BadRequestError("Valid product ID is required");
      }

      const cart = await cartService.removeItemFromCart(userId, productId);
      
      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateItemQuantity(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?._id;
      const { productId } = req.params;
      const { quantity } = req.body;
      
      if (!userId) {
        throw new BadRequestError("User ID is required");
      }

      if (!productId || !Types.ObjectId.isValid(productId)) {
        throw new BadRequestError("Valid product ID is required");
      }

      const cart = await cartService.updateItemQuantity(userId, productId, quantity);
      
      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();