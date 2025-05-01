import { Document, Types } from "mongoose";

export interface IBanner extends Document {
    _id: Types.ObjectId;
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    imagePath: string;
    bgColor: string;
    active: boolean;
    position: number;
    createdAt: Date;
    updatedAt: Date;
}