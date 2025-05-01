import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/bad-request.error";
import { DiscountType } from "../interfaces/discount.interface";

export const validateCreateDiscount = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    code: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().valid(...Object.values(DiscountType)).required(),
    value: Joi.number().positive().required()
      .when('type', {
        is: DiscountType.PERCENTAGE,
        then: Joi.number().min(0).max(100)
      }),
    minPurchase: Joi.number().min(0),
    maxDiscount: Joi.number().min(0),
    startDate: Joi.date().default(new Date()),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    isActive: Joi.boolean().default(true),
    usageLimit: Joi.number().integer().min(0),
    applicableProducts: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    throw new BadRequestError(error.details.map(err => err.message).join(", "));
  }
  
  return next();
};

export const validateUpdateDiscount = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    code: Joi.string(),
    description: Joi.string(),
    type: Joi.string().valid(...Object.values(DiscountType)),
    value: Joi.number().positive()
      .when('type', {
        is: DiscountType.PERCENTAGE,
        then: Joi.number().min(0).max(100)
      }),
    minPurchase: Joi.number().min(0),
    maxDiscount: Joi.number().min(0),
    startDate: Joi.date(),
    endDate: Joi.date().greater(Joi.ref('startDate')),
    isActive: Joi.boolean(),
    usageLimit: Joi.number().integer().min(0),
    usageCount: Joi.number().integer().min(0),
    applicableProducts: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    throw new BadRequestError(error.details.map(err => err.message).join(", "));
  }
  
  return next();
};

export const validateApplyDiscount = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    code: Joi.string().required(),
    purchaseAmount: Joi.number().positive().required(),
    productIds: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    throw new BadRequestError(error.details.map(err => err.message).join(", "));
  }
  
  return next();
};