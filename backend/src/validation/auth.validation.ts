import { z } from "zod";
import { Gender } from "../enums/gender.enum";

export const LoginUserSchema = z.object({
    username: z.string({ required_error: "Username không được để trống" }),
    password: z.string({ required_error: "Password không được để trống" }),
});

export const ChangeOldPasswordSchema = z
    .object({
        newPassword: z
            .string({ required_error: "Mật khẩu mới không được để trống" })
            .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
        oldPassword: z
            .string({ required_error: "Mật khẩu cũ không được để trống" })
            .min(6, "Mật khẩu cũ phải có ít nhất 6 ký tự"),
    })
    .refine((data) => data.newPassword !== data.oldPassword, {
        message: "Mật khẩu mới không được giống mật khẩu cũ",
        path: ["newPassword"], // This highlights the `newPassword` field in case of an error
    });

export const UpdateProfileSchema = z.object({
    detail_user: z
        .object({
            name: z.string().optional(),
            dob: z.coerce.date().optional(),
            address: z.string().optional(),
            gender: z.nativeEnum(Gender).optional(),
        })
        .optional(),
});
