import mongoose, { Schema, model } from "mongoose";
import { ICart } from "../interfaces/cart";

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  productSnapshot: {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    sku: { type: String }
  },
  variation: {
    type: Schema.Types.ObjectId,
    ref: "ProductVariation"
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  selectedAttributes: {
    type: Schema.Types.Mixed
  },
  notes: {
    type: String
  }
});

const appliedDiscountSchema = new Schema({
  discountId: {
    type: Schema.Types.ObjectId,
    ref: "Discount",
    required: true
  },
  code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ["percentage", "fixed"]
  },
  value: {
    type: Number,
    required: true
  },
  discountedAmount: {
    type: Number,
    required: true
  }
});

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    items: [cartItemSchema],
    appliedDiscounts: [appliedDiscountSchema],
    subtotal: {
      type: Number,
      required: true,
      default: 0
    },
    discountAmount: {
      type: Number,
      required: true,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0
    },
    status: {
      type: String,
      enum: ['active', 'checkout', 'abandoned'],
      default: 'active'
    },
    lastActivity: {
      type: Date,
      default: Date.now
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    },
    expiresAt: {
      type: Date
    }
  },
  {
    versionKey: false
  }
);

// Update the lastActivity and updated_at field
cartSchema.pre("save", function (next) {
  this.updated_at = new Date();
  this.lastActivity = new Date();
  next();
});

// Calculate the subtotal and totalAmount before saving
cartSchema.pre("save", function (next) {
  // Calculate subtotal
  this.subtotal = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // Calculate discount amount
  if (this.appliedDiscounts && this.appliedDiscounts.length > 0) {
    this.discountAmount = this.appliedDiscounts.reduce((total, discount) => {
      return total + discount.discountedAmount;
    }, 0);
  } else {
    this.discountAmount = 0;
  }

  // Calculate total amount
  this.totalAmount = this.subtotal - this.discountAmount;
  if (this.totalAmount < 0) this.totalAmount = 0;

  next();
});

export default model<ICart>("Cart", cartSchema);
