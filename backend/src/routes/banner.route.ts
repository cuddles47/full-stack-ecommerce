import { Router } from "express";
import bannerController from "../controllers/banner.controller";
import authMiddleware from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { Permissions } from "../enums/permissions.enum";
import accessHistoryMiddleware from "../middleware/access_log.middleware";
import asyncHandler from "express-async-handler";

const router = Router();

// Public route - Lấy các banner đang active
router.get("/active", asyncHandler(bannerController.getActiveBanners));

// Protected routes - Cần đăng nhập và có quyền
router.use(authMiddleware);

// Admin routes - Quản lý banner
router.get("/", 
    [permissionMiddleware([Permissions.LIST_ALL_BANNERS]), accessHistoryMiddleware], 
    asyncHandler(bannerController.getAllBanners)
);

router.get("/:id", 
    [permissionMiddleware([Permissions.GET_BANNER]), accessHistoryMiddleware], 
    asyncHandler(bannerController.getBannerById)
);

router.post("/", 
    [permissionMiddleware([Permissions.ADD_BANNER]), accessHistoryMiddleware], 
    asyncHandler(bannerController.createBanner)
);

router.put("/:id", 
    [permissionMiddleware([Permissions.EDIT_BANNER]), accessHistoryMiddleware], 
    asyncHandler(bannerController.updateBanner)
);

router.delete("/:id", 
    [permissionMiddleware([Permissions.DELETE_BANNER]), accessHistoryMiddleware], 
    asyncHandler(bannerController.deleteBanner)
);

router.put("/:id/status", 
    [permissionMiddleware([Permissions.CHANGE_STATUS_BANNER]), accessHistoryMiddleware],
    asyncHandler(bannerController.changeBannerStatus)
);

export default router;