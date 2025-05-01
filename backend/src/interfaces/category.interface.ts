import { Types } from "mongoose";

export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  slug: string;
  parentCategory?: Types.ObjectId;
  image?: string;
  isActive: boolean;
  level: number;        // Cấp độ trong phân cấp danh mục
  order?: number;       // Thứ tự hiển thị
  created_at: Date;
  updated_at: Date;
}