import { Router } from "express";
import cartController from "../controllers/cart.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateCreateCart, validateUpdateCart, validateAddCartItem, validateUpdateCartItem } from "../validation/cart.validation";

const router = Router();

// All cart routes require authentication
router.use(authMiddleware);

// Get user's cart
router.get("/", cartController.getCart);

// Create or update cart
router.post("/", validateCreateCart, cartController.createOrUpdateCart);

// Update cart
router.put("/", validateUpdateCart, cartController.createOrUpdateCart);

// Clear cart
router.delete("/", cartController.clearCart);

// Add item to cart
router.post("/item", validateAddCartItem, cartController.addItemToCart);

// Remove item from cart
router.delete("/item/:productId", cartController.removeItemFromCart);

// Update item quantity
router.patch("/item/:productId", validateUpdateCartItem, cartController.updateItemQuantity);

export default router;