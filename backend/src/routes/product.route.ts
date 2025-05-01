import { Router } from "express";
import productController from "../controllers/product.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { validateCreateProduct, validateUpdateProduct } from "../validation/product.validation";

const router = Router();

// Public routes
router.get("/active", productController.getActiveProducts);
router.get("/category/:category", productController.getProductsByCategory);
router.get("/:id", productController.getProductById);

// Protected routes
router.use(authMiddleware);

// Admin routes
router.get("/", permissionMiddleware(["read_product", "manage_product"]), productController.getAllProducts);
router.post("/", permissionMiddleware(["create_product", "manage_product"]), validateCreateProduct, productController.createProduct);
router.put("/:id", permissionMiddleware(["update_product", "manage_product"]), validateUpdateProduct, productController.updateProduct);
router.delete("/:id", permissionMiddleware(["delete_product", "manage_product"]), productController.deleteProduct);

export default router;