import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/bad-request.error";

export const validateCreateCart = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          product: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
          quantity: Joi.number().integer().min(1).required(),
          // Price will be fetched from product service automatically
          price: Joi.number().min(0)
        })
      )
      .min(1)
      .required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    throw new BadRequestError(error.details.map(err => err.message).join(", "));
  }
  
  return next();
};

export const validateUpdateCart = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          product: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
          quantity: Joi.number().integer().min(1).required(),
          // Price will be fetched from product service automatically
          price: Joi.number().min(0)
        })
      )
      .min(1)
      .required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    throw new BadRequestError(error.details.map(err => err.message).join(", "));
  }
  
  return next();
};

export const validateAddCartItem = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    product: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    quantity: Joi.number().integer().min(1).required(),
    // Price is optional as it will be fetched from product service
    price: Joi.number().min(0)
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    throw new BadRequestError(error.details.map(err => err.message).join(", "));
  }
  
  return next();
};

export const validateUpdateCartItem = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    quantity: Joi.number().integer().min(1).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    throw new BadRequestError(error.details.map(err => err.message).join(", "));
  }
  
  return next();
};