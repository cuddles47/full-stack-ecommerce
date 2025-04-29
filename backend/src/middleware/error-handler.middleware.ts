import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import HttpException from "../errors/http-exception.error";

const errorHandlerMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (process.env.NODE_ENV === "development") {
        console.log("Error:", err);
    }

    const defaultError = {
        statusCode: 500,
        msg: "Có lỗi xảy ra, vui lòng thử lại sau",
    };

    // Xử lý các loại lỗi cụ thể
    if (err instanceof HttpException) {
        defaultError.statusCode = err.statusCode;
        defaultError.msg = err.message;
    } else if (err instanceof ZodError) {
        defaultError.statusCode = 400;
        defaultError.msg = err.errors.map(
            (item) => `${item.path}: ${item.message}`
        )[0];
    } else if (err.name === "ValidationError") {
        defaultError.statusCode = 500;
        defaultError.msg = Object.values(err.errors as { message: string }[])
            .map((item) => item?.message)
            .join(",");
    } else if (err.name === "CastError") {
        defaultError.statusCode = 400;
        defaultError.msg = `Không tìm thấy tài nguyên. Invalid :${err.path}`;
    } else if (err.name === "MulterError") {
        if (err.message === "File too large") {
            defaultError.statusCode = 413;
            // defaultError.msg = err.message;
            defaultError.msg = "Kích thước file quá lớn";
        } else if (err.message === "Unexpected field") {
            defaultError.statusCode = 400;
            defaultError.msg = "Chỉ được phép tải lên 1 ảnh";
        }
    } else if (err.code && err.code === 11000) {
        defaultError.statusCode = 400;
        const duplicateField = Object.keys(err.keyValue)[0];
        const duplicateValue = err.keyValue[duplicateField];
        if (duplicateField === 'name') {
            defaultError.msg = `Vai trò "${duplicateValue}" đã tồn tại trong hệ thống`;
        } else {
            defaultError.msg = `${duplicateField} đã tồn tại trong hệ thống`;
        }
    }

    // Ghi log lỗi chi tiết
    // logger.error({
    //     message: defaultError.msg,
    //     statusCode: defaultError.statusCode,
    //     method: req.method,
    //     url: req.url,
    //     headers: req.headers,
    //     body: req.body,
    //     stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    // });
    console.log(defaultError);

    // Đính kèm thông tin lỗi vào req để Morgan sử dụng
    req.errorMessage = defaultError.msg;

    // Trả phản hồi lỗi tới client
    res.status(defaultError.statusCode).json({
        message: defaultError.msg,
        success: false,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    });
};

export default errorHandlerMiddleware;