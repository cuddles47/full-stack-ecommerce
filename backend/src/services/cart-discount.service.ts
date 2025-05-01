import { Types } from "mongoose";
import { ICart, IAppliedDiscount } from "../interfaces/cart";
import { DiscountType } from "../interfaces/discount.interface";
import cartRepository from "../repositories/cart.repository";
import discountService from "../services/discount.service";
import productService from "../services/product.service";
import NotFoundError from "../errors/not-found.error";
import BadRequestError from "../errors/bad-request.error";

class CartDiscountService {
  /**
   * Áp dụng mã giảm giá vào giỏ hàng
   */
  async applyDiscountToCart(userId: string | Types.ObjectId, discountCode: string): Promise<ICart> {
    // Tìm giỏ hàng hiện tại của người dùng
    const cart = await cartRepository.findByUserId(userId);
    
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }
    
    if (cart.items.length === 0) {
      throw new BadRequestError("Cannot apply discount to empty cart");
    }
    
    // Kiểm tra nếu mã giảm giá đã được áp dụng
    if (cart.appliedDiscounts && cart.appliedDiscounts.some(d => d.code === discountCode)) {
      throw new BadRequestError(`Discount code ${discountCode} is already applied to this cart`);
    }
    
    // Lấy danh sách ID của các sản phẩm trong giỏ hàng
    const productIds = cart.items.map(item => item.product);
    
    // Xác thực mã giảm giá và tính toán số tiền được giảm
    const subtotal = cart.subtotal || this.calculateSubtotal(cart);
    const discountResult = await discountService.applyDiscount(discountCode, subtotal, productIds);
    
    // Tạo bản ghi về việc áp dụng mã giảm giá
    const appliedDiscount: IAppliedDiscount = {
      discountId: discountResult.discount._id!,
      code: discountResult.discount.code,
      type: discountResult.discount.type,
      value: discountResult.discount.value,
      discountedAmount: discountResult.discountedAmount
    };
    
    // Thêm mã giảm giá vào giỏ hàng
    if (!cart.appliedDiscounts) {
      cart.appliedDiscounts = [];
    }
    cart.appliedDiscounts.push(appliedDiscount);
    
    // Cập nhật các giá trị liên quan đến giảm giá
    cart.discountAmount = (cart.discountAmount || 0) + discountResult.discountedAmount;
    cart.totalAmount = subtotal - cart.discountAmount;
    if (cart.totalAmount < 0) cart.totalAmount = 0;
    
    // Lưu giỏ hàng
    await cart.save();
    
    return cart;
  }
  
  /**
   * Xóa mã giảm giá đã áp dụng khỏi giỏ hàng
   */
  async removeDiscountFromCart(userId: string | Types.ObjectId, discountCode: string): Promise<ICart> {
    // Tìm giỏ hàng hiện tại của người dùng
    const cart = await cartRepository.findByUserId(userId);
    
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }
    
    // Kiểm tra xem mã giảm giá có trong giỏ hàng không
    if (!cart.appliedDiscounts || cart.appliedDiscounts.length === 0) {
      throw new BadRequestError("No discounts applied to this cart");
    }
    
    const discountIndex = cart.appliedDiscounts.findIndex(d => d.code === discountCode);
    
    if (discountIndex === -1) {
      throw new BadRequestError(`Discount code ${discountCode} is not applied to this cart`);
    }
    
    // Lấy thông tin về mã giảm giá cần xóa
    const removedDiscount = cart.appliedDiscounts[discountIndex];
    
    // Xóa mã giảm giá
    cart.appliedDiscounts.splice(discountIndex, 1);
    
    // Cập nhật số tiền giảm giá
    cart.discountAmount = (cart.discountAmount || 0) - removedDiscount.discountedAmount;
    if (cart.discountAmount < 0) cart.discountAmount = 0;
    
    // Tính lại tổng tiền
    cart.totalAmount = cart.subtotal - cart.discountAmount;
    if (cart.totalAmount < 0) cart.totalAmount = 0;
    
    // Lưu giỏ hàng
    await cart.save();
    
    return cart;
  }
  
  /**
   * Xóa tất cả mã giảm giá đã áp dụng khỏi giỏ hàng
   */
  async clearDiscountsFromCart(userId: string | Types.ObjectId): Promise<ICart> {
    // Tìm giỏ hàng hiện tại của người dùng
    const cart = await cartRepository.findByUserId(userId);
    
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }
    
    // Xóa tất cả mã giảm giá
    cart.appliedDiscounts = [];
    cart.discountAmount = 0;
    cart.totalAmount = cart.subtotal;
    
    // Lưu giỏ hàng
    await cart.save();
    
    return cart;
  }
  
  /**
   * Tính lại giá trị giỏ hàng sau khi cập nhật sản phẩm hoặc số lượng
   */
  async recalculateCart(userId: string | Types.ObjectId): Promise<ICart> {
    // Tìm giỏ hàng hiện tại của người dùng
    const cart = await cartRepository.findByUserId(userId);
    
    if (!cart) {
      throw new NotFoundError("Cart not found");
    }
    
    // Tính lại subtotal
    cart.subtotal = this.calculateSubtotal(cart);
    
    // Nếu có mã giảm giá, tính lại giá trị giảm giá
    if (cart.appliedDiscounts && cart.appliedDiscounts.length > 0) {
      // Lưu lại các mã giảm giá hiện tại để áp dụng lại
      const currentDiscounts = [...cart.appliedDiscounts];
      cart.appliedDiscounts = [];
      cart.discountAmount = 0;
      
      // Áp dụng lại từng mã giảm giá
      for (const discount of currentDiscounts) {
        try {
          // Lấy danh sách ID của các sản phẩm trong giỏ hàng
          const productIds = cart.items.map(item => item.product);
          
          // Xác thực lại mã giảm giá với giá trị giỏ hàng mới
          const discountResult = await discountService.applyDiscount(
            discount.code,
            cart.subtotal - cart.discountAmount, // Subtotal còn lại sau khi áp dụng các mã giảm giá trước đó
            productIds
          );
          
          // Cập nhật thông tin mã giảm giá
          const appliedDiscount: IAppliedDiscount = {
            discountId: discountResult.discount._id!,
            code: discountResult.discount.code,
            type: discountResult.discount.type,
            value: discountResult.discount.value,
            discountedAmount: discountResult.discountedAmount
          };
          
          // Thêm mã giảm giá vào giỏ hàng
          cart.appliedDiscounts.push(appliedDiscount);
          cart.discountAmount += discountResult.discountedAmount;
        } catch (error) {
          // Nếu mã giảm giá không còn hợp lệ, bỏ qua
          console.log(`Discount ${discount.code} is no longer valid and was removed from cart`);
        }
      }
    }
    
    // Tính lại tổng tiền
    cart.totalAmount = cart.subtotal - cart.discountAmount;
    if (cart.totalAmount < 0) cart.totalAmount = 0;
    
    // Lưu giỏ hàng
    await cart.save();
    
    return cart;
  }
  
  /**
   * Tính tổng tiền của giỏ hàng dựa trên các sản phẩm
   */
  private calculateSubtotal(cart: ICart): number {
    return cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
}

export default new CartDiscountService();