import mongoose, { Schema, model } from "mongoose";
import { IDiscount, DiscountType } from "../interfaces/discount.interface";

const discountSchema = new Schema<IDiscount>(
  {
    code: {
      type: String,
      required: [true, "Discount code is required"],
      unique: true,
      trim: true,
      uppercase: true
    },
    description: {
      type: String,
      required: [true, "Discount description is required"]
    },
    type: {
      type: String,
      required: [true, "Discount type is required"],
      enum: Object.values(DiscountType),
      default: DiscountType.PERCENTAGE
    },
    value: {
      type: Number,
      required: [true, "Discount value is required"],
      min: 0
    },
    minPurchase: {
      type: Number,
      min: 0
    },
    maxDiscount: {
      type: Number,
      min: 0
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      default: Date.now
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"]
    },
    isActive: {
      type: Boolean,
      default: true
    },
    usageLimit: {
      type: Number,
      min: 0
    },
    usageCount: {
      type: Number,
      default: 0,
      min: 0
    },
    applicableProducts: [{
      type: Schema.Types.ObjectId,
      ref: "Product"
    }],
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
discountSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

// Validate percentage discount value is between 0 and 100
discountSchema.pre("validate", function(next) {
  if (this.type === DiscountType.PERCENTAGE && (this.value < 0 || this.value > 100)) {
    this.invalidate('value', 'Percentage discount must be between 0 and 100');
  }
  next();
});

export default model<IDiscount>("Discount", discountSchema);