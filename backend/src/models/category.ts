import slugify from 'slugify';
import mongoose, { Schema, model } from "mongoose";
import { ICategory } from "../interfaces/category.interface";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true
    },
    description: {
      type: String
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category"
    },
    image: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    level: {
      type: Number,
      default: 1
    },
    order: {
      type: Number,
      default: 0
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
categorySchema.pre("save", function (next) {
  this.updated_at = new Date();

  // Automatically generate slug from name if not provided
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true });
  }

  next();
});

// Update level based on parent category
categorySchema.pre("save", async function (next) {
  if (this.parentCategory) {
    try {
      const parentCategory = await model("Category").findById(this.parentCategory);
      if (parentCategory) {
        this.level = parentCategory.level + 1;
      }
    } catch (err) {
      next(err as Error);
    }
  } else {
    this.level = 1;
  }
  next();
});

export default model<ICategory>("Category", categorySchema);