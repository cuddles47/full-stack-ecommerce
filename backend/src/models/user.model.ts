import { Schema, model } from "mongoose";
import { IDetailUser, IUser } from "../interfaces/user.interface";
import { Gender } from "../enums/gender.enum";

const detailSchema = new Schema<IDetailUser>(
  {
    name: { type: String, required: [true, "Tên là bắt buộc!"] },
    avatar: { type: String },
    dob: { type: Date },
    address: { type: String },
    gender: {
      type: Number,
      enum: Object.values(Gender),
      required: [true, "Giới tính là bắt buộc!"],
    },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Tên tài khoản là bắt buộc!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email là bắt buộc!"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Mật khẩu là bắt buộc!"],
      select: false,
    },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: Boolean, default: true },
    refresh_token: { type: String, default: null, select: false },
    detail_user: { type: detailSchema, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const UserModel = model<IUser>("User", userSchema);
