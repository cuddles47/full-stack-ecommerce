import mongoose, { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Product description is required"]
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: 0,
      default: 0
    },
    images: {
      type: [String],
      default: []
    },
    category: {
      type: String,
      required: [true, "Product category is required"]
    },
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
productSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

export default model<IProduct>("Product", productSchema);