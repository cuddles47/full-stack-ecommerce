import { Types } from "mongoose";
import { IDiscount } from "../interfaces/discount.interface";
import Discount from "../models/discount";
import { BaseRepository } from "./base.repository";

class DiscountRepository extends BaseRepository<IDiscount> {
  constructor() {
    super(Discount);
  }

  async findByCode(code: string): Promise<IDiscount | null> {
    return Discount.findOne({ code: code.toUpperCase() });
  }

  async findActiveDiscounts(): Promise<IDiscount[]> {
    const now = new Date();
    return Discount.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now }
    });
  }

  async incrementUsage(id: string | Types.ObjectId): Promise<IDiscount | null> {
    return Discount.findByIdAndUpdate(
      id,
      { $inc: { usageCount: 1 } },
      { new: true }
    );
  }

  async findValidForProducts(productIds: (string | Types.ObjectId)[]): Promise<IDiscount[]> {
    const now = new Date();
    return Discount.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
      $or: [
        { applicableProducts: { $exists: false } },
        { applicableProducts: { $size: 0 } },
        { applicableProducts: { $in: productIds } }
      ]
    });
  }
}

export default new DiscountRepository();