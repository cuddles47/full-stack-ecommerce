import { Types } from "mongoose";
import { object, string, TypeOf, date, boolean, number } from "zod";

export const idSchema = object({
    id: string({ required_error: "ID không được để trống" }).refine(
        (val) => Types.ObjectId.isValid(val),
        { message: "ID không hợp lệ" }
    ),
});
