import { Types } from "mongoose";
import { IDiscount, DiscountType } from "../interfaces/discount.interface";
import discountRepository from "../repositories/discount.repository";
import NotFoundError from "../errors/not-found.error";
import BadRequestError from "../errors/bad-request.error";

class DiscountService {
  async getAllDiscounts(): Promise<IDiscount[]> {
    return discountRepository.findAll();
  }

  async getActiveDiscounts(): Promise<IDiscount[]> {
    return discountRepository.findActiveDiscounts();
  }

  async getDiscountById(id: string | Types.ObjectId): Promise<IDiscount> {
    const discount = await discountRepository.findById(id);
    if (!discount) {
      throw new NotFoundError(`Discount with id ${id} not found`);
    }
    return discount;
  }

  async getDiscountByCode(code: string): Promise<IDiscount> {
    const discount = await discountRepository.findByCode(code);
    if (!discount) {
      throw new NotFoundError(`Discount with code ${code} not found`);
    }
    return discount;
  }

  async createDiscount(discountData: Partial<IDiscount>): Promise<IDiscount> {
    // Check if discount code already exists
    const existingDiscount = await discountRepository.findByCode(discountData.code || "");
    if (existingDiscount) {
      throw new BadRequestError(`Discount code ${discountData.code} already exists`);
    }
    
    return discountRepository.create(discountData);
  }

  async updateDiscount(id: string | Types.ObjectId, discountData: Partial<IDiscount>): Promise<IDiscount> {
    // If code is being updated, check if it already exists
    if (discountData.code) {
      const existingDiscount = await discountRepository.findByCode(discountData.code);
      if (existingDiscount && existingDiscount._id!.toString() !== id.toString()) {
        throw new BadRequestError(`Discount code ${discountData.code} already exists`);
      }
    }
    
    const discount = await discountRepository.update(id, discountData);
    if (!discount) {
      throw new NotFoundError(`Discount with id ${id} not found`);
    }
    return discount;
  }

  async deleteDiscount(id: string | Types.ObjectId): Promise<IDiscount> {
    const discount = await discountRepository.delete(id);
    if (!discount) {
      throw new NotFoundError(`Discount with id ${id} not found`);
    }
    return discount;
  }

  async validateDiscount(code: string, purchaseAmount: number, productIds?: (string | Types.ObjectId)[]): Promise<IDiscount> {
    const discount = await discountRepository.findByCode(code);
    
    if (!discount) {
      throw new BadRequestError(`Invalid discount code: ${code}`);
    }
    
    const now = new Date();
    
    // Check if discount is active
    if (!discount.isActive) {
      throw new BadRequestError('This discount code is inactive');
    }
    
    // Check if discount is within valid date range
    if (discount.startDate > now || discount.endDate < now) {
      throw new BadRequestError('This discount code has expired or is not yet active');
    }
    
    // Check if usage limit has been reached
    if (discount.usageLimit && discount.usageCount >= discount.usageLimit) {
      throw new BadRequestError('This discount code has reached its usage limit');
    }
    
    // Check if purchase meets minimum amount requirement
    if (discount.minPurchase && purchaseAmount < discount.minPurchase) {
      throw new BadRequestError(`This discount requires a minimum purchase of ${discount.minPurchase}`);
    }
    
    // Check if discount is applicable to the products
    if (discount.applicableProducts && discount.applicableProducts.length > 0 && productIds && productIds.length > 0) {
      const hasApplicableProduct = productIds.some(pid => 
        discount.applicableProducts!.some(ap => ap.toString() === pid.toString())
      );
      
      if (!hasApplicableProduct) {
        throw new BadRequestError('This discount is not applicable to the selected products');
      }
    }
    
    return discount;
  }

  async applyDiscount(code: string, purchaseAmount: number, productIds?: (string | Types.ObjectId)[]): Promise<{ discountedAmount: number, discount: IDiscount }> {
    const discount = await this.validateDiscount(code, purchaseAmount, productIds);
    
    let discountedAmount = 0;
    
    if (discount.type === DiscountType.PERCENTAGE) {
      discountedAmount = (purchaseAmount * discount.value) / 100;
      
      // Apply maximum discount limit if it exists
      if (discount.maxDiscount && discountedAmount > discount.maxDiscount) {
        discountedAmount = discount.maxDiscount;
      }
    } else {
      // Fixed amount discount
      discountedAmount = discount.value;
      
      // Ensure discount doesn't exceed purchase amount
      if (discountedAmount > purchaseAmount) {
        discountedAmount = purchaseAmount;
      }
    }
    
    // Increment usage count
    await discountRepository.incrementUsage(discount._id!);
    
    return {
      discountedAmount,
      discount
    };
  }
}

export default new DiscountService();