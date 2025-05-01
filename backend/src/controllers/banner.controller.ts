import { Request, Response, NextFunction } from "express";
import { BannerService } from "../services/banner.service";
import { isValidObjectId } from "mongoose";
import BadRequestError from "../errors/bad-request.error";

export class BannerController {
    private readonly bannerService: BannerService;

    constructor() {
        this.bannerService = new BannerService();
    }

    getAllBanners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const banners = await this.bannerService.getBanners();
            
            res.status(200).json({
                success: true,
                data: banners
            });
        } catch (error) {
            next(error);
        }
    };

    getActiveBanners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const banners = await this.bannerService.getActiveBanners();
            
            res.status(200).json({
                success: true,
                data: banners
            });
        } catch (error) {
            next(error);
        }
    };

    getBannerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            
            if (!id || !isValidObjectId(id)) {
                throw new BadRequestError("Valid banner ID is required");
            }
            
            const banner = await this.bannerService.getBannerById(id);
            
            res.status(200).json({
                success: true,
                data: banner
            });
        } catch (error) {
            next(error);
        }
    };

    createBanner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bannerData = req.body;
            const banner = await this.bannerService.createBanner(bannerData);
            
            res.status(201).json({
                success: true,
                data: banner
            });
        } catch (error) {
            next(error);
        }
    };

    updateBanner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const bannerData = req.body;
            
            if (!id || !isValidObjectId(id)) {
                throw new BadRequestError("Valid banner ID is required");
            }
            
            const banner = await this.bannerService.updateBanner(id, bannerData);
            
            res.status(200).json({
                success: true,
                data: banner
            });
        } catch (error) {
            next(error);
        }
    };

    deleteBanner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            
            if (!id || !isValidObjectId(id)) {
                throw new BadRequestError("Valid banner ID is required");
            }
            
            const banner = await this.bannerService.deleteBanner(id);
            
            res.status(200).json({
                success: true,
                data: banner
            });
        } catch (error) {
            next(error);
        }
    };

    changeBannerStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const { active } = req.body;
            
            if (!id || !isValidObjectId(id)) {
                throw new BadRequestError("Valid banner ID is required");
            }
            
            if (typeof active !== 'boolean') {
                throw new BadRequestError("Active status must be a boolean");
            }
            
            const banner = await this.bannerService.changeBannerStatus(id, active);
            
            res.status(200).json({
                success: true,
                data: banner
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new BannerController();