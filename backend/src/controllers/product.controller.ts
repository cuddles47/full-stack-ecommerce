import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import productService from "../services/product.service";
import BadRequestError from "../errors/bad-request.error";

class ProductController {
  async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      next(error);
    }
  }

  async getActiveProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await productService.getActiveProducts();
      res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id || !Types.ObjectId.isValid(id)) {
        throw new BadRequestError("Valid product ID is required");
      }
      
      const product = await productService.getProductById(id);
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductsByCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { category } = req.params;
      
      if (!category) {
        throw new BadRequestError("Category is required");
      }
      
      const products = await productService.getProductsByCategory(category);
      res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productData = req.body;
      const product = await productService.createProduct(productData);
      res.status(201).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const productData = req.body;
      
      if (!id || !Types.ObjectId.isValid(id)) {
        throw new BadRequestError("Valid product ID is required");
      }
      
      const product = await productService.updateProduct(id, productData);
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id || !Types.ObjectId.isValid(id)) {
        throw new BadRequestError("Valid product ID is required");
      }
      
      const product = await productService.deleteProduct(id);
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();