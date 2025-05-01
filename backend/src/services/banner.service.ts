import { FilterQuery } from "mongoose";
import { BannerRepository } from "../repositories/banner.repository";
import { IBanner } from "../interfaces/banner.interface";
import NotFoundError from "../errors/not-found.error";

export class BannerService {
    private readonly bannerRepository: BannerRepository;

    constructor() {
        this.bannerRepository = new BannerRepository();
    }

    async getBanners(filter: FilterQuery<IBanner> = {}): Promise<IBanner[]> {
        return this.bannerRepository.findAll(filter);
    }

    async getActiveBanners(): Promise<IBanner[]> {
        return this.bannerRepository.findActive();
    }

    async getBannerById(id: string): Promise<IBanner> {
        const banner = await this.bannerRepository.findById(id);
        
        if (!banner) {
            throw new NotFoundError("Banner not found");
        }
        
        return banner;
    }

    async createBanner(bannerData: Partial<IBanner>): Promise<IBanner> {
        return this.bannerRepository.create(bannerData);
    }

    async updateBanner(id: string, bannerData: Partial<IBanner>): Promise<IBanner> {
        const updatedBanner = await this.bannerRepository.update(id, bannerData);
        
        if (!updatedBanner) {
            throw new NotFoundError("Banner not found");
        }
        
        return updatedBanner;
    }

    async deleteBanner(id: string): Promise<IBanner> {
        const deletedBanner = await this.bannerRepository.delete(id);
        
        if (!deletedBanner) {
            throw new NotFoundError("Banner not found");
        }
        
        return deletedBanner;
    }

    async changeBannerStatus(id: string, active: boolean): Promise<IBanner> {
        return this.updateBanner(id, { active });
    }
}