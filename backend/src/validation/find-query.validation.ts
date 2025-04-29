import { z } from "zod";

export const FindQuerySchema = z.object({
    page: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val) : undefined))
        .refine((val) => val === undefined || val > 0, {
            message: "Trang phải lớn hơn 0",
        }),
    limit: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val) : undefined))
        .refine((val) => val === undefined || val > 0, {
            message: "Giới hạn trang phải lớn hơn 0",
        }),
    sort: z
        .string()
        .optional()
        .transform((val) =>
            val ? val.split(",").map((item) => item.trim()) : undefined
        ),
    search: z.string().optional(),
});
