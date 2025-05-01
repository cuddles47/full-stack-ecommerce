import { Types } from "mongoose";
import { IProduct } from "../interfaces/product.interface";
import Product from "../models/product";
import BaseRepository from "./base.repository";

class ProductRepository extends BaseRepository<IProduct> {
  constructor() {
    super(Product);
  }

  async findByCategory(category: string): Promise<IProduct[]> {
    return this.model.find({ category, isActive: true });
  }

  async findActive(): Promise<IProduct[]> {
    return this.model.find({ isActive: true });
  }

  async updateStock(productId: string | Types.ObjectId, quantity: number): Promise<IProduct | null> {
    return this.model.findByIdAndUpdate(
      productId,
      { $inc: { stock: -quantity } },
      { new: true }
    );
  }
}

export default new ProductRepository();