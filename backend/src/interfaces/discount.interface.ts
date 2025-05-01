import { Types } from "mongoose";

export enum DiscountType {
  PERCENTAGE = "percentage",
  FIXED = "fixed"
}

export interface IDiscount {
  _id?: Types.ObjectId;
  code: string;
  description: string;
  type: DiscountType;
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
  applicableProducts?: Types.ObjectId[];
  created_at: Date;
  updated_at: Date;
}