import { Schema, model } from "mongoose";
import { IBanner } from "../interfaces/banner.interface";

const bannerSchema = new Schema<IBanner>(
    {
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        description: { type: String, required: true },
        buttonText: { type: String, required: true },
        buttonLink: { type: String, required: true },
        imagePath: { type: String, required: true },
        bgColor: { type: String, required: true, default: "from-gray-900 to-black" },
        active: { type: Boolean, default: true },
        position: { type: Number, default: 0 },
    },
    {
        timestamps: true,
        versionKey: false,
        // Giữ lại tính năng biến đổi _id thành id trong JSON
        // để các API vẫn trả về id như trước
        toJSON: {
            virtuals: true,
            transform: (_, ret) => {
                ret.id = ret._id;
                delete ret._id;
                return ret;
            },
        },
        // Thêm toObject transform để đảm bảo tính nhất quán
        toObject: {
            virtuals: true,
            transform: (_, ret) => {
                ret.id = ret._id;
                delete ret._id;
                return ret;
            },
        },
    }
);

export const Banner = model<IBanner>("Banner", bannerSchema);