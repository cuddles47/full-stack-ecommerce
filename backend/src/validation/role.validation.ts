import { object, string, boolean, array } from "zod";
import { FindQuerySchema } from "./find-query.validation";

export const CreateRoleSchema = object({
    name: string({ required_error: "Tên vai trò không được để trống" }),
    grant_all: boolean().optional(),
    description: string().optional(),
});

export const UpdateRoleSchema = object({
    name: string().optional(),
    permissions: array(string()).optional(),
    grant_all: boolean().optional(),
    description: string().optional(),
});

export const ChangeRoleStatusSchema = object({
    status: boolean({ required_error: "Trạng thái không được để trống" }),
});

export const FindRoleQuerySchema = FindQuerySchema.extend({
    status: string()
        .optional()
        .transform((val) => {
            if (val) {
                if (val.toLowerCase() === "true") return true;
                if (val.toLowerCase() === "false") return false;
            }
        }),
});
