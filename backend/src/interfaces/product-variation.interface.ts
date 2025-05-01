import { Types } from "mongoose";

export interface IProductVariation {
  _id?: Types.ObjectId;
  parentProduct: Types.ObjectId;
  name: string;
  attributes: {
    [key: string]: string;  // Ví dụ: { color: "Red", size: "XL" }
  };
  price: number;
  salePrice?: number;
  sku: string;
  barcode?: string;
  stock: number;
  images: string[];
  isActive: boolean;
  created_at: Date;
  updated_at: Date;
}