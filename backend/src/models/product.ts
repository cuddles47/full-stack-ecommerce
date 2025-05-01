import mongoose, { Schema, model } from "mongoose";
import { IProduct } from "../interfaces/product.interface";
import slugify from "slugify";

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
    salePrice: {
      type: Number,
      min: 0
    },
    cost: {
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
      required: [true, "Product stock is required"],
      min: 0,
      default: 0
    },
    images: {
      type: [String],
      default: []
    },
    thumbnail: {
      type: String
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"]
    },
    brand: {
      type: String
    },
    tags: {
      type: [String]
    },
    attributes: {
      type: Schema.Types.Mixed
    },
    variations: [{
      type: Schema.Types.ObjectId,
      ref: "ProductVariation"
    }],
    weight: {
      type: Number
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
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
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Tạo index cho tìm kiếm
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Cập nhật updated_at và tự động tạo slug nếu chưa có
productSchema.pre("save", function (next) {
  this.updated_at = new Date();
  
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true });
  }
  
  next();
});

// Cập nhật thumbnail nếu chưa có nhưng có images
productSchema.pre("save", function (next) {
  if (!this.thumbnail && this.images && this.images.length > 0) {
    this.thumbnail = this.images[0];
  }
  next();
});

// Virtual for checking if product is on sale
productSchema.virtual('isOnSale').get(function() {
  return this.salePrice !== undefined && this.salePrice < this.price;
});

// Virtual for current price (either sale price if available or regular price)
productSchema.virtual('currentPrice').get(function() {
  return (this.isOnSale && this.salePrice !== undefined) ? this.salePrice : this.price;
});

export default model<IProduct>("Product", productSchema);