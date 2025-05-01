import { Router } from "express";
import discountController from "../controllers/discount.controller";
import authMiddleware from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { validateCreateDiscount, validateUpdateDiscount, validateApplyDiscount } from "../validation/discount.validation";

const router = Router();

// Public routes
router.get("/active", discountController.getActiveDiscounts);
router.get("/code/:code", discountController.getDiscountByCode);
router.post("/validate", validateApplyDiscount, discountController.validateDiscount);
router.post("/apply", validateApplyDiscount, discountController.applyDiscount);

// Protected routes
router.use(authMiddleware);

// Admin routes
router.get("/", permissionMiddleware(["read_discount", "manage_discount"]), discountController.getAllDiscounts);
router.get("/:id", permissionMiddleware(["read_discount", "manage_discount"]), discountController.getDiscountById);
router.post("/", permissionMiddleware(["create_discount", "manage_discount"]), validateCreateDiscount, discountController.createDiscount);
router.put("/:id", permissionMiddleware(["update_discount", "manage_discount"]), validateUpdateDiscount, discountController.updateDiscount);
router.delete("/:id", permissionMiddleware(["delete_discount", "manage_discount"]), discountController.deleteDiscount);

export default router;