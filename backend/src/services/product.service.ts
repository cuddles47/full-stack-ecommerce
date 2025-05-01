import { Types } from "mongoose";
import { IProduct } from "../interfaces/product.interface";
import productRepository from "../repositories/product.repository";
import NotFoundError from "../errors/not-found.error";
import BadRequestError from "../errors/bad-request.error";

class ProductService {
  async getAllProducts(): Promise<IProduct[]> {
    return productRepository.findAll();
  }

  async getActiveProducts(): Promise<IProduct[]> {
    return productRepository.findActive();
  }

  async getProductById(id: string | Types.ObjectId): Promise<IProduct> {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    return product;
  }

  async getProductsByCategory(category: string): Promise<IProduct[]> {
    return productRepository.findByCategory(category);
  }

  async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    return productRepository.create(productData);
  }

  async updateProduct(id: string | Types.ObjectId, productData: Partial<IProduct>): Promise<IProduct> {
    const product = await productRepository.update(id, productData);
    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    return product;
  }

  async deleteProduct(id: string | Types.ObjectId): Promise<IProduct> {
    const product = await productRepository.delete(id);
    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    return product;
  }

  async checkStock(productId: string | Types.ObjectId, quantity: number): Promise<boolean> {
    const product = await this.getProductById(productId);
    
    if (!product.isActive) {
      throw new BadRequestError('Product is not active');
    }
    
    if (product.stock < quantity) {
      throw new BadRequestError('Not enough stock available');
    }
    
    return true;
  }

  async updateStock(productId: string | Types.ObjectId, quantity: number): Promise<IProduct> {
    await this.checkStock(productId, quantity);
    
    const product = await productRepository.updateStock(productId, quantity);
    if (!product) {
      throw new NotFoundError(`Product with id ${productId} not found`);
    }
    
    return product;
  }
}

export default new ProductService();