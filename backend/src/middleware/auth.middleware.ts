import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { validateEnv } from "../config/env.config";

import UnAuthenticatedError from "../errors/unauthenticated.error";
import ForbiddenError from "../errors/forbidden.error";

import { UserRepository } from "../repositories/user.repository";

import { extractTokenFromHeader } from "../utils/util";
import { isTokenBlocked } from "../utils/token-cache";

class AuthMiddleware {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public handle = async (req: Request, res: Response, next: NextFunction) => {
        const jwtconfig = validateEnv()?.jwtconfig;
        const token = extractTokenFromHeader(req);
        if (!token) {
            return next(
                new UnAuthenticatedError(
                    "Có lỗi xảy ra khi xác thực token. Bạn có quên Bearer không?"
                )
            );
        }

        const tokenBlocked = await isTokenBlocked(token as string);
        if (tokenBlocked) {
            return next(new ForbiddenError("Token đã hết hạn"));
        }

        try {
            const payload = jwt.verify(
                token as string,
                jwtconfig?.accessSecret as string
            ) as any;

            const user = await this.userRepository.findExtendedUserById(
                payload.userId,
                false,
                true
            );

            if (!user) {
                return next(new ForbiddenError("Không tìm thấy người dùng"));
            }

            if (!user.status) {
                return next(
                    new ForbiddenError("Người dùng chưa được kích hoạt")
                );
            }

            req.userData = {
                userId: payload?.userId,
                username: user.username,
                detail_user: user.detail_user,
                roles: user.roles.map((role) => role.name),
            };

            const hasgrant_all = user?.roles.some((role) => role.grant_all);
            if (hasgrant_all) {
                req.userData.grant_all = true;
            } else {
                req.userData.permissions = new Set(
                    user?.roles.flatMap((role) =>
                        role.permissions.map((permission) => permission.name)
                    )
                );
            }

            next();
        } catch (err) {
            next(new UnAuthenticatedError("Có lỗi xảy ra khi xác thực token"));
        }
    };
}

export default new AuthMiddleware().handle;
