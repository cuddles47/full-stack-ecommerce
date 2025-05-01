import { Types } from "mongoose";

export interface IProduct {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  salePrice?: number;  // Giá khuyến mãi
  cost?: number;       // Giá nhập (cho quản lý nội bộ)
  sku: string;         // Stock Keeping Unit - Mã sản phẩm
  barcode?: string;    // Mã vạch sản phẩm
  stock: number;
  images: string[];
  thumbnail?: string;  // Ảnh đại diện chính
  category: Types.ObjectId;  // Tham chiếu đến Category
  brand?: string;      // Thương hiệu
  tags?: string[];     // Tags để dễ tìm kiếm
  attributes?: {       // Các thuộc tính động
    [key: string]: string | number | boolean;
  };
  variations?: Types.ObjectId[];  // Các biến thể sản phẩm (màu sắc, kích cỡ,...)
  weight?: number;     // Cân nặng (cho vận chuyển)
  dimensions?: {       // Kích thước (cho vận chuyển)
    length?: number;
    width?: number;
    height?: number;
  };
  isActive: boolean;
  isFeatured?: boolean;  // Sản phẩm nổi bật
  avgRating?: number;    // Đánh giá trung bình
  reviewCount?: number;  // Số lượng đánh giá
  slug: string;          // URL-friendly name
  created_at: Date;
  updated_at: Date;
}