import mongoose, { Schema, model } from "mongoose";
import { IProductVariation } from "../interfaces/product-variation.interface";

const productVariationSchema = new Schema<IProductVariation>(
  {
    parentProduct: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    attributes: {
      type: Schema.Types.Mixed,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    salePrice: {
      type: Number,
      min: 0
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    barcode: {
      type: String,
      trim: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    images: [{
      type: String
    }],
    isActive: {
      type: Boolean,
      default: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

// Update the updated_at field
productVariationSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

export default model<IProductVariation>("ProductVariation", productVariationSchema);