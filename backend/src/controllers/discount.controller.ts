import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import discountService from "../services/discount.service";
import BadRequestError from "../errors/bad-request.error";

class DiscountController {
  async getAllDiscounts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const discounts = await discountService.getAllDiscounts();
      res.status(200).json({
        success: true,
        data: discounts
      });
    } catch (error) {
      next(error);
    }
  }

  async getActiveDiscounts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const discounts = await discountService.getActiveDiscounts();
      res.status(200).json({
        success: true,
        data: discounts
      });
    } catch (error) {
      next(error);
    }
  }

  async getDiscountById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id || !Types.ObjectId.isValid(id)) {
        throw new BadRequestError("Valid discount ID is required");
      }
      
      const discount = await discountService.getDiscountById(id);
      res.status(200).json({
        success: true,
        data: discount
      });
    } catch (error) {
      next(error);
    }
  }

  async getDiscountByCode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code } = req.params;
      
      if (!code) {
        throw new BadRequestError("Discount code is required");
      }
      
      const discount = await discountService.getDiscountByCode(code);
      res.status(200).json({
        success: true,
        data: discount
      });
    } catch (error) {
      next(error);
    }
  }

  async createDiscount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const discountData = req.body;
      const discount = await discountService.createDiscount(discountData);
      res.status(201).json({
        success: true,
        data: discount
      });
    } catch (error) {
      next(error);
    }
  }

  async updateDiscount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const discountData = req.body;
      
      if (!id || !Types.ObjectId.isValid(id)) {
        throw new BadRequestError("Valid discount ID is required");
      }
      
      const discount = await discountService.updateDiscount(id, discountData);
      res.status(200).json({
        success: true,
        data: discount
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteDiscount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id || !Types.ObjectId.isValid(id)) {
        throw new BadRequestError("Valid discount ID is required");
      }
      
      const discount = await discountService.deleteDiscount(id);
      res.status(200).json({
        success: true,
        data: discount
      });
    } catch (error) {
      next(error);
    }
  }

  async validateDiscount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code, purchaseAmount, productIds } = req.body;
      const discount = await discountService.validateDiscount(code, purchaseAmount, productIds);
      
      res.status(200).json({
        success: true,
        data: discount
      });
    } catch (error) {
      next(error);
    }
  }

  async applyDiscount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code, purchaseAmount, productIds } = req.body;
      const result = await discountService.applyDiscount(code, purchaseAmount, productIds);
      
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DiscountController();