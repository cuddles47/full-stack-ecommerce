import { Types } from "mongoose";
import { DiscountType } from "./discount.interface";

export interface ICartItem {
  product: Types.ObjectId;
  productSnapshot: {     // Lưu snapshot của sản phẩm tại thời điểm thêm vào giỏ
    name: string;
    price: number;
    image?: string;
    sku?: string;
  };
  variation?: Types.ObjectId;  // Biến thể sản phẩm nếu có
  quantity: number;
  price: number;         // Giá tại thời điểm thêm vào giỏ
  selectedAttributes?: { // Các thuộc tính được chọn (màu sắc, kích cỡ,...)
    [key: string]: string;
  };
  notes?: string;        // Ghi chú cho sản phẩm
}

export interface IAppliedDiscount {
  discountId: Types.ObjectId;
  code: string;
  type: DiscountType;
  value: number;
  discountedAmount: number;
}

export interface ICart {
  user: Types.ObjectId;
  items: ICartItem[];
  appliedDiscounts?: IAppliedDiscount[];
  subtotal: number;      // Tổng tiền trước khi áp dụng giảm giá
  discountAmount: number; // Số tiền được giảm
  totalAmount: number;    // Tổng tiền sau khi áp dụng giảm giá
  status: 'active' | 'checkout' | 'abandoned';  // Trạng thái giỏ hàng
  lastActivity: Date;     // Thời gian hoạt động cuối cùng (để theo dõi giỏ hàng bị bỏ)
  created_at: Date;
  updated_at: Date;
  expiresAt?: Date;      // Thời gian hết hạn của giỏ hàng (tùy chọn)
}