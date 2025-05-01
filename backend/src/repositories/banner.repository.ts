import { FilterQuery } from "mongoose";
import { Banner } from "../models/banner";
import { IBanner } from "../interfaces/banner.interface";

export class BannerRepository {
    async findById(id: string): Promise<IBanner | null> {
        return Banner.findById(id);
    }

    async findAll(filter: FilterQuery<IBanner> = {}): Promise<IBanner[]> {
        return Banner.find(filter);
    }

    async findActive(): Promise<IBanner[]> {
        return Banner.find({ active: true }).sort({ position: 1 });
    }

    async create(bannerData: Partial<IBanner>): Promise<IBanner> {
        return Banner.create(bannerData);
    }

    async update(id: string, bannerData: Partial<IBanner>): Promise<IBanner | null> {
        return Banner.findByIdAndUpdate(id, bannerData, { new: true });
    }

    async delete(id: string): Promise<IBanner | null> {
        return Banner.findByIdAndDelete(id);
    }
}