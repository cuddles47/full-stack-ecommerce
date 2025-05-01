import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/bad-request.error";

export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().min(0).default(0),
    images: Joi.array().items(Joi.string()),
    category: Joi.string().required(),
    isActive: Joi.boolean().default(true)
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    throw new BadRequestError(error.details.map(err => err.message).join(", "));
  }
  
  return next();
};

export const validateUpdateProduct = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().positive(),
    stock: Joi.number().min(0),
    images: Joi.array().items(Joi.string()),
    category: Joi.string(),
    isActive: Joi.boolean()
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    throw new BadRequestError(error.details.map(err => err.message).join(", "));
  }
  
  return next();
};