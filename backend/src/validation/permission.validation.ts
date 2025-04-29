import { object, string, boolean, array, Schema } from "zod";

export const CreatePermissionSchema = object({
    name: string({ required_error: "Tên quyền không được để trống" }),
    description: string({ required_error: "Mô tả không được để trống" }),
});

export const UpdatePermissionSchema = object({
    description: string({ required_error: "Mô tả không được để trống" }),
});

export const ChangePermissionStatusSchema = object({
    status: boolean({ required_error: "Trạng thái không được để trống" }),
});
